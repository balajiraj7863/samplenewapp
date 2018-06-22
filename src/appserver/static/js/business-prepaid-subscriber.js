var statuswiseSDP1Chart = "";
var statuswiseSDP2Chart = "";
var planwiseChart = "";
var subLifecycleChart = "";
var countrywiseChart = "";
var loyaltyChart = ""
var exitReasonChart = "";
var subscriberTrendChart = "";
var country = "";
var serviceType = "";
var SearchManagerModal = "";
function highchartsInitialize() {
    statuswiseSDP1Chart = Highcharts.chart('statuswiseSDP1Chart', bizPreSub.tillDate.statuswiseSDP1);
    statuswiseSDP2Chart = Highcharts.chart('statuswiseSDP2Chart', bizPreSub.tillDate.statuswiseSDP2);
    // planwiseChart = Highcharts.chart('planwiseChart', bizPreSub.tillDate.planwise);
    subLifecycleChart = Highcharts.chart('subLifecycleChart', bizPreSub.tillDate.subLifecycle);
    countrywiseChart = Highcharts.chart('countrywiseChart', bizPreSub.tillDate.countrywise);
    subscriberTrendChart = Highcharts.chart('subscriberTrendChart', bizPreSub.tillDate.subscriberTrend);
    // loyaltyChart = Highcharts.chart('loyaltyChart', bizPreSub.tillDate.loyalty);
    // exitReasonChart = Highcharts.chart('exitReasonChart', bizPreSub.tillDate.exitReason);
}

function highchartsDestroy() {
    statuswiseSDP1Chart.destroy();
    statuswiseSDP2Chart.destroy();
    // planwiseChart.destroy();
    subLifecycleChart.destroy();
    countrywiseChart.destroy();
    subscriberTrendChart.destroy();
    // loyaltyChart.destroy();
    // exitReasonChart.destroy();
}

// Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("button[type='button']").attr("disabled", true);
});

