// Highchartchart container ID declarations for the page
var mnpDailyChartInit = "";
var mnpWeeklyChartInit = "";
var mnpMonthlyChartInit = "";

function highchartsInitialize() {
    mnpDailyChartInit = Highcharts.chart('mnpDailyChart', opsPostMnpDD.mnpDaily);
    mnpWeeklyChartInit = Highcharts.chart('mnpWeeklyChart', opsPostMnpDD.mnpWeekly);
    mnpMonthlyChartInit = Highcharts.chart('mnpMonthlyChart', opsPostMnpDD.mnpMonthly);
}

function highchartsDestroy() {
    mnpDailyChartInit.destroy();
    mnpWeeklyChartInit.destroy();
    mnpMonthlyChartInit.destroy();
}

// Help Text Initialisation
function updateHelpText(mapKey) {
    getHelpText(mapKey, "mnpDailyHelp");
    getHelpText(mapKey, "mnpWeeklyHelp");
    getHelpText(mapKey, "mnpMonthlyHelp");
}
 updateHelpText('opsMNPDDHelp');
getHelpText("exportExcelData", "exportExcelDateHelp");
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

        var SearchManager = require("splunkjs/mvc/searchmanager");
        var utils = require("splunkjs/mvc/utils");
        var pageLoading = true;

        //  custom changes for splunk js starts here,

       
        var isExportData = false;

        //TO SELECT COUNTRY 
    var oldCountryList = "";
    var country = "";

    // TO SET DEFAULT DATE VALUE FOR SEARCH

    var serviceType = "Prepaid";
    if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
        if (localStorage.getItem("globalUserServiceTypeList").indexOf("operation-postpaid") > -1) {
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
    var mnpData = getOnlySearchResultsConstructor(getQuery("operationsPrepaidMnpQuery", "ops_post_mnp_daily_chart", country, "", "", serviceType), "mnpchartPreloader", "24h");
    mnpData.on('search:done', function () {
        var mnpSearchResults = mnpData.data("results", {
            count: 0,
            offset: 0
        });
        mnpSearchResults.on("data", function (queryResults) {
            if (undefined !== queryResults.data()) {
                if (null !== queryResults.data().rows) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var mnpChartData = trendMNPDataProcessor(finalDataJson.data, "date", "portin", "portout");
                    opsPostMnpDD.mnpDaily.xAxis.categories = mnpChartData.x_axis;
                    opsPostMnpDD.mnpDaily.series[0].data = mnpChartData.portIn;
                    opsPostMnpDD.mnpDaily.series[1].data = mnpChartData.portOut;
                    opsPostMnpDD.mnpDaily.series[2].data = mnpChartData.lastweek_portIn;
                    opsPostMnpDD.mnpDaily.series[3].data = mnpChartData.lastweek_portOut;
                }
                Highcharts.chart('mnpDailyChart', opsPostMnpDD.mnpDaily);
            }

        });
        $('#mnpchartPreloader').hide();
        refreshDateTime();
       Highcharts.chart('mnpDailyChart', OpsMnpEmpty.emptyChartConfig.emptyChart);
    });
    var mnpDataMonthly = getOnlySearchResultsConstructor(getQuery("operationsPrepaidMnpQuery", "ops_post_mnp_monthy_chart", country, "", "", serviceType), "mnpchartPreloader", "24h");
    mnpDataMonthly.on('search:done', function () {
        var mnpSearchResults = mnpDataMonthly.data("results", {
            count: 0,
            offset: 0
        });
        mnpSearchResults.on("data", function (queryResults) {
            if (undefined !== queryResults.data()) {
                if (null !== queryResults.data().rows) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var mnpChartData = colChartDataProcessor(finalDataJson.data, "date", "portin", "portout");
                    //var mnpChartData = trendMNPDataProcessor(finalDataJson.data, "date", "portin", "portout");
                    opsPostMnpDD.mnpMonthly.xAxis[0].categories = mnpChartData.x_axis;
                    opsPostMnpDD.mnpMonthly.series[0].data = mnpChartData.portin;
                    opsPostMnpDD.mnpMonthly.series[1].data = mnpChartData.portout;
                    Highcharts.chart('mnpMonthlyChart', opsPostMnpDD.mnpMonthly);
                }
                
            }
        });
        $('#mnpchartPreloader').hide();
        refreshDateTime();
        Highcharts.chart('mnpMonthlyChart', OpsMnpEmpty.emptyChartConfig.emptyChart);
    });
    var mnpDataWeekly = getOnlySearchResultsConstructor(getQuery("operationsPrepaidMnpQuery", "ops_post_mnp_weekly_chart", country, "", "", serviceType), "mnpchartPreloader", "24h");
    mnpDataWeekly.on('search:done', function () {
        var mnpSearchResults = mnpDataWeekly.data("results", {
            count: 0,
            offset: 0
        });
        mnpSearchResults.on("data", function (queryResults) {
            if (undefined !== queryResults.data()) {
                if (null !== queryResults.data().rows) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    //var mnpChartData = trendMNPDataProcessor(finalDataJson.data, "date", "portin", "portout");
                    var mnpChartData = colChartDataProcessor(finalDataJson.data, "date", "portin", "portout");
                    opsPostMnpDD.mnpWeekly.xAxis[0].categories = mnpChartData.x_axis;
                    opsPostMnpDD.mnpWeekly.series[0].data = mnpChartData.portin;
                    opsPostMnpDD.mnpWeekly.series[1].data = mnpChartData.portout;
                    Highcharts.chart('mnpWeeklyChart', opsPostMnpDD.mnpWeekly);
                }
                }
        });
        $('#mnpchartPreloader').hide();
        refreshDateTime();
       Highcharts.chart('mnpWeeklyChart', OpsMnpEmpty.emptyChartConfig.emptyChart);
    });

    function getOnlySearchResultsConstructor(query, id, interval) {
        var searchmanager = new SearchManager({
            "cancelOnUnload": true,
            "refresh": "0",
            "refreshType": "delay",
            "sample_ratio": 1,
            "status_buckets": 0,
            "search": query,
            //"latest_time": "now",
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
        }
        $('#downloadExportData').click(function () {
            $("#exportTableModal").modal("show");
            $("#modalInfoText").text(getBannerHelpText("exportExcelData", "modalInfoText"));
            $(".datePicker").css('background', '#eee');
            downloadChartData();
            setTimeout(function () {
                $('#exportTableModal').modal('hide');
            }, 2500);
        });
    
        function downloadChartData() {
            var fromDate = getExportDateSetter(180);
            var toDate = getExportDateSetter(0);
            var queryMapKey = "operationsPrepaidMnpQuery";
            getResultsAndExport(queryMapKey, "prepaidMNPData", country, fromDate, toDate);
           //getResultsAndExport(queryMapKey, "ops_post_mnp_daily_chart_data", country, fromDate, toDate);
           // getResultsAndExport(queryMapKey, "ops_post_mnp_daily_chart_data", country, fromDate, toDate);
            return false;
        }
    
        function getResultsAndExport(mapKey, planQuery, country, fromDate, toDate) {
            var searchmanager = new SearchManager({
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
    });

// custom changes for splunk js ends here
