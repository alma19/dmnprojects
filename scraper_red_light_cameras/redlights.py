import re
import csv
red_lights = []
red_lights_progress = {
    'county': None,
    'city': None,
    'primary': None,
    'cross': None,
    'street': None,
    'adt_primary': None,
    'adt_cross': None,
    'start_date': None,
    'end_date': None,
    'citations': None
}

txt_files = ['txt/dallas2017_formatted.txt', 'txt/fort-worth.txt', 'txt/garland.txt', 'txt/irving.txt', 'txt/plano.txt']


for i in range(len(txt_files)):
    text = open(txt_files[i])
    for line in text:
        county = re.search(r'COUNTY+\s+([A-Za-z0-9]+.+) -', line)
        if county is not None:
            red_lights_progress['county'] = county.group(1)

        city = re.search(r'CITY+\s+([A-Za-z0-9]+.+) -', line)
        if city is not None:
            red_lights_progress['city'] = city.group(1)

        primary = re.search(r'PRIMARY +STREET \s+([A-Za-z0-9]+.+) -', line)
        if primary is not None:
            red_lights_progress['primary'] = primary.group(1)


        cross = re.search(r'CROSS +STREET\s+([A-Za-z0-9]+.+) -', line)
        if cross is not None:
            red_lights_progress['cross'] = cross.group(1)
        street = str(red_lights_progress['primary']) + ' & ' + str(red_lights_progress['cross'])
        red_lights_progress['street'] = street

        adt_primary = re.search(r'([A-Za-z0-9]+) - Enter the most current Annual Daily Traffic count \(ADT\) for the primary', line)
        if adt_primary is not None:
            red_lights_progress['adt_primary'] = adt_primary.group(1)

        adt_cross = re.search(r'([A-Za-z0-9]+) - Enter the most current Annual Daily Traffic count \(ADT\) for the cross', line)
        if adt_cross is not None:
            red_lights_progress['adt_cross'] = adt_cross.group(1)

        start_date = re.search(r'DATE +OF +CAMERA\s+(.+) - Enter', line)
        if start_date is not None:
            red_lights_progress['start_date'] = start_date.group(1)


        end_date = re.search(r'DATE +OF +CAMERA\s+(.+) - If',line)
        if end_date is not None:
            red_lights_progress['end_date'] = end_date.group(1)


        citations = re.search(r'ACTIVATION\) +([,\d]+)', line)
        if citations is not None:
            red_lights_progress['citations'] = citations.group(1)


        if line.startswith('INTERSECTION DEMOGRAPHICS'):
            red_lights.append(red_lights_progress)
            red_lights_progress = {
                'county': None,
                'city': None,
                'primary': None,
                'cross': None,
                'street': None,
                'adt_primary': None,
                'adt_cross': None,
                'start_date': None,
                'end_date': None,
                'citations': None
            }




with open('redlights.csv', 'w') as fp:
    writer = csv.DictWriter(fp, fieldnames = red_lights_progress.keys())
    writer.writeheader()
    writer.writerows(red_lights)
