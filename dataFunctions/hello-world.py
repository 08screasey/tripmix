import json
from selenium import webdriver
from bs4 import BeautifulSoup

data = {}
with open('drugurls.json', 'r') as json_file:
    data=json.load(json_file)

def findText(category, block, appendingObject):
    
    if block is not None:
        effectsList = block.ul.contents
        for li in effectsList:
            if li.ul and li.ul.li:
                appendingObject['interactions'].append({'name':li.a.text, 'category':category, 'details':li.ul.li.text})
            else:
                appendingObject['interactions'].append({'name':li.a.text, 'category':category, 'details':"No additional Information"})
    return

driver = webdriver.Chrome()
drugArray = {'drugs':[]}
for i,urlstring in enumerate(data['urls']):
    driver.get(urlstring)
    content = driver.page_source
    soup = BeautifulSoup(content)
    drugData = {'aliases':[],'interactions':[], 'dose':[], 'duration':[], 'labels':[], 'effects':[], 'summary':"", 'url':urlstring}
    drugData['name'] = soup.find('h1', attrs={'id':'drug'}).text
    for div in soup.find_all('div', attrs={'id':'effects'}):
        p = div.find_all('p')
        if 'Aliases' in p[0].text:
            for aliasName in p[1].contents:
                if isinstance(aliasName,str):
                    drugData['aliases'].append(aliasName)
        if 'Effects' in p[0].text:
            for aliasName in p[1].contents:
                if isinstance(aliasName,str):
                    drugData['effects'].append(aliasName)
    findText('dangerous', soup.find('div', attrs={'class':'bs-callout-dangerous'}), drugData)
    findText('caution', soup.find('div', attrs={'class':'bs-callout-caution'}), drugData)
    findText('unsafe', soup.find('div', attrs={'class':'bs-callout-unsafe'}), drugData)
    findText('lowinc', soup.find('div', attrs={'class':'bs-callout-lowinc'}), drugData)
    findText('lowdec', soup.find('div', attrs={'class':'bs-callout-lowdec'}), drugData)
    findText('lowno', soup.find('div', attrs={'class':'bs-callout-lowno'}), drugData)
    if soup.find('div', attrs={'class':'flexDose'}) is not None:
        for table in soup.find('div', attrs={'class':'flexDose'}).find_all('table', attrs={'class':'table'}):
            table_rows = table.find_all('tr')
            header = table_rows[0].text
            doseObj = {'method':header}
            for row in table_rows[1:]:
                tds = row.find_all('td')
                doseObj[tds[0].text] = tds[1].text
            drugData['dose'].append(doseObj)
    if soup.find('div', attrs={'class':'flexDuration'}) is not None:
        for table in soup.find('div', attrs={'class':'flexDuration'}).find_all('table', attrs={'class':'table'}):
            table_rows = table.find_all('tr')
            header = table_rows[0].text
            durationObj={'method':header}
            for row in table_rows[1:]:
                tds = row.find_all('td')
                durationObj[tds[0].text] = tds[1].text
            drugData['duration'].append(durationObj)
    mainText = soup.find('div', attrs={'class':'mainText'})
    summary = mainText.find('p', attrs={'class':'layoutPosition'})
    if summary is not None:
        drugData['summary'] = summary.text
    for header in mainText.find_all('div', attrs={'class':'bs-callout'}):
        drugData['labels'].append(header.h4.text)
    drugArray['drugs'].append(drugData)

names = []

for drug in drugArray['drugs']:
    names.append(drug['name'])
data['names'] = names

with open('drugdata.json', 'x', encoding="utf-8") as json_data_file:
    json.dump(drugArray, json_data_file, ensure_ascii=False, indent=4)