Vue.filter('time', (value) => {
  let min = Math.floor(value / 60);
  let seconds = value % 60;
  return `${ (min < 10) ? '0' + min : min }:${ (seconds < 10) ? '0' + seconds : seconds }`;
});