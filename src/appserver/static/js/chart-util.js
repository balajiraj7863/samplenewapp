var fixedIncidentStatus = ["QUEUED", "CLOSED", "INPROG", "RESOLVED", "NEW", "PENDING", "DELAYED", "ESCALATED"];
var fixedOrderStatus = ["COMPLETED", "CURRENT", "CANCELED", "AVAILABLE", "HELD", "PENDING", "DEAD"];

function animateCounter(id, value, unitId) {
	$('#' + id + '.counter').each(function () {
		var $this = $(this),
			countTo = Number(parseFloat(value).toFixed(2)).toLocaleString('en');
		$({
			countNum: $this.text()
		}).animate({
			countNum: countTo
		}, {
			duration: 3000,
			easing: 'linear',
			step: function () {
				$this.text(Math.floor(this.countNum));
			},
			complete: function () {
				$this.text(this.countNum);
			}
		});
	});
	var matchData = value.match(/\d+(?:\.\d+)?/);
	$('#' + id).text(matchData[0]);
	if (value.substr(matchData[0].length + 1))
		$('#' + unitId).text(value.substr(matchData[0].length + 1));
	else
		$('#' + unitId).text(value.substr(matchData[0].length));
}

/*
 * Method to set data to pie chart
 * Param:
 * category: xaxis
 * totval: value
 */
function setPieData(chartData, chartObj, category, totval) {
	var dataArr = getPieChart(chartData, category, totval);
	chartObj.series[0].setData(dataArr);
}

/*
 * Method to get pie chart data
 * Param:
 * category: xaxis
 * totval: value
 */
function getPieChart(chartData, category, totval) {
	var dataArr = [];
	if (undefined !== chartData && null !== chartData) {
		for (var i = 0; i < chartData.length; i++) {
			if (null !== chartData[i][category]) {
				dataArr[i] = [];
				dataArr[i].push(chartData[i][category].toUpperCase());
				dataArr[i].push(Number(parseFloat(chartData[i][totval])));
			}
		}
	}
	return dataArr;
}

function revenueChartTooltip() {
	var sysDate = new Date();
	var currentDate = new Date(this.x);
	var currentDateDisplay = (currentDate.getMonth() + 1) + "-" +
		currentDate.getDate() + "-" + sysDate.getFullYear();
	var lastWeek = new Date(sysDate.getFullYear(), currentDate.getMonth(),
		currentDate.getDate() - 7);
	var lastWeekDisplay = (lastWeek.getMonth() + 1) + "-" + lastWeek.getDate() +
		"-" + sysDate.getFullYear();
	var s = '<b>' + 'Revenue' + '</b>';
	var count = 0;
	$.each(this.points, function (i, data) {
		if (count == 0 && data.series.name == "Last Week") {
			currentDateDisplay = lastWeekDisplay;
		} else if (count != 0) {
			currentDateDisplay = lastWeekDisplay;
		}
		s += '<br/>' + '<b>' + currentDateDisplay + '</b>' + "     : " + '$' +
			Number(parseFloat(this.y).toFixed(2)).toLocaleString('en');
		count++;
	});
	return s;
}

function subscriberChartTooltip() {
	var sysDate = new Date();
	var currentDate = new Date(this.x);
	var currentDateDisplay = (currentDate.getMonth() + 1) + "-" +
		currentDate.getDate() + "-" + sysDate.getFullYear();
	var lastWeek = new Date(sysDate.getFullYear(), currentDate.getMonth(),
		currentDate.getDate() - 7);
	var lastWeekDisplay = (lastWeek.getMonth() + 1) + "-" + lastWeek.getDate() +
		"-" + sysDate.getFullYear();
	var s = '<b>' + 'Subscriber' + '</b>';
	var count = 0;
	$.each(this.points, function (i, data) {
		if (count == 0 && data.series.name == "Last Week") {
			currentDateDisplay = lastWeekDisplay;
		} else if (count != 0) {
			currentDateDisplay = lastWeekDisplay;
		}
		s += '<br/>' + '<b>' + currentDateDisplay + '</b>' + "     : " +
			Number(parseFloat(this.y).toFixed(2)).toLocaleString('en');
		count++;
	});
	return s;
}

function topupChartTooltip() {
	var sysDate = new Date();
	var currentDate = new Date(this.x);
	var currentDateDisplay = (currentDate.getMonth() + 1) + "-" +
		currentDate.getDate() + "-" + sysDate.getFullYear();
	var lastWeek = new Date(sysDate.getFullYear(), currentDate.getMonth(),
		currentDate.getDate() - 7);
	var lastWeekDisplay = (lastWeek.getMonth() + 1) + "-" + lastWeek.getDate() +
		"-" + sysDate.getFullYear();
	var s = '<b>' + 'Topup' + '</b>';
	var count = 0;
	$.each(this.points, function (i, data) {
		if (count == 0 && data.series.name == "Last Week") {
			currentDateDisplay = lastWeekDisplay;
		} else if (count != 0) {
			currentDateDisplay = lastWeekDisplay;
		}
		s += '<br/>' + '<b>' + currentDateDisplay + '</b>' + "     : " +
			Number(parseFloat(this.y).toFixed(2)).toLocaleString('en');
		count++;
	});
	return s;
}

function orderChartTooltip() {
	var sysDate = new Date();
	var currentDate = new Date(this.x);
	var currentDateDisplay = (currentDate.getMonth() + 1) + "-" +
		currentDate.getDate() + "-" + sysDate.getFullYear();
	var lastWeek = new Date(sysDate.getFullYear(), currentDate.getMonth(),
		currentDate.getDate() - 7);
	var lastWeekDisplay = (lastWeek.getMonth() + 1) + "-" + lastWeek.getDate() +
		"-" + sysDate.getFullYear();
	var s = '<b>' + 'Orders' + '</b>';
	var count = 0;
	$.each(this.points, function (i, data) {
		if (count == 0 && data.series.name == "Last Week") {
			currentDateDisplay = lastWeekDisplay;
		} else if (count != 0) {
			currentDateDisplay = lastWeekDisplay;
		}
		s += '<br/>' + '<b>' + currentDateDisplay + '</b>' + "     : " +
			this.y.toLocaleString();
		count++;
	});
	return s;
}

function incidentChartTooltip() {
	var sysDate = new Date();
	var currentDate = new Date(this.x);
	var currentDateDisplay = (currentDate.getMonth() + 1) + "-" +
		currentDate.getDate() + "-" + sysDate.getFullYear();
	var lastWeek = new Date(sysDate.getFullYear(), currentDate.getMonth(),
		currentDate.getDate() - 7);
	var lastWeekDisplay = (lastWeek.getMonth() + 1) + "-" + lastWeek.getDate() +
		"-" + sysDate.getFullYear();
	var s = '<b>' + 'Incidents' + '</b>';
	var count = 0;
	$.each(this.points, function (i, data) {
		if (count == 0 && data.series.name == "Last Week") {
			currentDateDisplay = lastWeekDisplay;
		} else if (count != 0) {
			currentDateDisplay = lastWeekDisplay;
		}
		s += '<br/>' + '<b>' + currentDateDisplay + '</b>' + "     : " +
			this.y.toLocaleString();
		count++;
	});
	return s;
}

