var getOnlySearchResultsConstructor = "";
var getBannerSearchResultsConstructor = "";
var globalCountryList = [];
var globalUserServiceTypeList = "";
var globalServiceTypeList = "";
var SearchManager = null;
var utils = null;
var splunk_service=null;
var deps = [
	"splunkjs/ready!",
	"splunkjs/mvc/searchmanager",
	"jquery",
	"splunkjs/mvc/utils"
];

require(deps, function (mvc) {
	// Load individual components
	SearchManager = require("splunkjs/mvc/searchmanager");
	utils = require("splunkjs/mvc/utils");
	var pageLoading = true;

	var tokens = mvc.Components.getInstance("default");
	var current = Splunk.util.getConfigValue("USERNAME");
	tokens.set("currentuser", current);

	// to get the country list for the user
	var tempDataResults = {
		data: [{
				"country": "BAHAMAS",
				"service_type": "Postpaid",
				"user_type": "Business",
			},
			{
				"country": "BAHAMAS",
				"service_type": "Prepaid",
				"user_type": "Business",
			},
			{
				"country": "BAHAMAS",
				"service_type": "Fixed",
				"user_type": "Business",
			},
			{
				"country": "BAHAMAS",
				"service_type": "Postpaid",
				"user_type": "Operation",
			},
			{
				"country": "BAHAMAS",
				"service_type": "Prepaid",
				"user_type": "Operation",
			},
			{
				"country": "BAHAMAS",
				"service_type": "Postpaid",
				"user_type": "Monitoring",
			},
			{
				"country": "BARBADOS",
				"service_type": "Fixed",
				"user_type": "Operation",
			},
			{
				"country": "BAHAMAS",
				"service_type": "Prepaid",
				"user_type": "Monitoring",
			},
			{
				"country": "JAMAICA",
				"service_type": "Fixed",
				"user_type": "Monitoring",
			}
		]
	};
	var userMgmtDisabled = true;

	// if(null !== userMgmtDisabled && "" !== userMgmtDisabled) {
	// 	if(!userMgmtDisabled) {
	if (null !== localStorage.getItem("selectedDefaultCountryList") && "" !== localStorage.getItem("selectedDefaultCountryList")) {
		defaultList(JSON.parse(localStorage.getItem("selectedDefaultCountryList")));
	} else {
		var defaultCountryData = getOnlySearchResults(getQuery("countryDataQuery", "default_country", "", "", "", ""), "");
		defaultCountryData.on('search:done', function () {
			var defaultCountryResults = defaultCountryData.data("results");
			defaultCountryResults.on("data", function (queryResults) {
				if (undefined != queryResults.data()) {
					var finalDataJson = convertResultToJSON(queryResults.data());
					defaultList(finalDataJson.data);
				}
			});
			defaultList("");
		});
	}
	// 	}
	// }

	// to get the user data for the user
	if (null !== localStorage.getItem("loggedInUserData") && "" !== localStorage.getItem("loggedInUserData")) {
		if (null != localStorage.getItem("loggedInUser") && "" !== localStorage.getItem("loggedInUser") &&
			null != tokens.get("currentuser") && "" !== tokens.get("currentuser")) {
			if (tokens.get("currentuser") === localStorage.getItem("loggedInUser")) {
				processUserData(JSON.parse(localStorage.getItem("loggedInUserData")), tokens.get("currentuser").toLowerCase());
			} else {
				getUserInitialData();
			}
		}
	} else {
		getUserInitialData();
	}


	// Get the data of user for first time.
	function getUserInitialData() {
		var userName = tokens.get("currentuser").toLowerCase();
		if (null !== userMgmtDisabled && "" !== userMgmtDisabled) {
			if (!userMgmtDisabled) {
				var loggedUserData = getOnlySearchResults(getUserQuery("userDataQuery", "logged_user", tokens.get("currentuser").toLowerCase()), "");
				loggedUserData.on('search:done', function () {
					var loggedUserResults = loggedUserData.data("results");
					loggedUserResults.on("data", function (queryResults) {
						if (undefined != queryResults.data()) {
							var finalDataJson = convertResultToJSON(queryResults.data());
							processUserData(finalDataJson.data, userName);
							localStorage.setItem("loggedInUserData", JSON.stringify(finalDataJson.data));
						}
					});
				});
			} else if (userMgmtDisabled) {
				if (undefined != tempDataResults.data) {
					processUserData(tempDataResults.data, userName);
					localStorage.setItem("loggedInUserData", JSON.stringify(tempDataResults.data));
				}
			}
		}
	}

	function getOnlySearchResults(query, id) {
		var searchmanager = new SearchManager({
			"cancelOnUnload": true,
			"refresh": "24h",
			"refreshType": "delay",
			"sample_ratio": 1,
			"earliest_time": "0",
			"status_buckets": 0,
			"search": query,
			"app": utils.getCurrentApp(),
			"auto_cancel": 90,
			"preview": true,
			"tokenDependencies": {},
			"runWhenTimeIsUndefined": false
		}, {
			tokens: true,
			tokenNamespace: "submitted"
		});
		return searchmanager;
	}
	getOnlySearchResultsConstructor = function (query, id) {
		var searchmanager = new SearchManager({
			"cancelOnUnload": true,
			"refresh": "24h",
			"refreshType": "delay",
			"sample_ratio": 1,
			"earliest_time": "0",
			"status_buckets": 0,
			"search": query,
			"app": utils.getCurrentApp(),
			"auto_cancel": 90,
			"preview": true,
			"tokenDependencies": {},
			"runWhenTimeIsUndefined": false
		}, {
			tokens: true,
			tokenNamespace: "submitted"
		});
		$('#' + id).show();
		return searchmanager;
	}

	getBannerSearchResultsConstructor = function (query, id) {
		var searchmanager = new SearchManager({
			"cancelOnUnload": true,
			"sample_ratio": 1,
			"earliest_time": "0",
			"status_buckets": 0,
			"search": query,
			"app": utils.getCurrentApp(),
			"auto_cancel": 90,
			"preview": true,
			"tokenDependencies": {},
			"runWhenTimeIsUndefined": false
		}, {
			tokens: true,
			tokenNamespace: "submitted"
		});
		return searchmanager;
	}


	pageLoading = false;

});



