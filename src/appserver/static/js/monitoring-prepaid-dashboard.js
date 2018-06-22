	   var SearchManager = null;
	   var utils = null;
	   var currentSite = "GB";
	   require([
	   		"splunkjs/mvc",
	   		"splunkjs/mvc/utils",
	   		"splunkjs/mvc/tokenutils",
	   		"underscore",
	   		"jquery",

	   		"splunkjs/mvc/simplexml",
	   		"splunkjs/mvc/layoutview",
	   		"splunkjs/mvc/simplexml/dashboardview",
	   		"splunkjs/mvc/simplexml/dashboard/panelref",
	   		"splunkjs/mvc/simplexml/element/chart",
	   		"splunkjs/mvc/simplexml/element/event",
	   		"splunkjs/mvc/simplexml/element/html",
	   		"splunkjs/mvc/simplexml/element/list",
	   		"splunkjs/mvc/simplexml/element/map",
	   		"splunkjs/mvc/simplexml/element/single",
	   		"splunkjs/mvc/simplexml/element/table",
	   		"splunkjs/mvc/simplexml/element/visualization",
	   		"splunkjs/mvc/simpleform/formutils",
	   		"splunkjs/mvc/simplexml/eventhandler",
	   		"splunkjs/mvc/simplexml/searcheventhandler",
	   		"splunkjs/mvc/simpleform/input/dropdown",
	   		"splunkjs/mvc/simpleform/input/radiogroup",
	   		"splunkjs/mvc/simpleform/input/linklist",
	   		"splunkjs/mvc/simpleform/input/multiselect",
	   		"splunkjs/mvc/simpleform/input/checkboxgroup",
	   		"splunkjs/mvc/simpleform/input/text",
	   		"splunkjs/mvc/simpleform/input/timerange",
	   		"splunkjs/mvc/simpleform/input/submit",
	   		"splunkjs/mvc/searchmanager",
	   		"splunkjs/mvc/savedsearchmanager",
	   		"splunkjs/mvc/postprocessmanager",
	   		"splunkjs/mvc/simplexml/urltokenmodel"
	   		// Add comma-separated libraries and modules manually here, for example:
	   		// ..."splunkjs/mvc/simplexml/urltokenmodel",
	   		// "splunkjs/mvc/tokenforwarder"
	   	],
	   	function (
	   		mvc,
	   		utils,
	   		TokenUtils,
	   		_,
	   		$,
	   		DashboardController,
	   		LayoutView,
	   		Dashboard,
	   		PanelRef,
	   		ChartElement,
	   		EventElement,
	   		HtmlElement,
	   		ListElement,
	   		MapElement,
	   		SingleElement,
	   		TableElement,
	   		VisualizationElement,
	   		FormUtils,
	   		EventHandler,
	   		SearchEventHandler,
	   		DropdownInput,
	   		RadioGroupInput,
	   		LinkListInput,
	   		MultiSelectInput,
	   		CheckboxGroupInput,
	   		TextInput,
	   		TimeRangeInput,
	   		SubmitButton,
	   		SearchManager,
	   		SavedSearchManager,
	   		PostProcessManager,
	   		UrlTokenModel

	   		// Add comma-separated parameter names here, for example: 
	   		// ...UrlTokenModel, 
	   		// TokenForwarder
	   	) {

	   		var pageLoading = true;


	   		// 
	   		// TOKENS
	   		//

	   		// Create token namespaces
	   		var urlTokenModel = new UrlTokenModel();
	   		mvc.Components.registerInstance('url', urlTokenModel);
	   		var defaultTokenModel = mvc.Components.getInstance('default', {
	   			create: true
	   		});
	   		var submittedTokenModel = mvc.Components.getInstance('submitted', {
	   			create: true
	   		});

	   		urlTokenModel.on('url:navigate', function () {
	   			defaultTokenModel.set(urlTokenModel.toJSON());
	   			if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
	   				submitTokens();
	   			} else {
	   				submittedTokenModel.clear();
	   			}
	   		});

	   		// Initialize tokens
	   		defaultTokenModel.set(urlTokenModel.toJSON());

	   		function submitTokens() {
	   			// Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
	   			FormUtils.submitForm({
	   				replaceState: pageLoading
	   			});
	   		}

	   		function setToken(name, value) {
	   			defaultTokenModel.set(name, value);
	   			submittedTokenModel.set(name, value);
	   		}

	   		function unsetToken(name) {
	   			defaultTokenModel.unset(name);
	   			submittedTokenModel.unset(name);
	   		}
	   		SearchManager = require("splunkjs/mvc/searchmanager");
	   		utils = require("splunkjs/mvc/utils");
	   		//  custom changes for splunk js starts here,	
	   		function updateHelpText(mapKey) {
	   			getHelpText(mapKey, "openIncHelp");
	   			getHelpText(mapKey, "alarmHelp");
	   			getHelpText(mapKey, "mainWindowHelp");
	   			getHelpText(mapKey, "serverAvailHelp");
	   			getHelpText(mapKey, "topIncHelp");
	   			getHelpText(mapKey, "siteStatusHelp");
	   			getHelpText(mapKey, "interfaceMonitorHelp");
	   			getHelpText(mapKey, "siteAvailabilityHelp");
	   		}
	   		updateHelpText('monitorPreDashboardHelp');

	   		var height = $(window).height();
	   		//Resizing chart
	   		var chartHeight = ((height - 336) / 2);
	   		var serverTable = height - 480;
	   		// Margin-top for Mobile and web
	   		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	   		if (!isMobile) {
	   			$('.server-table').css('height', serverTable);
	   			$('#chartPreloader').css('height', chartHeight);
	   		} else {
	   			$('.server-table').css('height', '250px');
	   			$('#chartPreloader').css('height', '250px');
	   		}

	   		var svgElement = d3.select("svg");

	   		var interfaceValList = '';

	   		var siteMapping = {
	   			"NP": 'New Providence',
	   			"GB": 'Grand Bahama',
				   "CC": 'Curacao',
				   
	   		};

	   		// create serverlist as per lookup to sync with the data in SVG
	   		var serverList = d3.map()
	   			.set("occ1btc", "occ1_icon")
	   			.set("occ2btc", "occ2_icon")
	   			.set("sdp1abtc", "sdp1a_icon")
	   			.set("sdp2abtc", "sdp2a_icon")
	   			.set("sdp1bbtc", "sdp1b_icon")
	   			.set("sdp2bbtc", "sdp2b_icon")
	   			.set("ngcrsbi1cur", "crs_bi1_icon")
	   			.set("ngcrshm1cur", "crs_data1_icon")
	   			.set("ngcrshs2cur", "crs_data3_icon")
	   			.set("ngcrshs1cur", "crs_data2_icon")
	   			.set("ngcrshsm1cur", "crs_data4_icon")
	   			.set("ngcrsdm1cur", "crs_dm1_icon")
	   			.set("ngcrsds1cur", "crs_ds1_icon")
	   			.set("ccn1io2btc", "ccn1_icon")
	   			.set("ccn2io2btc", "ccn2_icon")
	   			.set("air1btc", "air1_icon")
	   			.set("air2btc", "air2_icon")
	   			.set("ngvs1bbtc", "ngvs1b_icon")
	   			.set("ngvs1abtc", "ngvs1a_icon")
	   			.set("ngvs1cbtc", "ngvs1c_icon")
	   			.set("ecmsappsrv1cur", "ecms_app1_icon")
	   			.set("ecmsdbsrv1cur", "ecms_db_icon")
	   			.set("ecmsappsrv2cur", "ecms_app2_icon");

	   		// create interfacelist for sigma connections, we can create new map var for the individual interface connections
	   		var interfaceList = d3.map()
	   			.set("cursmp01", "smp1_bes_line")
	   			.set("cursmp02", "smp2_bes_line");

	   		//TO SELECT COUNTRY 
	   		var oldCountryList = "";
	   		var country = "";
	   		var serviceType = 'Prepaid';

	   		if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
	   			if (localStorage.getItem("globalUserServiceTypeList").indexOf("monitoring-prepaid") > -1) {
	   				oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
	   				country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
	   				loadSuccessPage();
	   				reloadAll();
	   			} else {
	   				loadErrorPage();
	   			}
	   		} else {
	   			loadErrorPage();
	   			var getDataInterval = setInterval(function () {
	   				if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
	   					if (localStorage.getItem("globalUserServiceTypeList").toString().match(/monitoring/g).length > 1) {
	   						oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
	   						country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
	   						loadSuccessPage();
	   						reloadAll();
	   						clearInterval(getDataInterval);
	   					}
	   				}
	   			}, 100);
	   		}
	   		$('.country-setting').click(
	   			function () {
	   				var newCountryList = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? JSON.parse(localStorage.getItem("selectedCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
	   				if (!$("#wrapper").hasClass("toggled")) {
	   					if (oldCountryList !== newCountryList) {
	   						country = localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","');
	   						reloadAll();
	   						oldCountryList = newCountryList;
	   					}
	   				}
	   			});

	   		function reloadAll() {
	   			//Incident by Priority
	   			var incByPriorityQuery = getQuery("monitorPrepaidQuery", "mon_home_incSeverity_chart", country, "", "", serviceType);
	   			var incByPrioritySearch = getOnlySearchResultsConstructor(incByPriorityQuery, "30m");

	   			incByPrioritySearch.on('search:progress', function (properties) {
	   				// Print just the event count from the search job
	   				$('#monitorPreloader').show();
	   			});
	   			incByPrioritySearch.on('search:done', function (properties) {
	   				var planType = [];
	   				var config = "";
	   				var incByPriorityResults = incByPrioritySearch.data("results");
	   				incByPriorityResults.on("data", function () {
	   					if (undefined != incByPriorityResults.data()) {
	   						var finalDataJson = convertResultToJSON(incByPriorityResults.data());
	   						planType = priorityDataProcessor(finalDataJson.data, "priority", "totalincidents");
	   					}
	   					config = setIncByPriorityConfig(planType);
	   					Highcharts.chart('incidentPriorityChart', config);
	   				});
	   				var monitorHome = {
	   					"incidentPriorityChart": {
	   						chart: {
	   							plotBackgroundColor: null,
	   							plotBorderWidth: 0,
	   							plotShadow: false,
	   							spacing: [0, 0, 0, 0]
	   						},
	   						title: {
	   							text: ''

	   						},
	   						exporting: {
	   							filename: "Incidents"
	   						},
	   						tooltip: {
	   							pointFormat: '{series.name}: <b>{point.y}</b>'
	   						},
	   						colors: ['#eb2b27', '#FF7518'],
	   						credits: false,
	   						plotOptions: {
	   							pie: {
	   								dataLabels: {
	   									enabled: true,
	   									distance: 50,
	   									style: {
	   										fontWeight: 'bold',
	   										color: 'black'
	   									}
	   								},
	   								startAngle: -90,
	   								endAngle: 90,
	   								center: ['50%', '75%']
	   							}
	   						},
	   						legend: {
	   							itemDistance: 20,
	   							padding: 0,
	   							itemMarginTop: 4,
	   							itemMarginBottom: 2
	   						},
	   						series: [{
	   							type: 'pie',
	   							name: 'Incident Count',
	   							innerSize: '45%',
	   							data: [],
	   							point: {
	   								events: {
	   									click: function (event) {
	   										if (this.y > 0) {
	   											IncidentOnclick(this.name);
	   										}
	   									}
	   								}
	   							}
	   						}]
	   					},
	   					"incidentPriorityChartEmpty": {
	   						chart: {
	   							plotBackgroundColor: null,
	   							plotBorderWidth: 0,
	   							plotShadow: false,
	   							spacing: [0, 0, 0, 0]
	   						},
	   						title: {
	   							text: ''

	   						},
	   						exporting: {
	   							filename: "Incidents"
	   						},
	   						tooltip: {
	   							pointFormat: '{series.name}: <b>{point.y}</b>'
	   						},
	   						colors: ['#eb2b27', '#FF7518'],
	   						credits: false,
	   						plotOptions: {
	   							pie: {
	   								dataLabels: {
	   									enabled: true,
	   									distance: 50,
	   									style: {
	   										fontWeight: 'bold',
	   										color: 'black'
	   									}
	   								},
	   								startAngle: -90,
	   								endAngle: 90,
	   								center: ['50%', '75%']
	   							}
	   						},
	   						legend: {
	   							itemDistance: 20,
	   							padding: 0,
	   							itemMarginTop: 4,
	   							itemMarginBottom: 2
	   						},
	   						series: [{
	   							type: 'pie',
	   							name: 'Incident Count',
	   							innerSize: '45%',
	   							data: [],
	   							point: {
	   								events: {
	   									click: function (event) {
	   										if (this.y > 0) {
	   											IncidentOnclick(this.name);
	   										}
	   									}
	   								}
	   							}
	   						}]
	   					}
	   				};

	   				Highcharts.chart('incidentPriorityChart', monitorHome.incidentPriorityChartEmpty);
	   				$('#monitorPreloader').hide();

	   			});

	   			//Top 5 Incidents
	   			var topIncidentQuery = getQuery("monitorPrepaidQuery", "mon_home_incSearch_chart", country, "", "", serviceType);
	   			var topIncidentSearch = getOnlySearchResultsConstructor(topIncidentQuery, "30m");

	   			var incidentTableData = getTableHeaderValue("topIncident");
	   			topIncidentSearch.on('search:progress', function (properties) {
	   				// Print just the event count from the search job
	   				$('#monitorPreloader').show();
	   			});
	   			topIncidentSearch.on('search:done', function (properties) {
	   				var topIncidentResults = topIncidentSearch.data("results");
	   				topIncidentResults.on("data", function () {
	   					if (undefined !== topIncidentResults.data()) {
	   						var finalDataJson = convertResultToJSON(topIncidentResults.data());
	   						processQueryResults(finalDataJson.data, incidentTableData, "topIncident", "topIncidentsDiv", "date", "comments");
	   					}
	   				});
	   				showNoData(incidentTableData, "topIncidentsDiv", 2);
	   			});


	   			//Maintenance Window
	   			var maintenanceWindowQuery = getQuery("monitorPrepaidQuery", "mon_home_incMainWindow_chart", country, "", "", serviceType);
	   			var maintenanceWindowSearch = getOnlySearchResultsConstructor(maintenanceWindowQuery, "30m");

	   			var maintainTableData = getTableHeaderValue("maintenanceWindow");
	   			maintenanceWindowSearch.on('search:progress', function (properties) {
	   				// Print just the event count from the search job
	   				$('#monitorPreloader').show();
	   			});
	   			maintenanceWindowSearch.on('search:done', function (properties) {
	   				var maintenanceWindowResults = maintenanceWindowSearch.data("results", {
	   					count: 0,
	   					offset: 0
	   				});
	   				maintenanceWindowResults.on("data", function () {
	   					if (undefined !== maintenanceWindowResults.data()) {
	   						var finalDataJson = convertResultToJSON(maintenanceWindowResults.data());
	   						processQueryResults(finalDataJson.data, maintainTableData, "maintenanceWindow", "maintenanceWindowDiv", "schedule", "ticketid", "remarks");
	   					}
	   				});
	   				showNoData(maintainTableData, "maintenanceWindowDiv", 3);
	   			});


	   			//Alarm Summary
	   			var alarmData = null;
	   			var tempCountry = country.toLowerCase();
	   			var upperCountry = tempCountry.charAt(0).toUpperCase() + tempCountry.substr(1);
	   			var alarmDataQuery = getQuery("monitorPrepaidQuery", "mon_home_incAlarm_chart", upperCountry, "", "", serviceType);
	   			var alarmDataSearch = getOnlySearchResultsConstructor(alarmDataQuery, "30m");

	   			alarmDataSearch.on('search:progress', function (properties) {
	   				// Print just the event count from the search job
	   				$('#monitorPreloader').show();
	   			});
	   			var alarmDataResults = alarmDataSearch.data("results");
	   			alarmDataSearch.on('search:done', function (properties) {
	   				alarmDataResults.on("data", function () {
	   					if (undefined !== alarmDataResults.data()) {
	   						var finalDataJson = convertResultToJSON(alarmDataResults.data());
	   						processAlarmDataResults(finalDataJson.data, "critical", "major", "minor");
	   					}
	   				});
	   			});

	   			function processAlarmDataResults(rows, critical, major, minor) {
	   				// The search results
	   				var Data = rows;
	   				var criticalCount;
	   				var majorCount;
	   				var minorCount;
	   				Data.forEach(function (alarmData) {
	   					(undefined != (alarmData[critical])) ? criticalCount = alarmData[critical]: criticalCount = 0;
	   					(undefined != (alarmData[major])) ? majorCount = alarmData[major]: majorCount = 0;
	   					(undefined != (alarmData[minor])) ? minorCount = alarmData[minor]: minorCount = 0;
	   				});

	   				$("#criticalCount").text(criticalCount);
	   				$("#majorCount").text(majorCount);
	   				$("#minorCount").text(minorCount);

	   				if (criticalCount != 0) {
	   					$("#criticalBtn").addClass("animated");
	   					$("#criticalBtn").addClass("infinite");
	   					$("#criticalBtn").addClass("pulse");
	   				}
	   				setButtonSize(criticalCount, "criticalBtn");
	   				setButtonSize(majorCount, "majorBtn")
	   				setButtonSize(minorCount, "minorBtn")
	   			}

	   			// Set the alarm button size
	   			function setButtonSize(alarmCount, alarmButton) {
	   				if (0 !== alarmCount && alarmCount > 999) {
	   					$("#" + alarmButton + " span").css("margin-left", "-4px");
	   				} else if (alarmCount <= 0) {
	   					$("#" + alarmButton + " span").css('cursor', 'default');
	   				}
	   			}

	   			//Incident details 
	   			var incidentDetailsSearch = getOnlySearchResultsConstructor("", "0");
	   			var incidentDetailsTableData = "";

	   			function IncidentOnclick(priority) {
	   				$('#preloader').show();
	   				$('#status').show();
	   				var urgency = priority.split("")[1]; // get priority from name
	   				incidentDetailsSearch.settings.unset("search");

	   				incidentDetailsSearch.settings.set("search", getMonitoringQuery("monitorPrepaidQuery", "mon_home_incidentModal_chart", urgency, "", country, serviceType));
	   				incidentDetailsSearch.startSearch();
	   				incidentDetailsSearch.on('search:progress', function (properties) {
	   					// Print just the event count from the search job
	   					$('#monitorPreloader').show();
	   				});
	   				incidentDetailsSearch.on('search:done', function (properties) {
	   					var incidentDetailsResults = incidentDetailsSearch.data("results", {
	   						"count": 0,
	   						"offset": 0
	   					});
	   					incidentDetailsResults.on("data", function () {
	   						if (undefined !== incidentDetailsResults.data()) {
	   							incidentDetailsTableData = '';
	   							incidentDetailsTableData = getTableHeaderValue("incidentDetails");
	   							var finalDataJson = convertResultToJSON(incidentDetailsResults.data());
	   							processQueryResults(finalDataJson.data, incidentDetailsTableData, "incidentDetails", "incDetailDiv", "incidentid", "reporteddate", "summary", "sourcesystem", "createdby", "owner", "severity", "status");
	   							$('#incident-modal').modal('show');
	   						}
	   						$('#monitorPreloader').hide();
	   						$('#preloader').hide();
	   						$('#status').hide();
	   					});
	   				});
	   			}

	   			//System availabilty
	   			var tempCountry = country.toLowerCase();
	   			var upperCountry = tempCountry.charAt(0).toUpperCase() + tempCountry.substr(1);
	   			var sysAvailDataQuery = getQuery("monitorPrepaidQuery", "mon_home_incSysAvail_chart", upperCountry, "", "", serviceType);
	   			var sysAvailDataSearch = getOnlySearchResultsConstructor(sysAvailDataQuery, "30m");
	   			var sysAvailTableData = getTableHeaderValue("sysAvail");
	   			sysAvailDataSearch.on('search:progress', function (properties) {
	   				// Print just the event count from the search job
	   				$('#monitorPreloader').show();
	   			});
	   			var sysAvailDataResults = sysAvailDataSearch.data("results");
	   			sysAvailDataResults.on("data", function () {
	   				if (undefined !== sysAvailDataResults.data()) {
	   					var greenUp = 'fa fa-arrow-circle-up text-dark-green';
	   					var redDown = 'fa fa-arrow-circle-down text-red';
	   					var providence = redDown;
	   					var curacao = redDown;
	   					var grandbahamas = redDown;

	   					var finalDataJson = convertResultToJSON(sysAvailDataResults.data());
	   					var data = finalDataJson.data;
	   					data.forEach(function (results) {
	   						if (100 === parseInt(results.newprovidence))
	   							providence = greenUp;
	   						if (100 === parseInt(results.curacao))
	   							curacao = greenUp;
	   						if (100 === parseInt(results.grandbahamas))
	   							grandbahamas = greenUp;
	   					});
	   					$('#site_providence').removeClass();
	   					$('#site_bahamas').removeClass();
	   					$('#site_curacao').removeClass();
	   					$('#site_providence').addClass(providence);
	   					$('#site_bahamas').addClass(curacao);
	   					$('#site_curacao').addClass(grandbahamas);
	   					//processQueryResults(finalDataJson.data, sysAvailTableData, "sysAvail", "sysAvailDiv", "country", "type", "available");
	   				}
	   				$('#monitorPreloader').hide();
	   			});

	   			//Alarm on click details 
	   			var alarmDetails = null;


	   			$("#minorBtn").on("click", {
	   				severity: "Minor"
	   			}, alarmOnclick);

	   			$("#majorBtn").on("click", {
	   				severity: "Major"
	   			}, alarmOnclick);

	   			$("#criticalBtn").on("click", {
	   				severity: "Critical"
	   			}, alarmOnclick);

	   			function alarmOnclick(event) {

	   				$('#minor-modal').modal('hide');
	   				$('#major-modal').modal('hide');
	   				$('#critical-modal').modal('hide');
	   				var severityMapping = {
	   					"Minor": '"warning","minor"',
	   					"Major": 'Major',
	   					"Critical": 'Critical',
	   				};
	   				var isSearch = false;
	   				var severity = event.data.severity; // get severity from event onclick
	   				if ("Minor" === severity) {
	   					var minorVal = $("#minorBtn span").text();

	   					if (minorVal > 0) {
	   						isSearch = true;
	   						$('#preloader').show();
	   						$('#status').show();
	   					}
	   				} else if ("Major" === severity) {
	   					var majorVal = $("#majorBtn span").text();
	   					if (majorVal > 0) {
	   						isSearch = true;
	   						$('#preloader').show();
	   						$('#status').show();
	   					}
	   				} else if ("Critical" === severity) {
	   					var criticalVal = $("#criticalBtn span").text();
	   					if (criticalVal > 0) {
	   						isSearch = true;
	   						$('#preloader').show();
	   						$('#status').show();
	   					}
	   				}

	   				if (isSearch) {
	   					var alarmDetailsSearch = getOnlySearchResultsConstructor('', "0");
	   					alarmDetailsSearch.settings.unset("search");
	   					alarmDetailsSearch.settings.set("search", getMonitoringQuery("monitorPrepaidQuery", "mon_home_alarmModal_chart", severityMapping[severity], "", country, serviceType));
	   					alarmDetailsSearch.startSearch();

	   					alarmDetailsSearch.on('search:progress', function (properties) {
	   						// Print just the event count from the search job
	   						$('#monitorPreloader').show();
	   					});
	   					alarmDetailsSearch.on('search:done', function (properties) {
	   						// Print just the event count from the search job

	   						var alarmDetailsResults = alarmDetailsSearch.data("results");
	   						alarmDetailsResults.on("data", function () {
	   							if (undefined !== alarmDetailsResults.data()) {
	   								var finalDataJson = convertResultToJSON(alarmDetailsResults.data());
	   								processAlarmDetailsResults(finalDataJson.data, severity, "date", "host", "comments"); // The search results
	   							}
	   							$('#monitorPreloader').hide();
	   							$('#preloader').hide();
	   							$('#status').hide();
	   						});
	   						$('#monitorPreloader').hide();
	   						$('#preloader').hide();
	   						$('#status').hide();
	   					});
	   				}
	   			}

	   			function processAlarmDetailsResults(rows, severity, date, host, comments) {
	   				// The search results
	   				alarmDetails = rows;
	   				if (null !== alarmDetails) {
	   					var tableData =
	   						'<table class="table table-hover table-bordered"><thead><tr><th width= "10%">Date</th><th width= "10%">Host</th><th width="10%">Comments</th></tr></thead><tbody>';
	   					//Code to list alarmDetails.
	   					for (var i = 0; i < alarmDetails.length; i++) {
							tableData += '<tr><td>' + formatNullValue(alarmDetails[i][date]) + '</td><td>' + formatNullValue(alarmDetails[i][host]) +
								'</td><td>' + formatNullValue(alarmDetails[i]
									[comments].replace(/,,/gi, '</br>')) + '</td></tr>';
						}
	   					tableData += '</tbody></table>';

	   					$('#minorAlarmDiv').html('');

	   					$('#majorAlarmDiv').html('');

	   					$('#criticalAlarmDiv').html('');
	   					if ('Minor' === severity) {
	   						$('#minor-modal').modal('show');
	   						$('#major-modal').modal('hide');
	   						$('#critical-modal').modal('hide');
	   						$('#minorAlarmDiv').html(tableData);
	   					} else if ('Major' === severity) {
	   						$('#minor-modal').modal('hide');
	   						$('#major-modal').modal('show');
	   						$('#critical-modal').modal('hide');
	   						$('#majorAlarmDiv').html(tableData);
	   					} else {
	   						$('#minor-modal').modal('hide');
	   						$('#major-modal').modal('hide');
	   						$('#critical-modal').modal('show');
	   						$('#criticalAlarmDiv').html(tableData);
	   					}
	   				}
	   			}

	   			function setIncByPriorityConfig(plan_type) {
	   				var finalData = [{
	   						name: 'P1',
	   						y: 0,
	   						color: '#ef5956'
	   					},
	   					{
	   						name: 'P2',
	   						y: 0,
	   						color: '#f69653'
	   					},
	   					{
	   						name: 'P3',
	   						y: 0,
	   						color: '#fdb94e'
	   					},
	   					{
	   						name: 'P4',
	   						y: 0,
	   						color: '#ffc907'
	   					}
	   				];
	   				finalData[0].y = plan_type.p1;
	   				finalData[1].y = plan_type.p2;
	   				finalData[2].y = plan_type.p3;
	   				finalData[3].y = plan_type.p4;
	   				monitorHome.incidentPriorityChart.series[0].data = finalData;
	   				return monitorHome.incidentPriorityChart;
	   			}

	   			// TO show no data text in data table
	   			function showNoData(tableData, divEle, colspanNo) {
	   				tableData += '<td align="center" colspan="' + colspanNo + '"> No data to display </td>';
	   				tableData += '</tbody></table>';
	   				$('#' + divEle).html(tableData);
	   			}

	   			// Results are processed to get into table
	   			function processQueryResults(queryResultData, queryTableData, tableType, divEle, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
	   				if (null !== queryResultData) {
	   					//Code to list maintenanceWindowData.
	   					if (queryResultData.length > 0) {
	   						queryTableData = generateDataTable(tableType, queryResultData, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
	   					} else {
	   						queryTableData += '<td align="center" colspan="3"> No data to display </td>';
	   					}
	   					queryTableData += '</tbody></table>';
	   					$('#' + divEle).html('').html(queryTableData);
	   				}
	   				$('#monitorPreloader').hide();
	   			}

	   			// Get Table header
	   			function getTableHeaderValue(tableType) {
					var tableHeader = '';
					if ("maintenanceWindow" == tableType) {
						tableHeader += '<table class="table table-condensed"><tbody><tr class="bg-grey" ><th width="25%">Schedule</th><th width="25%">SR#</th><th>Activity</th></tr>';
					} else if ("topIncident" == tableType) {
						tableHeader += '<table class="table table-condensed"><tbody><tr  class="bg-orange" ><th width="25%">Date</th><th>Comments</th></tr>';
					} else if ("incidentDetails" == tableType) {
						tableHeader += '<table class="table table-hover table-bordered"><thead><tr><th>Ticket ID</th><th width="15%">Reported Date</th><th>Summary</th><th>SourceSystem</th><th>Raised By</th><th>Owner</th><th>Severity</th><th>Status</th></tr></thead><tbody>';
					} else if ("sysAvail" == tableType) {
						tableHeader += '<table class="table table-condensed table-hover"><thead><tr><td>Country</td><td class="text-center">Prepaid</td><td class="text-center">Postpaid</td><td class="text-center">Fixed</td></tr></thead><tbody>';
					}
					return tableHeader;
				}

	   			// Generate table values with data
	   			function generateDataTable(tableType, queryResultData, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
	   				if ("maintenanceWindow" == tableType) {
	   					for (var i = 0; i < queryResultData.length; i++) {
	   						maintainTableData += '<tr><td class="bg-grey">' + formatNullValue(queryResultData[i][arg1]) + '</td><td>' +
	   							formatNullValue(queryResultData[i][arg2]) + '</td><td>' +
	   							formatNullValue(queryResultData[i][arg3]) + '</td></tr>';
	   					}
	   					return maintainTableData;
					} else if ("topIncident" == tableType) {
						for (var i = 0; i < queryResultData.length; i++) {
							incidentTableData += '<tr><td class="bg-orange" >' + formatNullValue(queryResultData[i][arg1]) + '</td><td>' + formatNullValue(queryResultData[
									i][arg2].replace(/,,/gi, '</br>')) +
								'</td></tr>';
						}
	   					return incidentTableData;
	   				} else if ("incidentDetails" == tableType) {
	   					for (var i = 0; i < queryResultData.length; i++) {
	   						incidentDetailsTableData += '<tr><td>' + formatNullValue(queryResultData[i][arg1]) + '</td><td>' +
	   							formatNullValue(queryResultData[i][arg2]) +
	   							'</td><td>' +
	   							formatNullValue(queryResultData[i][arg3]) + '</td><td>' + formatNullValue(queryResultData[i][arg4]) + '</td><td>' +
	   							formatNullValue(queryResultData[i][arg5]) +
	   							'</td><td>' + formatNullValue(queryResultData[i][arg6]) + '</td><td>' + formatNullValue(queryResultData[i][arg7]) +
	   							'</td><td>' + formatNullValue(queryResultData[i][arg8]) +
	   							'</td></tr>';
	   					}
	   					return incidentDetailsTableData;
	   				} else if ("sysAvail" == tableType) {
	   					for (var i = 0; i < queryResultData.length; i++) {
	   						sysAvailTableData += '<tr><td><b>' + formatNullValue(queryResultData[i][arg1]) +
	   							'</b></td><td class="text-center"><div class="table-icon">-</div></td>';
	   						var sysAvail = formatNullValue(queryResultData[i][arg3]);
	   						if (sysAvail == 1) {
	   							sysAvailTableData +=
	   								'<td class="text-center"><div class="table-icon"><i class="fa fa-arrow-circle-up text-dark-green" aria-hidden="true"></i></div></td><td class="text-center"><div class="table-icon">-</div></td></tr>';
	   						} else {
	   							sysAvailTableData +=
	   								'<td class="text-center"><div class="table-icon"><i class="fa fa-arrow-circle-down text-red" aria-hidden="true"></i></div></td><td class="text-center"><div class="table-icon">-</div></td></tr>';
	   						}
	   					}
	   					return sysAvailTableData;
	   				}
	   				return '';
	   			}

	   			function getOnlySearchResultsConstructor(query, interval) {
	   				var searchmanager = new SearchManager({
	   					"cancelOnUnload": true,
	   					"refresh": "0",
	   					"refreshType": "delay",
	   					"sample_ratio": 1,
	   					"earliest_time": "0",
	   					"status_buckets": 0,
	   					"cache": true,
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

	   			// Chart config for incident severtity chart
	   			var monitorHome = {
	   				"incidentPriorityChart": {
	   					chart: {
	   						plotBackgroundColor: null,
	   						plotBorderWidth: 0,
	   						plotShadow: false,
	   						spacing: [0, 0, 0, 0]
	   					},
	   					title: {
	   						text: ''

	   					},
	   					exporting: {
	   						filename: "Incidents"
	   					},
	   					tooltip: {
	   						pointFormat: '{series.name}: <b>{point.y}</b>'
	   					},
	   					colors: ['#eb2b27', '#FF7518'],
	   					credits: false,
	   					plotOptions: {
	   						pie: {
	   							dataLabels: {
	   								enabled: true,
	   								distance: 50,
	   								style: {
	   									fontWeight: 'bold',
	   									color: 'black'
	   								}
	   							},
	   							startAngle: -90,
	   							endAngle: 90,
	   							center: ['50%', '75%']
	   						}
	   					},
	   					legend: {
	   						itemDistance: 20,
	   						padding: 0,
	   						itemMarginTop: 4,
	   						itemMarginBottom: 2
	   					},
	   					series: [{
	   						type: 'pie',
	   						name: 'Incident Count',
	   						innerSize: '45%',
	   						data: [],
	   						point: {
	   							events: {
	   								click: function (event) {
	   									if (this.y > 0) {
	   										IncidentOnclick(this.name);
	   									}
	   								}
	   							}
	   						}
	   					}]
	   				},
	   				"incidentPriorityChartEmpty": {
	   					chart: {
	   						plotBackgroundColor: null,
	   						plotBorderWidth: 0,
	   						plotShadow: false,
	   						spacing: [0, 0, 0, 0]
	   					},
	   					title: {
	   						text: ''

	   					},
	   					exporting: {
	   						filename: "Incidents"
	   					},
	   					tooltip: {
	   						pointFormat: '{series.name}: <b>{point.y}</b>'
	   					},
	   					colors: ['#eb2b27', '#FF7518'],
	   					credits: false,
	   					plotOptions: {
	   						pie: {
	   							dataLabels: {
	   								enabled: true,
	   								distance: 50,
	   								style: {
	   									fontWeight: 'bold',
	   									color: 'black'
	   								}
	   							},
	   							startAngle: -90,
	   							endAngle: 90,
	   							center: ['50%', '75%']
	   						}
	   					},
	   					legend: {
	   						itemDistance: 20,
	   						padding: 0,
	   						itemMarginTop: 4,
	   						itemMarginBottom: 2
	   					},
	   					series: [{
	   						type: 'pie',
	   						name: 'Incident Count',
	   						innerSize: '45%',
	   						data: [],
	   						point: {
	   							events: {
	   								click: function (event) {
	   									if (this.y > 0) {
	   										IncidentOnclick(this.name);
	   									}
	   								}
	   							}
	   						}
	   					}]
	   				}
	   			}

				$("#homeId").click(function () {
					$("#preloader").show();
					$('#status').show();
					$('#preloader').delay(2000).fadeOut('slow');
					$('#status').delay(2000).fadeOut('slow');
				});

				$("#siteMonitorId").click(function () {
					$("#preloader").show();
					$('#status').show();
					$('#preloader').delay(2000).fadeOut('slow');
					$('#status').delay(2000).fadeOut('slow');
					   //Animate CSS
					   $('.card').addClass('animated zoomIn');
					   //Height of the Tab and maps
					   var height = $(window).height();
	   			var mapHeight = (height - 220);
	   			$("#monitoringMap").css("height", mapHeight);

	   				var tabHeight = (height - 160);
	   				$(".card-tab").css("height", tabHeight);

					   var svgHeight = height - 400;
					   
//Resizing chart
var chartHeight = ((height - 336) / 2);
var serverTable = height - 480;
// Margin-top for Mobile and web
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
if (!isMobile) {
	$('.server-table').css('height', serverTable);
	$('#chartPreloader').css('height', chartHeight);
} else {
	$('.server-table').css('height', '250px');
	$('#chartPreloader').css('height', '250px');
}

	   				// var svgHeight = height - 400;
	   				// $('.svg-container').css('height', svgHeight);
	   				var data = {};
	   				$("#servers option").each(function (i, el) {
	   					data[$(el).data("value")] = $(el).val();
	   				});

	   				$('#server-selected').change(function () {
	   					var value = $('#server-selected').val();
	   					var maptarget = $('#servers [value="' + value + '"]').data('value');
	   					$("#server_search").attr('data', maptarget);
	   				});

	   				// (Dont delete it)
	   				// Nassau -> 25.0479835, -77.355413 & Curacao -> 12.0989103, -68.8585774 & Haiti(map center) -> 18.594395, -72.3074326
	   				// jamaica lat->40.7143528,lon->-40.7143528 ,74.0059731  
	   				//barbados 13.193887,-59.543198
	   				// cayman 19.3133,-81.2546
	   				var myCenter = new google.maps.LatLng(18.594395, -72.3074326);
	   				var pmap;
	   				var bahamas, curacao, newprovidence, all;


	   				initialize();

	   				function initialize() {
	   					$('.locate-in-map').click(function (event) {
	   						if ("" != $("#server-selected").val()) {
	   							var ll = $(this).attr('data');
	   							if ('ALL' == $("#server-selected").val().toUpperCase()) {
	   								google.maps.event.trigger(all, 'click');
	   							} else if ('BAHAMAS' == $("#server-selected").val().toUpperCase()) {
	   								google.maps.event.trigger(bahamas, 'click');
	   							} else if ('CURACAO' == $("#server-selected").val().toUpperCase()) {
	   								google.maps.event.trigger(curacao, 'click');
	   							} else if ('NEWPROVIDENCE' == $("#server-selected").val().toUpperCase()) {
	   								google.maps.event.trigger(newprovidence, 'click');
	   							}
	   							if ('ALL' != $("#server-selected").val().toUpperCase()) {
	   								var nll = ll.split(",");
	   								var n_latLng = new google.maps.LatLng(nll[0], nll[1]);
	   								pmap.panTo(n_latLng);
	   							}
	   							$("#server-selected").val('');
	   						} else {
	   							$("#server-selected").css("border:", "2px solid red");
	   						}
	   					});


	   					pmap = new google.maps.Map(document.getElementById('monitoringMap'), {
	   						center: myCenter,
	   						mapTypeId: google.maps.MapTypeId.ROADMAP,
	   						scrollwheel: false,
	   						zoom: 5,
	   						labels: true
	   					});

	   					all = new google.maps.Marker({
	   						position: new google.maps.LatLng(12.0989103, -68.8585774),
	   						map: pmap,
	   						//icon: 'static/images/server.png'
	   					});

	   					all.addListener('click', function () {
	   						siteDetailsData(["GB", "CC", "NP"], true);
	   						$(".site-table").show();
	   					});
	   					bahamas = new google.maps.Marker({
	   						position: new google.maps.LatLng(26.6450848, -78.3923034),
	   						map: pmap,
	   						// icon: '../static/images/server.png'
	   					});
	   					bahamas.addListener('click', function () {
	   						siteDetailsData("GB");
	   						$(".site-table").show();
	   					});


	   					curacao = new google.maps.Marker({
	   						position: new google.maps.LatLng(12.0989103, -68.8585774),
	   						map: pmap,
	   						//icon: 'static/images/server.png'
	   					});
	   					curacao.addListener('click', function () {
	   						siteDetailsData("CC");
	   						$(".site-table").show();
	   					});

	   					newprovidence = new google.maps.Marker({
	   						position: new google.maps.LatLng(25.0480, -77.3554),
	   						map: pmap,
	   						//icon: 'static/images/server.png'
	   					});
	   					newprovidence.addListener('click', function () {
	   						siteDetailsData("NP");
	   						$(".site-table").show();
	   					});

	   					google.maps.event.trigger(all, 'click');

	   				}

	   			});


	   			// click for IM flow
	   			$("#interfaceMonitorId").click(function () {
					$("#preloader").show();
					$('#status').show();
					$('#preloader').delay(2000).fadeOut('slow');
					$('#status').delay(2000).fadeOut('slow');
	   				var availableQueue = [];
	   				var height = window.innerHeight;
	   				var half_height = height - 120;
	   				var svgHeight = height - 170;
	   				$('.tab-pane').css('height', half_height);
	   				$('object').css('height', svgHeight);
	   				$('svg').css('height', svgHeight);

	   				// interfaceValList = interfaceList;
	   				// loadInterfaces("mon_post_interfaceAvail", interfaceValList);

	   				// function loadInterfaces(queryKey, interfaceValList) {
	   				// 	// get the base query to load the availablity of the interfaces in SVG.
	   				// 	var interfaceStatusResults = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", queryKey, '', '', interfaceValList.keys()), "30m");

	   				// 	interfaceStatusResults.on("search:progress", function () {
	   				// 		$("#preloader").show();
	   				// 		$('#status').show();
	   				// 	});

	   				// 	interfaceStatusResults.on("search:done", function () {
	   				// 		var interfaceResults = interfaceStatusResults.data("results", {
	   				// 			"count": 0,
	   				// 			"offset": 0
	   				// 		});
	   				// 		interfaceResults.on("data", function () {
	   				// 			// this data will have queue details which are changed in latest time frame, other queuestatus will be Not_Availasble
	   				// 			if (undefined != interfaceResults.data() || null != interfaceResults.data()) {
	   				// 				// The search results
	   				// 				var finalDataJson = convertResultToJSON(interfaceResults.data());
	   				// 				var notAvailableQueue = loadInterfaceElements(finalDataJson.data, availableQueue);
	   				// 				notAvailableQueue = removeDuplFromQueueName(notAvailableQueue);
	   				// 				var tempStr = notAvailableQueue.toString().split('\",\"');
	   				// 				notAvailableQueue = tempStr.join('\" OR \"');
	   				// 				// click of individual interfaces lines
	   				// 				svgElement.selectAll(".prepaid_interface_shape").on("click", function (d) {
	   				// 					var thisNode = d3.select(this);
	   				// 					var interfaceData = '';
	   				// 					refreshModalRows();
	   				// 					if ("InterfaceFound" === thisNode.attr("status")) {
	   				// 						// query for getting the missed queues
	   				// 						var interfaceDetailsQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_interfaceQueueStatus", '', '', thisNode.attr("hostname"), notAvailableQueue), "0");

	   				// 						interfaceDetailsQuery.on("search:progress", function () {
	   				// 							$("#preloader").show();
	   				// 							$('#status').show();
	   				// 						});

	   				// 						interfaceDetailsQuery.on("search:done", function () {
	   				// 							var interfaceDetailsResults = interfaceDetailsQuery.data("results", {
	   				// 								"count": 0,
	   				// 								"offset": 0
	   				// 							});
	   				// 							interfaceDetailsResults.on("data", function () {
	   				// 								if (undefined !== interfaceDetailsResults.data()) {
	   				// 									// The search results
	   				// 									//availableQueue = removeDuplFromQueueName(availableQueue);
	   				// 									var finalData = convertResultToJSON(interfaceDetailsResults.data());
	   				// 									var interfaceDetailsData = processQueueDetails(availableQueue, finalData.data);
	   				// 									loadInterfaceDetails(interfaceDetailsData, thisNode,
	   				// 										"interface_details_table_header",
	   				// 										"interface_details_table_values");
	   				// 								}
	   				// 							});
	   				// 							if (undefined !== interfaceData && '' !== interfaceData) {
	   				// 								loadInterfaceDetails(availableQueue, thisNode,
	   				// 									"interface_details_table_header",
	   				// 									"interface_details_table_values");
	   				// 							} else {
	   				// 								loadNoDataIntoModal("interface_details_table_header", "interface_details_table_values", "No Data to display");
	   				// 							}
	   				// 						});
	   				// 					} else if ("InterfaceNotFound" === thisNode.attr("status")) {
	   				// 						loadInterfaceDataIntoModal("No Data", "interface_details_table_header", "interface_details_table_values", thisNode);
	   				// 					}
	   				// 					$("#preloader").hide();
	   				// 					$('#status').hide();
	   				// 				});
	   				// 			}
	   				// 		});
	   				// 		$("#preloader").hide();
	   				// 		$('#status').hide();
	   				// 	});

	   				// }

	   				var nodesStatusResults = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPrepaidQuery", "mon_pre_nodeAvail"), "30m");

	   				nodesStatusResults.on("search:progress", function () {
	   					$("#preloader").show();
	   					$('#status').show();
	   				});

	   				nodesStatusResults.on("search:done", function () {
	   					var nodesResults = nodesStatusResults.data("results", {
	   						"count": 0,
	   						"offset": 0
	   					});
	   					nodesResults.on("data", function () {
	   						if (undefined != nodesResults.data()) {
	   							//The search results
	   							var nodeResultsJSON = convertResultToJSON(nodesResults.data());
	   							loadNodeElements(nodeResultsJSON.data);
	   							svgElement.selectAll(".prepaidNodeAvail").on("click", function (d) {
	   								var thisNode = d3.select(this);
	   								refreshModalRows();
	   								if ("Found" === thisNode.attr("status")) {
	   									// var nodesCPUQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPrepaidQuery", "mon_post_cpuLoad", thisNode.attr("host")),  "0");

	   									// nodesCPUQuery.on("search:progress", function () {
	   									//     $("#preloader").show();
	   									//     $('#status').show();
	   									// });

	   									// nodesCPUQuery.on("search:done", function () {
	   									//     var nodesCPUResults = nodesCPUQuery.data("results", {
	   									//         "count": 0,
	   									//         "offset": 0
	   									//     });
	   									//     nodesCPUResults.on("data", function () {
	   									//         if (undefined !== nodesCPUResults.data()) {
	   									//             // The search results
	   									//             var nodeCPUData = convertResultToJSON(nodesCPUResults.data());
	   									//             loadNodeDetails(nodeCPUData.data, thisNode, "node_cpu_table_header", "node_cpu_table_values");
	   									//         }
	   									//     });
	   									//     loadNoDataIntoModal("node_cpu_table_header", "node_cpu_table_values", "No Data to display");
	   									// });

	   									// var nodesAlertQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPrepaidQuery", "mon_post_Alerts", thisNode.attr("host")),  "0");

	   									// nodesAlertQuery.on("search:done", function () {
	   									//     var nodesAlertResults = nodesAlertQuery.data("results", {
	   									//         "count": 0,
	   									//         "offset": 0
	   									//     });
	   									//     nodesAlertResults.on("data", function () {
	   									//         if (undefined !== nodesAlertResults.data()) {
	   									//             // The search results
	   									//             var nodeAlertData = convertResultToJSON(nodesAlertResults.data());
	   									//             loadNodeDetails(nodeAlertData.data, thisNode, "node_alerts_table_header", "node_alerts_table_values");
	   									//         }
	   									//     });
	   									//     loadNoDataIntoModal("node_alerts_table_header", "node_alerts_table_values", "No Data to display");
	   									// });

	   									var nodesDetailsQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPrepaidQuery", "mon_pre_nodeDetails", thisNode.attr("host")), "0");

	   									nodesDetailsQuery.on("search:done", function () {
	   										var nodesDetailsResults = nodesDetailsQuery.data("results", {
	   											"count": 0,
	   											"offset": 0
	   										});
	   										nodesDetailsResults.on("data", function () {
	   											if (undefined !== nodesDetailsResults.data()) {
	   												// The search results
	   												var nodeDetailsData = convertResultToJSON(nodesDetailsResults.data());
	   												loadNodeDetails(nodeDetailsData.data, thisNode, "node_details_table_header", "node_details_table_values");
	   											}
	   										});
	   										loadNoDataIntoModal("node_details_table_header", "node_details_table_values", "No Data to display");
	   									});

	   									// var nodesDiskQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPrepaidQuery", "mon_post_diskUsage", thisNode.attr("host")),  "0");

	   									// nodesDiskQuery.on("search:done", function () {
	   									//     var nodesDiskResults = nodesDiskQuery.data("results", {
	   									//         "count": 0,
	   									//         "offset": 0
	   									//     });
	   									//     nodesDiskResults.on("data", function () {
	   									//         if (undefined !== nodesDiskResults.data()) {
	   									//             // The search results
	   									//             var nodeDiskData = convertResultToJSON(nodesDiskResults.data());
	   									//             loadNodeDetails(nodeDiskData.data, thisNode, "node_disk_table_header", "node_disk_table_values");
	   									//         }
	   									//     });
	   									//     loadNoDataIntoModal("node_disk_table_header", "node_disk_table_values", "No Data to display");
	   									// });

	   									// var nodesProcessQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPrepaidQuery", "mon_post_diskUsage", thisNode.attr("host")),  "0");

	   									// nodesProcessQuery.on("search:done", function () {
	   									//     var nodesProcessResults = nodesProcessQuery.data("results", {
	   									//         "count": 0,
	   									//         "offset": 0
	   									//     });
	   									//     nodesProcessResults.on("data", function () {
	   									//         if (undefined !== nodesProcessResults.data()) {
	   									//             // The search results
	   									//             var nodeProcessData = convertResultToJSON(nodesProcessResults.data());
	   									//             loadNodeDetails(nodeProcessData.data, thisNode, "node_process_table_header", "node_process_table_values");
	   									//         }
	   									//     });
	   									//     loadNoDataIntoModal("node_process_table_header", "node_process_table_values", "No Data to display");
	   									// });


	   								} else if ("NotFound" === thisNode.attr("status")) {
	   									loadDataIntoModal("No Data", "node_details_table_header", "node_details_table_header", thisNode);
	   								}
	   								$("#preloader").hide();
	   								$('#status').hide();
	   							});
	   						}
	   					});
	   					$("#preloader").hide();
	   					$('#status').hide();
	   				});
	   			});

	   			$("#interfaceMonitorId").trigger("click");
	   			$("#siteMonitorId").trigger("click");
				$("#homeId").trigger("click");
				   
				function siteDetailsData(siteCentre, isAll) {

					currentSite = siteCentre;
					var siteDetailsQuery = monitoring_prepiad_site_monitoring["healthCheckSummary"];
					siteDetailsQuery = siteDetailsQuery.replace(/siteParam/gi, siteCentre.toString().replace(/[\[\]"]+/g, '').split(',').join('","'));
					//	 siteDetailsQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPrepaidQuery", "mon_post_siteCentre", '', siteCentre),  "30m");
					console.log(siteDetailsQuery);
					siteDetailsQuery = getOnlySearchResultsConstructor(siteDetailsQuery, "30m");
					siteDetailsQuery.on("search:progress", function () {
						$("#preloader").show();
						$('#status').show();
					});
 
					siteDetailsQuery.on("search:done", function () {
						var siteDetailsResults = siteDetailsQuery.data("results", {
							"count": 0,
							"offset": 0
						});
						siteDetailsResults.on("data", function () {
							if (undefined !== siteDetailsResults.data()) {
								// The search results
								var nodeSiteData = convertResultToJSON(siteDetailsResults.data());
								loadSiteDetails(nodeSiteData.data, "site_details_table_header", "site_details_table_values", siteCentre, isAll);
							}
							$("#site-name #siteName").text('');
							if (null !== isAll && "" !== isAll && isAll) {
								$("#site-name #siteName").text("Consolidated");
							} else {
								$("#site-name #siteName").text(siteMapping[siteCentre]);
							}
						});
 
						loadNoDataIntoModal("site_details_table_header", "site_details_table_values", "No Data to display");
					});
 
				}
	   		}

	   		

	   		function loadNodeElements(nodeData) {
	   			if ('' != nodeData || undefined != nodeData) {
	   				svgElement.selectAll(".prepaidNodeAvail").each(function () {
	   					d3.select(this).select('.prepaidNodeAvail').attr("status", "NotFound");
	   					d3.select(this).attr("data-original-title", "Not Available");
	   				}).datum(nodeData).each(function (d, i) {
	   					var tooltipData = '';
	   					if (i < nodeData.length) {
	   						if (null != serverList.get(nodeData[i].host)) {
	   							var thisNode = d3.select("#" + serverList.get(nodeData[i].host));
	   							var processData = nodeData[i];
	   							Object.keys(processData).forEach(function eachKey(key, indxVal) {
	   								thisNode.attr(key.toLowerCase(), '').attr(key.toLowerCase(), nodeData[i][key]); // to set hostname as attr in the interface node
	   								if (indxVal <= 4) {
	   									tooltipData += key.toUpperCase() + ' : ' + (null === nodeData[i][key] ? '-' : nodeData[i][key]) + '\n';
	   								}
	   							});
	   							thisNode.attr("status", "Found");
	   							thisNode.datum(processData).classed({
	   								'pass': function (d, i) {
	   									return d.healthcheckstatus == 1 ? true : false;
	   								},
	   								'warn': function (d, i) {
	   									return d.healthcheckstatus == -1 ? true : false;
	   								},
	   								'fail': function (d, i) {
	   									return d.healthcheckstatus == 0 ? true : false;
	   								}
	   							});
	   							//d3.select(thisNode.node().parentNode).attr("data-original-title", tooltipData);
	   							d3.select(thisNode.node()).attr("data-original-title", tooltipData);
	   						}
	   					}
	   				});
	   			}
	   		}

	   		// to load the contents into the interface lines as per the data.
	   		function loadInterfaceElements(nodeData, availableQueue) {
	   			var notAvailableQueue = [];
	   			availableQueue = nodeData;
	   			if ('' != nodeData || undefined != nodeData) {
	   				svgElement.selectAll(".prepaid_interface_shape").each(function () {
	   					d3.select(this).attr("status", "InterfaceNotFound");
	   					d3.select(this).attr("data-original-title", "Not Available");
	   				});
	   				svgElement.selectAll("[type='sigma']").each(function () {
	   					d3.select(this).attr("status", "InterfaceNotFound");
	   					d3.select(this).attr("data-original-title", "Not Available");
	   				}).datum(nodeData).each(function (d) {
	   					var tooltipData = '';
	   					var queueCount = 0;
	   					for (var i = 0; i < nodeData.length; i++) {
	   						if (null != interfaceValList.get(nodeData[i].hostname)) {
	   							var thisNode = d3.select("#" + interfaceValList.get(nodeData[i].hostname));
	   							Object.keys(nodeData[i]).forEach(function eachKey(key) {
	   								thisNode.attr(key.toLowerCase(), '').attr(key.toLowerCase(), nodeData[i][key]); // to set hostname as attr in the interface node
	   							});
	   							thisNode.attr('queueCount', queueCount);
	   							if (undefined !== nodeData[i]) {
	   								if (nodeData[i].queuestatus !== "JMX OK" || nodeData[i].queuestatus !== "Not_Available") {
	   									queueCount++;
	   									thisNode.attr('queueCount', '').attr('queueCount', queueCount);
	   								}
	   							}
	   							tooltipData = 'Host Name : ' + nodeData[i].hostname;
	   							if (undefined !== nodeData[i] && nodeData[i].queuestatus == "Not_Available") {
	   								notAvailableQueue.push(nodeData[i].queuename);
	   								availableQueue = removeByAttr(availableQueue, "queuename", nodeData[i].queuename);
	   							}
	   							thisNode.attr("status", "InterfaceFound");
	   							thisNode.classed({
	   								'interface-pass': queueCount == 0 ? true : false,
	   								'interface-warn': queueCount >= 1 ? true : false,
	   								'interface-fail': queueCount < 0 ? true : false
	   							});
	   							d3.select(thisNode.node()).attr("data-original-title", tooltipData);
	   						}
	   					}
	   				});
	   			}
	   			return notAvailableQueue;
	   		}

	   		function loadDataIntoModal(loadData, headerElement, valueElement, thisEle) {
	   			$("#" + valueElement + " tr").html('');
	   			$("#" + headerElement + " tr").html('');
	   			$("#nodeModalLabel span").text('');
	   			$("#node-modal .modal-body .table-responsive > div").css('display', 'block');
	   			if ("No Data" === loadData) {
	   				refreshModalRows();
	   				d3.select("#" + headerElement + " tr").append('th').text(function (d) {
	   					return "Node Not Available";
	   				});
	   				var nodeAlias = thisEle.attr("label");
	   				d3.select("#nodeModalLabel").data(nodeAlias).append("span").text(function (d) {
	   					return nodeAlias;
	   				}).classed({
	   					'unknown': true
	   				});
	   				$("#node-modal .modal-body .table-responsive > div").css('display', 'none');
	   			} else if (undefined != loadData) {
	   				for (var indx = 0; indx < loadData.length; indx++) {
	   					$("#" + headerElement + " tr").html('');
	   					$("#" + valueElement).append('<tr>');
	   					d3.select("#" + headerElement + " tr").selectAll('th').data(d3.keys(loadData[indx])).enter()
	   						.append('th').text(function (head) {
	   							return head.toUpperCase();
	   						});
	   					d3.select("#" + valueElement + " tr:nth-child(" + (indx + 1) + ")").selectAll('td').data(d3.values(loadData[indx])).enter()
	   						.append('td').text(function (val) {
	   							return val;
	   						});
	   				}
	   			}
	   			$('#node-modal').modal('show');
	   			$('#preloader').hide();
	   			$('#status').hide();
	   		}

	   		function loadNodeDetails(data, thisEle, nodeDivHeader, nodeDivValues) {
	   			loadDataIntoModal(data, nodeDivHeader, nodeDivValues, thisEle);
	   			var nodeAlias = thisEle.attr("host");
	   			var isNodeAvailable = thisEle.attr("backupcheckstatus");
	   			var isNodeSafe = thisEle.attr("healthcheckstatus");
	   			d3.select("#nodeModalLabel").data(nodeAlias).append("span").text(function (d) {
	   				return nodeAlias;
	   			}).classed({
	   				'pass': isNodeSafe == 1 ? true : false,
	   				'warn': isNodeSafe == -1 ? true : false,
	   				'fail': isNodeSafe == 0 ? true : false
	   			});
	   			$('#preloader').hide();
	   			$('#status').hide();
	   		}

	   		function loadInterfaceDetails(data, thisEle, nodeDivHeader, nodeDivValues) {
	   			loadInterfaceDataIntoModal(data, nodeDivHeader, nodeDivValues, thisEle);
	   			var queueStatusCount = thisEle.attr("queueCount");
	   			var nodeAlias = thisEle.attr("hostname");
	   			d3.select("#interfaceModalLabel").data(nodeAlias).append("span").text(function (d) {
	   				return nodeAlias;
	   			}).classed({
	   				'interface-pass': queueStatusCount == 0 ? true : false,
	   				'interface-warn': queueStatusCount >= 1 ? true : false,
	   				'interface-fail': queueStatusCount < 0 ? true : false
	   			});
	   			$('#preloader').hide();
	   			$('#status').hide();
	   		}

	   		function loadSiteDetails(data, nodeDivHeader, nodeDivValues, siteName, isAll) {
	   			$('#preloader').show();
	   			$('#status').show();
	   			loadSiteDataIntoModal(data, nodeDivHeader, nodeDivValues, siteName, isAll);
	   			$('#preloader').hide();
	   			$('#status').hide();
	   		}

	   		function loadNoDataIntoModal(headerEle, valueEle, textVal) {
	   			$("#" + valueEle + " tr").html('');
	   			$("#" + headerEle + " tr").html('');
	   			var msgText = '<th>' + textVal + '</th>';
	   			$("#" + headerEle + " tr").html(msgText);
	   			$("#preloader").hide();
	   			$('#status').hide();
	   		}

	   		// remove duplicate entries of final queue names -> double check to avoid duplicates
	   		function removeDuplFromQueueName(arr) {
	   			let unique_array = [];
	   			for (let i = 0; i < arr.length; i++) {
	   				if (unique_array.indexOf('\"' + arr[i] + '\"') == -1) {
	   					unique_array.push('\"' + arr[i] + '\"');
	   				}
	   			}
	   			return unique_array;
	   		}

	   		// add the avaliable and not available interface details
	   		function processQueueDetails(data1, data2) {
	   			for (var indx = 0; indx < data2.length; indx++) {
	   				if (undefined !== data1 && data1.length > 0) {
	   					data1.push(data2[indx]);
	   				} else {
	   					return data2;
	   				}
	   			}
	   			return data1;
	   		}

	   		function loadInterfaceDataIntoModal(loadData, headerElement, valueElement, thisEle) {
	   			$("#" + valueElement).html('');
	   			$("#" + headerElement + " tr").html('');
	   			$("#interfaceModalLabel span").text('');
	   			$("#interface-modal .modal-body .table-responsive > div").css('display', 'block');
	   			var interfaceHostName = thisEle.attr("hostname");
	   			if ("No Data" === loadData) {
	   				refreshModalRows();
	   				d3.select("#" + headerElement + " tr").append('th').text(function (d) {
	   					return "Interface Details Not Available";
	   				});
	   				var nodeAlias = thisEle.attr("label");
	   				d3.select("#interfaceModalLabel").data(nodeAlias).append("span").text(function (d) {
	   					return nodeAlias;
	   				}).classed({
	   					'unknown': true
	   				});
	   				$("#interface-modal .modal-body .table-responsive > div").css('display', 'none');
	   			} else if (undefined != loadData) {
	   				for (var indx = 0; indx < loadData.length; indx++) {
	   					$("#" + valueElement).append('<tr>');
	   					Object.keys(loadData[indx]).forEach(function eachKey(key) {
	   						if (0 === indx) {
	   							$("#" + headerElement + " tr").append('<th>' + key.toUpperCase() + '</th>');
	   						}
	   						if (interfaceHostName == loadData[indx].hostname) {
	   							$("#" + valueElement + " tr:nth-child(" + (indx + 1) + ")").append('<td>' + loadData[indx][key] + '</td>');
	   						}
	   					});
	   				}
	   			}
	   			$('#interface-modal').modal('show');
	   			$('#preloader').hide();
	   			$('#status').hide();
	   		}

	   		function loadSiteDataIntoModal(loadData, headerElement, valueElement, siteName, isAll) {
	   			$("#" + valueElement).html('');
	   			$("#" + headerElement + " tr").html('');
	   			$("#site-name #siteName").text('');
	   			if (null !== isAll && "" !== isAll && isAll) {
	   				$("#site-name #siteName").text("Consolidated");
	   			} else {
	   				$("#site-name #siteName").text(siteMapping[siteName]);
	   			}
	   			if ("No Data" === loadData) {
	   				refreshModalRows();
	   				d3.select("#" + headerElement + " tr").append('th').text(function (d) {
	   					return "Site Not Available";
	   				});
	   			} else if (undefined != loadData) {
	   				var hostgrp = [];
	   				var count = 0;

	   				var keymapping = {
	   					"backupcheck": "Backup Check",
	   					"healthcheck": "Health check",
	   					"displayname": "Host",
	   					"hostgroup": "Host group",

	   				};
	   				for (var indx = 0; indx < loadData.length; indx++) {
						$("#" + valueElement).append('<tr>');
						Object.keys(loadData[indx]).forEach(function eachKey(key) {
							if (0 === indx) {
								$("#" + headerElement + " tr").append('<th>' + keymapping[key] + '</th>');
							}
							if (hostgrp.indexOf(loadData[indx]["hostgroup"]) == -1) {
								hostgrp.push(loadData[indx]["hostgroup"]);
								count++;
 
								//var spanDiv="";
								// spanDiv='<span id="'+loadData[indx]["host"]+'" onclick="sitstaus(this.id)" >';
								$("#" + valueElement + " tr:nth-child(" + (indx + 1) + ")")
									.append('<td   class="cursor-pointer "  >' + '<span id="' + loadData[indx]["displayname"] + '_' + key + '_' + loadData[indx]["hostgroup"] + '" onclick="sitstaus(this.id)" >' + manipulateVal(loadData[indx][key], key) + '</span></td>');
							} else {
								loadData[indx]["hostgroup"] = "";
								$("#" + valueElement + " tr:nth-child(" + (indx + 1) + ")")
									.append('<td  class="cursor-pointer ">' + '<span id="' + loadData[indx]["displayname"] + '_' + key + '_' + loadData[indx]["hostgroup"] + '" onclick="sitstaus(this.id)" >' + manipulateVal(loadData[indx][key], key) + '</span></td>');
 
							}
 
 
 
						});
					}
				}
	   			$('#preloader').hide();
	   			$('#status').hide();
	   		}

	   		// Manipulate the fa icon for availablity and severity
	   		function manipulateVal(val, field) {
	   			var backuptableData = {
	   				"0": '<div style="text-align:center;"><i class="fa fa-times fa-2x text-red"></i></div>',
	   				"1": '<div style="text-align:center;"><i class="fa fa-check fa-2x text-dark-green"></i></div>',
	   				"-1": '<div style="text-align:center;"><i class="fa fa-exclamation-triangle" style="color:#CCCC00"></i></div>'
	   			};
	   			if ('HEALTHCHECK' === field.toUpperCase() || 'BACKUPCHECK' === field.toUpperCase()) {

	   				if ("1" === val || "0" === val || "-1" === val) {
	   					return backuptableData[val];
	   				}


	   			} else {

	   				return val;
	   			}
	   		}

	   		// set color for the nodes status
	   		function getNodeStatus(data, severeFlag) {
	   			if (undefined !== data && null !== data) {
	   				if (null != severeFlag && 'Good' !== severeFlag && 'Available' === data) {
	   					return -1;
	   				} else if ((undefined === severeFlag || null === severeFlag || 'Good' === severeFlag) && 'Available' === data) {
	   					return 1;
	   				} else if (undefined === severeFlag && 'Not_Available' === data) {
	   					return 0;
	   				}
	   			}
	   			return 0;
	   		}





	   		// clear all modal irrespective of the needed one.
	   		function refreshModalRows() {
	   			$("#node_details_table_header tr").html('');
	   			$("#node_details_table_values tr").html('');
	   			$("#interface_details_table_header tr").html('');
	   			$("#interface_details_table_values tr").html('');
	   			$("#node_cpu_table_header tr").html('');
	   			$("#node_cpu_table_values tr").html('');
	   			$("#node_disk_table_header tr").html('');
	   			$("#node_disk_table_values tr").html('');
	   			$("#node_alerts_table_header tr").html('');
	   			$("#node_alerts_table_values tr").html('');
	   		}




	   		//  custom changes for splunk js ends here,
	   		pageLoading = false;


	   		new Dashboard({
	   			id: 'dashboard',
	   			el: $('.dashboard-body'),
	   			showTitle: true,
	   			editable: true
	   		}, {
	   			tokens: true
	   		}).render();

	   		// Initialize time tokens to default
	   		if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
	   			defaultTokenModel.set({
	   				earliest: '0',
	   				latest: ''
	   			});
	   		}

	   		submitTokens();

	   		// DASHBOARD READY
	   		DashboardController.ready();
	   	});

		   function processIncidentDetailsResults(resultData,noData) {
			var tableData = "";
			if ("No data" === resultData) {
				tableData = noData;
			} else if (undefined !== resultData) {
				// The search results
				var incidentDetails = resultData.rows;
				if (null !== incidentDetails) {
					tableData = '<table class="table table-bordered table-hover"><thead><tr><th>Date</th><th>Host </th><th>Param</th><th>Value</th><th>Status</th></tr></thead>';
					//Code to list incidentDetails.
					for (var i = 0; i < incidentDetails.length; i++) {
						tableData += '<tr><td>' + formatNullValue(incidentDetails[i][0]) +
							'</td><td>' + formatNullValue(incidentDetails[i][1]) +
							'</td><td>' + formatNullValue(incidentDetails[i][2]) +
							'</td><td>' + formatNullValue(incidentDetails[i][3]) +
 
							'</td><td>' + formatNullValue(incidentDetails[i][4]) + '</td></tr>';
					}
					tableData += '</tbody></table>';
				}
			}
			$('#siteTableModal').modal('show');
			$('#sitemonitorContainer').html(tableData);
		}
 
		function processIncidentHealthCheckDetailsResults(resultData,noData) {
			var tableData = "";
			if ("No data" === resultData) {
				tableData = noData;
			} else if (undefined !== resultData) {
				// The search results
				var incidentDetails = resultData.rows;
				if (null !== incidentDetails) {
					tableData = '<table class="table table-bordered table-hover"><thead><tr><th>Date</th><th>Host </th><th>Param</th><th>Value</th><th>Status</th><th>Command Output</th></tr></thead>';
					//Code to list incidentDetails.
					for (var i = 0; i < incidentDetails.length; i++) {
						tableData += '<tr><td>' + formatNullValue(incidentDetails[i][0]) +
							'</td><td>' + formatNullValue(incidentDetails[i][1]) +
							'</td><td>' + formatNullValue(incidentDetails[i][2]) +
							'</td><td>' + formatNullValue(incidentDetails[i][3]) +
							'</td><td>' + formatNullValue(incidentDetails[i][4]) +
							'</td><td>' + formatNullValue(incidentDetails[i][5]) +
							'</td></tr>';
					}
					tableData += '</tbody></table>';
				}
			}
			$('#sitemonitorContainer').html(tableData);
			$('#siteTableModal').modal('show');
		}

		function processIncidentBachupCheckDetailsResults(resultData,noData) {
			var tableData = "";
			if ("No data" === resultData) {
				tableData = noData;
			} else if (undefined !== resultData) {
				// The search results
				var incidentDetails = resultData.rows;
				if (null !== incidentDetails) {
					tableData = '<table class="table table-bordered table-hover"><thead><tr><th>Status</th><th>Entry Date </th><th>Display Name</th><th>Host</th></tr></thead>';
					//Code to list incidentDetails.
					for (var i = 0; i < incidentDetails.length; i++) {
						tableData += '<tr><td>' + formatNullValue(incidentDetails[i][0]) +
							'</td><td>' + formatNullValue(incidentDetails[i][1]) +
							'</td><td>' + formatNullValue(incidentDetails[i][2]) +
							'</td><td>' + formatNullValue(incidentDetails[i][3]) +
							'</td></tr>';
					}
					tableData += '</tbody></table>';
				}
			}
			$('#sitemonitorContainer').html(tableData);
			$('#siteTableModal').modal('show');
		}
		function sitstaus(id) {
			$("#preloader").show();
			$('#status').show();
			var splitter = id.split('_');
			var title=splitter[1].charAt(0).toUpperCase() + splitter[1].substr(1);
			$('#myModal1Label span').text(title);
			var noData="No Failures."
			if (splitter[1] == "displayname") {
				var query = monitoring_prepiad_site_monitoring["displayname"];
				$('#myModal1Label span').text("Host");
				noData="No data to display."
			}
			if (splitter[1] == "healthcheck") {
				var query = monitoring_prepiad_site_monitoring["healthcheck"];
			}
			if (splitter[1] == "backupcheck") {
				var query = monitoring_prepiad_site_monitoring["backupcheck"];
			}
			if (splitter[1] == "hostgroup") {
				var query = monitoring_prepiad_site_monitoring["hostgroup"];
				noData="No data to display."
			}
		   
		  
			query = query.replace(/siteParam/gi, currentSite.toString().replace(/[\[\]"]+/g, '').split(',').join('","'));
			query = query.replace(/hostgrpparam/gi, splitter[2]);
			query = query.replace(/modalparam/gi, splitter[0]);
			//	 siteDetailsQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPrepaidQuery", "mon_post_siteCentre", '', siteCentre),  "0");
			query = getOnlySearchResultsConstructor(query, "0");
			query.on("search:progress", function () {
				$("#preloader").show();
				$('#status').show();
			});
 
			query.on("search:done", function () {
				var siteDetailsResults = query.data("results", {
					"count": 0,
					"offset": 0
				});
				siteDetailsResults.on("data", function () {
	   			if (undefined !== siteDetailsResults.data()) {
	   				// The search results
	   				var nodeSiteData = convertResultToJSON(siteDetailsResults.data());
	   				if (splitter[1] == "healthcheck") {
	   					processIncidentHealthCheckDetailsResults(siteDetailsResults.data());
					   }
					   else if(splitter[1] === "backupcheck")
					   {
						processIncidentBachupCheckDetailsResults(siteDetailsResults.data());
					   }
					    else {
	   					processIncidentDetailsResults(siteDetailsResults.data());
	   				}
	   			}
	   		});
 
 
			   $("#preloader").hide();
	   		$('#status').hide();
	   		if (splitter[1] == "healthcheck") {
	   			processIncidentHealthCheckDetailsResults("No data",noData);
	   		}  else if(splitter[1] === "backupcheck")
			   {
				processIncidentBachupCheckDetailsResults("No data",noData);
			   }else {
	   			processIncidentDetailsResults("No data",noData);
	   		}
	   	});

	   }