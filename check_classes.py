import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all text elements or classes
classes = set()
for m in re.finditer(r'class=["\']([^"\']+)["\']', html):
    for c in m.group(1).split():
        classes.add(c)

print(f"Total unique classes: {len(classes)}")
text_like = [c for c in sorted(classes) if any(term in c for term in ['text', 'desc', 'body', 'lead', 'abstract', 'quote', 'note', 'content', 'card', 'box', 'item', 'info', 'summary', 'detail', 'list', 'analysis', 'expl', 'intro', 'para', 'column'])]
print("Text-related classes:")
for t in text_like:
    print(" -", t)
