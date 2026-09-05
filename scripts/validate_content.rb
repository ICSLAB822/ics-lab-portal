#!/usr/bin/env ruby
# frozen_string_literal: true

require 'date'
require 'digest'
require 'yaml'

ROOT = File.expand_path('..', __dir__)
COLLECTIONS = {
  news: %w[title date tag],
  projects: %w[title agency duration status type],
  publications: %w[title authors venue year],
  people: %w[name_en name_zh role_en role_zh imageUrl],
  gallery: %w[title_en title_zh coverUrl items]
}.freeze

errors = []
ids = {}
bodies = {}
member_bios = {}
placeholder_patterns = {
  /(?:example\.com|picsum\.photos)/i => 'placeholder host',
  /contact@icslab\.edu/i => 'placeholder contact address',
  /^\w+Url:\s*#\s*$/i => 'placeholder URL'
}.freeze

COLLECTIONS.each do |collection, required|
  Dir.glob(File.join(ROOT, 'content', "_#{collection}", '*.md')).sort.each do |path|
    source = File.read(path, encoding: 'UTF-8')
    match = source.match(/\A---\s*\n(.*?)\n---/m)
    unless match
      errors << "#{path}: missing front matter"
      next
    end
    data = YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true) || {}
    data.each do |key, value|
      errors << "#{path}: #{key} has leading or trailing whitespace" if value.is_a?(String) && value != value.strip
    end
    placeholder_patterns.each { |pattern, label| errors << "#{path}: contains #{label}" if source.match?(pattern) }
    required.each { |key| errors << "#{path}: missing #{key}" if data[key].nil? || data[key] == '' }
    id = "#{collection}/#{data['id'] || File.basename(path, '.md')}"
    errors << "#{path}: duplicate id #{id} (#{ids[id]})" if ids.key?(id)
    ids[id] = path
    body = match.post_match.strip.gsub(/\s+/, ' ')
    unless body.empty?
      digest = Digest::SHA256.hexdigest(body)
      if bodies.key?(digest)
        original_slug = File.basename(bodies[digest], '.md')
        errors << "#{path}: duplicate body (#{bodies[digest]}) without extendedFrom" unless data['extendedFrom'] == original_slug
      end
      bodies[digest] = path
    end

    folder = collection == :people ? 'people' : collection.to_s
    %w[imageUrl pdfUrl slidesUrl posterUrl coverUrl].each do |field|
      value = data[field]
      next if value.nil? || value == '' || value == '#' || value.to_s.start_with?('http')
      errors << "#{path}: unsafe asset path #{value}" if value.to_s.split('/').include?('..')
      errors << "#{path}: missing asset #{value}" unless File.file?(File.join(ROOT, 'assets', 'files', folder, value.to_s))
    end
    if collection == :news
      date_source = match[1][/^date:\s*([^\s#]+)\s*$/i, 1]
      errors << "#{path}: date must use YYYY-MM-DD" unless date_source&.match?(/\A\d{4}-\d{2}-\d{2}\z/)
    end
    if collection == :projects
      errors << "#{path}: invalid status" unless %w[Ongoing Completed].include?(data['status'])
    end
    if collection == :publications
      errors << "#{path}: authors must be a non-empty list" unless data['authors'].is_a?(Array) && !data['authors'].empty?
      errors << "#{path}: invalid track" unless %w[Journal Conference].include?(data['track'])
      if data['extendedFrom']
        original = File.join(ROOT, 'content/_publications', "#{data['extendedFrom']}.md")
        errors << "#{path}: extendedFrom target not found" unless File.file?(original)
      end
    end
    if collection == :people
      %w[bio_en bio_zh].each do |field|
        normalized = data[field].to_s.gsub(/<!--.*?-->/m, '').strip.gsub(/\s+/, ' ')
        next if normalized.empty?

        digest = Digest::SHA256.hexdigest(normalized)
        if member_bios.key?([field, digest])
          errors << "#{path}: duplicate #{field} (#{member_bios[[field, digest]]})"
        end
        member_bios[[field, digest]] = path
      end
    end
    if collection == :gallery
      Array(data['items']).each do |item|
        value = item['imageUrl'].to_s
        next if value.start_with?('https://', 'http://')
        errors << "#{path}: missing gallery image #{value}" if value.empty? || !File.file?(File.join(ROOT, 'assets/files/gallery', value))
      end
    end
    data.each do |key, value|
      errors << "#{path}: unsafe URL in #{key}" if key.end_with?('Url') && value.to_s.match?(/\A(?:javascript|data|vbscript):/i)
    end
  rescue Psych::SyntaxError => e
    errors << "#{path}: invalid YAML (#{e.message.lines.first.strip})"
  end
end

announcement = YAML.safe_load(File.read(File.join(ROOT, '_data/announcement.yml')), permitted_classes: [Date, Time]) || {}
if announcement['enabled']
  %w[startDate endDate title actionText actionUrl].each do |field|
    errors << "_data/announcement.yml: enabled announcement missing #{field}" if announcement[field].to_s.empty?
  end
end

if errors.empty?
  counts = COLLECTIONS.to_h { |name, _| [name, Dir.glob(File.join(ROOT, 'content', "_#{name}", '*.md')).size] }
  puts "OK: #{counts.map { |name, count| "#{name}=#{count}" }.join(', ')}"
else
  warn errors.join("\n")
  exit 1
end
