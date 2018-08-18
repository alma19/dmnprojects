import $ from 'jquery';
import pym from 'pym.js';

const csv2geojson = require('csv2geojson');
const numeral = require('numeral');

const pymChild = new pym.Child();

const z = ($(window).width() > 400) ? 8.3 : 7;
const c = [-97, 32.9];

const map = new mapboxgl.Map({
  container: 'map',
  center: c,
  zoom: z,
  style: 'https://maps.dallasnews.com/styles.json',
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());


$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'data/results_clean.csv',
    dataType: 'text',
    success: function (csvData) { makeGeoJSON(csvData); }
  });
});

function makeGeoJSON(csvData) {
  csv2geojson.csv2geojson(csvData, {
    latfield: 'Latitude',
    lonfield: 'Longitude'
  }, (err, data) => {
    map.on('load', () => {
      let filter = ['!=', ['string', ['get', 'city']], 'placeholder'];
      console.log(data);
      map.addLayer({
        id: 'redlights',
        type: 'circle',
        source: {
          type: 'geojson',
          data: data
        },
        layout: {
          visibility: 'visible',
        },
        paint: {
          'circle-color': [
            'step',
            ['to-number', ['get', 'adt_street']],
            'black',
            0, '#ffc100',
            25000, '#ff9a00',
            50000, '#ff7400',
            75000, '#ff4d00',
            100000, '#ff0000'
          ],
          'circle-radius': {
            stops: [[7, 3], [9, 5]],
          },
        },
      });

      $('select').change((e) => {
        const city = e.target.value;
        if (city === 'all') {
          filter = ['!=', ['string', ['get', 'city']], 'placeholder'];
        } else {
          filter = ['match', ['get', 'city'], [city], true, false];
        }

        map.setFilter('redlights', ['all', filter]);
      });
    });
  });
}

map.on('mousemove', 'redlights', () => {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'redlights', () => {
  map.getCanvas().style.cursor = '';
})

map.on('click', 'redlights', (e) => {
  const street = e.features[0].properties.street;
  const city = e.features[0].properties.city;
  const county = e.features[0].properties.county;
  const citations = numeral(e.features[0].properties.citations).format('0,0');
  const startDate = e.features[0].properties.start_date;
  const startDate2 = e.features[0].properties.start_date_2;
  const adtPrimary = e.features[0].properties.adt_primary;
  const adtCross = e.features[0].properties.adt_cross;
  let adtStreet = e.features[0].properties.adt_street;

  if (adtStreet === 'No traffic data') {
    adtStreet = 'No traffic data';
  } else {
    adtStreet = numeral(e.features[0].properties.adt_street).format('0,0');
  }



  const text = `<div class="popup">
    <p class="city">${city}</p>
    <p><b>${street}</b></p>
    <p><b>Activation date: </b>${startDate}</p>
    <p><b>Post-activation citations issued:</b> ${citations}</p>
    <p><b>Annual daily traffic:</b> ${adtStreet}</p>
    </div>`;

  const popup = new mapboxgl.Popup()
  .setLngLat(e.features[0].geometry.coordinates)
  .setHTML(text)
  .addTo(map);

  map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 13 });

  popup.on('close', () => {
    map.flyTo({ center: c, zoom: z });
  });
});

// creating legend
const legend = document.getElementById('legend-colors');
const names = ['0-25,000', '25,001-50,000', '51,000-75,000', '75,001-100,000', '100,001+', 'No data'];
const colors = ['#ffc100', '#ff9a00', '#ff7400', '#ff4d00', '#ff0000', '#000'];
for (let i = 0; i < colors.length; i += 1) {
  const name = names[i];
  const color = colors[i];

  const item = document.createElement('div');
  const key = document.createElement('span');

  key.className = 'legend-key';
  key.style.backgroundColor = color;


  const value = document.createElement('span');
  value.innerHTML = name;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
}

pymChild.sendHeight();
