import json
data = {}
names = []
with open('./my-gatsby-project/src/data/drugdata.json', 'r', encoding="utf-8") as json_file:
    data = json.load(json_file)
for drug in data['drugs']:
    names.append(drug['name'])
data['names'] = names

with open('./drugdata.json', 'x', encoding="utf-8") as new_file:
    json.dump(data, new_file, ensure_ascii=False, indent=4)