function getQuery(mapName, kpikey, countryParam, fromDate, toDate, serviceType) {
	var query = eval(mapName + "['" + kpikey + "']");
	if (undefined !== countryParam) {
		//replace all the country param to respective country
		query = query.replace(/countryParam/gi, countryParam);
	}
	if (undefined !== fromDate) {
		query = query.replace(/updatedFromDate/gi, fromDate);
		query = query.replace(/updatedToDate/gi, toDate);
	}
	if (undefined !== serviceType) {
		query = query.replace(/serviceTypeParam/gi, serviceType);
	}
	console.log(query);
	return query;
}

function getUserQuery(mapName, kpikey, userParam) {
	var query = eval(mapName + "['" + kpikey + "']");
	if (undefined !== userParam) {
		//replace all the country param to respective country
		query = query.replace(/userParam/gi, userParam);
	}
	console.log(query);
	return query;
}

function getCustomQuery(mapName, kpikey, countryParam, fromDate, toDate, fromplus, toPlus, serviceType) {

	//var query = mapName[kpikey];
	var query = eval(mapName + "['" + kpikey + "']");
	if (undefined !== countryParam && "" !== countryParam) {
		//replace all the country param to respective country
		query = query.replace(/countryParam/gi, countryParam);
	}
	if (undefined !== fromplus && undefined !== toPlus) {
		query = query.replace(/updatedFromDateplus/gi, fromplus);
		query = query.replace(/updatedToDateplus/gi, toPlus);
	}
	if (undefined !== fromDate && undefined !== toDate) {
		query = query.replace(/updatedFromDate/gi, fromDate);
		query = query.replace(/updatedToDate/gi, toDate);
	}
	if (undefined !== serviceType) {
		query = query.replace(/serviceTypeParam/gi, serviceType);
	}
	console.log(query);
	return query;
}





