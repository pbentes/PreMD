const fs = require('fs');
const hljs = require('highlight.js/lib/common');

var defaults = {
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: true,
    typographer: true,
    _highlight: true,
    _strict: false,
    _view: 'html'
};

defaults.highlight = function (str, lang) {
    var esc = md.utils.escapeHtml(str);
    
    if (lang && hljs.getLanguage(lang)) {
        try {
            return '<pre class="hljs"><code>' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>';
        } 
        catch (err) {
            console.log(err);
        }
    } else {
        return '<pre class="hljs"><code>' + esc + '</code></pre>';
    }
};

const md = require('markdown-it')(defaults);

fs.readFile(process.argv[2], 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    let result = md.render(data);

    fs.writeFile(process.argv[3], result.replaceAll("{", "&#123;").replaceAll("}", "&#125;"), 'utf8', (err) => {
        if (err) {
            return console.log(err);
        }
    })
});