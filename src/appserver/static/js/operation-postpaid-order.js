// Highchartchart container ID declarations for the page
var orderStatusChartInit = "";
var typewiseChartInit = "";
var planwiseChartInit = "";
var orderIntakeChartInit = "";
var orderCompleteChartInit = "";

function highchartsInitialize() {
    orderStatusChartInit = Highcharts.chart('orderStatusChart', opsIncOrderDrilldown.daily.statuswise);
    typewiseChartInit = Highcharts.chart('typewiseChart', opsIncOrderDrilldown.emptyDataConfig.typewise);
    planwiseChartInit = Highcharts.chart('planwiseChart', opsIncOrderDrilldown.emptyDataConfig.planwise);
    orderCompleteChartInit = Highcharts.chart('orderCompleteChart', opsIncOrderDrilldown.emptyDataConfig.orderComplete);
    orderIntakeChartInit = Highcharts.chart('orderIntakeChart', opsIncOrderDrilldown.emptyDataConfig.orderIntake);
}

function highchartsDestroy() {
    orderStatusChartInit.destroy();
    typewiseChartInit.destroy();
    planwiseChartInit.destroy();
    orderCompleteChartInit.destroy();
    orderIntakeChartInit.destroy();
}

//Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("button[type='button']").attr("disabled", true);
});

