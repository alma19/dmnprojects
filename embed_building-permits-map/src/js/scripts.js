/* global mapboxgl */
import $ from 'jquery';
import pym from 'pym.js';

const numeral = require('numeral');

const pymChild = new pym.Child();

const z = ($(window).width() > 400) ? 7.4 : 6.2;

const map = new mapboxgl.Map({
  container: 'map',
  // center: [-97.1, 32.4],
  center: [-96.8, 32.9],
  zoom: z,
  style: 'https://maps.dallasnews.com/styles.json',
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

const mapcolors = [
    [0, '#329ce8'],
    [100, '#8554bf'],
    [500, '#fec44f'],
    [1000, '#ff8f24'],
    [5000, '#e34e36'],
];

map.on('load', () => {
  map.addSource('cityPermits', {
    type: 'geojson',
    data: 'data/city-permits.geojson',
    cluster: false,
  });

  map.addLayer({
    id: 'All',
    source: 'cityPermits',
    type: 'fill',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'fill-color': {
        property: 'Total',
        type: 'interval',
        stops: mapcolors,
      },
      'fill-opacity': 0.5,
      'fill-outline-color': '#212121',
    },
  });

  map.addLayer({
    id: 'Single Family',
    source: 'cityPermits',
    type: 'fill',
    layout: {
      visibility: 'none',
    },
    paint: {
      'fill-color': {
        property: 'Singlefamily',
        type: 'interval',
        stops: mapcolors,
      },
      'fill-opacity': 0.5,
      'fill-outline-color': '#212121',
    },
  });

  map.addLayer({
    id: 'Multi-family',
    source: 'cityPermits',
    type: 'fill',
    layout: {
      visibility: 'none',
    },
    paint: {
      'fill-color': {
        property: 'Multifamily',
        type: 'interval',
        stops: mapcolors,
      },
      'fill-opacity': 0.5,
      'fill-outline-color': '#212121',
    },
  });

}); // map loaded

// toggle

const toggleableLayerIds = ['All', 'Single Family', 'Multi-family'];

function showLayer(layerID) {
  const layerNames = ['Single Family', 'Multi-family', 'All'];
  layerNames.forEach(layer => map.setLayoutProperty(layer, 'visibility', 'none'));
  map.setLayoutProperty(layerID, 'visibility', 'visible')
}

for (let i = 0; i < toggleableLayerIds.length; i++) {
  const id = toggleableLayerIds[i];


  const link = document.createElement('button');
  link.classList.add('int-btn');
  link.href = '#';
  link.textContent = id;

  link.onclick = function (e) {
    // this.textContent = id
    const clickedLayer = this.textContent;
      e.preventDefault();
    e.stopPropagation();

  showLayer(id);

    $(this).addClass('active');
    $('#menu button').not(this).removeClass('active');

  };

  const layers = document.getElementById('menu');
  layers.appendChild(link);

  // create a popup
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  $('#menu button:first-of-type').addClass('active');


  map.on('mousemove', toggleableLayerIds[i], (e) => {
    map.getCanvas().style.cursor = 'pointer';

    const x = e.features[0];
    const total = numeral(x.properties.Total).format('0,0');
    const single = numeral(x.properties.Singlefamily).format('0,0');
    const multi = numeral(x.properties.Multifamily).format('0,0');

    const popupText = [
      `<span class="city">${x.properties.city} </span><br> <strong>Total permits: </strong> ${total} <br><strong>Single family permits: </strong> ${single} <br><strong>Multi-family permits: </strong> ${multi}`,

      `<span class="city">${x.properties.city} </span><br><strong>Single family permits: </strong> ${single}`,

      `<span class="city">${x.properties.city} </span> <br><strong>Multi-family permits: </strong> ${multi}`,
    ];

    popup.setLngLat(e.lngLat)
      .setHTML(popupText[i])
      .addTo(map);
  }); // mousemove

  map.on('mouseleave', toggleableLayerIds[i], () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
} // for loop

// LEGEND
const legend = document.getElementById('legend');
const names = ['0-99', '100-499', '500-999', '1,000-4,999', '5,000+'];
for (let i = 0; i < mapcolors.length; i += 1) {
  const name = names[i];
  const color = mapcolors[i][1];

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

// Call this every time you need to resize the iframe, after your
// graphic is drawn, etc.
pymChild.sendHeight();
