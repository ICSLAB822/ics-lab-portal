#!/usr/bin/env ruby
# frozen_string_literal: true
Encoding.default_external = Encoding::UTF_8
require 'nokogiri'
require 'json'
require 'uri'
require 'yaml'

source = File.expand_path('..', __dir__)
root = File.expand_path(ENV.fetch('SITE_DESTINATION', '../_site'), __dir__)
base = ENV.fetch('SITE_BASEURL', YAML.safe_load(File.read(File.join(source, '_config.yml')))['baseurl'] || '').sub(%r{/$}, '')
counts = %w[news projects publications people gallery].to_h { |name| [name, Dir[File.join(source, "content/_#{name}/*.md")].size] }
errors = []
files = Dir.glob(File.join(root, '**', '*.html'))
abort 'No built HTML; run Jekyll first.' if files.empty?

def exact_file?(path)
  expanded = File.expand_path(path)
  return false unless File.file?(expanded)

  parts = expanded.split(File::SEPARATOR).reject(&:empty?)
  current = File::SEPARATOR
  parts.all? do |part|
    match = Dir.children(current).include?(part)
    current = File.join(current, part)
    match
  end
rescue Errno::ENOENT, Errno::ENOTDIR
  false
end

files.each do |file|
  html = Nokogiri::HTML(File.read(file))
  redirect = html.at_css('meta[http-equiv="refresh"]')
  errors << "#{file}: missing document shell" unless html.at_css('title') && (html.at_css('main') || redirect)
  html.css('[id]').group_by { |node| node['id'] }.each do |id, nodes|
    errors << "#{file}: duplicate DOM id #{id}" if nodes.size > 1
  end
  html.css('a[href], img[src], script[src], link[href]').each do |node|
    value = node['href'] || node['src']
    next if value.empty? || value.start_with?('#', '//') || value.match?(/\A[a-z]+:/i)
    target = URI::DEFAULT_PARSER.unescape(value.split(/[?#]/).first)
    if target.start_with?('/')
      errors << "#{file}: missing baseurl in #{value}" unless base.empty? || target == base || target.start_with?("#{base}/")
      target = File.join(root, target.delete_prefix(base))
    else
      target = File.expand_path(target, File.dirname(file))
    end
    target = File.join(target, 'index.html') if File.directory?(target)
    errors << "#{file}: missing target #{value}" unless exact_file?(target)
  end
  html.css('svg[width]').each { |svg| errors << "#{file}: invalid tiny SVG" if svg['width'].to_i.between?(1, 5) }
end
%w[news projects publications].each do |collection|
  actual = Dir.glob(File.join(root, collection, '*', 'index.html')).size
  errors << "#{collection}: expected #{counts[collection]} details, got #{actual}" unless actual == counts[collection]
end
members = Nokogiri::HTML(File.read(File.join(root, 'members', 'index.html')))
errors << "Members lost: #{members.css('[data-member]').size}/#{counts['people']}" unless members.css('[data-member]').size == counts['people']
index = JSON.parse(File.read(File.join(root, 'search-index.json')))
expected_search = counts.values.sum - counts['gallery']
errors << "Search index lost records: #{index.size}/#{expected_search}" unless index.size == expected_search
mapping = JSON.parse(File.read(File.join(root, 'legacy-routes.json')))
expected_routes = counts.values_at('news', 'projects', 'publications').sum + 8
errors << 'Legacy route inventory changed' unless mapping.size == expected_routes
if errors.empty?
  puts "OK: #{files.size} HTML files, #{expected_routes - 8} detail pages, #{counts['people']} members, #{index.size} search entries; internal resources resolve."
else
  warn errors.uniq.join("\n")
  exit 1
end