// Help Text Initialisation
function updateHelpText(mapKey) {
    getHelpText(mapKey, "statuswiseHelp");
    getHelpText(mapKey, "typewiseHelp");
    getHelpText(mapKey, "planwiseHelp");
    getHelpText(mapKey, "orderIntakeHelp");
    getHelpText(mapKey, "orderCompleteHelp");
}
updateHelpText('opsPostOrderDaily');

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

        var bizhomesub = null;
        var opsPostsub = null;
        var opsPostDrillOrderTrend = null;
        var opsPostOrderAgingChart = null;
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var isExportData = false;

        //TO SELECT COUNTRY 
    var oldCountryList = "";
    var country = "";

    // TO SET DEFAULT DATE VALUE FOR SEARCH

    var serviceType = "Postpaid";
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
            var targetEle = $(".filterDiv .active").find('input');
            targetEle.trigger('click');
        }

    // To initialise the highcharts
   

    $('#tillDate').click(function () {
        $('.custom-date').hide();
        $('#orderIntakeContainer').hide();
        $('#orderCompleteContainer').hide();
        $('#orderTypeContainer').show();
        highchartsInitialize();
        highchartsDestroy();
        // Plot the new charts
        loadChart("tillDate");
        //update the HelpTextIcon
        updateHelpText('opsPostOrderTillDate');
    });
    $('#today').click(function () {
        $('.custom-date').hide();
        $('#orderIntakeContainer').hide();
        $('#orderCompleteContainer').hide();
        $('#orderTypeContainer').show();
        highchartsInitialize();
        highchartsDestroy();
        // Plot the new charts
        loadChart("today");
        //update the HelpTextIcon
        updateHelpText('opsPostOrderToday');
    });
    $('#daily').click(function () {
        $('.custom-date').hide();
        $('#orderTypeContainer').hide();
        $('#orderIntakeContainer').show();
        $('#orderCompleteContainer').show();
        highchartsInitialize();
        highchartsDestroy();
        // Plot the new charts
        loadChart("daily");
        //update the HelpTextIcon
        updateHelpText('opsPostOrderDaily');
    });
    $('#weekly').click(function () {
        $('.custom-date').hide();
        $('#orderTypeContainer').hide();
        $('#orderIntakeContainer').show();
        $('#orderCompleteContainer').show();
        highchartsInitialize();
        highchartsDestroy();
        // Plot the new charts
        loadChart("weekly");
        //update the HelpTextIcon
        updateHelpText('opsPostOrderWeekly');
    });
    $('#monthly').click(function () {
        $('.custom-date').hide();
        $('#orderTypeContainer').hide();
        $('#orderIntakeContainer').show();
        $('#orderCompleteContainer').show();
        highchartsInitialize();
        highchartsDestroy();
        // Plot the new charts
        loadChart("monthly");
        //update the HelpTextIcon
        updateHelpText('opsPostOrderMonthly');
    });
    $('#customDate').click(function () {
        $('.custom-date').css('display','inline-block');
        highchartsInitialize();
        highchartsDestroy();
        $('#orderTypeContainer').hide();
        $('#orderIntakeContainer').show();
        $('#orderCompleteContainer').show();
        // Plot the new charts
        loadChart("daily");
        $(".datePicker").css('background', '#fff');
        $("#fromDate.datePicker").css('background', '#fff');
        //update the HelpTextIcon
        updateHelpText('opsPostOrderCustomDate');
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
            updateHelpText('opsPostOrderCustomDate');
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
        $(".datePicker").css('background', '#fff');
        downloadChartData();
        setTimeout(function () {
            $('#exportTableModal').modal('hide');
        }, 2500);
    });

    function downloadChartData() {
        fromDate = getExportDateSetter(180);
        toDate = getExportDateSetter(0);
        var queryMapKey = "opsPostOrderDrillQuery";
        getResultsAndExport(queryMapKey, "orderStatusOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "orderTypeOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "orderPlanwiseOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "orderCompletionTrendOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "orderIntakeTrendOperationData", country, fromDate, toDate);
        return false;
    }

    function loadChart(chartType) {
        //console.log('Initialisation');
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        $(".datePicker").css('border', '1px solid #ccc');
        $(".datePicker").css('background', '#eee');
        getHelpText("exportExcelData", "exportExcelDateHelp");
        // initialize search manager instance
        var orderStatusSearchData = getOnlySearchResultsConstructor("orderStatusChartPreloaderQuery","30m");
        var typewiseSearchData = getOnlySearchResultsConstructor("typewiseChartPreloaderQuery","30m");
        var planwiseSearchData = getOnlySearchResultsConstructor("orderPlanChartPreloaderQuery","30m");
        var orderCompletionData = getOnlySearchResultsConstructor("orderCompletionChartPreloaderQuery","30m");
        var orderIntakeSearchData = getOnlySearchResultsConstructor("orderIntakeChartPreloaderQuery","30m");

        // query var declarations
        var statusQuery = "";
        var typewiseQuery = "";
        var planwiseQuery = "";
        var completionQuery = "";
        var intakeTrendQuery = "";

        if ("tillDate" === chartType) {
            statusQuery = "orderStatusTillDate";
            typewiseQuery = "orderTypeTillDate";
            planwiseQuery = "orderPlanTillDate";
            completionQuery = "orderCompletionTrendDaily";
            intakeTrendQuery = "orderIntakeTrendDaily";
        } else if ("today" === chartType) {
            statusQuery = "orderStatusToday";
            typewiseQuery = "orderTypeToday";
            planwiseQuery = "orderPlanToday";
            completionQuery = "orderCompletionTrendDaily";
            intakeTrendQuery = "orderIntakeTrendDaily";
        } else if ("daily" === chartType) {
            typewiseQuery = "orderTypeTillDate";
            statusQuery = "orderStatusDaily";
            planwiseQuery = "orderPlanwiseDaily";
            completionQuery = "orderCompletionTrendDaily";
            intakeTrendQuery = "orderIntakeTrendDaily";
        } else if ("weekly" === chartType) {
            typewiseQuery = "orderTypeTillDate";
            statusQuery = "orderStatusWeekly";
            planwiseQuery = "orderPlanwiseWeekly";
            completionQuery = "orderCompletionTrendWeekly";
            intakeTrendQuery = "orderIntakeTrendWeekly";
        } else if ("monthly" === chartType) {
            typewiseQuery = "orderTypeTillDate";
            statusQuery = "orderStatusMonthly";
            planwiseQuery = "orderPlanwiseMonthly";
            completionQuery = "orderCompletionTrendMonthly";
            intakeTrendQuery = "orderIntakeTrendMonthly";
        } else if ("customDate" === chartType) {
            typewiseQuery = "orderTypeTillDate";
            statusQuery = "orderStatusCustomDate";
            planwiseQuery = "orderPlanwiseCustomDate";
            completionQuery = "orderCompletionTrendCustomDate";
            intakeTrendQuery = "orderIntakeTrendCustomDate";
        }

        // Order Statuswise Charts
        orderStatusSearchData.settings.unset("search");
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            orderStatusSearchData.settings.set("search", getQuery("opsPostOrderDrillQuery", statusQuery, country, fromDate, toDate, serviceType));
        } else {
            orderStatusSearchData.settings.set("search", getQuery("opsPostOrderDrillQuery", statusQuery, country, "", "", serviceType));
        }

        orderStatusSearchData.startSearch();

        $('#orderStatusChart').html('<div id="orderStatusChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#orderStatusChartPreloader').show();

        orderStatusSearchData.on('search:done', function (properties) {
            var orderStatusResults = orderStatusSearchData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            orderStatusResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadOrderStatusChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#orderStatusChartPreloader').hide();
            refreshDateTime();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart('orderStatusChart', opsIncOrderDrilldown.emptyDataConfig.statuswise);
                }
            }, 3000);

        });

        // Order Typewise Charts
        typewiseSearchData.settings.unset("search");
        typewiseSearchData.settings.set("search", getQuery("opsPostOrderDrillQuery", typewiseQuery, country, "", "", serviceType));
        typewiseSearchData.startSearch();
        $('#typewiseChart').html('<div id="typewiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#typewiseChartPreloader').show();

        typewiseSearchData.on('search:done', function (properties) {
            var orderTypeResults = typewiseSearchData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            orderTypeResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadOrderTypeChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#typewiseChartPreloader').hide();
            refreshDateTime();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart('typewiseChart', opsIncOrderDrilldown.emptyDataConfig.typewise);
                }
            }, 3000)

        });

        // Order Planwise Charts
        planwiseSearchData.settings.unset("search");

        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            planwiseSearchData.settings.set("search", getQuery("opsPostOrderDrillQuery", planwiseQuery, country, fromDate, toDate, serviceType));
        } else {
            planwiseSearchData.settings.set("search", getQuery("opsPostOrderDrillQuery", planwiseQuery, country, "", "", serviceType));
        }

        planwiseSearchData.startSearch();
        $('#planwiseChart').html('<div id="orderPlanChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#orderPlanChartPreloader').show();


        planwiseSearchData.on('search:done', function (properties) {
            var orderPlanResults = planwiseSearchData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            orderPlanResults.on("data", function (queryResults) {
                if (undefined != queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadOrderPlanChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#orderPlanChartPreloader').hide();
            refreshDateTime();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart('planwiseChart', opsIncOrderDrilldown.emptyDataConfig.planwise);
                }
            }, 3000);

        });

        // Order Completion Charts
        orderCompletionData.settings.unset("search");
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            orderCompletionData.settings.set("search", getQuery("opsPostOrderDrillQuery", completionQuery, country, fromDate, toDate, serviceType));
        } else {
            orderCompletionData.settings.set("search", getQuery("opsPostOrderDrillQuery", completionQuery, country, "", "", serviceType));
        }

        orderCompletionData.startSearch();
        $('#orderCompleteChart').html('<div id="orderCompletionChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#orderCompletionChartPreloader').show();

        orderCompletionData.on('search:done', function (properties) {
            var orderCompletionResults = orderCompletionData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            orderCompletionResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadCompletionChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#orderCompletionChartPreloader').hide();
            refreshDateTime();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart('orderCompleteChart', opsIncOrderDrilldown.emptyDataConfig.orderComplete);
                }
            }, 3000);

        });

        // Order Intake Charts
        orderIntakeSearchData.settings.unset("search");
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            orderIntakeSearchData.settings.set("search", getQuery("opsPostOrderDrillQuery", intakeTrendQuery, country, fromDate, toDate, serviceType));
        } else {
            orderIntakeSearchData.settings.set("search", getQuery("opsPostOrderDrillQuery", intakeTrendQuery, country, "", "", serviceType));
        }

        orderIntakeSearchData.startSearch();
        $('#orderIntakeChart').html('<div id="orderIntakeChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#orderIntakeChartPreloader').show();

        orderIntakeSearchData.on('search:done', function (properties) {
            var orderIntakeResults = orderIntakeSearchData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            orderIntakeResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadOrderIntakeTrendChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#orderIntakeChartPreloader').hide();
            refreshDateTime();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart('orderIntakeChart', opsIncOrderDrilldown.emptyDataConfig.orderIntake);
                }
            }, 3000)

        });
    }

    function getOnlySearchResultsConstructor(id,interval) {
        var searchmanager = new SearchManager({
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
        $('#' + id).show();
        return searchmanager;
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
                if (undefined != queryResults.data()) {
                    var rows = searchResults.data().rows;
                    if (rows != null) {

                        exportResultToCsv(searchResults.data().rows, searchResults.data().fields, planQuery, true);
                    }
                }
            });
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

});