// Code Optimize -> replace for subTrendChartDataProcessor and trendChartDataProcessor method
// Param: 
// result - splunk query result
// txndate - date field name from query result
// totalval - value field name from query result
function trendDataProcessor(trendResult, txndate, totalval) {

	var prevWeek = [];
	var currentWeek = [];
	var x_axis = [];
	if (undefined !== trendResult && null != trendResult) {
		for (var i = 0; i < trendResult.length; i++) {
			if (i > 6 && i < 14) {
				x_axis.push(trendResult[i][txndate]);
				(null != trendResult[i][totalval]) ? currentWeek.push(parseFloat(trendResult[i][totalval])): currentWeek.push(0);
			} else if (i < 7) {
				(null != trendResult[i][totalval]) ? prevWeek.push(parseFloat(trendResult[i][totalval])): prevWeek.push(0);
			}
		}
		// ---> Use if needed for zero filling or remove it.
		// if (prevWeek.length == 0 && currentWeek.length > 0) {
		// 	for (var j = 0; j < currentWeek.length; j++) {
		// 		prevWeek.push(0);
		// 	}
		// }
	}
	return {
		previousWeekData: prevWeek,
		currentWeekData: currentWeek,
		xaxisValues: x_axis
	};
}

// for trend charts without comparison weekly monthly charts > Replace for trendChartDataProcessorCustDate method
function trendWithoutComparison(trend, txndate, totalval) {
	var y_axis = [];
	var x_axis = [];
	trend.forEach(function (data, index) {
		(null != data[txndate]) ? x_axis.push(data[txndate]): x_axis.push('');
		(null != data[totalval]) ? y_axis.push(parseFloat(data[totalval])): y_axis.push(0);
	});
	return {
		axis: x_axis,
		data: y_axis
	}
}

function processOthersData(data) {
	var othersCount = 0;
	var dataPlans = [];
	for (var i = 0; i < data.length; i++) {

		if (i < 5) {
			dataPlans.push(data[i]);

		} else if (i >= 5) {
			var dataArray = data[i];
			for (var j = 0; j < dataArray.length; j++) {
				if (j == 1) {
					othersCount += dataArray[j];
				}
			}

		}
	}
	if (othersCount > 0) {
		dataPlans.push(["OTHERS", Number(parseFloat(othersCount))]);
	}
	return dataPlans;
}

function unitFormatter(dataval) {

	var counter, formatter;
	if (dataval != 0 || dataval != null) {

		if (parseInt(dataval).toString().length > 6) {
			counter = dataval / 1000000;
			var revenueBannerFormatter = "" + Math.floor(counter);
			formatter = "" + revenueBannerFormatter.substring(0, 3);
			revenueBannerFormatter = formatter + "M";

		} else if (parseInt(dataval).toString().length > 3 &&
			parseInt(dataval).toString().length <= 6) {

			counter = dataval / 1000;
			if (parseInt(counter).toString().length == 3) {
				revenueBannerFormatter = "" + Math.floor(counter);
				formatter = "" + revenueBannerFormatter.substring(0, 5);
			} else if (parseInt(counter).toString().length == 2) {
				revenueBannerFormatter = "" + Math.floor(counter);
				formatter = "" + revenueBannerFormatter.substring(0, 4);
			} else {
				revenueBannerFormatter = "" + Math.floor(counter);
				formatter = "" + revenueBannerFormatter.substring(0, 3);

			}
			revenueBannerFormatter = formatter + "K";
		} else {
			counter = dataval;
			revenueBannerFormatter = "" + Math.floor(counter);
		}
	};
	return revenueBannerFormatter;
}


// Code Optimize -> replace for bannertooltipCommon method
// Param: 
// datavalTooltip - splunk query result
// servicetype - type field name from query result
// totalValue - value field name from query result
function bannertooltipDataCommon(datavalTooltip, servicetype, totalValue) {

	var bannerTooltip = {
		"postpaid": 0,
		"prepaid": 0,
		"fixed": 0,
		"total": 0,
		"mnp": 0
	};
	var total = 0;
	for (var i = 0; i < datavalTooltip.length; i++) {
		if (null !== datavalTooltip[i][servicetype] && null !== datavalTooltip[i][totalValue]) {
			if ("postpaid" === datavalTooltip[i][servicetype].toLowerCase()) {
				bannerTooltip.postpaid =unitFormatter(parseInt(bannerTooltip.postpaid)+ parseFloat(datavalTooltip[i][totalValue]));
				total += parseFloat(datavalTooltip[i][totalValue]);
			}
			if ("prepaid" === datavalTooltip[i][servicetype].toLowerCase()) {
				bannerTooltip.prepaid = unitFormatter(parseInt(bannerTooltip.prepaid)+parseFloat(datavalTooltip[i][totalValue]));
				total += parseFloat(datavalTooltip[i][totalValue]);
			}
			if ("fixed" === datavalTooltip[i][servicetype].toLowerCase()) {
				bannerTooltip.fixed =unitFormatter(parseInt(bannerTooltip.fixed)+ parseFloat(datavalTooltip[i][totalValue]));
				total += parseFloat(datavalTooltip[i][totalValue]);
			}
			if ("mnp" === datavalTooltip[i][servicetype].toLowerCase()) {
				bannerTooltip.mnp = unitFormatter(parseInt(bannerTooltip.mnp) +parseFloat(datavalTooltip[i][totalValue]));
				total += parseFloat(datavalTooltip[i][totalValue]);
			}
		} else {
			//
		}
		
	}
	bannerTooltip.total = unitFormatter(total);
	return bannerTooltip;
}

// Code Optimize
// Param: 
// datavalTooltip - splunk query result
// servicetype - type field name from query result
// totalValue - value field name from query result
function bannertooltipTrafficData(datavalTooltip, hour, source, currentweekvalue, lastweekvalue) {
	for (var i = 0; i < datavalTooltip.length; i++) {
		compareTrafficValues("dl", datavalTooltip[i], "trafficData",source,currentweekvalue,lastweekvalue);
		compareTrafficValues("voice", datavalTooltip[i], "trafficVoice",source,currentweekvalue,lastweekvalue);
		compareTrafficValues("sms", datavalTooltip[i], "trafficSMS",source,currentweekvalue,lastweekvalue);
	}
}

// Code Optimize
// Param: Daily Revenue Trend Banner
// datavalTooltip - splunk query result
// servicetype - type field name from query result
// totalValue - value field name from query result
function bannertooltipDailyRevData(datavalTooltip, source, currentweekvalue, lastweekvalue) {
	for (var i = 0; i < datavalTooltip.length; i++) {
		compareDailyRevValues("data", datavalTooltip[i], "revTrendData", source, currentweekvalue, lastweekvalue);
		compareDailyRevValues("voice", datavalTooltip[i], "revTrendVoice", source, currentweekvalue, lastweekvalue);
		compareDailyRevValues("sms", datavalTooltip[i], "revTrendSMS", source, currentweekvalue, lastweekvalue);
	}
}

function bannertooltipDailyRevData1(datavalTooltip, source, currentweekvalue, lastweekvalue) {
	for (var i = 0; i < datavalTooltip.length; i++) {
		compareDailyRevValues("gy", datavalTooltip[i], "trafficData", source, currentweekvalue, lastweekvalue);
		compareDailyRevValues("voice", datavalTooltip[i], "trafficVoice", source, currentweekvalue, lastweekvalue);
		compareDailyRevValues("sms", datavalTooltip[i], "trafficSMS", source, currentweekvalue, lastweekvalue);
	}
}
// Code Optimize
// Param: 
// key - data/voice/sms
// compareData - data field name from query result
// eleID - element field name from query result
function compareTrafficValues(key, compareData, eleID,source,currentweekvalue,lastweekvalue) {
	if (compareData[source].toLowerCase().indexOf(key) !== -1) {
		$('#' + eleID).removeClass();
		if (parseFloat(compareData.currentweekvalue) > parseFloat(compareData.lastweekvalue)) {
			$('#' + eleID).addClass('fa fa-arrow-circle-up text-dark-green');
		} else if (parseFloat(compareData.currentweekvalue) < parseFloat(compareData.lastweekvalue)) {
			$('#' + eleID).addClass('fa fa-arrow-circle-down text-red');
		} else if (parseFloat(compareData.currentweekvalue) == parseFloat(compareData.lastweekvalue)) {
			$('#' + eleID).addClass('fa fa-minus-circle');
		} else if ('' == compareData.currentweekvalue || '' == compareData.lastweekvalue) {
			$('#' + eleID).addClass('fa fa-times-circle text-red');
		}
	}
}

