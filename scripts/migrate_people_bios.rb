#!/usr/bin/env ruby
# frozen_string_literal: true

PEOPLE_DIR = File.expand_path('../content/_people', __dir__)

Dir.glob(File.join(PEOPLE_DIR, '*.md')).sort.each do |path|
  source = File.read(path, encoding: 'UTF-8')
  match = source.match(/\A---\s*\n(.*?)\n---\s*\n(.*)\z/m)
  abort "Invalid front matter: #{path}" unless match
  next if match[1].match?(/^bio_en:/)

  bios = match[2].strip.split(/^---\s*$/, 2).map(&:strip)
  bio_en = bios[0].to_s
  bio_zh = bios[1].to_s.empty? ? bio_en : bios[1]
  indent = ->(value) { value.lines.map { |line| "  #{line}" }.join.rstrip }
  migrated = <<~MARKDOWN
    ---
    #{match[1].rstrip}
    bio_en: |-
    #{indent.call(bio_en)}
    bio_zh: |-
    #{indent.call(bio_zh)}
    ---
  MARKDOWN
  File.write(path, migrated, mode: 'w', encoding: 'UTF-8')
end
