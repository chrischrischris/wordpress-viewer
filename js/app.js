require.config({
  paths : {
    "jquery" : "../bower_components/jquery/dist/jquery",
    "can": "../bower_components/CanJS/amd-dev/can"
  }
});
require([
    'jquery',
    'can/view',
    'can/route',
    '../../js/models/article',
    '../components/wp-viewer/wp-viewer'
], function($, can, route, Article) {
  'use strict';

  $(function () {
     // Render app
     $('#wp-viewer').html(can.stache('<wp-viewer />'));
  });
});
