
module.exports = function (minutes, showTrendDown) {
  let str = '';
  if (minutes < 0) {
    str += '<i class="material-icons">trending_up</i>';
    minutes *= -1;
  } else if (showTrendDown) {
    str += '<i class="material-icons">trending_down</i>';      
  }
  if (minutes < 60)
    str += minutes + 'm';
  else if (minutes < 8 * 60) {
    var hours = Math.floor(minutes / 60);
    var minutes = minutes % 60;
    str += hours + 'h';
    if (minutes)
      str += '&nbsp;' + minutes + 'm';
  } else {
    var days = Math.floor(minutes / 60 / 8);
    var hours = Math.floor((minutes % (60 * 8)) / 60);
    var minutes = minutes % 60;
    str += days + 'd';
    if (hours)
      str += '&nbsp;' + hours + 'h';
    if (minutes)
      str += '&nbsp;' + minutes + 'm';
  }
  return { __html: str };
}