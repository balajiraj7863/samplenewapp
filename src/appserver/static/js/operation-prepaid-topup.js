// Highchartchart container ID declarations for the page
var topupChartInit = "";
var failureReasonChartInit = "";
var autorenewalChartInit = "";
var planwiseChartInit = "";
var topupCountrywiseChartInit = "";
var country = "";
var serviceType = "";

function highchartsInitialize() {
    topupChartInit = Highcharts.chart('topupChart', opsPreTopupDrilldown.previousDay.topup);
    failureReasonChartInit = Highcharts.chart('failureReasonChart', opsPreTopupDrilldown.previousDay.failureReason);
    autorenewalChartInit = Highcharts.chart('autorenewalChart', opsPreTopupDrilldown.previousDay.autoRenewalStatus);
    planwiseChartInit = Highcharts.chart('planwiseChart', opsPreTopupDrilldown.previousDay.planwise);
    topupCountrywiseChartInit = Highcharts.chart('topupCountrywiseChart', opsPreTopupDrilldown.previousDay.topupCountrywise);
}

function highchartsDestroy() {
    topupChartInit.destroy();
    failureReasonChartInit.destroy();
    autorenewalChartInit.destroy();
    planwiseChartInit.destroy();
    topupCountrywiseChartInit.destroy();
}

var utils = '';
var SearchManagerModal = '';

//Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("#searchBtn").attr("disabled", true);
});

