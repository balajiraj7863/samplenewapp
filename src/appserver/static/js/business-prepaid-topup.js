// Highchartchart container ID declarations for the page
var revenueTopupChartInit = "";
var topupChannelChartInit = "";
var topupRevByChannelChartInit = "";

var country = "";
var serviceType = "";

function highchartsInitialize() {
    revenueTopupChartInit = Highcharts.chart('topupVSRevenueChart', bizPreTopupDrilldown.daily.topupVSRevenue);
    topupChannelChartInit = Highcharts.chart('topupChannelChart', bizPreTopupDrilldown.daily.topupChannel);
    topupRevByChannelChartInit = Highcharts.chart('topupRevByChannelChart', bizPreTopupDrilldown.daily.topupRevByChannel);
}

function highchartsDestroy() {
    revenueTopupChartInit.destroy();
    topupChannelChartInit.destroy();
    topupRevByChannelChartInit.destroy();
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
    getHelpText(mapKey, "topupVSRevenueHelp");
    getHelpText(mapKey, "topupChannelHelp");
    getHelpText(mapKey, "topupRevByChannelHelp");
}
updateHelpText('bizPreTopupDaily');

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
        utils = require("splunkjs/mvc/utils");
        var pageLoading = true;

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
       
    
        loadChart("daily");
    
        // Date Preset Implementation
        $('#daily').click(function () {
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            // Plot the new charts
            loadChart("daily");
            //update the HelpTextIcon
            updateHelpText('bizPreTopupDaily');
        });
        $('#weekly').click(function () {
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            // Plot the new charts
            loadChart("weekly");
            //update the HelpTextIcon
            updateHelpText('bizPreTopupWeekly');
        });
        $('#monthly').click(function () {
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            // Plot the new charts
            loadChart("monthly");
            //update the HelpTextIcon
            updateHelpText('bizPreTopupMonthly');
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
            updateHelpText('bizPreTopupCustomDate');
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
                updateHelpText('bizPreTopupCustomDate');
            } else {
                emptyDateValidation('fromDate', 'toDate');
            }
        });
    
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
            var queryMapKey = "bizPreDrillTopupQuery";
            getResultsAndExport(queryMapKey, "topupRevenueVsVolumeExport", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "topupVolumebyChannelExport", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "topupRevenueByChannelExport", country, fromDate, toDate);
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
            var topupVSRevenueChartData = getOnlySearchResultsConstructor("topupVSRevenueChartPreloader","24h");
            var topupChannelChartData = getOnlySearchResultsConstructor("topupChannelChartPreloader","24h");
            var topupRevByChannelChartData = getOnlySearchResultsConstructor("topupRevByChannelChartPreloader","24h");
    
            // query var declarations
            var topupVSRevenueQuery = "";
            var topupChannelQuery = "";
            var topupRevByChannelQuery = "";
    
            if ("daily" === chartType) {
                topupVSRevenueQuery = "topupVSRevenueDaily";
                topupChannelQuery = "topupChannelDaily";
                topupRevByChannelQuery = "topupRevByChannelDaily";
            } else if ("weekly" === chartType) {
                topupVSRevenueQuery = "topupVSRevenueWeekly";
                topupChannelQuery = "topupChannelWeekly";
                topupRevByChannelQuery = "topupRevByChannelWeekly";
            } else if ("monthly" === chartType) {
                topupVSRevenueQuery = "topupVSRevenueMonthly";
                topupChannelQuery = "topupChannelMonthly";
                topupRevByChannelQuery = "topupRevByChannelMonthly";
            } else if ("customDate" === chartType) {
                topupVSRevenueQuery = "topupVSRevenueCustomDate";
                topupChannelQuery = "topupChannelCustomDate";
                topupRevByChannelQuery = "topupRevByChannelCustomDate";
            }
    
            // Topup VS Revenue Data loading
            topupVSRevenueChartData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                topupVSRevenueChartData.settings.set("search", getQuery("bizPreDrillTopupQuery", topupVSRevenueQuery, country, fromDate, toDate, serviceType));
            } else {
                topupVSRevenueChartData.settings.set("search", getQuery("bizPreDrillTopupQuery", topupVSRevenueQuery, country, "", "", serviceType));
            }
            topupVSRevenueChartData.startSearch();
            $('#topupVSRevenueChart').html('<div id="topupVSRevenueChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#topupVSRevenueChartPreloader').show();
    
            topupVSRevenueChartData.on('search:done', function (properties) {
                var topupResults = topupVSRevenueChartData.data("results", {
                    count: 0,
                    offset: 0
                });
                var isNoData = true;
                topupResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            loadTopupVsRevenueChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }
                });
                $('#topupVSRevenueChartPreloader').hide();
                setTimeout(function () {
                    if (isNoData) {
                        if ('daily' === chartType) {
                            Highcharts.chart('topupVSRevenueChart', bizPreTopupDrilldown.daily.topupVSRevenue);
                        } else {
                            Highcharts.chart('topupVSRevenueChart', bizPreTopupDrilldown.weekly.topupVSRevenue);
                        }
                    }
                }, 3000);
    
                refreshDateTime();
            });
    
    
            // Topup by channel Data Loading
            topupChannelChartData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                topupChannelChartData.settings.set("search", getQuery("bizPreDrillTopupQuery", topupChannelQuery, country, fromDate, toDate, serviceType));
            } else {
                topupChannelChartData.settings.set("search", getQuery("bizPreDrillTopupQuery", topupChannelQuery, country, "", "", serviceType));
            }
            topupChannelChartData.startSearch();
    
            $('#topupChannelChart').html('<div id="topupChannelChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#topupChannelChartPreloader').show();
    
            topupChannelChartData.on('search:done', function () {
                var failureReasonResults = topupChannelChartData.data("results", {
                    count: 0,
                    offset: 0
                });
                var isNoData = true;
                failureReasonResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            loadTopupChannelChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }
                });
                $('#topupChannelChartPreloader').hide();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('topupChannelChart', bizPreTopupDrilldown.daily.topupChannel);
                    }
                }, 3000);
                refreshDateTime();
            });
    
            // Topup Revenue by channel Data Loading
            topupRevByChannelChartData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                topupRevByChannelChartData.settings.set("search", getQuery("bizPreDrillTopupQuery", topupRevByChannelQuery, country, fromDate, toDate, serviceType));
            } else {
                topupRevByChannelChartData.settings.set("search", getQuery("bizPreDrillTopupQuery", topupRevByChannelQuery, country, "", "", serviceType));
            }
            topupRevByChannelChartData.startSearch();
    
            $('#topupRevByChannelChart').html('<div id="topupRevByChannelChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#topupRevByChannelChartPreloader').show();
    
            topupRevByChannelChartData.on('search:done', function (properties) {
                var topupRevByChannelResults = topupRevByChannelChartData.data("results", {
                    count: 0,
                    offset: 0
                });
                var isNoData = true;
                topupRevByChannelResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            loadTopupRevByChannelChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }
                });
                $('#topupRevByChannelChartPreloader').hide();
                setTimeout(function () {
                    if (isNoData) {
                        if ('daily' === chartType) {
                            bizPreTopupDrilldown.daily.topupRevByChannel.series[0].data = [];
                            Highcharts.chart('topupRevByChannelChart', bizPreTopupDrilldown.daily.topupRevByChannel);
                        } else {
                            bizPreTopupDrilldown.weekly.topupRevByChannel.series = [];
                            Highcharts.chart('topupRevByChannelChart', bizPreTopupDrilldown.weekly.topupRevByChannel);
                        }
                    }
                }, 3000)
    
                refreshDateTime();
            });
        }
        
    
        function getOnlySearchResultsConstructor(id,interval) {
            var searchmanager = new SearchManagerModal({
                preview: false,
                "refresh":interval,
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

// Chart Processing business logic
function loadTopupVsRevenueChart(chartType, rows) {
    var topupVsRevChart;
    if ("daily" === chartType || "weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        topupVsRevChart = bizPreTopupDrilldown.daily.topupVSRevenue;
        var topupVsRevnueResults = averageResolution(rows, 'txndate', 'topup', 'revenue');
        topupVsRevChart.xAxis[0].categories = topupVsRevnueResults.Categories;
        topupVsRevChart.series[0].data = topupVsRevnueResults.AverageResolution;
        topupVsRevChart.series[1].data = topupVsRevnueResults.TotalIncidentsCount;
        Highcharts.chart('topupVSRevenueChart', topupVsRevChart);
    }
}

function loadTopupChannelChart(chartType, rows) {
    var topupChannelChart;
    if ("daily" === chartType || "weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        topupChannelChart = bizPreTopupDrilldown.daily.topupChannel;
        basicLineDataProcessor(rows, topupChannelChart, 'topupChannelChart', 'txndate', 'channel', 'topup');
        return;
    }
}

function loadTopupRevByChannelChart(chartType, rows) {
    var topupRevByChannelChart;
    if ("daily" === chartType || "weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        topupRevByChannelChart = bizPreTopupDrilldown.daily.topupRevByChannel;
        processStackBarData(rows, topupRevByChannelChart, 'topupRevByChannelChart', "", 'txndate', 'channel', 'revenue');
    }
}