// Help Text Initialisation
function updateHelpText(mapKey) {
    getHelpText(mapKey, "statuswiseSDP1Help");
    getHelpText(mapKey, "statuswiseSDP2Help");
    getHelpText(mapKey, "planwiseHelp");
    getHelpText(mapKey, "subLifecycleHelp");
    getHelpText(mapKey, "countrywiseHelp");
    getHelpText(mapKey, "loyaltyHelp");
    getHelpText(mapKey, "exitReasonHelp");
    getHelpText(mapKey, "subscriberTrendHelp");
}
updateHelpText('bizPreSubHelpTilldate');

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

       
        var pageLoading = true;
        SearchManagerModal = require("splunkjs/mvc/searchmanager");
        //  custom changes for splunk js starts here,

        var oldCountryList = "";
        serviceType = "Prepaid";

        if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
            if (localStorage.getItem("globalUserServiceTypeList").indexOf("business-prepaid") > -1) {
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
                    if (localStorage.getItem("globalUserServiceTypeList").toString().match(/business/g).length > 1) {
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
        var isExportData = false;
    
        //loadChart("tillDate");
    
        // Date Preset Implementation
        $('#tillDate').click(function () {
            $('.custom-date').hide();
            $('#loyalityContainer').show();
            $('#exitReasonContainer').show();
            $('#subscriberTrend').hide();
            $('#subLifecycleContainer').hide();
            highchartsInitialize();
            highchartsDestroy();
            // Plot the new charts
            loadChart("tillDate");
            //update the HelpTextIcon
            updateHelpText('bizPreSubHelpTilldate');
        });
        $('#daily').click(function () {
            $('.custom-date').hide();
            $('#loyalityContainer').hide();
            $('#exitReasonContainer').hide();
            $('#subscriberTrend').show();
            $('#subLifecycleContainer').show();
            highchartsInitialize();
            highchartsDestroy();
            // Plot the new charts
            loadChart("daily");
            //update the HelpTextIcon
            updateHelpText('bizPreSubHelpDaily');
        });
        $('#weekly').click(function () {
            $('.custom-date').hide();
            $('#loyalityContainer').hide();
            $('#exitReasonContainer').hide();
            $('#subscriberTrend').show();
            $('#subLifecycleContainer').show();
            highchartsInitialize();
            highchartsDestroy();
            // Plot the new charts
            loadChart("weekly");
            //update the HelpTextIcon
            updateHelpText('bizPreSubHelpWeekly');
        });
        $('#monthly').click(function () {
            $('.custom-date').hide();
            $('#loyalityContainer').hide();
            $('#exitReasonContainer').hide();
            $('#subscriberTrend').show();
            $('#subLifecycleContainer').show();
            highchartsInitialize();
            highchartsDestroy();
            // Plot the new charts
            loadChart("monthly");
            //update the HelpTextIcon
            updateHelpText('bizPreSubHelpMonthly');
        });
        $('#customDate').click(function () {
            $('.custom-date').css('display','inline-block');
            $('#loyalityContainer').hide();
            $('#exitReasonContainer').hide();
            $('#subscriberTrend').show();
            $('#subLifecycleContainer').show();
            highchartsInitialize();
            highchartsDestroy();
            // Plot the new charts
            loadChart("daily");
            $(".datePicker").css('background', '#fff');
            $("#fromDate.datePicker").css('background', '#fff');
            //update the HelpTextIcon
            updateHelpText('bizPreSubHelpCustomDate');
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
                updateHelpText('bizPreSubHelpCustomDate');
            } else {
                emptyDateValidation('fromDate', 'toDate');
            }
        });
        $('#daily').trigger("click");
        $(".filterDiv label").click(function () {
            return ("customDate" === this.id) ? disableCustomDatePicker(false, 'fromDate', 'toDate') : disableCustomDatePicker(true, 'fromDate', 'toDate', true);
        });
    
        // Need to change
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
            var queryMapKey = "bizPreDrillSubQuery";
            getResultsAndExport(queryMapKey, "subStatusExport", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subCountryExport", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subTrendExport", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subLifecycleExport", country, fromDate, toDate);
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
            var statuswiseSDP1ChartData = getOnlySearchResultsConstructor("statuswiseSDP1ChartPreloader", "24h");
            var statuswiseSDP2ChartData = getOnlySearchResultsConstructor("statuswiseSDP2ChartPreloader", "24h");
    
            var subLifecycleChartChartData = getOnlySearchResultsConstructor("subLifecycleChartPreloader", "24h");
            var countrywiseChartData = getOnlySearchResultsConstructor("countrywiseChartPreloaderQuery", "24h");
    
            var subscriberTrendData = getOnlySearchResultsConstructor("subscriberTrendChartPreloaderQuery", "24h");
    
            // query var declarations
            var subStatusSDP1Query = "";
            var subStatusSDP2Query = "";
    
            var subLifecycleQuery = "";
            var subCountrywiseQuery = "";
    
            var subTrendQuery = "";
    
            if ("tillDate" === chartType) {
                subStatusSDP1Query = "subStatusSDP1TillDate";
                subStatusSDP2Query = "subStatusSDP2TillDate";
    
                subCountrywiseQuery = "subCountrywiseTillDate";
    
            } else if ("daily" === chartType) {
                subStatusSDP1Query = "subStatusSDP1Daily";
                subStatusSDP2Query = "subStatusSDP2Daily";
    
                subLifecycleQuery = "subLifecycleDaily";
                subCountrywiseQuery = "subCountrywiseDaily";
                subTrendQuery = "subTrendDaily";
            } else if ("weekly" === chartType) {
                subStatusSDP1Query = "subStatusSDP1Weekly";
                subStatusSDP2Query = "subStatusSDP2Weekly";
    
                subLifecycleQuery = "subLifecycleWeekly";
                subCountrywiseQuery = "subCountrywiseWeekly";
                subTrendQuery = "subTrendWeekly";
            } else if ("monthly" === chartType) {
                subStatusSDP1Query = "subStatusSDP1Monthly";
                subStatusSDP2Query = "subStatusSDP2Monthly";
    
                subLifecycleQuery = "subLifecycleMonthly";
                subCountrywiseQuery = "subCountrywiseMonthly";
                subTrendQuery = "subTrendMonthly";
            } else if ("customDate" === chartType) {
                subStatusSDP1Query = "subStatusSDP1CustomDate";
                subStatusSDP2Query = "subStatusSDP2CustomDate";
    
                subLifecycleQuery = "subLifecycleCustomDate";
                subCountrywiseQuery = "subCountrywiseCustomDate";
                subTrendQuery = "subTrendCustomDate";
            }
    
            // Subscriber Status SDP1 Data loading
            statuswiseSDP1ChartData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                statuswiseSDP1ChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subStatusSDP1Query, country, fromDate, toDate, serviceType));
            } else {
                statuswiseSDP1ChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subStatusSDP1Query, country, "", "", serviceType));
            }
            statuswiseSDP1ChartData.startSearch();
            $('#statuswiseSDP1Chart').html('<div id="statuswiseSDP1ChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#statuswiseSDP1ChartPreloader').show();
    
            statuswiseSDP1ChartData.on('search:done', function (properties) {
                var subStatusSDP1Results = statuswiseSDP1ChartData.data("results", {
                    count: 0,
                    offset: 0
                });
                var isNoData = true;
                subStatusSDP1Results.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            loadsubscriberStatusSDP1Chart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }
                });
                $('#statuswiseSDP1ChartPreloader').hide();
                setTimeout(function () {
                    if (isNoData) {
                        if ('tillDate' === chartType) {
                            Highcharts.chart('statuswiseSDP1Chart', bizPreSub.tillDate.statuswiseSDP1);
                        } else {
                            Highcharts.chart('statuswiseSDP1Chart', bizPreSub.daily.statuswiseSDP1);
                        }
                    }
                }, 3000);
    
                refreshDateTime();
            });
    
            // Subscriber Status SDP2 Data loading        
            statuswiseSDP2ChartData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                statuswiseSDP2ChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subStatusSDP2Query, country, fromDate, toDate, serviceType));
            } else {
                statuswiseSDP2ChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subStatusSDP2Query, country, "", "", serviceType));
            }
            statuswiseSDP2ChartData.startSearch();
            $('#statuswiseSDP2Chart').html('<div id="statuswiseSDP2ChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#statuswiseSDP2ChartPreloader').show();
    
            statuswiseSDP2ChartData.on('search:done', function (properties) {
                var subStatusSDP2Results = statuswiseSDP2ChartData.data("results", {
                    count: 0,
                    offset: 0
                });
                var isNoData = true;
                subStatusSDP2Results.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            loadsubscriberStatusSDP2Chart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }
                });
                $('#statuswiseSDP2ChartPreloader').hide();
                setTimeout(function () {
                    if (isNoData) {
                        if ('tillDate' === chartType) {
                            Highcharts.chart('statuswiseSDP2Chart', bizPreSub.tillDate.statuswiseSDP2);
                        } else {
                            Highcharts.chart('statuswiseSDP2Chart', bizPreSub.daily.statuswiseSDP2);
                        }
                    }
                }, 3000);
                refreshDateTime();
            });
    
            // Subscriber Lifecycle Chart Data Loading
            if ("tillDate" != chartType) {
                subLifecycleChartChartData.settings.unset("search");
                if ("" !== fromDate && "" !== toDate) {
                    if (fromDate.indexOf(":0:0:0") == -1) {
                        fromDate = fromDate + ':0:0:0';
                    }
                    if (toDate.indexOf(":23:59:59") == -1) {
                        toDate = toDate + ":23:59:59";
                    }
                    subLifecycleChartChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subLifecycleQuery, country, fromDate, toDate, serviceType));
                } else {
                    subLifecycleChartChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subLifecycleQuery, country, "", "", serviceType));
                }
                subLifecycleChartChartData.startSearch();
    
                $('#subLifecycleChart').html('<div id="subLifecycleChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                $('#subLifecycleChartPreloader').show();
    
                subLifecycleChartChartData.on('search:done', function (properties) {
                    var subLifecycleResults = subLifecycleChartChartData.data("results", {
                        count: 0,
                        offset: 0
                    });
                    var isNoData = true;
                    subLifecycleResults.on("data", function (queryResults) {
                        if (undefined !== queryResults.data()) {
                            if (null !== queryResults.data().rows) {
                                var finalDataJson = convertResultToJSON(queryResults.data());
                                loadSubLifecycleChart(chartType, finalDataJson.data);
                                isNoData = false;
                            }
                        }
                    });
                    $('#subLifecycleChartPreloader').hide();
                    setTimeout(function () {
                        if (isNoData) {
                            Highcharts.chart('subLifecycleChart', bizPreSub.daily.subLifecycle);
                        }
                    }, 3000);
    
                    refreshDateTime();
                });
            }
    
            // Subscriber Countrywise Data Loading
            countrywiseChartData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                countrywiseChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subCountrywiseQuery, country, fromDate, toDate, serviceType));
            } else {
                countrywiseChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subCountrywiseQuery, country, "", "", serviceType));
            }
            countrywiseChartData.startSearch();
    
            $('#countrywiseChart').html('<div id="countrywiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#countrywiseChartPreloader').show();
    
            countrywiseChartData.on('search:done', function (properties) {
                var countrywiseChartResults = countrywiseChartData.data("results", {
                    count: 0,
                    offset: 0
                });
                var isNoData = true;
                countrywiseChartResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            loadCountryChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }
                });
                $('#countrywiseChartPreloader').hide();
                setTimeout(function () {
                    if (isNoData) {
                        if ('tillDate' === chartType) {
                            bizPreSub.daily.countrywise.series.data = [];
                            Highcharts.chart('countrywiseChart', bizPreSub.tillDate.countrywise);
                        } else {
                            bizPreSub.daily.countrywise.series.data = [];
                            Highcharts.chart('countrywiseChart', bizPreSub.daily.countrywise);
                        }
                    }
                }, 3000)
    
                refreshDateTime();
            });
            //  if ("tillDate" != chartType) {
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            subscriberTrendData.settings.set("search", getQuery("bizPreDrillSubQuery", subTrendQuery, country, fromDate, toDate, serviceType));
        } else {
            subscriberTrendData.settings.set("search", getQuery("bizPreDrillSubQuery", subTrendQuery, country, "", "", serviceType));
        }
        // Subscriber Trend Data Loading
        //subscriberTrendData.settings.unset("search");
        // subscriberTrendData.settings.set("search", getQuery("bizPreDrillSubQuery", subTrendQuery, country, "", "", serviceType));
        subscriberTrendData.startSearch();

    
                $('#subscriberTrendChart').html('<div id="subscriberTrendChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                $('#subscriberTrendChartPreloader').show();
    
                subscriberTrendData.on('search:done', function (properties) {
                    var subtrendResults = subscriberTrendData.data("results", {
                        count: 0,
                        offset: 0
                    });
                    var isNoData = true;
                    subtrendResults.on("data", function (queryResults) {
                        if (undefined !== queryResults.data()) {
                            if (null !== queryResults.data().rows) {
                                var finalDataJson = convertResultToJSON(queryResults.data());
                                loadTrendChart(chartType, finalDataJson.data);
                                isNoData = false;
                            }
                        }
                    });
                    $('#subscriberTrendChartPreloader').hide();
                    setTimeout(
                        function () {
                            if (isNoData) {
                                Highcharts.chart('subscriberTrendChart', bizPreSub.daily.subscriberTrend);
                            }
                        }, 3000);
                    refreshDateTime();
                });
            }
    
            // These lines of code should be uncommented while doing the phase 2 of OCS.
    
            // Planwise chart Data Loading
            // planwiseChartData.settings.unset("search");
            // if ("" !== fromDate && "" !== toDate) {
            //     if (fromDate.indexOf(":0:0:0") == -1) {
            //         fromDate = fromDate + ':0:0:0';
            //     }
            //     if (toDate.indexOf(":23:59:59") == -1) {
            //         toDate = toDate + ":23:59:59";
            //     }
            //     planwiseChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subPlanwiseQuery, country, fromDate, toDate, serviceType));
            // } else {
            //     planwiseChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subPlanwiseQuery, country, "", "", serviceType));
            // }
            // planwiseChartData.startSearch();
    
            // $('#planwiseChart').html('<div id="planwiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            // $('#planwiseChartPreloader').show();
    
            // planwiseChartData.on('search:done', function () {
            //     var planwiseResults = planwiseChartData.data("results", {
            //         count: 0,
            //         offset: 0
            //     });
            //     var isNoData = true;
            //     planwiseResults.on("data", function (queryResults) {
            //         if (undefined !== queryResults.data()) {
            //             if (null !== queryResults.data().rows) {
            //                 var finalDataJson = convertResultToJSON(queryResults.data());
            //                 loadplanwiseChart(chartType, finalDataJson.data);
            //                 isNoData = false;
            //             }
            //         }
            //     });
            //     $('#planwiseChartPreloader').hide();
            //     setTimeout(function () {
            //         if (isNoData) {
            //             Highcharts.chart('planwiseChart', bizPreSub.tillDate.planwise);
            //         }
            //     }, 3000);
            //     refreshDateTime();
            // });
    
            // if ("tillDate" === chartType) {
            //     // Subscriber Loyality Data Loading
            //     loyaltyChartData.settings.unset("search");
            //     loyaltyChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subLoyaltyQuery, country, "", "", serviceType));
            //     loyaltyChartData.startSearch();
    
            //     $('#loyaltyChart').html('<div id="loyaltyChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            //     $('#loyaltyChartPreloader').show();
    
            //     loyaltyChartData.on('search:done', function (properties) {
            //         var loyalityChartResults = loyaltyChartData.data("results", {
            //             count: 0,
            //             offset: 0
            //         });
            //         var isNoData = true;
            //         loyalityChartResults.on("data", function (queryResults) {
            //             if (undefined !== queryResults.data()) {
            //                 if (null !== queryResults.data().rows) {
            //                     var finalDataJson = convertResultToJSON(queryResults.data());
            //                     loadLoyalityChart(chartType, finalDataJson.data);
            //                     isNoData = false;
            //                 }
            //             }
            //         });
            //         $('#loyaltyChartPreloader').hide();
            //         setTimeout(
            //             function () {
            //                 if (isNoData) {
            //                     Highcharts.chart('loyaltyChart', bizPreSub.tillDate.loyalty);
            //                 }
            //             }, 3000);
            //         refreshDateTime();
            //     });
    
            //     // Subscriber Exit Reason Data Loading
            //     exitReasonChartData.settings.unset("search");
            //     exitReasonChartData.settings.set("search", getQuery("bizPreDrillSubQuery", subExitReasonQuery, country, "", "", serviceType));
            //     exitReasonChartData.startSearch();
    
            //     $('#exitReasonChart').html('<div id="exitReasonChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            //     $('#exitReasonChartPreloader').show();
    
            //     exitReasonChartData.on('search:done', function (properties) {
            //         var subExitReasonResults = exitReasonChartData.data("results", {
            //             count: 0,
            //             offset: 0
            //         });
            //         var isNoData = true;
            //         subExitReasonResults.on("data", function (queryResults) {
            //             if (undefined !== queryResults.data()) {
            //                 if (null !== queryResults.data().rows) {
            //                     var finalDataJson = convertResultToJSON(queryResults.data());
            //                     loadSubExitReasonChart(chartType, finalDataJson.data);
            //                     isNoData = false;
            //                 }
            //             }
            //         });
            //         $('#exitReasonChartPreloader').hide();
            //         setTimeout(
            //             function () {
            //                 if (isNoData) {
            //                     Highcharts.chart('exitReasonChart', bizPreSub.tillDate.exitReason);
            //                 }
            //             }, 3000);
            //         refreshDateTime();
            //     });
            // }
    
    
        }

        // custom changes for splunk js ends here

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
        pageLoading = false;

    }
);

