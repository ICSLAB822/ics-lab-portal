(() => {
  'use strict';
  const root = document.documentElement;
  const base = window.ICS_BASE_URL || '';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const savePreference = (key, value) => {
    try { localStorage.setItem(key, value); } catch (error) { console.warn('Preference storage unavailable', error); }
  };

  // The original HashRouter used case-sensitive Markdown filenames, not Jekyll slugs.
  window.addEventListener('hashchange', () => {
    if (/^#\//.test(location.hash)) location.reload();
  });
  const legacy = location.hash.match(/^#\/(.*)$/);
  if (legacy) {
    (async () => {
      try {
        const response = await fetch(base + '/legacy-routes.json');
        if (!response.ok) throw new Error('Legacy route map unavailable');
        const routes = await response.json();
        const raw = legacy[1].split('?')[0].replace(/\/$/, '');
        const path = decodeURIComponent(raw).replace(/^people(?=\/|$)/, 'members');
        const canonical = routes[path];
        location.replace((canonical || base + '/404.html') + location.search);
      } catch (error) {
        console.warn('Legacy navigation failed', error);
        location.replace(base + '/404.html');
      }
    })();
    return;
  }

  let themePreference;
  try { themePreference = localStorage.getItem('theme') || 'system'; } catch (_) { themePreference = 'system'; }
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const syncTheme = () => {
    root.classList.toggle('dark', themePreference === 'dark' || (themePreference === 'system' && systemTheme.matches));
    $('[data-theme-toggle]')?.setAttribute('aria-pressed', String(root.classList.contains('dark')));
  };
  $('[data-theme-toggle]')?.addEventListener('click', () => {
    themePreference = root.classList.contains('dark') ? 'light' : 'dark';
    savePreference('theme', themePreference);
    syncTheme();
  });
  systemTheme.addEventListener('change', syncTheme);
  syncTheme();

  const syncLanguageAttributes = () => {
    $$('[data-aria-en]').forEach(element => element.setAttribute('aria-label', element.dataset[root.lang === 'zh' ? 'ariaZh' : 'ariaEn']));
    $$('[data-alt-en]').forEach(element => element.setAttribute('alt', element.dataset[root.lang === 'zh' ? 'altZh' : 'altEn']));
    $$('[data-placeholder-en]').forEach(element => element.setAttribute('placeholder', element.dataset[root.lang === 'zh' ? 'placeholderZh' : 'placeholderEn']));
    $$('[data-title-en]').forEach(element => element.setAttribute('title', element.dataset[root.lang === 'zh' ? 'titleZh' : 'titleEn']));
    $$('[data-option-en]').forEach(element => { element.textContent = element.dataset[root.lang === 'zh' ? 'optionZh' : 'optionEn']; });
  };
  const syncDates = () => {
    $$('[data-local-date]').forEach(element => {
      const match = element.dateTime.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!match) return;
      // A date-only value is a calendar date, not an instant. Pin formatting to
      // UTC so readers west of Greenwich never see the previous day.
      const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
      element.textContent = new Intl.DateTimeFormat(root.lang === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
      }).format(date);
    });
  };
  $$('[data-language-toggle]').forEach(button => button.addEventListener('click', () => {
    root.dataset.language = root.dataset.language === 'zh' ? 'en' : 'zh';
    root.lang = root.dataset.language;
    savePreference('language', root.lang);
    if (button.closest('[data-mobile-menu]')) closeMenu({ restoreFocus: true });
    syncMenuLabel();
    syncLanguageAttributes();
    syncDates();
    applyPublicationFilters();
    renderSearch();
    if (lightbox?.open) renderLightbox();
  }));
  syncLanguageAttributes();
  syncDates();

  const menuButton = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');
  const navbar = $('[data-navbar]');
  const desktopNav = $('[data-desktop-nav]');
  let lastNavbarFocus = null;
  // CSS xl utilities and the control sizing rule use this same breakpoint.
  const wideNavigation = matchMedia('(min-width: 1280px)');
  const menuIsOpen = () => mobileMenu && !mobileMenu.hidden;
  const setScrollLock = () => { document.body.style.overflow = menuIsOpen() || $('dialog[open]') ? 'hidden' : ''; };
  const syncMenuLabel = () => {
    const open = menuIsOpen();
    menuButton?.setAttribute('aria-label', root.lang === 'zh' ? (open ? '收起导航' : '展开导航') : (open ? 'Close navigation' : 'Open navigation'));
  };
  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (mobileMenu) mobileMenu.hidden = true;
    navbar?.classList.remove('nav-expanded');
    menuButton?.setAttribute('aria-expanded', 'false');
    syncMenuLabel();
    setScrollLock();
    if (restoreFocus && !wideNavigation.matches) menuButton?.focus({ preventScroll: true });
  };
  menuButton?.addEventListener('click', () => {
    if (menuIsOpen()) closeMenu();
    else {
      mobileMenu.hidden = false;
      navbar?.classList.add('nav-expanded');
      mobileMenu.scrollTop = 0;
      menuButton.setAttribute('aria-expanded', 'true');
      syncMenuLabel();
      setScrollLock();
    }
  });
  wideNavigation.addEventListener('change', event => {
    // Some browsers blur a control as soon as the media query hides it, before
    // this callback runs. Keep its equivalent destination across that layout change.
    const focused = document.activeElement === document.body ? lastNavbarFocus : document.activeElement;
    if (event.matches) {
      const menuHadFocus = mobileMenu?.contains(focused) || focused === menuButton;
      const equivalent = focused?.matches('[data-language-toggle]')
        ? $('[data-language-toggle]', navbar)
        : $$('a', desktopNav).find(link => link.getAttribute('href') === focused?.getAttribute('href'));
      closeMenu();
      if (menuHadFocus) (equivalent || $('a', navbar))?.focus({ preventScroll: true });
    } else if (desktopNav?.contains(focused) || focused === $('[data-language-toggle]', navbar)) {
      menuButton?.focus({ preventScroll: true });
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!navbar?.contains(event.target)) {
      if (menuIsOpen()) closeMenu({ restoreFocus: mobileMenu.contains(document.activeElement) });
      lastNavbarFocus = null;
    }
  });
  document.addEventListener('focusin', event => {
    if (navbar?.contains(event.target)) lastNavbarFocus = event.target;
    else {
      lastNavbarFocus = null;
      if (menuIsOpen()) closeMenu();
    }
  });
  navbar?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu({ restoreFocus: mobileMenu?.contains(document.activeElement) });
  });
  syncMenuLabel();

  const scrollTopButton = $('[data-scroll-top]');
  const updateScroll = () => {
    if (scrollTopButton) scrollTopButton.hidden = scrollY <= 300;
    if (navbar) navbar.classList.toggle('nav-scrolled', scrollY > 10);
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  scrollTopButton?.addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
  updateScroll();

  const openDialog = dialog => {
    if (!dialog || dialog.open) return;
    closeMenu();
    dialog.showModal();
    setScrollLock();
  };
  const closeDialog = dialog => {
    if (dialog?.open) dialog.close();
    setScrollLock();
  };
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (event.target === dialog && outside && !dialog.matches('[data-announcement]')) closeDialog(dialog);
    });
    dialog.addEventListener('close', setScrollLock);
  });

  const filterPanel = $('[data-filter-panel]');
  const filterButton = $('[data-filter-toggle]');
  const closeFilters = () => {
    if (filterPanel) filterPanel.hidden = true;
    filterButton?.setAttribute('aria-expanded', 'false');
  };
  filterButton?.addEventListener('click', () => {
    filterPanel.hidden = !filterPanel.hidden;
    filterButton.setAttribute('aria-expanded', String(!filterPanel.hidden));
  });
  $('[data-filter-close]')?.addEventListener('click', () => { closeFilters(); filterButton.focus(); });
  document.addEventListener('pointerdown', event => {
    if (filterPanel && !filterPanel.contains(event.target) && !filterButton.contains(event.target)) closeFilters();
  });

  const publicationItems = $$('.publication-item');
  let activeTrack = 'All';
  const topicSelect = $('#topic-filter');
  const applyPublicationFilters = () => {
    const topic = topicSelect?.value || 'All';
    publicationItems.forEach(item => {
      item.hidden = !((activeTrack === 'All' || item.dataset.track === activeTrack) && (topic === 'All' || item.dataset.topic === topic));
    });
    $$('[data-publication-year]').forEach(year => { year.hidden = !$('.publication-item:not([hidden])', year); });
    const empty = $('[data-publication-empty]');
    if (empty) empty.hidden = publicationItems.some(item => !item.hidden);
    const label = $('[data-filter-label]');
    if (label) {
      const trackNames = root.lang === 'zh' ? { Journal: '期刊', Conference: '会议' } : {};
      label.textContent = [trackNames[activeTrack] || activeTrack, topic].filter(value => value !== 'All' && value !== '全部').join(' / ') || (root.lang === 'zh' ? '全部' : 'All');
    }
    $$('.filter-button').forEach(button => {
      const active = button.dataset.track === activeTrack;
      button.setAttribute('aria-pressed', String(active));
      ['font-bold', 'text-blue-600', 'underline', 'decoration-2', 'underline-offset-4'].forEach(name => button.classList.toggle(name, active));
      ['text-slate-600', 'dark:text-slate-400'].forEach(name => button.classList.toggle(name, !active));
    });
  };
  $$('.filter-button').forEach(button => button.addEventListener('click', () => { activeTrack = button.dataset.track; applyPublicationFilters(); }));
  topicSelect?.addEventListener('change', applyPublicationFilters);
  $('[data-filter-reset]')?.addEventListener('click', () => { activeTrack = 'All'; topicSelect.value = 'All'; applyPublicationFilters(); });

  $$('[data-faq-toggle]').forEach(button => button.addEventListener('click', () => {
    const opening = button.getAttribute('aria-expanded') !== 'true';
    $$('[data-faq-toggle]').forEach(candidate => {
      const expanded = candidate === button && opening;
      candidate.setAttribute('aria-expanded', String(expanded));
      document.getElementById(candidate.getAttribute('aria-controls')).hidden = !expanded;
      $('.faq-chevron', candidate)?.classList.toggle('rotate-180', expanded);
    });
  }));

  const lightbox = $('[data-lightbox]');
  let lightboxItems = [];
  let lightboxIndex = 0;
  let selectedAlbumButton;
  const renderLightbox = () => {
    const target = lightboxItems[lightboxIndex];
    if (!target) return;
    const image = document.createElement('img');
    image.src = target.dataset.lightboxSrc;
    image.alt = target.dataset[root.lang === 'zh' ? 'captionZh' : 'captionEn'] || target.dataset.captionEn || target.querySelector('img')?.alt || '';
    image.className = 'max-w-full max-h-[75vh] w-auto h-auto object-contain shadow-2xl bg-black';
    $('[data-lightbox-content]', lightbox).replaceChildren(image);
    $('[data-lightbox-caption]', lightbox).textContent = image.alt;
    const album = target.closest('[data-album-view]');
    $('[data-lightbox-counter]', lightbox).textContent = album ? (album.dataset[root.lang === 'zh' ? 'titleZh' : 'titleEn'] || album.dataset.titleEn) + ' // ' + (lightboxIndex + 1) + (root.lang === 'zh' ? ' / 共 ' : ' OF ') + lightboxItems.length : '';
  };
  const movePhoto = offset => {
    if (!lightboxItems.length) return;
    lightboxIndex = (lightboxIndex + offset + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  };
  $$('[data-lightbox-prev]').forEach(button => button.addEventListener('click', () => movePhoto(-1)));
  $$('[data-lightbox-next]').forEach(button => button.addEventListener('click', () => movePhoto(1)));
  $('[data-lightbox-backdrop]')?.addEventListener('click', event => { if (event.target.matches('[data-lightbox-backdrop]')) closeDialog(lightbox); });

  document.addEventListener('keydown', event => {
    if (lightbox?.open && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault(); movePhoto(event.key === 'ArrowLeft' ? -1 : 1); return;
    }
    if (event.key !== 'Escape') return;
    const dialogs = $$('dialog[open]');
    if (dialogs.length) { event.preventDefault(); closeDialog(dialogs[dialogs.length - 1]); }
    else if (filterPanel && !filterPanel.hidden) { closeFilters(); filterButton.focus(); }
    else if (menuIsOpen()) { event.preventDefault(); closeMenu({ restoreFocus: true }); }
  }, true);

  const copyText = async (button, value) => {
    const original = button.innerHTML;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = root.lang === 'zh' ? '已复制' : 'Copied!';
    } catch (error) {
      button.textContent = root.lang === 'zh' ? '请手动复制' : 'Please copy manually';
      console.warn('Clipboard unavailable', error);
    }
    setTimeout(() => { button.innerHTML = original; }, 2000);
  };
  document.addEventListener('click', event => {
    const target = event.target.closest('button, a');
    if (!target) return;
    if (target.matches('[data-dialog-close]')) closeDialog(target.closest('dialog'));
    if (target.dataset.bioOpen) openDialog(document.getElementById(target.dataset.bioOpen));
    if (target.matches('[data-copy-bio]')) copyText(target, $('[data-bio-text] [data-lang="' + root.lang + '"]', target.closest('dialog')).textContent.trim());
    if (target.matches('[data-citation-open]')) {
      if (target.dataset.citationValue) $('[data-citation-text]').textContent = target.dataset.citationValue;
      openDialog($('[data-citation-dialog]'));
    }
    if (target.matches('[data-copy-citation]')) copyText(target, $('[data-citation-text]').textContent.trim());
    if (target.dataset.albumOpen) {
      selectedAlbumButton = target;
      $('[data-album-grid]').hidden = true;
      const album = document.getElementById(target.dataset.albumOpen);
      album.hidden = false;
      $('[data-album-back]', album).focus({ preventScroll: true });
    }
    if (target.matches('[data-album-back]')) {
      $$('[data-album-view]').forEach(album => { album.hidden = true; });
      $('[data-album-grid]').hidden = false;
      selectedAlbumButton?.focus({ preventScroll: true });
    }
    if (target.dataset.lightboxSrc) {
      const album = target.closest('[data-album-view]');
      lightboxItems = album ? $$('[data-lightbox-src]', album) : [target];
      lightboxIndex = lightboxItems.indexOf(target);
      renderLightbox();
      openDialog(lightbox);
    }
  });

  const searchDialog = $('[data-search-dialog]');
  const searchInput = $('[data-search-input]');
  const searchResults = $('[data-search-results]');
  const searchCopy = {
    en: {
      unavailable: 'Search unavailable. Please try again.', loading: 'Loading…', prompt: 'Type to start searching...',
      empty: query => 'No results found for "' + query + '".', groups: { news: 'News', publication: 'Publications', project: 'Projects', member: 'Members' }
    },
    zh: {
      unavailable: '搜索暂时不可用，请稍后重试。', loading: '加载中……', prompt: '输入关键词开始搜索……',
      empty: query => '未找到与“' + query + '”相关的结果。', groups: { news: '新闻', publication: '论文', project: '项目', member: '成员' }
    }
  };
  let searchIndex;
  let searchLoading = false;
  let searchError = false;
  const textElement = (tag, className, text) => {
    const element = document.createElement(tag); element.className = className; element.textContent = text; return element;
  };
  const renderSearch = () => {
    if (!searchInput) return;
    const copy = searchCopy[root.lang] || searchCopy.en;
    const query = searchInput.value.trim().toLocaleLowerCase();
    searchResults.replaceChildren();
    const footer = $('[data-search-footer]');
    footer.hidden = true;
    if (!query || !searchIndex) {
      searchResults.append(textElement('p', 'p-8 text-center text-slate-400 font-mono text-sm', searchError ? copy.unavailable : searchLoading && query ? copy.loading : copy.prompt));
      return;
    }
    let count = 0;
    const groups = document.createElement('div'); groups.className = 'space-y-6 p-2';
    [['news', 3], ['publication', 5], ['project', 3], ['member', 4]].forEach(([type, limit]) => {
      const matches = searchIndex.filter(item => item.type === type && [item.title, item.titleZh, item.text, item.textZh].join(' ').toLocaleLowerCase().includes(query)).slice(0, limit);
      if (!matches.length) return;
      count += matches.length;
      const group = document.createElement('div');
      group.append(textElement('h3', 'text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-2 px-2', copy.groups[type]));
      const list = document.createElement('div'); list.className = 'space-y-1';
      matches.forEach(item => {
        const link = document.createElement('a'); link.href = item.url;
        link.className = 'w-full flex items-start gap-3 p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-left group';
        if (item.image) {
          const image = document.createElement('img'); image.src = item.image; image.alt = ''; image.className = 'w-8 h-8 rounded-full object-cover shrink-0'; link.append(image);
        } else {
          const icon = $('[data-search-icon="' + type + '"]');
          if (icon) link.append(icon.content.cloneNode(true));
        }
        const details = document.createElement('div'); details.className = 'min-w-0';
        details.append(textElement('div', 'font-bold text-slate-900 dark:text-white text-sm', root.lang === 'zh' && item.titleZh ? item.titleZh : item.title));
        details.append(textElement('div', 'text-xs text-slate-500 truncate max-w-md', root.lang === 'zh' && item.subtitleZh ? item.subtitleZh : item.subtitle || ''));
        link.append(details);
        link.addEventListener('click', () => {
          const destination = new URL(link.href, location.href);
          const samePageTarget = destination.pathname === location.pathname && destination.hash
            ? document.getElementById(decodeURIComponent(destination.hash.slice(1))) : null;
          closeDialog(searchDialog);
          if (samePageTarget) setTimeout(() => samePageTarget.focus({ preventScroll: true }), 0);
        });
        list.append(link);
      });
      group.append(list); groups.append(group);
    });
    if (count) { searchResults.append(groups); footer.hidden = false; }
    else searchResults.append(textElement('p', 'p-8 text-center text-slate-500 dark:text-slate-400 font-mono text-sm', copy.empty(searchInput.value.trim())));
  };
  $('[data-search-open]')?.addEventListener('click', async () => {
    openDialog(searchDialog); searchInput.focus();
    if (!searchIndex && !searchLoading) {
      searchLoading = true; searchError = false;
      try {
        const response = await fetch(base + '/search-index.json');
        if (!response.ok) throw new Error('Search index unavailable');
        searchIndex = await response.json();
      } catch (error) { searchError = true; console.warn('Search index failed', error); }
      finally { searchLoading = false; renderSearch(); }
    }
  });
  $('[data-search-close]')?.addEventListener('click', () => closeDialog(searchDialog));
  searchInput?.addEventListener('input', renderSearch);
  searchDialog?.addEventListener('close', () => { searchInput.value = ''; renderSearch(); });
  renderSearch();

  const slides = $$('[data-hero-slide]');
  let currentSlide = 0;
  const loadHero = slide => {
    const image = $('img', slide);
    if (!image?.dataset.heroSrc) return Promise.resolve();
    image.srcset = image.dataset.heroSrcset;
    image.sizes = '100vw';
    image.src = image.dataset.heroSrc;
    delete image.dataset.heroSrc;
    delete image.dataset.heroSrcset;
    return image.decode?.().catch(() => undefined) || Promise.resolve();
  };
  if (slides.length > 1 && !reducedMotion.matches) {
    const rotateHero = async () => {
      if (document.hidden) { setTimeout(rotateHero, 8000); return; }
      const nextSlide = (currentSlide + 1) % slides.length;
      await loadHero(slides[nextSlide]);
      slides[currentSlide].classList.add('opacity-0');
      $('img', slides[currentSlide]).classList.replace('scale-110', 'scale-100');
      currentSlide = nextSlide;
      slides[currentSlide].classList.remove('opacity-0');
      $('img', slides[currentSlide]).classList.replace('scale-100', 'scale-110');
      setTimeout(rotateHero, 8000);
    };
    setTimeout(rotateHero, 8000);
  }

  const announcement = $('[data-announcement]');
  if (announcement) {
    const today = new Date().toISOString().slice(0, 10);
    const visible = (!announcement.dataset.start || today >= announcement.dataset.start) && (!announcement.dataset.end || today <= announcement.dataset.end);
    const recall = $('[data-announcement-recall]');
    let closeTimer;
    const showAnnouncement = () => {
      clearTimeout(closeTimer); announcement.classList.remove('is-closing'); recall.hidden = true; openDialog(announcement);
    };
    announcement.addEventListener('close', () => { clearTimeout(closeTimer); recall.hidden = false; recall.focus(); });
    if (visible) showAnnouncement();
    recall.addEventListener('click', showAnnouncement);
    $('[data-announcement-close]', announcement).addEventListener('click', () => {
      announcement.classList.add('is-closing');
      closeTimer = setTimeout(() => closeDialog(announcement), reducedMotion.matches ? 0 : 700);
    });
  }
})();
