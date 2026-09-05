## Markdown rendering fixture

A **strong phrase**, an *emphasized phrase*, and `inline_code()` in one paragraph.
This soft-wrapped line belongs to the same paragraph.

A separate paragraph with 中文正文 and {{ site.title }}.

### Lists

- First unordered item
  - Nested unordered item
- Second unordered item

1. First ordered item
2. Second ordered item

### Links and images

[Internal news link]({{ '/news/' | relative_url }}) and [heading link](#lists).

[Reference link][docs]

[docs]: https://jekyllrb.com/docs/

![Lab logo]({{ '/assets/files/logo/logo.png' | relative_url }})

> A quoted paragraph with **strong text**.

### Code and tables

```html
<script>window.markdownExecuted = true;</script>
{% raw %}{{ keep_liquid_literal }}{% endraw %}
```

```text
one_very_long_identifier_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz
```

| Feature | Result |
| --- | --- |
| Markdown | **Supported** |
| 中文 | 正常显示 |

A long token: abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz

Escaped text: \*literal asterisks\* and &lt;span&gt;.

---

Final paragraph.
