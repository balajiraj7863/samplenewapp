
$('#daily-tab').click(function () {
	$('#hourly').hide();
	$('#daily').show();
	$('#date').show();
	changeTab('traffic/daily');
});

$('#hourly-tab').click(function () {
	$('#daily').hide();
	$('#hourly').show();
	$('#date').hide();
	changeTab('traffic/hourly');

});

$("#dobFrom").datepicker({
	//startDate: true
	startDate: new Date(),
	autoclose: true,
	todayHighlight: true
});

$("#dobTo").datepicker({
	//startDate: true
	startDate: new Date(),
	autoclose: true,
	todayHighlight: true
});

// Last updated time

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

$('.currrentDateTime').html(output);

function refreshHourly() {
	updateTrafficChart('activeSessionChart', sessionsData, new Date())
	updateTrafficChart('voiceChart', voiceData, new Date());
	updateTrafficChart('smsChart', smsData, new Date());
}

var refreshHandle;

function changeTab(tabName) {
	if (tabName == 'traffic/hourly') {
		createTrafficChart('activeSessionChart', '', sessionsData, new Date())
		createTrafficChart('voiceChart', '', voiceData, new Date());
		createTrafficChart('smsChart', '', smsData, new Date());
		refreshHandle = setInterval(refreshHourly, 1000);
	} else if (tabName == 'traffic/daily') {
		clearInterval(refreshHandle);
		createTrafficChart('daily-gy', '', sessionsData);
		createTrafficChart('daily-voice', '', voiceData);
		createTrafficChart('daily-sms', '', smsData);
	}
}

changeTab('traffic/hourly');
