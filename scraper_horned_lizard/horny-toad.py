import requests
import csv
import json
import time
import math
mydata = []

# get total count from species count api
species_response = requests.get('https://api.inaturalist.org/v1/observations/species_counts?verifiable=any&captive=any&project_id=411&taxon_id=73905&locale=en-US')
species_data = json.loads(species_response.text)

# get total count of results and then divide by results per page > round up
total_count = species_data["results"][0]['count']
amount = math.ceil(total_count / 30)

 # iterate through page numbers
base_url_1 = 'https://api.inaturalist.org/v1/observations?verifiable=any&order_by=observations.id&order=desc&page='
base_url_2 = '&captive=any&project_id=411&taxon_id=73905&locale=en-US&per_page=30'

for i in range(1, amount + 1):
    results_url = base_url_1 + str(i) + base_url_2
    time.sleep(.300)
    results_response = requests.get(str(results_url))
    results_data = json.loads(results_response.text)
    for result in results_data['results']:
        if result['geojson'] is None:
            continue
        if result['observed_on_details'] is None:
            continue

        # dictionary to hold results
        resultsDict = {}
        resultsDict['observed'] = result['observed_on_details']['date']
        resultsDict['year'] = result['observed_on_details']['year']
        resultsDict['month'] = result['observed_on_details']['month']
        resultsDict['day'] = result['observed_on_details']['day']
        resultsDict['place'] = result['place_guess']
        resultsDict['lng'] = result['geojson']['coordinates'][0]
        resultsDict['lat'] = result['geojson']['coordinates'][1]
        mydata.append(resultsDict)


#write to csv
horned_toads_csv_file = 'hornedtoads.csv'

with open(horned_toads_csv_file, 'w+', newline='') as fp:
    writer = csv.writer(fp, delimiter=',')
    writer.writerow(['observed', 'year', 'month', 'day', 'place','lat', 'lng'])
    for item in mydata:
        writer.writerow([item['observed'], item['year'], item['month'], item['day'], item['place'], item['lat'], item['lng']])




# prettify the json!
# print(json.dumps(data, indent=4))
