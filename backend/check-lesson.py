import sys
import json

data = json.load(sys.stdin)
lesson = data['data']['modules'][0]['lessons'][0]

print(f"ID: {lesson['id']}")
print(f"Title: {lesson['title']}")
print(f"Type: {lesson['type']}")
print(f"Order: {lesson['order']}")
print(f"isFree: {lesson.get('isFree', 'N/A')}")
print(f"Has content: {bool(lesson.get('content'))}")
print(f"Available fields: {list(lesson.keys())}")
if lesson.get('content'):
    print(f"Content length: {len(lesson['content'])} chars")
    print(f"Content preview: {lesson['content'][:200]}...")