function getInterfaceMonitorQuery(mapName, kpikey, serverNameParam, siteCentreParam, hostParam, queueParam) {

	//var query = mapName[kpikey];
	var query = eval(mapName + "['" + kpikey + "']");
	if (undefined !== serverNameParam && '' !== serverNameParam) {
		//replace all the country param to respective country
		query = query.replace(/serverNameParam/gi, serverNameParam);
	}
	if (undefined !== siteCentreParam && '' !== siteCentreParam) {
		query = query.replace(/siteCentreParam/gi, siteCentreParam);

	}
	if (undefined !== hostParam && '' !== hostParam) {
		query = query.replace(/hostParam/gi, hostParam);

	}
	if (undefined !== queueParam && '' !== queueParam) {
		query = query.replace(/queueParam/gi, queueParam);

	}
	console.log(query);
	return query;
}

function getMonitoringQuery(mapName, kpikey, severityParam, priorityParam, countryParam, serviceType) {
	//var query = mapName[kpikey];
	var query = eval(mapName + "['" + kpikey + "']");
	if (undefined !== severityParam && '' !== severityParam) {
		//replace all the country param to respective country
		query = query.replace(/severityParam/gi, severityParam);
	}
	if (undefined !== priorityParam && '' !== priorityParam) {
		query = query.replace(/priorityParam/gi, priorityParam);
	}
	if (undefined !== countryParam) {
		//replace all the country param to respective country
		query = query.replace(/countryParam/gi, countryParam);
	}

	if (undefined !== serviceType) {
		query = query.replace(/serviceTypeParam/gi, serviceType);
	}
	console.log(query);
	return query;
}

//Country Wise Filtering - Start here//
function processUserData(userData, userName) {
	var tempGlobalCountryList = [];
	var tempGlobalUserServiceTypeList = [];
	localStorage.setItem("loggedInUser", (null !== userName && "" !== userName) ? userName : "");
	$("#userId").text("Welcome " + localStorage.getItem("loggedInUser"));
	userData.forEach(function (singleData, index) {
		if (null !== singleData && "" !== singleData) {
			tempGlobalCountryList.push((null !== singleData.country && "" !== singleData.country) ? singleData.country : "");
			if ((null !== singleData.user_type && "" !== singleData.user_type) && (null !== singleData.service_type && "" !== singleData.service_type)) {
				tempGlobalUserServiceTypeList.push(singleData.user_type.toLowerCase() + "-" + singleData.service_type.toLowerCase());
			} else {
				tempGlobalUserServiceTypeList.push("");
			}
		}
	});
	globalCountryList = getUniqueArray(tempGlobalCountryList);
	globalUserServiceTypeList = getUniqueArray(tempGlobalUserServiceTypeList);
	if (null === localStorage.getItem("selectedCountryList") && globalCountryList.length > 0) {
		localStorage.setItem("selectedCountryList", JSON.stringify(globalCountryList));
		localStorage.setItem("selectedOldCountryList", JSON.stringify(globalCountryList));
		localStorage.setItem("globalUserServiceTypeList", JSON.stringify(globalUserServiceTypeList));
	} else {
		localStorage.setItem("selectedCountryList", localStorage.getItem("selectedCountryList"));
		localStorage.setItem("globalUserServiceTypeList", localStorage.getItem("globalUserServiceTypeList"));
	}
	if (null === localStorage.getItem("globalUserServiceTypeList") && globalUserServiceTypeList.length > 0) {
		localStorage.setItem("globalUserServiceTypeList", JSON.stringify(globalUserServiceTypeList));
	} else {
		localStorage.setItem("globalUserServiceTypeList", localStorage.getItem("globalUserServiceTypeList"));
	}
	checkCountriesFromSession(JSON.parse(localStorage.getItem("selectedCountryList")), globalCountryList);
	$("#ctryNameHolder").html('<span class="flag-icon flag-icon-bs"></span><span id="ctryName" class="country-value">BAHAMAS</span>');
}

