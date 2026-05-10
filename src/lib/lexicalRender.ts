import { CMS_URL } from './api';

export function renderLexicalHtml(content: any): string {
  if (!content?.root?.children) return '';

  function renderChildren(children: any[]): string {
    if (!children) return '';
    return children.map((node: any) => {
      // Handle text nodes
      if (node.type === 'text') {
        let text = node.text || '';
        if (node.format === 1) text = `<strong>${text}</strong>`;
        if (node.format === 2) text = `<em>${text}</em>`;
        if (node.format === 8) text = `<u>${text}</u>`;
        return text;
      }

      // Handle links
      if (node.type === 'link') {
        const url = node.fields?.url || '';
        const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
        const innerHtml = renderChildren(node.children);
        return `<a href="${url}"${target} class="text-primary hover:underline">${innerHtml}</a>`;
      }

      // Handle images (uploads)
      if (node.type === 'upload' && node.relationTo === 'media') {
        const value = node.value;
        if (value && value.url) {
          const imgUrl = `${CMS_URL}${value.sizes?.card?.url || value.url}`;
          const alt = value.alt || '';
          const fields = node.fields || {};
          const position = fields.position || 'default';
          const size = fields.size || 'large';
          const caption = fields.caption || '';
          
          let containerClass = "my-8 rounded-2xl overflow-hidden shadow-sm border border-slate-200 clear-both";
          let imgClass = "w-full h-auto object-cover";
          
          if (position === 'left') {
            containerClass = "my-4 mr-6 lg:mr-8 mb-6 float-left rounded-2xl overflow-hidden shadow-sm border border-slate-200";
            if (size === 'small') containerClass += " w-1/3";
            else if (size === 'medium') containerClass += " w-1/2";
            else containerClass += " w-full";
          } else if (position === 'right') {
            containerClass = "my-4 ml-6 lg:ml-8 mb-6 float-right rounded-2xl overflow-hidden shadow-sm border border-slate-200";
            if (size === 'small') containerClass += " w-1/3";
            else if (size === 'medium') containerClass += " w-1/2";
            else containerClass += " w-full";
          } else {
             if (size === 'small') containerClass += " max-w-sm mx-auto";
             else if (size === 'medium') containerClass += " max-w-2xl mx-auto";
             else containerClass += " w-full";
          }
          
          const imgHtml = `<img src="${imgUrl}" alt="${alt}" class="${imgClass}" loading="lazy" />`;
          const captionHtml = caption ? `<figcaption class="text-sm text-center text-text-muted p-3 bg-slate-50 border-t border-slate-200">${caption}</figcaption>` : '';
          
          return `<figure class="${containerClass}">${imgHtml}${captionHtml}</figure>`;
        }
      }

      // Handle paragraphs
      if (node.type === 'paragraph') {
        const innerHtml = renderChildren(node.children);
        // Avoid rendering empty paragraphs that might mess up spacing
        if (!innerHtml.trim()) return '';
        return `<p class="mb-4 text-text-muted leading-relaxed">${innerHtml}</p>`;
      }

      // Handle headings
      if (node.type === 'heading') {
        const innerHtml = renderChildren(node.children);
        return `<h${node.tag} class="text-2xl md:text-3xl font-heading font-bold mt-10 mb-6 text-text">${innerHtml}</h${node.tag}>`;
      }

      // Handle blockquotes
      if (node.type === 'quote') {
        const innerHtml = renderChildren(node.children);
        return `<blockquote class="border-l-4 border-primary pl-4 md:pl-6 italic my-6 text-text-muted bg-slate-50 py-3 pr-4 rounded-r-lg">${innerHtml}</blockquote>`;
      }

      // Handle lists (ul/ol)
      if (node.type === 'list') {
        const tag = node.tag || 'ul';
        const listClass = tag === 'ol' ? 'list-decimal' : 'list-disc';
        const innerHtml = renderChildren(node.children);
        return `<${tag} class="${listClass} pl-6 md:pl-8 mb-6 text-text-muted space-y-2 marker:text-primary/70">${innerHtml}</${tag}>`;
      }

      // Handle list items
      if (node.type === 'listitem') {
        const innerHtml = renderChildren(node.children);
        return `<li class="text-text-muted pl-1">${innerHtml}</li>`;
      }

      return renderChildren(node.children || []);
    }).join('');
  }

  return renderChildren(content.root.children);
}
