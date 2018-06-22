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

        		//  custom changes for splunk js starts here,	
        		function updateHelpText(mapKey) {
        			getHelpText(mapKey, "openIncHelp");
        			getHelpText(mapKey, "alarmHelp");
        			getHelpText(mapKey, "mainWindowHelp");
        			getHelpText(mapKey, "serverAvailHelp");
        			getHelpText(mapKey, "topIncHelp");
        		}
        		updateHelpText('monitorDashboardHelp');


        		//TO SELECT COUNTRY 
        		var oldCountryList = "";
        		var country = "";
        		var serviceType = "";
        		// need to change for 2 service types
        		if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
        			if (null != localStorage.getItem("globalUserServiceTypeList").toString().match(/monitoring-*/g) && localStorage.getItem("globalUserServiceTypeList").toString().match(/monitoring-*/g).length > 1) {
        				oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
        				country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
        				serviceType = (null !== localStorage.getItem("loggedInUserData") && "" !== localStorage.getItem("loggedInUserData")) ? getServiceTypes(JSON.parse(localStorage.getItem("loggedInUserData")), "user_type", "monitoring", "service_type").toString().split(',').join('","') : "";
        				loadSuccessPage();
        				reloadAll();
        			} else {
        				loadErrorPage();
        			}
        		} else {
        			loadErrorPage();
        			var getDataInterval = setInterval(function () {
        				if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
        					if (null != localStorage.getItem("globalUserServiceTypeList").toString().match(/monitoring-*/g) && localStorage.getItem("globalUserServiceTypeList").toString().match(/monitoring-*/g).length > 1) {
        						oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
        						country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
        						serviceType = (null !== localStorage.getItem("loggedInUserData") && "" !== localStorage.getItem("loggedInUserData")) ? getServiceTypes(JSON.parse(localStorage.getItem("loggedInUserData")), "user_type", "monitoring", "service_type").toString().split(',').join('","') : "";
        						loadSuccessPage();
        						reloadAll();
        						clearInterval(getDataInterval);
        					}
        				}
        			}, 100);
        		}

        		$('.country-setting').click(function () {
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
        			var incByPriorityQuery = getQuery("monitorHomeQuery", "mon_home_incSeverity_chart", country, "", "", serviceType);
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
        				Highcharts.chart('incidentPriorityChart', monitorHome.incidentPriorityChartEmpty);
        				$('#monitorPreloader').hide();

        			});

        			//Top 5 Incidents
        			var topIncidentQuery = getQuery("monitorHomeQuery", "mon_home_incSearch_chart", country, "", "", serviceType);
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
								// for home top 5 issues,
								//processQueryResults(finalDataJson.data, incidentTableData, "topIncident", "topIncidentsDiv", "ticketid", "scheduler", "remarks");
								// For prepaid top 5 issues
								processQueryResults(finalDataJson.data, incidentTableData, "topIncident", "topIncidentsDiv", "date", "comments");
        					}
        				});
        				showNoData(incidentTableData, "topIncidentsDiv", 2);
        			});


        			//Maintenance Window
        			var maintenanceWindowQuery = getQuery("monitorHomeQuery", "mon_home_incMainWindow_chart", country, "", "", serviceType);
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
        			var alarmDataQuery = getQuery("monitorHomeQuery", "mon_home_incAlarm_chart", upperCountry, "", "", serviceType);
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
        			var incidentDetailsSearch = getOnlySearchResultsConstructor("", "30m");
        			var incidentDetailsTableData = "";

        			function IncidentOnclick(priority) {
        				$('#preloader').show();
        				$('#status').show();
        				var urgency = priority.split("")[1]; // get priority from name
        				incidentDetailsSearch.settings.unset("search");
        				incidentDetailsSearch.settings.set("search", getMonitoringQuery("monitorHomeQuery", "mon_home_incidentModal_chart", urgency));
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



        			//Alarm on click details 
        			var alarmDetails = null;
        			var alarmDetailsSearch = getOnlySearchResultsConstructor('', "30m");

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
        					alarmDetailsSearch.settings.set("search", getMonitoringQuery("monitorHomeQuery", "mon_home_alarmModal_chart", severityMapping[severity], "", country, serviceType));
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
										[comments].replace(/,,/gi,'</br>')) + '</td></tr>';
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
        						color: '#eb2b27'
        					},
        					{
        						name: 'P2',
        						y: 0,
        						color: '#FF7518'
        					},
        					{
        						name: 'P3',
        						y: 0,
        						color: '#eb2b27'
        					},
        					{
        						name: 'P4',
        						y: 0,
        						color: '#FF7518'
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
							tableHeader += '<table class="table table-condensed"><tbody><tr class="bg-grey"><th width="25%">Schedule</th><th width="25%">SR#</th><th>Activity</th></tr>';
						} else if ("topIncident" == tableType) {
							tableHeader += '<table class="table table-condensed"><tbody><tr class="bg-orange"><th width="25%">Date</th><th>Comments</th></tr>';
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
								incidentTableData += '<tr><td class="bg-orange">' + formatNullValue(queryResultData[i][arg1]) + '</td><td>' + formatNullValue(queryResultData[i][arg2].replace(/,,/gi,'</br>')) +
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
        								'<td class="text-center"><div class="table-icon"><i class="fa fa-arrow-circle-up text-dark-green" aria-hidden="true"></i></div></td><td class="text-center"><div class="table-icon"><i class="fa fa-arrow-circle-up text-dark-green" aria-hidden="true"></i></div></td></tr>';
        						} else {
        							sysAvailTableData +=
        								'<td class="text-center"><div class="table-icon"><i class="fa fa-arrow-circle-down text-red" aria-hidden="true"></i></div></td><td class="text-center"><div class="table-icon"><i class="fa fa-arrow-circle-down text-red" aria-hidden="true"></i></div></td></tr>';
        						}
        					}
        					return sysAvailTableData;
        				}
        				return '';
        			}

        			//System availabilty
        			var tempCountry = country.toLowerCase();
        			var upperCountry = tempCountry.charAt(0).toUpperCase() + tempCountry.substr(1);
        			var sysAvailDataQuery = getQuery("monitorHomeQuery", "mon_home_prepaid_incSysAvail_chart", upperCountry, "", "", serviceType);
        			var sysAvailDataSearch = getOnlySearchResultsConstructor(sysAvailDataQuery, "30m");
        			// var sysAvailTableData = getTableHeaderValue("sysAvail");
        			sysAvailDataSearch.on('search:progress', function (properties) {
        				// Print just the event count from the search job
        				$('#monitorPreloader').show();
        			});
        			var sysAvailDataResults = sysAvailDataSearch.data("results");
        			sysAvailDataResults.on("data", function () {

        				if (undefined !== sysAvailDataResults.data()) {
        					var greenUp = 'fa fa-arrow-circle-up text-dark-green';
        					var redDown = 'fa fa-arrow-circle-down text-red';
        					var prepaid = redDown;
        					var postpaid = redDown;



        					var finalDataJson = convertResultToJSON(sysAvailDataResults.data());
        					var data = finalDataJson.data;
        					data.forEach(function (results) {
        						if ("prepaid" === results.servicetype.toLowerCase() && 1 === parseInt(results.available)) {
        							prepaid = greenUp;
        						}
        						if ("postpaid" === results.servicetype.toLowerCase() && 1 === parseInt(results.available)) {
        							postpaid = greenUp;
        						}


        					});
        					$('#site_prepaid').removeClass();
        					$('#site_postpaid').removeClass();
        					$('#site_fixed').removeClass();

        					$('#site_prepaid').addClass(prepaid);
        					$('#site_postpaid').addClass(postpaid);
        					$('#site_fixed').addClass(postpaid);

        					//processQueryResults(finalDataJson.data, sysAvailTableData, "sysAvail", "sysAvailDiv", "country", "type", "available");
        				}
        				$('#monitorPreloader').hide();
        			});

        			function getOnlySearchResultsConstructor(query, interval) {
        				var searchmanager = new SearchManager({
        					"cancelOnUnload": true,
        					"refresh": "0",
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
        			//Animate CSS
        			$('.card').addClass('animated zoomIn');
        			//Height of the Tab and maps
        			var height = $(window).height();

        			//Resizing chart
        			var chartHeight = ((height - 336) / 2);
        			var serverTable = height - 410;
        			// Margin-top for Mobile and web
        			var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
        			if (!isMobile) {
        				$('.server-table').css('height', serverTable);
        				$('#chartPreloader').css('height', chartHeight);
        			} else {
        				$('.server-table').css('height', '250px');
        				$('#chartPreloader').css('height', '250px');
        			}

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