function getServiceTypes(loggedUserData, keyName, keyValue, destKey) {
	var serviceArray = [];
	for (var i = 0; i < loggedUserData.length; i++) {
		var singleData = loggedUserData[i];
		if (null !== singleData[keyName] && keyValue === singleData[keyName].toLowerCase()) {
			serviceArray.push(singleData[destKey]);
		}
	}
	return getUniqueArray(serviceArray);
}

function defaultList(defaultCountryList) {
	var countryEle = "";
	if (undefined !== defaultCountryList && "" !== defaultCountryList) {
		for (var i = 0; i < defaultCountryList.length; i++) {
			countryEle += '<li><div class="country-name" id="' + defaultCountryList[i].countryname.toUpperCase() + '"><span class="flag-icon flag-icon-' + defaultCountryList[i].imagename.toLowerCase() + '"></span><span class="country-value">' + defaultCountryList[i].countryname + '</span></div></li>';
		}
		localStorage.setItem("selectedCountryDiv", JSON.stringify(defaultCountryList));
		if (null == localStorage.getItem("selectedDefaultCountryList")) {
			localStorage.setItem("selectedDefaultCountryList", JSON.stringify(defaultCountryList));
		}
		if (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) {
			localStorage.getItem("selectedOldCountryList", localStorage.getItem("selectedCountryList").toString().replace(/[\[\]]+/g, ''));
		}
	}
	$("#countryContainer").append(countryEle);
}

function loadErrorPage() {
	$(".main-content").css("display", "none");
	$(".icon-menu-side").css("display", "none");
	$("#errorDiv").css("display", "block");
	$('#preloader').hide();
	$('#status').hide();
	$("#errorMsg").html(getBannerHelpText("errorMsgHelp", "errorMsg"));
	if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList") && "null" != localStorage.getItem("globalUserServiceTypeList")) {
		var outerDiv = "<div>" + getBannerHelpText("errorMsgHelp", "errorMsgView") + "<ul>";
		JSON.parse(localStorage.getItem("globalUserServiceTypeList")).forEach(function (singleData, index) {
			outerDiv += "<li>" + singleData + "</li>";
		})
		outerDiv += "</ul></div>";
		$("#errorMsg").append(outerDiv);
	}
}

function loadSuccessPage() {
	$(".main-content").css("display", "block");
	$(".icon-menu-side").css("display", "block");
	$("#errorDiv").css("display", "none");
}

// if (null == localStorage.getItem("selectedCountryList")) {
// 	localStorage.setItem("selectedCountryList", JSON.stringify(globalCountryList));
// }
// if (null == localStorage.getItem("selectedOldCountryList")) {
// 	localStorage.setItem("selectedOldCountryList", JSON.stringify(globalCountryList));
// }


// function loadSelectedCountryFromSession() {
// 	// var selectedCountryList = [];
// 	// if (null == localStorage.getItem("selectedCountryList")) {
// 	// 	/*$.each(JSON.parse(localStorage.userAuthData).userCountryMaps, function(i, obj){
// 	// 		selectedCountryList.push(obj.countryMaster.splunkCountryCode);
// 	// 	});*/
// 	// 	localStorage.setItem("selectedCountryList", JSON.stringify(selectedCountryList));
// 	// }
// 	checkCountriesFromSession(JSON.parse(localStorage.getItem("selectedCountryList")),globalCountryList);
// 	return localStorage.getItem("selectedCountryList").toString().replace(/[\[\]]+/g, '');
// }

var checkCountriesFromSession = function (arrayData, globalData) {
	var tempCountryList = [];
	var tempGlobalCountry = [];
	JSON.parse(localStorage.getItem("selectedCountryList")).forEach(function (singleData, index) {
		tempCountryList.push(singleData.toLowerCase());
	})
	globalCountryList.forEach(function (singleData, index) {
		tempGlobalCountry.push(singleData.toLowerCase());
	})
	$('#countryContainer li').each(function () {
		if (tempCountryList.indexOf($(this).find(".country-name").attr("id").toLowerCase()) > -1) {
			$(this).addClass("active");
			$(this).find(".pull-right.enabled").remove();
			$(this).find(".country-value").append('<span class="pull-right enabled"><i class="fa fa-check" aria-hidden="true"></i></span>');
		} else if (tempGlobalCountry.indexOf($(this).find(".country-name").attr("id").toLowerCase()) == -1) {
			$(this).find(".country-value").css('opacity', 0.5);
		}
	});
}