// Plotting Order Status Chart Data with Splunk results with Date presets
function loadOrderStatusChart(chartType, rows) {
    var orderStatusChart;
    var fixedOrderStatus = ["COMPLETED", "CURRENT", "CANCELED", "AVAILABLE", "HELD", "PENDING", "DEAD"];
    if ("tillDate" === chartType || "today" === chartType) {
        orderStatusChart = Highcharts.chart('orderStatusChart', opsIncOrderDrilldown.tillDate.statuswise);
        setPieData(rows, orderStatusChart, 'orderstatus', 'totalorders');
    } else if ("daily" === chartType || "weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        orderStatusChart = Highcharts.chart('orderStatusChart', opsIncOrderDrilldown.daily.statuswise);
        processStackBarData(rows, opsIncOrderDrilldown.daily.statuswise, "orderStatusChart", fixedOrderStatus, "txndate", "orderstatus", "totalorders");
    }
}

// Plotting Order Type Chart Data with Splunk results with Date presets
function loadOrderTypeChart(chartType, rows) {
    var typewiseChart;
    if ("tillDate" === chartType || "today" === chartType) {
        typewiseChart = Highcharts.chart('typewiseChart', opsIncOrderDrilldown.tillDate.typewise);
        setPieData(rows, typewiseChart, 'classification', 'sum(totalorders)');
    }
}

