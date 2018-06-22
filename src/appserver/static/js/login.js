$(document).ready(function(){

	//Page load function
	$(window).load(function() {
	  //Preloader
		$('#status').delay(500).fadeOut('slow');
		$('#preloader').delay(1000).fadeOut('slow');
		//Animate CSS
		$('#login-panel').addClass('animated zoomIn');
	});

	//Dynamic Height for the Login-container
	var height 	= $(window).height();
	var width 	=	window.innerWidth;
	var loginHeight = ((height/2)-220);

	// Margin-top for Mobile and web
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	if (!isMobile) {
    $('.login-container').css('margin-top', loginHeight);
  } else {
    $('.login-container').css('margin-top', 40);
  }

	// PerfectScroll Initialization
	$('.login-bg').perfectScrollbar();

	//Role Based Login
	$('.errorDiv').hide();
	$('#loginbtn').click(function(){
		if ($('#EmailID').val() == '') {
			// alert('blank');
			$('#EmailID').css('border-bottom','1px solid #ed1c24');
			$('.errorDiv').show();
			setTimeout(function(){
				$('.errorDiv').hide();
				$('#EmailID').css('border-bottom','none');
			},2500);
		}
		else if (($("#EmailID").val()) ==  ('business@cwc.com')) {
			window.location.href = "business-dashboard.html";
		}
		else if (($("#EmailID").val()) ==  ('operations@cwc.com')) {
			window.location.href = "operation-dashboard.html";
		}
		else if (($("#EmailID").val()) ==  ('monitoring@cwc.com')) {
			window.location.href = "monitoring-dashboard.html";
		}
		else if (($("#EmailID").val()) ==  ('admin@cwc.com')) {
			window.location.href = "user-management-ad.html";
		}
		else{
			$(".errorDiv").text('Please enter valid Email ID.');
			$('#EmailID').css('border-bottom','1px solid #ed1c24');
			$('.errorDiv').show();
			setTimeout(function(){
				$('.errorDiv').hide();
				$('#EmailID').css('border-bottom','none');
			},2500);
		}
	});

	// Forgot Password
	$('.forgot-password').click(function(){
		$('.cwc-form').hide();
		$('.forgot-passwod-form').show();
	});	

	$('.back-to-login').click(function(){
		$('.cwc-form').show();
		$('.forgot-passwod-form').hide();
	});	

	$('.btn-reset').click(function(){
		if ($('#reset-link').val() == '') {
			// alert('blank');
			$('#reset-link').css('border-bottom','1px solid #ed1c24');
			$('.errorDiv').show();
			setTimeout(function(){
				$('.errorDiv').hide();
				$('#reset-link').css('border-bottom','none');
			},2500);
		}
		else{
			$('.success-msg').show();
		}
	});
});