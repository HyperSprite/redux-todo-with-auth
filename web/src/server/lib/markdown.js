const marked = require('marked');

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => `<a target="new" href="${href}">${text}</a>`;

exports.rend = (content, cb) => cb(marked(content || '', { renderer }));