// Code Optimize
// Param: Daily Revenue Trend Banner
// key - data/voice/sms
// compareData - data field name from query result
// eleID - element field name from query result
function compareDailyRevValues(key, compareData, eleID, source, currentweekvalue, lastweekvalue) {
	if (key.includes(compareData[source].toLowerCase())) {
		$('#' + eleID).removeClass();
		if (parseFloat(compareData[currentweekvalue]) > parseFloat(compareData[lastweekvalue])) {
			$('#' + eleID).addClass('fa fa-arrow-circle-up text-dark-green');
		} else if (parseFloat(compareData[currentweekvalue]) < parseFloat(compareData[lastweekvalue])) {
			$('#' + eleID).addClass('fa fa-arrow-circle-down text-red');
		} else if (parseFloat(compareData[currentweekvalue]) == parseFloat(compareData[lastweekvalue])) {
			$('#' + eleID).addClass('fa fa-minus-circle');
		} else if ('' == compareData[currentweekvalue] || '' == compareData[lastweekvalue]) {
			$('#' + eleID).addClass('fa fa-times-circle text-red');
		}
	}
}

// Code Optimize -> replace for ageingChartProcessor method
// Param: 
// ageingdata - splunk query result
// date - date field name from query result
// totalorder - value field name from query result
function ageingChartDataProcessor(ageingdata, date, totalorder) {
	if (undefined !== ageingdata && null !== ageingdata) {
		var opsPostOrderAgingVal = [];
		var diff1to3 = 0;
		var diff3to5 = 0;
		var diff6to10 = 0;
		var diff11to20 = 0;
		var diff20 = 0;
		var currDate = new Date();
		for (var index = 0; index < ageingdata.length; index++) {
			var loopDate = new Date(ageingdata[index][date]);
			var timeDiff = Math.abs(loopDate.getTime() - currDate.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
			if (diffDays >= 0 && diffDays < 3) {
				diff1to3 += parseInt(ageingdata[index][totalorder]);
			} else if (diffDays >= 3 && diffDays < 6) {
				diff3to5 += parseInt(ageingdata[index][totalorder]);
			} else if (diffDays >= 6 && diffDays < 11) {
				diff6to10 += parseInt(ageingdata[index][totalorder]);
			} else if (diffDays >= 11 && diffDays < 21) {
				diff11to20 += parseInt(ageingdata[index][totalorder]);
			} else if (diffDays >= 21) {
				diff20 += parseInt(ageingdata[index][totalorder]);
			}
		}
		opsPostOrderAgingVal.push(["<3 Days", diff1to3], ["3 - 5 Days",
			diff3to5
		], ["6 - 10 Days", diff6to10], ["11 - 20 Days",
			diff11to20
		], ["> 20 Days", diff20]);
	}
	return opsPostOrderAgingVal;
}

// Code Optimize -> replace for mnpChartProcessor method
// Param: 
// result - splunk query result
// date - date field name from query result
// portinData - port in value field name from query result
// portoutData - port out value field name from query result
function colChartDataProcessor(portinPortoutData, date, portinData, portoutData) {
	var x_axis = [];
	var portin = [];
	var portout = [];
	if (undefined !== portinPortoutData && null !== portinPortoutData) {
		// Code to plot data to MNP Chart
		for (var i = 0; i < portinPortoutData.length; i++) {
			var localportinDate = 0;
			var localportoutDate = 0;
			x_axis.push(portinPortoutData[i][date]);
			localportinDate = parseInt(portinPortoutData[i][portinData]);
			localportoutDate = parseInt(portinPortoutData[i][portoutData]);
			portin.push(localportinDate);
			portout.push(localportoutDate);
		}
		var axis = x_axis;
		var port_in = portin;
		var port_out = portout;
	}
	return {
		x_axis: axis,
		portin: port_in,
		portout: port_out
	};
}

// Code Optimize
// Param: 
// trendResult - splunk query result
// sourceSystem - Source System names
// totalincidents - Incident Count
// avgtime - Average Time taken to resolve the ticket
function averageResolution(trendResult, sourceSystem, totalincidents, avgtime) {
	var categories = [];
	var totalIncidentsCount = [];
	var avgResolutionCount = [];
	if (undefined !== trendResult && null != trendResult) {
		for (var i = 0; i < trendResult.length; i++) {
			categories.push(trendResult[i][sourceSystem]);
			totalIncidentsCount.push(Number(parseFloat(trendResult[i][totalincidents])));
			avgResolutionCount.push(Number(parseFloat(trendResult[i][avgtime])));
		}
	}
	return {
		Categories: categories,
		TotalIncidentsCount: totalIncidentsCount,
		AverageResolution: avgResolutionCount
	};
}


// Code Optimize -> replace for orderSolidBizHomeProcessor method
// Param: 
// orderData - splunk query result
// servicetype - service type field name from query result
// servicetotalorders - date field name from query result
// avgdata - value field name from query result
function orderSolidGaugeDataProcessor(orderData, servicetype, servicetotalorders, avgdata) {

	var solidResults = {
		"prepaidCount": 0,
		"prepaidPercentage": 0,
		"postpaidCount": 0,
		"postpaidPercentage": 0,
		"fixedCount": 0,
		"fixedPercentage": 0

	};

	if (orderData != null) {
		var datavalue = orderData;
		for (var i = 0; i < datavalue.length; i++) {
			if ("postpaid" === datavalue[i][servicetype].toLowerCase()) {
				solidResults.postpaidCount = parseInt(datavalue[i][servicetotalorders]);
				solidResults.postpaidPercentage = Number(parseFloat(
					datavalue[i][avgdata]).toFixed(2));
			}
			if ("prepaid" === datavalue[i][servicetype].toLowerCase()) {
				solidResults.prepaidCount = parseInt(datavalue[i][servicetotalorders]);
				solidResults.prepaidPercentage =Number(parseFloat(
					datavalue[i][avgdata]).toFixed(2));
				
			}
			if ("fixed" === datavalue[i][servicetype].toLowerCase()) {
				solidResults.fixedCount = parseInt(datavalue[i][servicetotalorders]);
				solidResults.fixedPercentage = Number(parseFloat(
					datavalue[i][avgdata]).toFixed(2));
			}

		}

	}
	return solidResults;

}

function orderStatusSolidProcessor(orderData, OrderStatus, TotalOrders, Percentage) {
	var solidResults = {
		"completedCount": 0,
		"completedPercentage": 0,
		"availableCount": 0,
		"availablePercentage": 0,
		"currentCount": 0,
		"currentPercentage": 0,
		"cancelledCount": 0,
		"cancelledPercentage": 0,
		"retrievedCount": 0,
		"retrievedPercentage": 0,
	};
	if (orderData != null) {
		// Code to plot data to Order Chart
		var datavalue = orderData;
		for (var i = 0; i < datavalue.length; i++) {
			if ("completed" === datavalue[i][OrderStatus].toLowerCase()) {
				solidResults.completedCount = parseInt(datavalue[i][TotalOrders]);
				solidResults.completedPercentage = Number(parseFloat(
					datavalue[i][Percentage]).toFixed(2));
			}
			if ("current" === datavalue[i][OrderStatus].toLowerCase()) {
				solidResults.currentCount = parseInt(datavalue[i][TotalOrders]);
				solidResults.currentPercentage = Number(parseFloat(
					datavalue[i][Percentage]).toFixed(2));
			}
			if ("canceled" === datavalue[i][OrderStatus].toLowerCase()) {
				solidResults.cancelledCount = parseInt(datavalue[i][TotalOrders]);
				solidResults.cancelledPercentage = Number(parseFloat(
					datavalue[i][Percentage]).toFixed(2));
			}
			if ("available" === datavalue[i][OrderStatus].toLowerCase()) {
				solidResults.availableCount = parseInt(datavalue[i][TotalOrders]);
				solidResults.availablePercentage = Number(parseFloat(
					datavalue[i][Percentage]).toFixed(2));
			}
			if ("retieved" === datavalue[i][OrderStatus].toLowerCase()) {
				solidResults.retrievedCount = parseInt(datavalue[i][TotalOrders]);
				solidResults.retrievedPercentage = Number(parseFloat(
					datavalue[i][Percentage]).toFixed(2));
			}
		}
	}
	return solidResults;

}

// Code Optimize -> replace for priorityProcessor method
// Param: 
// resultData - splunk query result
// priority - field name from query result
// incidentcount - count data field name from query result
function priorityDataProcessor(orderData, priority, incidentcount) {
	var priorityResults = {
		"p1": 0,
		"p2": 0,
		"p3": 0,
		"p4": 0
	};
	if (undefined !== orderData && null !== orderData) {
		for (var i = 0; i < orderData.length; i++) {
			if ("p1" === orderData[i][priority].toLowerCase()) {
				priorityResults.p1 = parseInt(orderData[i][incidentcount]);
			}
			if ("p2" === orderData[i][priority].toLowerCase()) {
				priorityResults.p2 = parseInt(orderData[i][incidentcount]);
			}
			if ("p3" === orderData[i][priority].toLowerCase()) {
				priorityResults.p3 = parseInt(orderData[i][incidentcount]);
			}
			if ("p4" === orderData[i][priority].toLowerCase()) {
				priorityResults.p4 = parseInt(orderData[i][incidentcount]);
			}
		}
	}
	return priorityResults;

}

// Code Optimize ->
// Param: 
// resultData - splunk query result
// adjustmentReason - name field name from query result
// subscriberCount - sub count data field name from query result
// adjustmentAmount - value field name from query result
function processAdj(rows, adjustmentReason, subscriberCount, adjustmentAmount) {
	// The search results
	var bizhomesub = rows;
	var x_Axis = [];
	var adjustments = [];
	var amounts = [];
	var othersAdj = 0;
	var othersCount = 0;

	if (bizhomesub != null) {
		// Code to plot data to MNP Chart
		for (var i = 0; i < bizhomesub.length; i++) {
			if (i < 5) {
				x_Axis.push(bizhomesub[i][adjustmentReason]);
				adjustments.push(parseInt(Math.abs(bizhomesub[i][subscriberCount])));
				amounts.push(parseFloat(Math.abs(bizhomesub[i][adjustmentAmount])));
			} else {
				othersAdj += parseInt(Math.abs(bizhomesub[i][subscriberCount]));
				othersCount += parseFloat(Math.abs(bizhomesub[i][adjustmentAmount]));
			}
		}
	}
	if (othersCount != 0) {
		x_Axis.push('OTHERS');
		adjustments.push(othersAdj);
		amounts.push(othersCount);
	}

	return {
		x_axis: x_Axis,
		Adjust: adjustments,
		Amt: amounts
	};

}

// Code Optimize -> replace for processPayment method
// Param: 
// resultData - splunk query result
// txnDate - date field name from query result
// cerillionsubcount - sub count data field name from query result
// cerillionamount - value field name from query result
function processPaymentData(resultData, txndate, cerillionsubcount, cerillionamount) {
	var x_Axis = [];
	var cerilionCounts = [];
	var cerilionPayments = [];
	if (resultData != null) {
		for (var i = 0; i < resultData.length; i++) {
			x_Axis.push(resultData[i][txndate]);
			cerilionCounts.push(parseInt(resultData[i][cerillionsubcount]));
			cerilionPayments.push(Number(parseFloat(Math.abs(resultData[i][cerillionamount])).toFixed(2)));
		}
	}
	return {
		x_axis: x_Axis,
		Adjust: cerilionCounts,
		Amt: cerilionPayments
	};
}

// Code Optimize -> replace for processPayment method
// Param: 
// resultData - splunk query result
// txnDate - date field name from query result
// cerillionsubcount - sub count data field name from query result
// cerillionamount - value field name from query result
function processArpuData(resultData, txndate, usercount, revenue, arpu) {
	var x_Axis = [];
	var userCount = [];
	var revenueValue = [];
	var arpuValue = [];
	if (resultData != null) {
		for (var i = 0; i < resultData.length; i++) {
			x_Axis.push(resultData[i][txndate]);
			userCount.push(parseInt(resultData[i][usercount]));
			revenueValue.push(Number(parseFloat(Math.abs(resultData[i][revenue])).toFixed(2)));
			arpuValue.push(Number(parseFloat(Math.abs(resultData[i][arpu])).toFixed(2)));
		}
	}
	return {
		x_axis: x_Axis,
		userCount: userCount,
		revenue: revenueValue,
		arpu: arpuValue
	};
}

// Code Optimize
// Param: 
// resultData - splunk query result
// dateVal - date field name from query result
// neworders - order count data field name from query result
// revenuechurn - value field name from query result
function churnlastbillCycleProcessor(data, dateVal, neworders, revenuechurn) {
	var dataArray = data;
	var results = {
		"newOrders": 0,
		"revChurn": 0
	}
	for (var i = 0; i < dataArray.length; i++) {
		var billCycleArray = dataArray[i];
		results.newOrders = Number(parseFloat(billCycleArray[neworders]).toFixed(2));
		results.revChurn = Number(parseFloat(billCycleArray[revenuechurn]).toFixed(2));
	}
	return results;
}

function formatNullValue(tableVal) {
	return (null == tableVal) ? '<div style="text-align:center;">-</div>' :
		tableVal;
}

function isJsonContains(JSON, value) {
	var hasMatch = false;

	for (var index = 0; index < JSON.length; ++index) {

		var plan = JSON[index];

		if (plan.name == value) {
			hasMatch = true;
			break;
		}
	}
	return hasMatch
}


// Code Optimize
// Param: 
// resultData - splunk query result
// type - type of data
// date - date field name from query result
// neworders - order value field name from query result
// revenuechurn - churn field name from query result
function columnChartProcessor(resultData, type, date, neworders, revenuechurn) {
	var x_axis = [];
	var portin = [];
	var portout = [];
	if (undefined !== resultData) {
		// Code to plot data to MNP Chart
		for (var i = 0; i < resultData.length; i++) {
			if (type == "date") {
				x_axis.push(resultData[i][date]);
			} else {
				x_axis.push(resultData[i][date].substr(0, 7));
			}
			portin.push(Number(parseFloat(resultData[i][neworders]).toFixed(2)));
			portout.push(Number(parseFloat(resultData[i][revenuechurn]).toFixed(2)));
		}
		var axis = x_axis;
		var port_in = portin;
		var port_out = portout;
	}
	return {
		x_axis: axis,
		portin: port_in,
		portout: port_out
	};
}

// Code Optimize -> replace for processStackBar method and other stack methods.
// Param: 
// resultData - splunk query result
// txnDate - date field name from query result
// country - country data field name from query result
// countryWiseRevenue - value field name from query result
function processStackBarData(resultData, config, chartID, statusFields, txnDate, locationDes, amount) {
	// The search results
	if (undefined !== resultData && null !== resultData) {
		var x_axis = [];
		resultData = splitDataByDelimiter(resultData, txnDate, locationDes, amount);
		var newDataJSON = convertObjectForStackBar(resultData, x_axis, txnDate, locationDes, amount);

		var tempDateObj = {};
		for (var x = 0; x < x_axis.length; x++) {
			tempDateObj[x_axis[x]] = 0;
		}

		config.xAxis.categories = x_axis;
		var finalDataObj = {
			data: []
		};
		for (var indxVal = 0; indxVal < newDataJSON.data[0][txnDate].length; indxVal++) {
			var tempSingleObj = {};
			tempSingleObj[txnDate] = newDataJSON.data[0][txnDate][indxVal];
			tempSingleObj[locationDes] = newDataJSON.data[0][locationDes][indxVal];
			if(chartID=="paymentChannelChart"){
				tempSingleObj[amount] = Math.abs(parseFloat(newDataJSON.data[0][amount][indxVal]));
			}else{
				tempSingleObj[amount] = parseFloat(newDataJSON.data[0][amount][indxVal]);	
			}
			finalDataObj.data.push(tempSingleObj);
		}
		var tempPlanArray = [];
		var tempDateArray = [];
		var uniquePlanArray = [];
		var uniqueDateArray = [];
		for (var loop = 0; loop < finalDataObj.data.length; loop++) {
			tempPlanArray.push(finalDataObj.data[loop][locationDes]);
			tempDateArray.push(finalDataObj.data[loop][txnDate]);
		}

		uniquePlanArray = (null !== statusFields && "" !== statusFields) ? statusFields : getUniqueArray(tempPlanArray);

		uniqueDateArray = getUniqueArray(tempDateArray);
		for (var k = 0; k < uniquePlanArray.length; k++) {
			config.series[k] = [];
			config.series[k].name = uniquePlanArray[k];
		}
		for (var j = 0; j < config.series.length; j++) {
			var dataValue = filterMap(finalDataObj, config.series[j].name, uniqueDateArray, txnDate, locationDes, amount, x_axis);
			config.series[j].data = dataValue;
		}

		Highcharts.chart(chartID, config);
	}
}

// Code Optimize 
// To be used for stackbar chart
// Process each data and get the values in array
var filterMap = function (finalDataObj, planDesc, dateArr, txnDate, locationDes, amount, x_axis) {
	var tempDateObj = {};
	for (var x = 0; x < x_axis.length; x++) {
		tempDateObj[x_axis[x]] = 0;
	}
	finalDataObj.data.forEach(function (singleData, index) {
		if (singleData[locationDes] === planDesc) {
			tempDateObj[singleData[txnDate]] = singleData[amount];
		}
	});
	return Object.values(tempDateObj);
}

// Code Optimize 
// To be used for stackbar chart
// Process one array to iterate over other array
function iterateArrOverArr(srcArr, destArr) {
	$.each(srcArr, function (i, el) {
		destArr.push(el);
	});
	return destArr;
}


// Code Optimize 
// To be used for stackbar chart
// Process Object and transfer the object into top plans and others plan
function convertObjectForStackBar(dataObj, x_axis, txnDate, locationDes, amount) {
	var convertedJSON = {
		data: []
	};
	var tempJSON = {};
	var tempDateArray = [];
	var tempDescArray = [];
	var tempAmountArray = [];
	var othersDateArray = [];
	var othersDescArray = [];
	var othersAmountArray = [];
	for (var i = 0; i < dataObj.length; i++) {
		x_axis.push(dataObj[i][txnDate]);
		var dataArray = dataObj[i];
		dataArray[locationDes] = null === dataArray[locationDes] ? '-' : dataArray[locationDes];
		if ('-' !== dataArray[locationDes]) {
			if (Array.isArray(dataArray[locationDes])) {
				var tempAmount = 0;
				for (var indx = 0; indx < dataArray[locationDes].length; indx++) {
					if (indx < 5) {
						tempDateArray.push(dataArray[txnDate]);
						tempDescArray.push(dataArray[locationDes][indx].toUpperCase());
						if (null != dataArray[amount]) {
							tempAmountArray.push(Number(parseFloat(dataArray[amount][indx])).toString());
						} else {
							tempAmountArray.push(Number(parseFloat(0)).toString());
						}
					} else {
						if (null != dataArray[amount]) {
							tempAmount += Number(parseFloat(dataArray[amount][indx]));
						}
						if (indx == dataArray[locationDes].length - 1) {
							othersDateArray.push(dataArray[txnDate]);
							othersDescArray.push("Others");
							othersAmountArray.push(Number(parseFloat(tempAmount)).toString());
						}
					}
				}
			} else {
				tempDateArray.push(dataArray[txnDate]);
				tempDescArray.push(dataArray[locationDes].toUpperCase());
				tempAmountArray.push(parseFloat(dataArray[amount]).toString());
			}
		}
	}
	tempDateArray = iterateArrOverArr(othersDateArray, tempDateArray);
	tempDescArray = iterateArrOverArr(othersDescArray, tempDescArray);
	tempAmountArray = iterateArrOverArr(othersAmountArray, tempAmountArray);
	tempJSON[txnDate] = tempDateArray;
	tempJSON[locationDes] = tempDescArray;
	tempJSON[amount] = tempAmountArray;
	convertedJSON.data.push(tempJSON);
	return convertedJSON;
}


// Code Optimize -> replace for basicLineChartProcessor method
// Param: 
// resultData - splunk query result
// txnDate - date field name from query result
// country - country data field name from query result
// countryWiseRevenue - value field name from query result
function basicLineDataProcessor(resultData, chartConfig, chartID, txnDate, country, countryWiseRevenue) {
	var x_axis = [];
	var name = [];
	var data = {};
	var dataArray = [];
	resultData = splitDataByDelimiter(resultData, txnDate, country, countryWiseRevenue);
	resultData.forEach(function (ele) {
		var stats = {};
		x_axis.push(ele[txnDate]);
		if (Array.isArray(ele[country])) {
			ele[country].forEach(function (value, index) {
				if (name.indexOf(value) == -1 && null !== value)
					name.push(value);
				stats[value] = Number(ele[countryWiseRevenue][index]);
			});
		} else {
			if (name.indexOf(ele[country]) == -1 && null !== ele[country])
				name.push(ele[country]);
			stats[ele[country]] = Number(ele[countryWiseRevenue]);
		}
		data[ele[txnDate]] = stats;
	});
	name.forEach(function (ex, idea) {
		var a1 = [];
		x_axis.forEach(function (e, index) {
			((data[e][ex]) === undefined) ? a1.push(0): a1.push(data[e][ex]);
		});
		dataArray.push(a1);
	});
	var seriesData = [];
	for (var i = 0; i < dataArray.length; i++) {
		var dataObj = {
			name: '',
			data: []
		};
		seriesData.push(dataObj);
		seriesData[i].name = name[i];
		seriesData[i].data = dataArray[i];
	}
	chartConfig.xAxis.categories = x_axis;
	chartConfig.series = seriesData;
	return Highcharts.chart(chartID, chartConfig);
}

// Code Optimize
// Param: 
// data - splunk query result
// category - category field name from query result
// networktype - network type name from query result
// totalrevenue - value field name from query result
function servicelastbillCycleData(data, category, networktype, totalrevenue) {
	var dataArray = data;
	var results = {
		"Onnet": 0,
		"Offnet": 0,
		"Roaming": 0
	}
	var billCycleArray = dataArray[0];
	dataArray = $.makeArray(billCycleArray[networktype]);
	var valueArray = $.makeArray(billCycleArray[totalrevenue]);
	for (var j = 0; j < dataArray.length; j++) {
		if ("ONNET" === dataArray[j].replace(" ", "").toUpperCase()) {
			results.Onnet = Number(parseFloat(valueArray[j]).toFixed(2));
		}
		if ("OFFNET" === dataArray[j].replace(" ", "").toUpperCase()) {
			results.Offnet = Number(parseFloat(valueArray[j]).toFixed(2));
		}
		if ("ROAMING" === dataArray[j].replace(" ", "").toUpperCase()) {
			results.Roaming = Number(parseFloat(valueArray[j]).toFixed(2));
		}
	}
	return results;
}

function revenuetempData(data, category, networktype, totalrevenue) {
	var results = {
		"international": 0,
		"national": 0,
	}
	for (var i = 0; i < data.length; i++) {
		var dataArray = data;
		var billCycleArray = dataArray[i];
		dataArray = $.makeArray(billCycleArray[networktype]);
		var valueArray = $.makeArray(billCycleArray[totalrevenue]);
		for (var j = 0; j < dataArray.length; j++) {
			if ("INTERNATIONAL" === dataArray[j].replace(" ", "").toUpperCase()) {
				results.international = Number(parseFloat(valueArray[j]).toFixed(2));
			}
			if ("NATIONAL" === dataArray[j].replace(" ", "").toUpperCase()) {
				results.national = Number(parseFloat(valueArray[j]).toFixed(2));
			}
		}
	}
	return results;
}

function wallettempData(data, category, networktype, totalrevenue) {
	var results = {
		"ma": [],
		"da":[],
		"catagories":[]
	}
	var catagories1=[];
	data.forEach(function(datainner)
{
	if(null!==datainner.txndate)
	if(catagories1.indexOf(datainner.txndate)==-1)
	catagories1.push(datainner.txndate);

});
	for (var i = 0; i < data.length; i++) {
		var dataArray = data;
		var billCycleArray = dataArray[i];
		dataArray = $.makeArray(billCycleArray[networktype]);
		var valueArray = $.makeArray(billCycleArray[totalrevenue]);
		for (var j = 0; j < dataArray.length; j++) {
			if ("MA" === dataArray[j].replace(" ", "").toUpperCase()) {
				results.ma .push( Number(parseFloat(valueArray[j]).toFixed(2)));
			}
			if ("DA" === dataArray[j].replace(" ", "").toUpperCase()) {
				results.da.push( Number(parseFloat(valueArray[j]).toFixed(2)));
			}
		}
	}
	results.catagories=catagories1;
	return results;
}

// Code Optimize -> Replace for splitDatabyDelimiter method
// Param: 
// result - splunk query result
// txndate - date field name from query result
// country - country field name from query result
// countryWiseRevenue - value field name from query result
function splitDataByDelimiter(results, txnDate, country, countryWiseRevenue) {
	if (undefined !== results && null !== results) {
		for (var i = 0; i < results.length; i++) {
			var datas = results[i];
			Object.keys(datas).forEach(function eachKey(key, indxVal) {
				if (datas[key] != null && datas[key].includes(":;:")) {
					var datatemp = datas[key].substring(0, datas[key].length - 3);
					datatemp = datatemp.split(":;: ");
					datas[key] = datatemp;
				}
			});
		}
	}
	return results;
}

//Code Optimize --> Moved the common pointTooltipFormatter to chart util Revenue related charts
function pointTooltipFormatter() {
	var s = '<span><b>' + this.x + '</b></span><br/>';
	var isNoData = true;
	for (var i = 0; i < this.points.length; i++) {
		if (this.points[i].point.y > 0) {
			s += '<span style="color:' + this.points[i].point.color + '">' +
				this.points[i].point.chName + '</span>: <b>$' +
				this.points[i].point.y.toFixed(2) + '</b> of total<br/>';
			isNoData = false;
		}
	}
	if (isNoData) {
		s += '<span><b>$ 0.0</b></span>';
	}
	return s;
}

//Code Optimize --> Moved the common pointTooltipFormatterCommon to chart util for the
function pointTooltipFormatterCommon() {
	var s = "";
	if (undefined !== this.points && null !== this.points) {
		s = '<span><b>' + this.x + '</b></span><br/>';
		var isNoData = true;
		for (var i = 0; i < this.points.length; i++) {
			if (this.points[i].point.y > 0) {
				s += '<span style="color:' + this.points[i].point.color + '">' +
					this.points[i].point.chName + '</span>: <b>' +
					this.points[i].point.y + '</b> of total<br/>';
				isNoData = false;
			}
		}
		if (isNoData) {
			s += '<span><b>0</b></span>';
		}
	}
	return s;
}

// Code Optimize --> Common tooltip formatter for the Planwise Stackbarchart
function planwiseStackTooltipFormatter() {
	var s = "";
	if (undefined !== this.points && null !== this.points) {
		s = '<span><b>' + this.x + '</b></span><br/>';
		var isNoData = true;
		for (var i = 0; i < this.points.length; i++) {
			if (this.points[i].point.y > 0) {
				s += '<span style="color:' + this.points[i].point.color + '"> ● </span>' +
					this.points[i].point.series.name + ': <b>' +
					this.points[i].point.y + '</b> of total<br/>';
				isNoData = false;
			}
		}
		if (isNoData) {
			s += '<span><b>0</b></span>';
		}
	}
	return s;
}

// Code Optimize --> Common tooltip formatter for the Planwise revenue Stackbarchart
function planRevenueStackTooltipFormatter() {
	var s = "";
	if (undefined !== this.points && null !== this.points) {
		s = '<span><b>' + this.x + '</b></span><br/>';
		var isNoData = true;
		for (var i = 0; i < this.points.length; i++) {
			if (this.points[i].point.y > 0) {
				s += '<span style="color:' + this.points[i].point.color + '"> ● </span>' +
					this.points[i].point.series.name + ': <b> $ ' +
					this.points[i].point.y.toFixed(2) + '</b> of total<br/>';
				isNoData = false;
			}
		}
		if (isNoData) {
			s += '<span><b>0</b></span>';
		}
	}
	return s;
}

function servicelastbillCycleFixedData(data, category, totalrevenue) {
	var results = {
		"Telephone": 0,
		"Broadband": 0,
		"IPTV": 0
	}
	for (var i = 0; i < data.length; i++) {
		var billCycleArray = data[i];
		var dataArray = $.makeArray(billCycleArray[category]);
		var valueArray = $.makeArray(billCycleArray[totalrevenue]);
		if ("VOICE" === dataArray[0].replace(" ", "").toUpperCase()) {
			results.Telephone = Number(parseFloat(valueArray[0]).toFixed(2));
		}
		if ("Broadband" === dataArray[0].replace(" ", "").toUpperCase()) {
			results.Broadband = Number(parseFloat(valueArray[0]).toFixed(2));
		}
		if ("IPTV" === dataArray[0].replace(" ", "").toUpperCase()) {
			results.IPTV = Number(parseFloat(valueArray[0]).toFixed(2));
		}
	}
	return results;
}

//Method to process billed/unbilled revenue stack bar
// Param: 
// resultData - splunk query result
// txnDate - date field name from query result
// country - country data field name from query result
// countryWiseRevenue - value field name from query result
function processServiceStackBarData(resultData, config, chartID, statusFields, txnDate, locationDes, amount) {
	// The search results
	if (undefined !== resultData && null !== resultData) {
		var x_axis = [];
		resultData = splitDataByDelimiter(resultData, txnDate, locationDes, amount);

		var newDataJSON = convertObjectForServiceStackBar(resultData, x_axis, txnDate, locationDes, amount);

		var tempDateObj = {};
		for (var x = 0; x < x_axis.length; x++) {
			tempDateObj[x_axis[x]] = 0;
		}

		config.xAxis.categories = x_axis;
		var finalDataObj = {
			data: []
		};
		for (var indxVal = 0; indxVal < newDataJSON.data[0][txnDate].length; indxVal++) {
			var tempSingleObj = {};
			tempSingleObj[txnDate] = newDataJSON.data[0][txnDate][indxVal];
			tempSingleObj[locationDes] = newDataJSON.data[0][locationDes][indxVal];
			tempSingleObj[amount] = parseInt(newDataJSON.data[0][amount][indxVal]);
			finalDataObj.data.push(tempSingleObj);
		}
		var tempPlanArray = [];
		var tempDateArray = [];
		var uniquePlanArray = [];
		var uniqueDateArray = [];
		for (var loop = 0; loop < finalDataObj.data.length; loop++) {
			tempPlanArray.push(finalDataObj.data[loop][locationDes]);
			tempDateArray.push(finalDataObj.data[loop][txnDate]);
		}

		uniquePlanArray = (null !== statusFields && "" !== statusFields) ? statusFields : getUniqueArray(tempPlanArray);
		if ((chartID.id == "serviceVoice" || chartID.id == "volumeByServices") && uniquePlanArray.length < 3) {
			var dfltArray = ["VOICE", "IPTV", "BROADBAND"];
			for (var j = 0; j < dfltArray.length; j++) {
				if (!isInArray(uniquePlanArray, dfltArray[j])) {
					uniquePlanArray.push(dfltArray[j]);
				}
			}
		}
		uniqueDateArray = getUniqueArray(tempDateArray);
		for (var k = 0; k < uniquePlanArray.length; k++) {
			config.series[k] = [];
			config.series[k].name = uniquePlanArray[k];
		}
		for (var j = 0; j < config.series.length; j++) {
			var dataValue = filterMap(finalDataObj, config.series[j].name, uniqueDateArray, txnDate, locationDes, amount, x_axis);
			config.series[j].data = dataValue;
		}

		Highcharts.chart(chartID, config);
	}
}
// method to convert data to json for billed/unbilled service and volume charts
function convertObjectForServiceStackBar(dataObj, x_axis, txnDate, locationDes, amount) {
	var convertedJSON = {
		data: []
	};
	var tempJSON = {};
	var tempDateArray = [];
	var tempDescArray = [];
	var tempAmountArray = [];
	for (var i = 0; i < dataObj.length; i++) {
		x_axis.push(dataObj[i][txnDate]);
		var dataArray = dataObj[i];
		dataArray[locationDes] = null === dataArray[locationDes] ? '-' : dataArray[locationDes];
		if ('-' !== dataArray[locationDes]) {
			if (Array.isArray(dataArray[locationDes])) {
				var tempAmount = 0;
				for (var indx = 0; indx < dataArray[locationDes].length; indx++) {

					tempDateArray.push(dataArray[txnDate]);
					tempDescArray.push(dataArray[locationDes][indx].toUpperCase());
					if (null != dataArray[amount]) {
						tempAmountArray.push(Math.abs(parseInt(dataArray[amount][indx])).toString());
					} else {
						tempAmountArray.push(Math.abs(parseInt(0)).toString());
					}
				}
			} else {
				tempDateArray.push(dataArray[txnDate]);
				tempDescArray.push(dataArray[locationDes].toUpperCase());
				tempAmountArray.push(Math.abs(parseInt(dataArray[amount])).toString());
			}
		}
	}
	tempJSON[txnDate] = tempDateArray;
	tempJSON[locationDes] = tempDescArray;
	tempJSON[amount] = tempAmountArray;
	convertedJSON.data.push(tempJSON);
	return convertedJSON;
}

function isInArray(array, search) {
	return array.indexOf(search) >= 0;
}

function getTrafficData(data, intime,isPrepaid) {
	var map = {};
	var series1 = [];
	var series2 = [];
	var series3 = [];
	var newData = {};
	var initailTime = "";
	if (undefined !== intime && "" !== intime) {
		initailTime = new Date(intime);
		intime = dateToTime(intime);
	}
	if (undefined !== data) {
		if (undefined !== data.currentWeek || null !== data.currentWeek) {
			var currentData = data.currentWeek;
			for (var currentKey in currentData) {
				var currentRow = currentData[currentKey];
				if (undefined !== currentRow[0]) {
					newData[currentRow[0].toString().replace(".", ":")] = {
						x: currentRow[0].toString().replace(".", ":"),
						current: currentRow[1]
					};
				}

			}
		}
		if (undefined !== data.prevWeek || null !== data.prevWeek) {
			var lastData = data.prevWeek;
			for (var lastKey in lastData) {
				var lastRow = lastData[lastKey];
				if (undefined !== lastRow[0]) {
					newData[lastRow[0].toString().replace(".", ":")].last = lastRow[1];
				}
			}
		}
		for (var rowid in newData) {
			var row = newData[rowid],
				value;
			
			if (undefined !== row.x) {
				value = formatDecimal(row.x).replace(".", ":");
			}
			if(isPrepaid)
			{

				var x =  new Date(value);
				if(x == "Invalid Date") {
				 	x = new Date(initailTime.toLocaleDateString() + " 	" + value);
				}
			}
			else{

				var x = new Date(initailTime.setHours(value));
			}
		
			if (x != "Invalid Date") {
				var displayTime = getDisplayTime(x);
				map[displayTime] = row;
				var curr = row.current;
				var last = row.last;
				series3.push({
					x: x,
					y: curr
				});
				if (curr > last) {
					series1.push({
						x: x,
						low: curr,
						high: curr
					});
					series2.push({
						x: x,
						low: curr,
						high: last
					});
				} else if (curr < last) {
					series1.push({
						x: x,
						low: curr,
						high: last
					});
					series2.push({
						x: x,
						low: curr,
						high: curr
					});
				} else {
					series1.push({
						x: x,
						low: curr,
						high: curr
					});
					series2.push({
						x: x,
						low: curr,
						high: curr
					});
				}
			}
		}
	}
	return [series1, series2, series3, map];
}

function getDisplayTime(date)

{
	return date.toLocaleTimeString();
}

function createTrafficChart(containerId, title, data, traffiChartConfig, fromDateTooltip, toDateTooltip, intime, isPrepaid,chartType) {
	var seriesData = getTrafficData(data, intime,isPrepaid);
	var map = seriesData[3];

	var config = copyChartConfig(traffiChartConfig);
	config.title = config.title || {};
	config.title.text = title;
	config.series = [];

	config.series.push({
		name: 'Last Week',
		data: seriesData[0],
		color: '#ff8800',
		type: 'areasplinerange',
		"lineWidth": 1,
        "linkedTo": 2
	});
	config.series.push({
		name: 'Current Week',
		data: seriesData[1],
		color: '#00ff00',
		type: 'areasplinerange',
		"lineWidth": 1,
        "linkedTo": 2
	});
	config.series.push({
		name: 'Area Range',
		color: '#0000ff',
		data: seriesData[2],
		type: 'line',
		lineWidth: 1
	});

	config.yAxis.min = 0;
	config.xAxis.labels = config.xAxis.labels || {};
	config.xAxis.labels.formatter = function () {
		return dateToTime(this.value);
	};

	
	if (containerId != 'activeSessionChart') {
		config.yAxis.min = 0;
	}
	
	config.xAxis.labels = config.xAxis.labels || {};
	config.xAxis.labels.formatter = function () {
		var d = new Date(this.value);
		return dateToTime(d);
	};
	config.tooltip.formatter = function () {
		var date = new Date(this.x);
		var time = getDisplayTime(date);
		var s = '<b>' + time + '</b>';
		var dataMap = document.getElementById(containerId).highchartsData;

		var current = 0;
		var last = 0;

		if (dataMap) {
			current = dataMap[time].current;
			last = dataMap[time].last;
		}
		var from_tooltip = "Current Week Value :";
		var to_tooltip = "Last Week Value :";
		if("today"===chartType){
			from_tooltip = "Current Week Value :";
			to_tooltip = "Last Week Value :";
		}else if("prevDay"===chartType){
			from_tooltip = "Today Value :";
			to_tooltip = "Previousday Value :";
		}
		else if("customDate"===chartType){
			from_tooltip = "FromDate Value :";
			to_tooltip = "Todate Value :";
		}
		if (("" !== fromDateTooltip) && ("" != fromDateTooltip)) {
			from_tooltip = fromDateTooltip+ "  :";
			to_tooltip = toDateTooltip+ "  :";
		}


		s += '<br/>' + from_tooltip + current.toString();
		s += ' <br/>' + to_tooltip + last.toString();
		return s;
	};
	delete map["Invalid Date"];
	var chart = Highcharts.chart(containerId, config);
	document.getElementById(containerId).highchartsData = map;
	document.getElementById(containerId).highchartsChart = chart;
	chart.reflow();
}

function copyChartConfig(src) {
	return eval('(' + JSON.stringify(src) + ')');
}


var dateToTime = function (d) {
	var h = d.getHours();
	var m = d.getMinutes();
	var suffix = h < 12 ? 'AM' : 'PM';

	h = h > 12 ? h - 12 : h;
	if (h == 0)
		h = 12;
	h = h < 10 ? '0' + h.toString() : h;
	m = m < 10 ? '0' + m.toString() : m;
	var time = h + ':' + m + ' ' + suffix;
	return time;
}

function revenueColumnStack(result, txndate, nettype, call_count) {
	var axis = [];
	var catagories = [];

	var map = [];


	result.forEach(function (value, index) {
		(value[txndate] !== undefined) ? axis.push(value[txndate]): "";

		var stats = [];
		stats = value[nettype];
		var count = value[call_count];
		var date = value[txndate];

		if (null !== stats) {
			if (Array.isArray(stats)) {
				stats.forEach(function (value1) {
					if (catagories.indexOf(value1) == -1)
						catagories.push(value1);
				});
				mapper(date, stats, count);
			} else {
				if (catagories.indexOf(stats) == -1)
					catagories.push(stats);
				var obj = {};
				obj[stats] = count;
				map[date] = "";
				map[date] = (obj);
			}

		}
	});

	function mapper(date, stats, count) {
		var obj = {};
		for (var i = 0; i < stats.length; i++) {
			obj[stats[i]] = (null !== count && null !== count[i] ) ? parseInt(count[i]) : 0;

		}
		map[date] = "";
		map[date] = (obj);
		return obj;
	}


	var results = [];
	catagories.forEach(function (values, map1) {
		results[map1] = [];
		axis.forEach(function (values11, index) {
			if (undefined !== map[values11]) {
				results[map1].push(Number(parseFloat(map[values11][values]).toFixed(2)));
			} else {
				results[map1].push(0);
			}
		});

	});

	return {
		axis: axis,
		nettype: results
	}
}



//Method to process prepaid mnp revenue stack bar
// Param: 
// resultData - splunk query result
// txnDate - date field name from query result
// country - country data field name from query result
// countryWiseRevenue - value field name from query result

function trendMNPDataProcessor(data, txndate, portin, portout) {
	var lastweek_portIn = [];
	var portIn = [];
	var lastweek_portOut = [];
	var portOut = [];
	var x_axis = [];
	data.forEach(function (value, index) {
		if (index > 6 && index < 14) {
			x_axis.push(value[txndate]);
			(null != value[portin]) ? portIn.push(parseFloat(value[portin])): portIn.push(0);
			(null != value[portout]) ? portOut.push(parseFloat(value[portout])): portOut.push(0);
		} else if (index < 7) {
			
			(null != value[portin]) ? lastweek_portIn.push(parseFloat(value[portin])): lastweek_portIn.push(0);
			(null != value[portout]) ? lastweek_portOut.push(parseFloat(value[portout])): lastweek_portOut.push(0);
		}

	});
	return {
		x_axis: x_axis,
		portIn: portIn,
		lastweek_portIn: lastweek_portIn,
		lastweek_portOut: lastweek_portOut,
		portOut: portOut
	};
}

//Method to process prepaid mnp revenue stack bar
// Param: 
// resultData - splunk query result
// txnDate - date field name from query result
// country - country data field name from query result
// countryWiseRevenue - value field name from query result

function trendMNPHomeDataProcessor(data, txndate, portin, portout) {
	var lastweek_portIn = [];
	var portIn = [];
	var lastweek_portOut = [];
	var portOut = [];
	var x_axis = [];
	data.forEach(function (value, index) {
		if (index > 6 && index < 14) {
			x_axis.push(value[txndate]);
			(null != value[portin]) ? portIn.push(parseFloat(value[portin])): portIn.push(0);
			(null != value[portout]) ? portOut.push(parseFloat(value[portout])): portOut.push(0);
		} else if (index < 7) {
			
			(null != value[portin]) ? lastweek_portIn.push(parseFloat(value[portin])): lastweek_portIn.push(0);
			(null != value[portout]) ? lastweek_portOut.push(parseFloat(value[portout])): lastweek_portOut.push(0);
		}

	});
	return {
		x_axis: x_axis,
		portIn: portIn,
		lastweek_portIn: lastweek_portIn,
		lastweek_portOut: lastweek_portOut,
		portOut: portOut
	};
}

function cumulativeChartProcessor(data, no_days, month1, month2, month3) {
	var m1 = [];
	var m2 = [];
	var m3 = [];
	var days = [];
	data.forEach(function (data1) {
		(undefined !== data1[no_days]) ? days.push(data1[no_days]): days.push(0);
		(undefined !== data1[month1]) ? m1.push(parseFloat(data1[month1])): m1.push(0);
		(undefined !== data1[month2]) ? m2.push(parseFloat(data1[month2])): m2.push(0);
		(undefined !== data1[month3]) ? m3.push(parseFloat(data1[month3])): m3.push(0);

	});
	return {"days":days,"rev1":m1,"rev2":m2,"rev3":m3};

}
function bannertooltipMNPData(datavalTooltip, servicetype, totalValue) {

	var bannerTooltip = {
		"postpaid": 0,
		"prepaid": 0,
		"fixed": 0,
		"total": 0,
		"mnp": 0
	};
	var total = 0;
	var lnp=0;
	for (var i = 0; i < datavalTooltip.length; i++) {
		if (null !== datavalTooltip[i][servicetype] && null !== datavalTooltip[i][totalValue]) {
			if ("postpaid" === datavalTooltip[i][servicetype].toLowerCase()) {
				bannerTooltip.postpaid = unitFormatter(parseFloat(datavalTooltip[i][totalValue]));
				total += parseFloat(datavalTooltip[i][totalValue]);
			}
			if ("prepaid" === datavalTooltip[i][servicetype].toLowerCase()) {
				bannerTooltip.prepaid = unitFormatter(parseFloat(datavalTooltip[i][totalValue]));
				total += parseFloat(datavalTooltip[i][totalValue]);
			}
			if ("fixed" === datavalTooltip[i][servicetype].toLowerCase()) {
				bannerTooltip.fixed = unitFormatter(parseFloat(datavalTooltip[i][totalValue]));
				//total += parseFloat(datavalTooltip[i][totalValue]);
				lnp=parseFloat(datavalTooltip[i][totalValue]);
			}
			
		} 
		
	}
	var mnp=unitFormatter(total);
	bannerTooltip.total = mnp+" / "+lnp;
	return bannerTooltip;
}
function planwiseStackDatalabelFormatter() {
	var s = "";
	if (undefined !== this.total && null !== this.total && this.total>0) {
		s += '<span><b>' + this.total.toFixed(2) + '</b></span>';
	} else {
		s += '<span><b>0</b></span>';
	}

	return s;
}

function orderDataProcessor(orderData, orderstatus, totalorders) {
	var orderResults = {
		"Current": 0,
		"Completed": 0,
	};
	if (undefined !== orderData && null !== orderData) {
		for (var i = 0; i < orderData.length; i++) {
			if ("current" === orderData[i][orderstatus].toLowerCase()) {
				orderResults.Current += parseInt(orderData[i][totalorders]);
			}
			if ("completed" === orderData[i][orderstatus].toLowerCase()) {
				orderResults.Completed += parseInt(orderData[i][totalorders]);
			}
			
		}
	}
	return orderResults;

}