/* global mapboxgl */

import $ from 'jquery';
import 'hammerjs';

const csv2geojson = require('csv2geojson');

$(document).ready(() => {

  const profileWidth = $('.profile-slide').width();
  let slideCounter = 1;
  const totalSlides = 5;
  const initialPos = parseInt($('#slide-container').css('left'), 10);
  let currentPos = initialPos;

  function changeSlide(direction) {

    let movement = 0;
    $('#slide-previous').removeClass('no-show');
    $('#slide-next').removeClass('no-show');
    if (direction === 'next' && slideCounter < totalSlides) {
      movement = currentPos - (profileWidth + 24);
      $('#slide-container').css('left', movement);
      slideCounter += 1;
      if (slideCounter === totalSlides) {
        $('#slide-next').addClass('no-show');
      }
    } else if (direction === 'previous' && slideCounter > 1) {
      movement = currentPos + (profileWidth + 24);
      $('#slide-container').css('left', movement);
      slideCounter -= 1;
      if (slideCounter === 1) {
        $('#slide-previous').addClass('no-show');
      }
    }

    $('.lizard-profile').removeClass('active');
    $('.lizard-profile').eq(slideCounter - 1).addClass('active');
    currentPos = movement;
  }

  $('#slide-next').on('click', () => {
    changeSlide('next');
  });

  $('#slide-previous').on('click', () => {
    changeSlide('previous');
  });

  const profiles = document.getElementById('lizard-profiles');
  const hammerSwipe = new Hammer(profiles);

  hammerSwipe.on('swipeleft', () => {
    if (slideCounter < 5) {
      changeSlide('next');
    }
  });

  hammerSwipe.on('swiperight', () => {
    if (slideCounter > 1) {
      changeSlide('previous');
    }
  });


  const z = ($(window).width() > 400) ? 4.5 : 3.5;
  const c = [-99.9, 31.9];

  const map = new mapboxgl.Map({
    container: 'map',
    center: c,
    zoom: z,
    style: 'https://maps.dallasnews.com/styles.json',
  });

  map.scrollZoom.disable();
  map.addControl(new mapboxgl.NavigationControl());

  function drawMap(data) {
    map.addLayer({
      id: 'lizards',
      type: 'circle',
      source: {
        type: 'geojson',
        data,
      },
      layout: {
        visibility: 'visible',
      },
      paint: {
        'circle-opacity': 0.5,
        'circle-color': '#4d1979',
        'circle-radius': {
          stops: [[4.5, 3.5], [6, 4]],
        },
      },
    });

    map.on('mouseenter', 'lizards', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'lizards', () => {
      map.getCanvas().style.cursor = '';
    });

    // popup and zoom
    map.on('click', 'lizards', (e) => {
      const y = e.features[0].properties.year;
      const m = e.features[0].properties.month;
      const d = e.features[0].properties.day;
      const place = e.features[0].properties.place;

      const text = `<h6><strong>${place}</strong></h6><strong>Observed:</strong> ${m}-${d}-${y} <br>`;

      const popup = new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(text)
        .addTo(map);

      map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 6 });

      popup.on('close', () => {
        map.flyTo({ center: c, zoom: z });
      });
    });
  }

  function makeGeoJSON(csvData) {
    csv2geojson.csv2geojson(csvData, {
      latfield: 'lat',
      lonfield: 'lng',
      year: 'year',
      delimiter: ',',
    }, (err, data) => {
      drawMap(data);
    });
  }

  function getData() {
    $.ajax({
      type: 'GET',
      url: 'https://interactives.dallasnews.com/data-store/2018/hornedtoads.csv',
      dataType: 'text',
      success: makeGeoJSON,
    });
  }

  map.on('load', () => getData());
});