$('#countryContainer').on('click', 'li', function () {
	var selectedCountryList = JSON.parse(localStorage.getItem("selectedCountryList"));
	if ($(this).hasClass("active")) {
		$(this).removeClass("active");
		$(this).find(".pull-right.enabled").remove();
		removeItemFromArray(selectedCountryList, $(this).find(".country-name").attr("id"));
	} else if (!$(this).hasClass("active") && globalCountryList.indexOf($(this).find(".country-name").attr("id")) > -1) {
		$(this).addClass("active");
		$(this).find(".pull-right.enabled").remove();
		$(this).find(".country-value").append('<span class="pull-right enabled"><i class="fa fa-check" aria-hidden="true"></i></span>');
		selectedCountryList.push($(this).find(".country-name").attr("id"));
	}
	localStorage.setItem("selectedCountryList", JSON.stringify(getUniqueArray(selectedCountryList)));
});

function removeItemFromArray(array, item) {
	var i = array.indexOf(item);
	if (i != -1) {
		array.splice(i, 1);
	}
}
/* End */

function resetBannerNotation(ele, setFlag, txtVal, valEle, unitEle) {
	if (undefined != setFlag) {
		if (setFlag) {
			$('' + ele + '').text('').css('color', '#fff').text(txtVal);
		} else {
			$('' + ele + '').text('').text('-');
			$('' + valEle + ',' + unitEle + '').text('');
		}
	}
}

function refreshDateTime() {

	// Last Refresh time
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();

	var output =
		(('' + month).length < 2 ? '0' : '') + month + '-' +
		(('' + day).length < 2 ? '0' : '') + day + '-' +
		d.getFullYear() + ' ' +
		(('' + hour).length < 2 ? '0' : '') + hour + ':' +
		(('' + minute).length < 2 ? '0' : '') + minute + ':' +
		(('' + second).length < 2 ? '0' : '') + second;

	$('#refreshId').html(output);
}

function formatNullValue(tableVal) {
	return (null == tableVal || 'N/A' == tableVal) ? '<div style="text-align:center;">-</div>' : tableVal;
}

function getLastDate(dateStr) {
	var date = new Date(dateStr);
	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	var lastDayWithSlashes = ((lastDay.getMonth() + 1) + '/' + lastDay.getDate()) + '/' + lastDay.getFullYear() + ':0:0:0';
	return lastDayWithSlashes;
}

function getFirstDate(dateStr) {
	var date = new Date(dateStr);
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var firstDayWithSlashes = ((firstDay.getMonth() + 1) + '/' + firstDay.getDate()) + '/' + firstDay.getFullYear() + ':0:0:0';
	return firstDayWithSlashes;
}

function getExportMonthSetter(dateoffset, monthoffset) {
	var date = new Date();
	var lastDay = new Date(date.setDate(date.getDate() - dateoffset));
	var lastmonth = new Date(lastDay.getFullYear(), lastDay.getMonth() + monthoffset, dateoffset);
	var lastDayWithSlashes = ((lastmonth.getMonth() + 1) + '/' + lastmonth.getDate()) + '/' + lastmonth.getFullYear() + ':0:0:0';
	return lastDayWithSlashes;
}

function getExportDateSetter(dateoffset) {
	var date = new Date();
	var lastDay = new Date(date.setDate(date.getDate() - dateoffset));
	var lastDayWithSlashes = ((lastDay.getMonth() + 1) + '/' + lastDay.getDate()) + '/' + lastDay.getFullYear() + ':0:0:0';
	return lastDayWithSlashes;
}

function getExportDatePlusSetter(dateoffset) {
	var date = new Date();
	var lastDay = new Date(date.setDate(date.getDate() - dateoffset));
	var lastDayWithSlashes = ((lastDay.getMonth() + 1) + '/' + lastDay.getDate()) + '/' + lastDay.getFullYear() + ':23:59:59';
	return lastDayWithSlashes;
}

