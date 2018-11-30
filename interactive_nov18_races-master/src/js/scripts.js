import $ from 'jquery';
import handlebars from 'handlebars';


import './furniture';

const HandlebarsIntl = require('handlebars-intl');

$(document).ready(() => {
  HandlebarsIntl.registerWith(handlebars);

  const cardSource = document.getElementById('race-template').innerHTML;
  const cardTemplate = handlebars.compile(cardSource);


  $('#nav').change(function (){
    window.location = $(this).val();
  });

  $(window).scroll(() => {

    const windowTop = $(window).scrollTop();
    const windowBottom = windowTop + $(window).height();

    $.each($('.race'), function () {
      if ($(this).offset().top <= windowBottom) {
        $(this).find('.candidate').addClass('candidate--animated');
        $(this).find('.race-name h5').addClass('animate');
      }
    });
  });

  function drawCards(data) {
    $.each(data, (k, v) => {
      const cardHTML = cardTemplate(v);
      $('.races').append(cardHTML);
    });
  }
  $.ajax({
    url: 'https://interactives.dallasnews.com/data-store/2018/2018-08-races-to-watch.json',
    cache: false,
    success: drawCards,
    dataType: 'json',
  });
});
