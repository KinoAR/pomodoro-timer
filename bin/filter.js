'use strict';

Vue.filter('time', function (value) {
  var min = Math.floor(value / 60);
  var seconds = value % 60;
  return (min < 10 ? '0' + min : min) + ':' + (seconds < 10 ? '0' + seconds : seconds);
});