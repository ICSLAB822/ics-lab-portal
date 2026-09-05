# frozen_string_literal: true

# Conda/macOS shells can default to US-ASCII. Set encoding before loading the
# checker so worker failures cannot silently turn a Unicode site into zero links.
Encoding.default_external = Encoding::UTF_8
require 'html-proofer'
require 'yaml'

config = YAML.safe_load(File.read('_config.yml'), permitted_classes: [Date, Time])
baseurl = ENV.fetch('SITE_BASEURL', config.fetch('baseurl', '')).sub(%r{/$}, '')
options = { disable_external: true, allow_hash_href: true }
options[:swap_urls] = { %r{\A#{Regexp.escape(baseurl)}/} => '/' } unless baseurl.empty?
destination = ENV.fetch('SITE_DESTINATION', '_site')
abort 'Build the site before checking links' if Dir[File.join(destination, '**/*.html')].empty?
HTMLProofer.check_directory(destination, options).run