function emptyDateValidation(fromDateEle, toDateEle) {
	var fromDate = $("#" + fromDateEle);
	var toDate = $("#" + toDateEle);
	if (undefined === fromDate.val() || '' === fromDate.val()) {
		fromDate.css('border', 'red 1px solid');
		fromDate.css('background', '#f7c8c9');
	}
	if (undefined === toDate.val() || '' === toDate.val()) {
		toDate.css('border', 'red 1px solid');
		toDate.css('background', '#f7c8c9');
	}
}

function clearDatePicker(fromDateEle, toDateEle, fromStartVal, fromEndVal, toStartVal, toEndVal) {
	var fromDate = $("#" + fromDateEle);
	var toDate = $("#" + toDateEle);
	fromDate.datepicker('setStartDate', fromStartVal);
	fromDate.datepicker('setEndDate', fromEndVal);
	toDate.datepicker('setStartDate', toStartVal);
	toDate.datepicker('setEndDate', toEndVal);
}

function getQueryForOpsIncident(mapName, kpikey, countryParam, incidentParam, fromDate, toDate, serviceType) {

	//var query = mapName[kpikey];
	var query = eval(mapName + "['" + kpikey + "']");
	if (countryParam != undefined || countryParam == "") {
		//replace all the country param to respective country
		query = query.replace(/countryParam/gi, countryParam);
	}
	if (incidentParam != undefined) {
		query = query.replace(/incidentParam/gi, incidentParam);
	}
	if (fromDate != undefined) {
		query = query.replace(/updatedFromDate/gi, fromDate);
		query = query.replace(/updatedToDate/gi, toDate);
	}
	if (undefined !== serviceType) {
		query = query.replace(/serviceTypeParam/gi, serviceType);
	}

	return query;
}

// For Interface Monitoring - Start
// Remove the duplicate entries if any came into results and available array nodes
function removeByAttr(arr, attr, value) {
	var i = arr.length;
	while (i--) {
		if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
			arr.splice(i, 1);
		}
	}
	return arr;
}

// Converting the query results to common object for code optimize and removed hardcodes.
function convertResultToJSON(resultData) {
	var finalData = {
		data: []
	};
	if (undefined !== resultData && '' !== resultData) {
		for (var inx = 0; inx < resultData.rows.length; inx++) {
			var tempData = {};
			for (var j = 0; j < resultData.fields.length; j++) {
				tempData[resultData.fields[j].toLowerCase()] = resultData.rows[inx][j];
			}
			finalData.data.push(tempData);
		}
	} else {
		return "";
	}
	return finalData;
}
// For Interface Monitoring - End

// Format Decimal input
function formatDecimal(number) {
	return (number < 10 ? '0' : '') + number;
}

// To animate the showing preloader
function showLoader(parentDiv, loaderDiv) {
	$('#' + parentDiv).html('<div id=' + loaderDiv + ' class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
	$('#' + loaderDiv).show();
}

// Code Optimize 
// To be used for stackbar chart
// remove duplicates of array and push into new array
function getUniqueArray(srcArr) {
	var uniqueArr = [];
	$.each(srcArr, function (i, el) {
		if ($.inArray(el, uniqueArr) === -1) uniqueArr.push(el);
	});
	return uniqueArr;
}

String.format = function () {
	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i += 1) {
		var reg = new RegExp('\\{' + i + '\\}', 'gm');
		s = s.replace(reg, arguments[i + 1]);
	}
	return s;
};

// Clear the session variables
function clearSessionVariables() {
	localStorage.removeItem("loggedInUserData");
	localStorage.removeItem("selectedCountryList");
	localStorage.removeItem("selectedOldCountryList");
	localStorage.removeItem("globalUserServiceTypeList");
	localStorage.removeItem("selectedDefaultCountryList");
	localStorage.removeItem("selectedCountryDiv");
	localStorage.removeItem("loggedInUser");
}



function dateFormatter() {
	return this.value.toString().substring(0, 5);
}

