Number.prototype.twodigits = function() {
  if (this < 10) return '0' + this;
  return this;
}
function correctDate(date) {
  if (typeof date === 'string' && date.charAt(date.length - 1) == 'Z') {
    return date.substr(0, date.length - 1) + "+08:00";
  }
  return date;
}
function timeConverter(date){
  var a = new Date(correctDate(date));
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours().twodigits();
  var min = a.getMinutes().twodigits();
  //var sec = a.getSeconds();
  var time = date+' '+month+' '+year+' '+hour+':'+min;
  return time;
}
function timeConverter_prog(date){
  var a = new Date(correctDate(date));
  var hour = a.getHours().twodigits();
  var min = a.getMinutes().twodigits();
  var time = hour+':'+min;
  return time;
}
_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};
