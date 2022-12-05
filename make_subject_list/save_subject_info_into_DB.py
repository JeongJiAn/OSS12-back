import requests
import json

headers = {'Content-Type': 'application/json; chearset=utf-8'}

subjects = [];
with open('subjects.json', 'r', encoding='UTF-8') as f:
    json_data = json.load(f)
    subjects = json_data['subjects']

for subject in subjects:
    res = requests.post("http://107.21.124.128:8080/board/subject/info", data=json.dumps(subject, ensure_ascii=False).encode('utf-8').decode('unicode-escape'), headers=headers)
    print(str(res.status_code) + " | " + res.text)