// Plotting Order Type Chart Data with Splunk results with Date presets
function loadOrderPlanChart(chartType, rows) {
    var planwiseChart;
    var othersdata;
    if ("tillDate" === chartType || "today" === chartType) {
        othersdata = processOthersData(getPieChart(rows, "tariff_dec", "totalorders"));
        opsIncOrderDrilldown.tillDate.planwise.series[0].data = othersdata;
        Highcharts.chart('planwiseChart', opsIncOrderDrilldown.tillDate.planwise);
    } else if ("daily" === chartType || "weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        opsIncOrderDrilldown[chartType].planwise.series = [];
        planwiseChart = opsIncOrderDrilldown[chartType].planwise;
        processStackBarData(rows, planwiseChart, 'planwiseChart', "", 'txndate', 'tariff_dec', 'totalorders');
    }
}

function loadCompletionChart(chartType, queryResults) {
    var orderCompletionChart;
    var processedData;
    if ("daily" === chartType) {
        orderCompletionChart = opsIncOrderDrilldown.daily.orderComplete;
        processedData = trendDataProcessor(queryResults, "txndate", "totalorders");
        orderCompletionChart.xAxis[0].categories = processedData.xaxisValues;
        orderCompletionChart.series[0].data = processedData.currentWeekData;
        orderCompletionChart.series[1].data = processedData.previousWeekData;
        Highcharts.chart('orderCompleteChart', orderCompletionChart);
    } else if ("weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        orderCompletionChart = opsIncOrderDrilldown.weekly.orderComplete;
        processedData = trendWithoutComparison(queryResults, 'txndate', 'totalorders');
        orderCompletionChart.xAxis[0] = [];
        orderCompletionChart.xAxis[0].categories = processedData.axis;
        orderCompletionChart.series[0].data = processedData.data;
        Highcharts.chart('orderCompleteChart', orderCompletionChart);
    }
}

function loadOrderIntakeTrendChart(chartType, queryResults) {
    var orderIntakeChart;
    var processedIntakeData;
    if ("daily" === chartType) {
        orderIntakeChart = opsIncOrderDrilldown.daily.orderIntake;
        processedIntakeData = trendDataProcessor(queryResults, "txndate", "totalorders");
        orderIntakeChart.xAxis[0].categories = processedIntakeData.xaxisValues;
        orderIntakeChart.series[0].data = processedIntakeData.currentWeekData;
        orderIntakeChart.series[1].data = processedIntakeData.previousWeekData;
        Highcharts.chart('orderIntakeChart', orderIntakeChart);
    } else if ("weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        orderIntakeChart = opsIncOrderDrilldown.weekly.orderIntake;
        processedIntakeData = trendWithoutComparison(queryResults, 'txndate', 'totalorders');
        orderIntakeChart.xAxis[0] = [];
        orderIntakeChart.xAxis[0].categories = processedIntakeData.axis;
        orderIntakeChart.series[0].data = processedIntakeData.data;
        Highcharts.chart('orderIntakeChart', orderIntakeChart);
    }
}