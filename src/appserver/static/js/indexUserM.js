$(document).ready(function(){
  //Page load function
  $(window).on('load',function() {
    //Preloader
    $('#status').delay(500).fadeOut('slow');
    $('#preloader').delay(1000).fadeOut('slow');
    //Animate CSS
    $('.card').addClass('animated zoomIn');
  });

  $('[data-toggle="tooltip"]').tooltip();

  //Resizing Main-content
  var height  = $(window).height();
  var containerHeight = height-126;
  $('.main-content').css('min-height',containerHeight);

  // Last Refresh time
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();

  var output = 
      ((''+month).length<2 ? '0' : '') + month + '-' +
      ((''+day).length<2 ? '0' : '') + day + '-' +
      d.getFullYear() + ' ' +
      ((''+hour).length<2 ? '0' :'') + hour + ':' +
      ((''+minute).length<2 ? '0' :'') + minute + ':' +
      ((''+second).length<2 ? '0' :'') + second;

  $('.currentDateTime').html(output);
});
  

