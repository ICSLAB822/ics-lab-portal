# frozen_string_literal: true
require 'tmpdir'
require 'json'
require 'uri'

Dir.mktmpdir('ics-baseurl-check-') do |workspace|
  ['', '/preview/nested', '/ics-lab-portal'].each_with_index do |base, index|
    destination = File.join(workspace, index.to_s)
    environment = { 'JEKYLL_ENV' => 'production', 'SITE_BASEURL' => base, 'SITE_DESTINATION' => destination }
    abort 'Jekyll build failed' unless system(environment, 'bundle', 'exec', 'jekyll', 'build', '--baseurl', base, '--destination', destination)
    %w[validate_site.rb check_links.rb].each do |script|
      abort "#{script} failed for #{base.inspect}" unless system(environment, 'bundle', 'exec', 'ruby', "scripts/#{script}")
    end
    mapping = JSON.parse(File.read(File.join(destination, 'legacy-routes.json')))
    expected = %w[news projects publications].sum { |name| Dir["content/_#{name}/*.md"].size } + 8
    abort 'Legacy route inventory changed' unless mapping.size == expected
    mapping.each_value do |target|
      abort "Missing legacy target: #{target}" unless File.file?(File.join(destination, URI::DEFAULT_PARSER.unescape(target.delete_prefix(base)), 'index.html'))
    end
    puts "PASS baseurl=#{base.inspect}: HTML, assets, search, #{expected} legacy entries"
  end
end
