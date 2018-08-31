import $ from 'jquery';
import pym from 'pym.js';
import List from 'list.js';
import Sideboard from 'sideboard';

const pymChild = new pym.Child();
const results = $(window).width() < 550 ? 5 : 20;


const definitions = {
  b_on: '<span class="b">B-On:</span> Sale of beer for on premises consumption authorized.',
  b_off: '<span class="b">B-Off:</span> Sale of beer for off-premises consumption authorized.',
  w_on: '<span class="b">W-On:</span> Sale of wine for on-premises consumption authorized.',
  w_off: '<span class="b">W-Off:</span> Sale of wine for off-premises consumption authorized.',
  ds_off: '<span class="b">DS-Off:</span> Sale of distilled spirits for off-premises consumption authorized.',
  mb: '<span class="b">MB:</span> Sale of mixed beverages authorized.  Not used to describe areas where sale of mixed beverages only authorized in restaurants.',
  rm: '<span class="b">RM:</span> Sale of mixed beverages authorized but only in restaurants.'
}


window.sideboard = new Sideboard({
  dataSource: {
    type: 'csv',
    url: 'data/wet.csv',
  },
  el: '#wet-table',
  resultsPerPage: results,
  filters: [
    { sourceField: 'county_city_precinct', type: 'searchBox' },
  ],
  columns: [
    { sourceField: 'county_city_precinct', publicLabel: 'Area' },
    { sourceField: 'b_on', publicLabel: 'B-On', sortable: 'false' },
    { sourceField: 'b_off', publicLabel: 'B-Off', sortable: 'false' },
    { sourceField: 'w_on', publicLabel: 'W-On', sortable: 'false' },
    { sourceField: 'w_off', publicLabel: 'W-Off', sortable: 'false' },
    { sourceField: 'ds_off', publicLabel: 'DS-Off', sortable: 'false' },
    { sourceField: 'mb', publicLabel: 'MB', sortable: 'false' },
    { sourceField: 'rm', publicLabel: 'RM', sortable: 'false' },
  ],
  onInitialLoad: () => {
    pymChild.sendHeight();
    writeDefintions();
  },
});




window.sideboard = new Sideboard({
  dataSource: {
    type: 'csv',
    url: 'data/pw.csv',
  },
  el: '#pw-table',
  resultsPerPage: results,
  filters: [
    { sourceField: 'county_city_precinct', type: 'searchBox' },
  ],
  columns: [
    { sourceField: 'county_city_precinct', publicLabel: 'Area' },
    { sourceField: 'b_on', publicLabel: 'B-On', sortable: 'false' },
    { sourceField: 'b_off', publicLabel: 'B-Off', sortable: 'false' },
    { sourceField: 'w_on', publicLabel: 'W-On', sortable: 'false' },
    { sourceField: 'w_off', publicLabel: 'W-Off', sortable: 'false' },
    { sourceField: 'ds_off', publicLabel: 'DS-Off', sortable: 'false' },
    { sourceField: 'mb', publicLabel: 'MB', sortable: 'false' },
    { sourceField: 'rm', publicLabel: 'RM', sortable: 'false' },
  ],
  onInitialLoad: () => {
    pymChild.sendHeight();
    writeDefintions();
  },
});




$('#wet-table').click(() => pymChild.sendHeight());
$('#pw-table').click(() => pymChild.sendHeight());



function writeDefintions() {
  $('th').click(function () {
    console.log('click');
    const dataAttr = $(this).data('column');
    const target = $(this).closest('.bev-table').siblings('.definitions').attr('id');
    $(`#${target}`).html(definitions[dataAttr]);
  });
}

pymChild.sendHeight();
