import re
import json
with open('devpack-main.js', encoding='utf-8') as f:
    data = f.read()
match = re.search(r"JSON.parse\('(\{.+?\})'\)", data)
if not match:
    raise SystemExit('not found')
raw = match.group(1)
raw = bytes(raw, 'utf-8').decode('unicode_escape')
obj = json.loads(raw)
print(len(obj))
print(list(obj.keys())[:50])
