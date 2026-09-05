# frozen_string_literal: true
# Keep collection ordering deterministic; Markdown rendering belongs to Jekyll.
class ICSPresentationData < Jekyll::Generator
  safe true
  priority :low
  def generate(site)
    site.collections.each_value do |collection|
      collection.docs.sort_by! { |doc| doc.relative_path }
      collection.docs.each do |doc|
        # Resolve equal order values deterministically, unlike the previous
        # asynchronous member loader. The editor's order remains authoritative.
        doc.data['sort_key'] = format('%08d:%s', doc.data.fetch('order', 999).to_i, doc.relative_path)
      end
    end
  end
end
