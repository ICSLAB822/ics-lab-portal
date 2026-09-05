# frozen_string_literal: true
Encoding.default_external = Encoding::UTF_8
require 'jekyll'
require 'json'

# Exercise the real Markdown converter and all three detail layouts in memory.
# Never add sample documents to published collections or write to _site.
source = File.expand_path('..', __dir__)
site = Jekyll::Site.new(Jekyll.configuration(
  'source' => source, 'quiet' => true, 'disable_disk_cache' => true
))
site.reset
site.read
site.generate
body = File.read(File.join(source, 'tests/fixtures/markdown.md'), encoding: 'UTF-8')
fixture_data = {
  'news' => { 'layout' => 'news-detail', 'title' => 'Fixture', 'date' => Date.new(2026, 1, 1), 'tag' => 'Test' },
  'projects' => { 'layout' => 'project-detail', 'title' => 'Fixture', 'summary' => 'Fixture', 'status' => 'Completed', 'type' => 'Test', 'agency' => 'Test', 'duration' => '2026' },
  'publications' => { 'layout' => 'publication-detail', 'title' => 'Fixture', 'authors' => ['Test Author'], 'venue' => 'Test Venue', 'year' => 2026, 'track' => 'Conference' }
}.freeze
fixtures = fixture_data.to_h do |collection, data|
  page = Jekyll::PageWithoutAFile.new(site, source, '', "__markdown-fixture-#{collection}.md")
  page.content = body
  page.data.merge!(data)
  [collection, Jekyll::Renderer.new(site, page, site.site_payload).run]
end
puts JSON.generate(fixtures)
