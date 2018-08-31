import $ from 'jquery';
import pym from 'pym.js';
import moment from 'moment-timezone';

const pymChild = new pym.Child();
// const moment = require('moment-timezone');

moment.tz('America/Chicago').format();

$(document).ready(() => {
  // Set the date we're counting down to
  const countDownDate = moment.tz('2018-07-26 23:59:59', 'America/Chicago');

  // Update the count down every 1 second
  const x = setInterval(() => {
    function checkTime(i) {
      if (i < 10) {
        i = `0${i}`;
      }
      return i;
    }

      // Get todays date and time
    const now = new Date().getTime();

      // Find the distance between now an the count down date
    const countdown = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
    const days = checkTime(Math.floor(countdown / (1000 * 60 * 60 * 24)));
    // const hours = checkTime(Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    // const minutes = checkTime(Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60)));
    // const seconds = checkTime(Math.floor((countdown % (1000 * 60)) / 1000));


    $('.days').text(days);
    // $('.hours').text(hours);
    // $('.minutes').text(minutes);
    // $('.seconds').text(seconds);

    pymChild.sendHeight();

    // $('#clock').text(`${days}d ${hours}h ${minutes}m ${seconds} s`);

    // when countdown is over
    if (countdown < 0) {
      const countup = now - countDownDate;
      const updays = checkTime(Math.floor(countup / (1000 * 60 * 60 * 24)));
      const uphours = checkTime(Math.floor((countup % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const upminutes = checkTime(Math.floor((countup % (1000 * 60 * 60)) / (1000 * 60)));
      const upseconds = checkTime(Math.floor((countup % (1000 * 60)) / 1000));
      $('#label').text('Days Since Reunification Deadline');
      $('.days').text(updays);
      $('.hours').text(uphours);
      $('.minutes').text(upminutes);
      $('.seconds').text(upseconds);

      // $('#clock').text(`${updays}d ${uphours}h ${upminutes}m ${upseconds} s`);
    }
  }, 1000);
});

// Call this every time you need to resize the iframe, after your
// graphic is drawn, etc.
pymChild.sendHeight();