function getOnlySearchResultsConstructor(id, interval) {
    var searchmanager = new SearchManagerModal({

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

// Chart Processing business logic
function loadsubscriberStatusSDP1Chart(chartType, rows) {
    var subStatusChart = ["ACTIVE", "INSTALLED", "SUSPENDED"];
    Highcharts.chart('statuswiseSDP1Chart', bizPreSub.tillDate.statuswiseSDP1);
    if ("tillDate" === chartType) {
        var statusWiseChartConfig = bizPreSub.tillDate.statuswiseSDP1;
        for (var i = 0; i < rows.length; i++) {
            var data = [];
            if (undefined == statusWiseChartConfig.series[i]) {
                statusWiseChartConfig.series[i] = [];
            }
            data.push(parseInt(rows[i]["subscribercount"]));
            statusWiseChartConfig.series[i].name = rows[i]["subscriberstatus"];
            statusWiseChartConfig.series[i].data = data;
        }
        Highcharts.chart('statuswiseSDP1Chart', statusWiseChartConfig);
    } else {
        processStackBarData(rows, bizPreSub[chartType].statuswiseSDP1, 'statuswiseSDP1Chart', subStatusChart, "txndate", "subscriberstatus", "totalcount");
        return;
    }
}

function loadsubscriberStatusSDP2Chart(chartType, rows) {
    var subStatusChart = ["ACTIVE", "INSTALLED", "SUSPENDED"];
    Highcharts.chart('statuswiseSDP2Chart', bizPreSub.tillDate.statuswiseSDP2);
    if ("tillDate" === chartType) {
        var statusWiseChartConfig = bizPreSub.tillDate.statuswiseSDP2
        for (var i = 0; i < rows.length; i++) {
            var data = [];
            if (undefined == statusWiseChartConfig.series[i]) {
                statusWiseChartConfig.series[i] = [];
            }
            data.push(parseInt(rows[i]["subscribercount"]));
            statusWiseChartConfig.series[i].name = rows[i]["subscriberstatus"];
            statusWiseChartConfig.series[i].data = data;
        }
        Highcharts.chart('statuswiseSDP2Chart', statusWiseChartConfig);
    } else {
        processStackBarData(rows, bizPreSub[chartType].statuswiseSDP2, 'statuswiseSDP2Chart', subStatusChart, "txndate", "subscriberstatus", "totalcount");
        return;
    }
}

function loadCountryChart(chartType, chartData) {
    Highcharts.chart('countrywiseChart', bizPreSub.tillDate.countrywise);
    if ("tillDate" === chartType) {
        var countryChart = Highcharts.chart('countrywiseChart', bizPreSub.tillDate.countrywise);
        setPieData(chartData, countryChart, "country", "totalsub");
    } else {
        var countryWiseChart = bizPreSub[chartType].countrywise;
        basicLineDataProcessor(chartData, countryWiseChart, 'countrywiseChart', "txndate", "country", "totalsub");
        return;
    }
}

function loadSubLifecycleChart(chartType, rows) {
    Highcharts.chart('subLifecycleChart', bizPreSub.tillDate.subLifecycle);
    if ("daily" === chartType) {
        var subLifeCycleData = cumulativeChartProcessor(rows, 'txndate', 'thirtydayscount', 'sixtydayscount', 'ninetydayscount');
        bizPreSub.daily.subLifecycle.xAxis.categories = subLifeCycleData.days;
        bizPreSub.daily.subLifecycle.series[0].data = subLifeCycleData.rev1;
        bizPreSub.daily.subLifecycle.series[1].data = subLifeCycleData.rev2;
        bizPreSub.daily.subLifecycle.series[2].data = subLifeCycleData.rev3;
        Highcharts.chart('subLifecycleChart', bizPreSub.daily.subLifecycle);
    } else{
		var subLifeCycleData = cumulativeChartProcessor(rows, 'txndate', 'thirtydayscount', 'sixtydayscount', 'ninetydayscount');
        bizPreSub.weekly.subLifecycle.xAxis.categories = subLifeCycleData.days;
        bizPreSub.weekly.subLifecycle.series[0].data = subLifeCycleData.rev1;
        bizPreSub.weekly.subLifecycle.series[1].data = subLifeCycleData.rev2;
        bizPreSub.weekly.subLifecycle.series[2].data = subLifeCycleData.rev3;
        Highcharts.chart('subLifecycleChart', bizPreSub.weekly.subLifecycle);
	}
}

function loadTrendChart(chartType, rows) {
    Highcharts.chart('subscriberTrendChart', bizPreSub.daily.subscriberTrend);
    if (undefined !== rows) {
        var trendChartdata = averageResolution(rows, 'txndate', 'subscribercount', 'usagesubscribercount');
        bizPreSub.daily.subscriberTrend.xAxis[0].categories = trendChartdata.Categories;
        bizPreSub.daily.subscriberTrend.series[0].data = trendChartdata.AverageResolution;
        bizPreSub.daily.subscriberTrend.series[1].data = trendChartdata.TotalIncidentsCount;
        Highcharts.chart('subscriberTrendChart', bizPreSub.daily.subscriberTrend);
    }
    return;
}

// These lines of code should be uncommented while doing the phase 2 of OCS.
// Chart Implementation for 
// Subscriber Exit Charts
// Subscriber Plan Charts
// Subscriber Loyality chart
function loadExitChart(chartTkype, rows) {
    Highcharts.chart('exitReasonChart', bizPreSub.emptyChartConfig.emptyChart);
    if ("tillDate" === chartType) {
        var othersdata = processOthersData(getPieChart(rows, "reasondesc", "totalcount"));
        var pieWithOthersDataChartObj = Highcharts.chart('exitReasonChart', bizPreSub.tillDate.exitReason);
        pieWithOthersDataChartObj.series[0].setData(othersdata);
        return;
    }

}

function loadPlanChart(chartType, rows) {
    Highcharts.chart('planwiseChart', bizPreSub.emptyChartConfig.emptyChart);
    if ("tillDate" === chartType) {
        var othersdata = processOthersData(getPieChart(rows, "plandesc", "totalcount"));
        var pieWithPlanOthersDataChartObj = Highcharts.chart('planwiseChart', bizPreSub.tillDate.planwise);
        pieWithPlanOthersDataChartObj.series[0].setData(othersdata);
        return;
    } else {
        //processStackBar(rows, bizPreSub.daily.planwise, 'planwiseChart');
        processStackBarData(rows, bizPreSub.daily.planwise, 'planwiseChart', "", "txndate", "plandesc", "totalcount");
        return;
    }
}

function loadLoyalChart(chartType, rows) {
    Highcharts.chart('loyaltyChart', bizPreSub.emptyChartConfig.emptyChart);
    if ("tillDate" === chartType) {
        var loyalityChart = Highcharts.chart('loyaltyChart', bizPreSub.tillDate.loyalty);
        setPieData(rows, loyalityChart, "loyalty", "totalcount");
        return;
    }
}