// Help Text Initialisation
function updateHelpText(mapKey) {
    getHelpText(mapKey, "topupHelp");
    getHelpText(mapKey, "failureReasonHelp");
    getHelpText(mapKey, "autorenewalHelp");
    getHelpText(mapKey, "planwiseHelp");
    getHelpText(mapKey, "countrywiseHelp");
}
updateHelpText('opsPreTopupHelpDaily');


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
            UrlTokenModel,


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
            SearchManagerModal = require("splunkjs/mvc/searchmanager");
            var utils = require("splunkjs/mvc/utils");
            var pageLoading = true;

            //  custom changes for splunk js starts here,
            var oldCountryList = "";
            serviceType = "Prepaid";
            $('.phaseTwo').hide();

            if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
                if (localStorage.getItem("globalUserServiceTypeList").indexOf("operation-prepaid") > -1) {
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
                        if (localStorage.getItem("globalUserServiceTypeList").toString().match(/operation/g).length > 1) {
                            oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
                            country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
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
                var targetEle = $(".filterDiv .active").find('input');
                targetEle.trigger('click');
            }



            var fromDate = $("#fromDate").val();
            var toDate = $("#toDate").val();


            loadChart("daily");

            // Date Preset Implementation
            $('#daily').click(function () {
                $('.custom-date').hide();
                highchartsInitialize();
                highchartsDestroy();
                // Plot the new charts
                loadChart("daily");
                //update the HelpTextIcon
                updateHelpText('opsPreTopupHelpDaily');
            });
            $('#weekly').click(function () {
                $('.custom-date').hide();
                highchartsInitialize();
                highchartsDestroy();
                // Plot the new charts
                loadChart("weekly");
                //update the HelpTextIcon
                updateHelpText('opsPreTopupHelpWeekly');
            });
            $('#monthly').click(function () {
                $('.custom-date').hide();
                highchartsInitialize();
                highchartsDestroy();
                // Plot the new charts
                loadChart("monthly");
                //update the HelpTextIcon
                updateHelpText('opsPreTopupHelpMonthly');
            });
            $('#customDate').click(function () {
                $('.custom-date').css('display','inline-block');
                highchartsInitialize();
                highchartsDestroy();
                // Plot the new charts
                loadChart("daily");
                $(".datePicker").css('background', '#fff');
                $("#fromDate.datePicker").css('background', '#fff');
                //update the HelpTextIcon
                updateHelpText('opsPreTopupHelpCustomDate');
            });
            $('#searchBtn').click(function () {
                if (undefined !== $("#fromDate").val() && undefined !== $("#toDate").val() && '' !== $("#fromDate").val() && '' !== $("#toDate").val()) {
                    highchartsInitialize();
                    highchartsDestroy();
                    loadChart("customDate");
                    $(".datePicker").css('background', '#fff');
                    disableCustomDatePicker(false, 'fromDate', 'toDate');
                    $("#toDate.datePicker").css('background', '#eee');
                    clearDatePicker('fromDate', 'toDate', '-180d', '-1d', '-180d', '-1d');
                    // update the HelpTextIcon
                    updateHelpText('opsPreTopupHelpDaily');
                } else {
                    emptyDateValidation('fromDate', 'toDate');
                }
            });
            $('#daily').trigger("click");
            $(".filterDiv label").click(function () {
                return ("customDate" === this.id) ? disableCustomDatePicker(false, 'fromDate', 'toDate') : disableCustomDatePicker(true, 'fromDate', 'toDate', true);
            });

            $('#downloadExportData').click(function () {
                $("#exportTableModal").modal("show");
                $("#modalInfoText").text(getBannerHelpText("exportExcelData", "modalInfoText"));
                $(".datePicker").css('background', '#eee');
                downloadChartData();
                setTimeout(function () {
                    $('#exportTableModal').modal('hide');
                }, 2500);
            });

            // Need to change
            function downloadChartData() {
                fromDate = getExportDateSetter(180);
                toDate = getExportDateSetter(0);
                var queryMapKey = "opsPreTopupDrillQuery";
                getResultsAndExport(queryMapKey, "topupVolumeByChannelExport", country, fromDate, toDate);
                getResultsAndExport(queryMapKey, "topupVolumeByCountryExport", country, fromDate, toDate);
                return false;
            }

            // Need to change
            function getResultsAndExport(mapKey, planQuery, country, fromDate, toDate) {
                var searchmanager = new SearchManagerModal({
                    preview: true,
                    "refresh": "24h",
                    "refreshType": "delay",
                    cache: true,
                    status_buckets: 300,
                    "search": ""
                }, {
                    tokens: true,
                    tokenNamespace: "submitted"
                });
                searchmanager.settings.unset("search");
                searchmanager.settings.set("search", getQuery(mapKey, planQuery, country, fromDate, toDate, serviceType));

                searchmanager.startSearch();
                searchmanager.on('search:progress', function (properties) {});

                searchmanager.on('search:done', function (properties) {

                    var searchResults = searchmanager.data("results", {
                        "count": 0,
                        "offset": 0
                    });
                    searchResults.on("data", function (queryResults) {
                        if (undefined !== queryResults.data()) {
                            if (null !== queryResults.data().rows) {
                                exportResultToCsv(searchResults.data().rows, searchResults.data().fields, planQuery, true);
                            }
                        }
                    });
                });

                return searchmanager;
            }

            function loadChart(chartType) {
                var fromDate = $("#fromDate").val();
                var toDate = $("#toDate").val();
                $(".datePicker").css('border', '1px solid #ccc');
                $(".datePicker").css('background', '#eee');
                getHelpText("exportExcelData", "exportExcelDateHelp");

                 // initialize search manager instance
        var topupChartData = getOnlySearchResultsConstructor("topupChartPreloaderQuery","24h");
        var failureReasonChartData = getOnlySearchResultsConstructor("failureReasonChartPreloaderQuery","24h");
        var autoRenewalChartData = getOnlySearchResultsConstructor("autoRenewalChartPreloaderQuery","24h");
        var planwiseChartData = getOnlySearchResultsConstructor("planwiseChartPreloaderQuery","24h");
        var topupCountryChartData = getOnlySearchResultsConstructor("topupCountryChartPreloaderQuery","24h");

        // query var declarations
                var topupQuery = "";
                var failureReasonQuery = "";
                var autoRenewalQuery = "";
                var planwiseQuery = "";
                var topupCountryQuery = "";

                if ("daily" === chartType) {
                    topupQuery = "topupDaily";
                    //failureReasonQuery = "failureReasonDaily";
                    //autoRenewalQuery = "autoRenewalDaily";
                    //planwiseQuery = "planPurchaseDaily";
                    topupCountryQuery = "topupByCountryDaily";
                } else if ("weekly" === chartType) {
                    topupQuery = "topupWeekly";
                    //failureReasonQuery = "failureReasonWeekly";
                    //autoRenewalQuery = "autoRenewalWeekly";
                    //planwiseQuery = "planPurchaseWeekly";
                    topupCountryQuery = "topupByCountryWeekly";
                } else if ("monthly" === chartType) {
                    topupQuery = "topupMonthly";
                    //failureReasonQuery = "failureReasonMonthly";
                    //autoRenewalQuery = "autoRenewalMonthly";
                    //planwiseQuery = "planPurchaseMonthly";
                    topupCountryQuery = "topupByCountryMonthly";
                } else if ("customDate" === chartType) {
                    topupQuery = "topupCustomDate";
                    //failureReasonQuery = "failureReasonCustomDate";
                    //autoRenewalQuery = "autoRenewalCustomDate";
                    //planwiseQuery = "planPurchaseCustomDate";
                    topupCountryQuery = "topupByCountryCustomDate";
                }

                // topup by channel Data loading
                topupChartData.settings.unset("search");
                if ("" !== fromDate && "" !== toDate) {
                    if (fromDate.indexOf(":0:0:0") == -1) {
                        fromDate = fromDate + ':0:0:0';
                    }
                    if (toDate.indexOf(":23:59:59") == -1) {
                        toDate = toDate + ":23:59:59";
                    }
                    topupChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", topupQuery, country, fromDate, toDate, serviceType));
                } else {
                    topupChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", topupQuery, country, "", "", serviceType));
                }
                topupChartData.startSearch();
                $('#topupChart').html('<div id="topupChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                $('#topupChartPreloader').show();

                topupChartData.on('search:done', function (properties) {
                    var topupResults = topupChartData.data("results", {
                        count: 0,
                        offset: 0
                    });
                    var isNoData = true;
                    topupResults.on("data", function (queryResults) {
                        if (undefined !== queryResults.data()) {
                            if (null !== queryResults.data().rows) {
                                var finalDataJson = convertResultToJSON(queryResults.data());
                                loadTopupChannelChart(chartType, finalDataJson.data);
                                isNoData = false;
                            }
                        }
                    });
                    $('#topupChartPreloader').hide();
                    setTimeout(function () {
                        if (isNoData) {
                            if ('daily' === chartType) {
                                Highcharts.chart('topupChart', opsPreTopupDrilldown.daily.topup);
                            } else if ('weekly' === chartType) {
                                Highcharts.chart('topupChart', opsPreTopupDrilldown.weekly.topup);
                            } else if ('monthly' === chartType) {
                                Highcharts.chart('topupChart', opsPreTopupDrilldown.monthly.topup);
                            } else if ('customDate' === chartType) {
                                Highcharts.chart('topupChart', opsPreTopupDrilldown.daily.topup);
                            }
                        }
                    }, 3000);

                    refreshDateTime();
                });

                // Auto Renewal Status Data Loading
                // autoRenewalChartData.settings.unset("search");
                // if ("" !== fromDate && "" !== toDate) {
                //     if (fromDate.indexOf(":0:0:0") == -1) {
                //         fromDate = fromDate + ':0:0:0';
                //     }
                //     if (toDate.indexOf(":23:59:59") == -1) {
                //         toDate = toDate + ":23:59:59";
                //     }
                //     autoRenewalChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", autoRenewalQuery, country, fromDate, toDate, serviceType));
                // } else {
                //     autoRenewalChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", autoRenewalQuery, country, "", "", serviceType));
                // }
                // autoRenewalChartData.startSearch();

                // $('#autorenewalChart').html('<div id="autorenewalChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                // $('#autorenewalChartPreloader').show();

                // autoRenewalChartData.on('search:done', function (properties) {
                //     var autoRenewResults = autoRenewalChartData.data("results", {
                //         count: 0,
                //         offset: 0
                //     });
                //     var isNoData = true;
                //     autoRenewResults.on("data", function (queryResults) {
                //         if (undefined !== queryResults.data()) {
                //             if (null !== queryResults.data().rows) {
                //                 var finalDataJson = convertResultToJSON(queryResults.data());
                //                 loadAutoRenewChart(chartType, finalDataJson.data);
                //                 isNoData = false;
                //             }
                //         }
                //     });
                //     $('#autorenewalChartPreloader').hide();
                //     setTimeout(function () {
                //         if (isNoData) {
                //             Highcharts.chart('autorenewalChart', opsPreTopupDrilldown.emptyDataConfig.autoRenewalStatus);
                //         }
                //     }, 3000);

                //     refreshDateTime();
                // });

                // Failure Reasons Data Loading
                // failureReasonChartData.settings.unset("search");
                // if ("" !== fromDate && "" !== toDate) {
                //     if (fromDate.indexOf(":0:0:0") == -1) {
                //         fromDate = fromDate + ':0:0:0';
                //     }
                //     if (toDate.indexOf(":23:59:59") == -1) {
                //         toDate = toDate + ":23:59:59";
                //     }
                //     failureReasonChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", failureReasonQuery, country, fromDate, toDate, serviceType));
                // } else {
                //     failureReasonChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", failureReasonQuery, country, "", "", serviceType));
                // }
                // failureReasonChartData.startSearch();

                // $('#failureReasonChart').html('<div id="failureReasonChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                // $('#failureReasonChartPreloader').show();

                // failureReasonChartData.on('search:done', function () {
                //     var failureReasonResults = failureReasonChartData.data("results", {
                //         count: 0,
                //         offset: 0
                //     });
                //     var isNoData = true;
                //     failureReasonResults.on("data", function (queryResults) {
                //         if (undefined !== queryResults.data()) {
                //             if (null !== queryResults.data().rows) {
                //                 var finalDataJson = convertResultToJSON(queryResults.data());
                //                 loadFailureReasonChart(chartType, finalDataJson.data);
                //                 isNoData = false;
                //             }
                //         }
                //     });
                //     $('#failureReasonChartPreloader').hide();
                //     setTimeout(function () {
                //         if (isNoData) {
                //             Highcharts.chart('failureReasonChart', opsPreTopupDrilldown.emptyDataConfig.failureReason);
                //         }
                //     }, 3000);
                //     refreshDateTime();
                // });

                // Plan Purchase Data Loading
                // planwiseChartData.settings.unset("search");
                // if ("" !== fromDate && "" !== toDate) {
                //     if (fromDate.indexOf(":0:0:0") == -1) {
                //         fromDate = fromDate + ':0:0:0';
                //     }
                //     if (toDate.indexOf(":23:59:59") == -1) {
                //         toDate = toDate + ":23:59:59";
                //     }
                //     planwiseChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", planwiseQuery, country, fromDate, toDate, serviceType));
                // } else {
                //     planwiseChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", planwiseQuery, country, "", "", serviceType));
                // }
                // planwiseChartData.startSearch();

                // $('#planwiseChart').html('<div id="planwiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                // $('#planwiseChartPreloader').show();

                // planwiseChartData.on('search:done', function (properties) {
                //     var planPurchaseResults = planwiseChartData.data("results", {
                //         count: 0,
                //         offset: 0
                //     });
                //     var isNoData = true;
                //     planPurchaseResults.on("data", function (queryResults) {
                //         if (undefined !== queryResults.data()) {
                //             if (null !== queryResults.data().rows) {
                //                 var finalDataJson = convertResultToJSON(queryResults.data());
                //                 loadPlanPurchaseChart(chartType, finalDataJson.data);
                //                 isNoData = false;
                //             }
                //         }
                //     });
                //     $('#planwiseChartPreloader').hide();
                //     setTimeout(function () {
                //         if (isNoData) {
                //             if ('daily' === chartType || 'customDate' === chartType) {
                //                 opsPreTopupDrilldown.daily.planwise.series = [];
                //                 Highcharts.chart('planwiseChart', opsPreTopupDrilldown.daily.planwise);
                //             } else if ('weekly' === chartType) {
                //                 opsPreTopupDrilldown.weekly.planwise.series = [];
                //                 Highcharts.chart('planwiseChart', opsPreTopupDrilldown.weekly.planwise);
                //             } else if ('monthly' === chartType) {
                //                 opsPreTopupDrilldown.monthly.planwise.series = [];
                //                 Highcharts.chart('planwiseChart', opsPreTopupDrilldown.monthly.planwise);
                //             } 
                //         }
                //     }, 3000)

                //     refreshDateTime();
                // });

                // Incident Average Resolution

                topupCountryChartData.settings.unset("search");
                if ("" !== fromDate && "" !== toDate) {
                    if (fromDate.indexOf(":0:0:0") == -1) {
                        fromDate = fromDate + ':0:0:0';
                    }
                    if (toDate.indexOf(":23:59:59") == -1) {
                        toDate = toDate + ":23:59:59";
                    }
                    topupCountryChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", topupCountryQuery, country, fromDate, toDate, serviceType));
                } else {
                    topupCountryChartData.settings.set("search", getQuery("opsPreTopupDrillQuery", topupCountryQuery, country, "", "", serviceType));
                }
                topupCountryChartData.startSearch();

                $('#topupCountrywiseChart').html('<div id="topupCountrywiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                $('#topupCountrywiseChartPreloader').show();

                topupCountryChartData.on('search:done', function (properties) {
                    var topupCountryResults = topupCountryChartData.data("results", {
                        count: 0,
                        offset: 0
                    });
                    var isNoData = true;
                    topupCountryResults.on("data", function (queryResults) {
                        if (undefined !== queryResults.data()) {
                            if (null !== queryResults.data().rows) {
                                var finalDataJson = convertResultToJSON(queryResults.data());
                                loadTopupbyCountryChart(chartType, finalDataJson.data);
                                isNoData = false;
                            }
                        }
                    });
                    $('#topupCountrywiseChartPreloader').hide();
                    setTimeout(
                        function () {
                            if (isNoData) {
                                Highcharts.chart('topupCountrywiseChart', opsPreTopupDrilldown.emptyDataConfig.topupCountrywise);
                            }
                        }, 3000);
                    refreshDateTime();
                });

            }

        });

        function getOnlySearchResultsConstructor(id,interval) {
            var searchmanager = new SearchManagerModal({
                //"id": id,
                "refresh": "0",
                "refreshType": "delay",
                "preview": true,
                "cache": true,
                "status_buckets": 300,
                "search": ""
            }, {
                tokens: true,
                tokenNamespace: "submitted"
            });
            return searchmanager;
        }

        // custom changes for splunk js require ends here

        // Chart Processing business logic
        function loadTopupChannelChart(chartType, rows) {
            var topupChannelChart;
            if ("previousDay" === chartType) {
                topupChannelChart = Highcharts.chart('topupChart', opsPreTopupDrilldown.previousDay.topup);
                setPieData(rows, topupChannelChart, 'channel', 'topup');
            } else {
                topupChannelChart = opsPreTopupDrilldown.daily.topup;
                basicLineDataProcessor(rows, topupChannelChart, 'topupChart', 'txndate', 'channel', 'topup');
                return;
            }
        }

        function loadAutoRenewChart(chartType, rows) {
            var incidentQueue;
            if ("previousDay" === chartType) {
                incidentQueue = Highcharts.chart('planwiseChart', opsPreTopupDrilldown.previousDay.planwise);
                setPieData(rows, incidentQueue, 'ownergroup', 'totalincidents');
            } else {
                incidentQueue = opsPreTopupDrilldown.daily.planwise;
                basicLineDataProcessor(rows, incidentQueue, 'planwiseChart', 'txndate', 'ownergroup', 'totalincidents');
                return;
            }
        }

        function loadFailureReasonChart(chartType, rows) {
            var incidentQueue;
            if ("previousDay" === chartType) {
                incidentQueue = Highcharts.chart('planwiseChart', opsPreTopupDrilldown.previousDay.planwise);
                setPieData(rows, incidentQueue, 'ownergroup', 'totalincidents');
            } else {
                incidentQueue = opsPreTopupDrilldown.daily.planwise;
                basicLineDataProcessor(rows, incidentQueue, 'planwiseChart', 'txndate', 'ownergroup', 'totalincidents');
                return;
            }
        }

        function loadPlanPurchaseChart(chartType, rows) {
            var incidentQueue;
            if ("previousDay" === chartType) {
                incidentQueue = Highcharts.chart('planwiseChart', opsPreTopupDrilldown.previousDay.planwise);
                setPieData(rows, incidentQueue, 'ownergroup', 'totalincidents');
            } else {
                incidentQueue = opsPreTopupDrilldown.daily.planwise;
                basicLineDataProcessor(rows, incidentQueue, 'planwiseChart', 'txndate', 'ownergroup', 'totalincidents');
                return;
            }
        }

        function loadTopupbyCountryChart(chartType, rows) {
            var topupbyCountryChart;
            if ("previousDay" === chartType) {
                topupbyCountryChart = Highcharts.chart('topupCountrywiseChart', opsPreTopupDrilldown.previousDay.topupCountrywise);
                setPieData(rows, topupbyCountryChart, 'country', 'topup');
            } else if ("daily" === chartType || "weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
                topupbyCountryChart = opsPreTopupDrilldown.daily.topupCountrywise;
                processStackBarData(rows, topupbyCountryChart, 'topupCountrywiseChart', "", 'txndate', 'country', 'topup');
            }
        }