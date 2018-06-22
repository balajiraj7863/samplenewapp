// Preloader JS
$(document).ready(function(){
  $('#status').delay(500).fadeOut('slow');
  $('#preloader').delay(1000).fadeOut('slow');
  var height = window.innerHeight;
  var half_height = height-130;
  var svgHeight = height-195;
  $('.tab-pane').css('height', half_height);
  // $('.tab-pane svg-container').css('height', half_height);
  // $('.tab-pane img').css('height', half_height);
  $('object').css('height', svgHeight);
  $('svg').css('height', svgHeight);
});