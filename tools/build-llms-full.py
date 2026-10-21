# Builds site/llms-full.txt: the full text of every page as Markdown, for AI tools.
# Rerun after editing the pages:
#
#   python3 tools/build-llms-full.py
#
# It reads the <main> of each page and turns headings, paragraphs, lists, links and
# code into Markdown. Icons, buttons and anything aria-hidden are left out.
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
import re

SITE = Path(__file__).resolve().parent.parent / 'site'
BASE = 'https://satyadahal.com.np'
PAGES = [
    ('index.html', '/'),
    ('writing/index.html', '/writing/'),
    ('writing/termrex.html', '/writing/termrex.html'),
    ('writing/bikram-sambat-in-kde-plasma.html', '/writing/bikram-sambat-in-kde-plasma.html'),
]
SKIP = {'svg', 'button', 'script', 'style', 'summary', 'nav', 'template', 'form'}
BLOCK = {'p', 'li', 'h1', 'h2', 'h3', 'h4', 'dt', 'dd', 'pre', 'figcaption', 'blockquote', 'tr'}


class ToMarkdown(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []          # finished blocks
        self.buf = []          # text of the block being read
        self.skip = 0          # depth inside skipped elements
        self.stack = []        # open tags, to know what each end tag closes
        self.lists = []        # 'ul' / 'ol' counters
        self.links = []        # hrefs of open links
        self.pre = False
        self.chips = None      # items of a ul.tags, written as one line

    def flush(self, prefix='', kind='p'):
        text = ''.join(self.buf)
        self.buf = []
        if not self.pre:
            text = re.sub(r'\s+', ' ', text).strip()
            text = re.sub(r'\[ +| +\]', lambda m: m.group().strip(), text)
            text = text.replace(' ,', ',')
        if text:
            self.out.append((kind, prefix + text))

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        hidden = (tag in SKIP or a.get('aria-hidden') == 'true' or 'hidden' in a
                  or 'sr-only' in (a.get('class') or ''))
        self.stack.append((tag, hidden))
        if hidden or self.skip:
            if hidden:
                self.skip += 1
            return
        if tag in BLOCK or tag in ('ul', 'ol', 'section', 'article', 'header', 'div', 'aside'):
            if self.buf and tag in BLOCK | {'ul', 'ol'}:
                self.flush()
        if tag == 'ul' and 'tags' in (a.get('class') or ''):
            self.chips = []
            self.skip += 1          # read the chips' text ourselves (see handle_data)
            self.stack[-1] = (tag, True)
            return
        if tag in ('ul', 'ol'):
            self.lists.append(0 if tag == 'ol' else None)
        elif tag == 'pre':
            self.pre = True
            self.buf.append('```\n')
        elif tag == 'code' and not self.pre:
            self.buf.append('`')
        elif tag in ('strong', 'b'):
            self.buf.append('**')
        elif tag == 'a':
            href = a.get('href') or ''
            if href.startswith('/'):
                href = BASE + href
            self.links.append(href)
            star = re.search(r'\b(stars|star-btn)\b', a.get('class') or '')
            self.buf.append('[★ ' if star else '[')
        elif tag == 'img' and a.get('alt'):
            self.out.append(('p', f'(Image: {a["alt"]})'))
        elif tag == 'span' and 'org' in (a.get('class') or ''):
            self.buf.append(', ')
        elif tag in ('br', 'span', 'small') and not self.pre:
            self.buf.append(' ')

    def handle_endtag(self, tag):
        # Close back to the matching open tag (HTML here is well formed).
        while self.stack:
            open_tag, hidden = self.stack.pop()
            if open_tag == tag:
                break
        else:
            return
        if hidden:
            self.skip -= 1
            if tag == 'ul' and self.chips is not None:
                self.out.append(('p', 'Technologies: ' + ', '.join(self.chips)))
                self.chips = None
            return
        if self.skip:
            return
        if tag in ('span', 'small') and not self.pre:
            self.buf.append(' ')
        if tag == 'a':
            href = self.links.pop() if self.links else ''
            self.buf.append(f']({href}) ' if href else '] ')
        elif tag in ('strong', 'b'):
            self.buf.append('**')
        elif tag == 'code' and not self.pre:
            self.buf.append('`')
        elif tag == 'pre':
            self.buf.append('\n```')
            self.flush()
            self.pre = False
        elif tag in ('h1', 'h2', 'h3', 'h4'):
            self.flush('#' * int(tag[1]) + ' ')
        elif tag == 'li':
            depth = len(self.lists) - 1
            kind = self.lists[-1] if self.lists else None
            if kind is None:
                marker = '- '
            else:
                self.lists[-1] += 1
                marker = f'{self.lists[-1]}. '
            self.flush('  ' * max(depth, 0) + marker, 'li')
        elif tag in ('ul', 'ol'):
            if self.lists:
                self.lists.pop()
        elif tag == 'dt':
            self.flush('**')
            if self.out:
                kind, text = self.out[-1]
                self.out[-1] = (kind, text + ':**')
        elif tag in BLOCK:
            self.flush()

    def handle_data(self, data):
        if self.chips is not None and self.stack and self.stack[-1][0] == 'li':
            if data.strip():
                self.chips.append(data.strip())
        elif not self.skip:
            self.buf.append(data)

    def markdown(self):
        self.flush()
        text = ''
        for i, (kind, block) in enumerate(self.out):
            if i:
                text += '\n' if kind == 'li' and self.out[i - 1][0] == 'li' else '\n\n'
            text += block
        text = re.sub(r'\[\]\([^)]*\)', '', text)   # links whose text was all icon
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()


def page_markdown(path):
    html = (SITE / path).read_text()
    title = re.search(r'<title>(.*?)</title>', html, re.S)
    main = re.search(r'<main\b.*?>(.*)</main>', html, re.S)
    if not (title and main):
        raise SystemExit(f'{path}: no <title> or <main>')
    title, main = unescape(title.group(1)), main.group(1)
    p = ToMarkdown()
    p.feed(main)
    return title, p.markdown()


parts = [
    '# Satya Prakash Dahal: full site text',
    '> Every page of https://satyadahal.com.np/ as plain Markdown, for AI tools and other '
    'readers that do not run JavaScript. The short version is /llms.txt.',
]
for path, url in PAGES:
    title, body = page_markdown(path)
    parts.append(f'---\n\nSource: {BASE}{url}\nTitle: {title}\n\n{body}')

out = SITE / 'llms-full.txt'
out.write_text('\n\n'.join(parts) + '\n')
print(f'{out.relative_to(SITE.parent)}: {len(out.read_text().split())} words')
