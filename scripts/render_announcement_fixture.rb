# frozen_string_literal: true
require 'jekyll'
require 'json'
Encoding.default_external = Encoding::UTF_8

# Render test HTML in memory only. Never change the site's real announcement.
site = Jekyll::Site.new(Jekyll.configuration('source' => Dir.pwd, 'quiet' => true))
site.reset
site.read
site.data['announcement'].merge!(
  'enabled' => true, 'startDate' => '2026-01-01', 'endDate' => '2026-12-31',
  'actionUrl' => '#/news/2026-02-10-tmc-paper/', 'title' => '公告迁移验收 · Announcement',
  'mobileImageUrl' => site.data['announcement']['imageUrl']
)
home = site.pages.find { |page| page.name == 'index.html' && page.dir == '/' }
abort 'Homepage not found' unless home
fixtures = {}
%w[celebration info default].each do |theme|
  site.data['announcement']['theme'] = theme
  fixtures[theme] = Jekyll::Renderer.new(site, home, site.site_payload).run
end
puts JSON.generate(fixtures)
