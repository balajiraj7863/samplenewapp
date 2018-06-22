function updateHelpText(mapKey) {
    getHelpText(mapKey, "intakeTrendHelp");
    getHelpText(mapKey, "planwiseHelp");
    getHelpText(mapKey, "countrywiseHelp");
    getHelpText(mapKey, "statuswiseHelp");
}
updateHelpText('bizPostOrderDaily');

var countryWiseSearchData;
var plansWiseSearchData;
var statusWiseSearchData;

var countryWiseChart = Highcharts.chart('orderCountryChart',
    bizPostOrder.daily.countrywise);
var planWiseChart = Highcharts.chart('orderPlanChart',
    bizPostOrder.daily.planwise);
var statusWiseChart = Highcharts.chart('orderStatusChart',
    bizPostOrder.daily.statuswise);
var intakeTrendChart = Highcharts.chart('orderStatusChart',
    bizPostOrder.daily.intakeTrend);

//Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("button[type='button']").attr("disabled", true);
    $("#fromDate").val("");
    $("#toDate").val("");
});


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


        var SearchManager = require("splunkjs/mvc/searchmanager");
        var utils = require("splunkjs/mvc/utils");
        var pageLoading = true;



        // TO SET DEFAULT DATE VALUE FOR SEARCH 
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var isExportData = false;

        //TO SELECT COUNTRY 
        var oldCountryList = "";
        var country = "";
        var serviceType = "Postpaid";

        if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
            if (localStorage.getItem("globalUserServiceTypeList").indexOf("business-postpaid") > -1) {
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

        // initialize search manager instance


        

        function loadChart(chartType) {
            plansWiseSearchData = getOnlySearchResultsConstructor("orderPlanPreloader", "30m");
            statusWiseSearchData = getOnlySearchResultsConstructor("orderStatusPreloader", "30m");
            countryWiseSearchData = getOnlySearchResultsConstructor("orderCountryPreloader", "30m");
            orderTrendData = getOnlySearchResultsConstructor("orderTrendPreloader", "30m");
            var fromDate = $("#fromDate").val();
            var toDate = $("#toDate").val();
            $(".datePicker").css('border', '1px solid #ccc');
            $(".datePicker").css('background', '#eee');
            getHelpText("exportExcelData", "exportExcelDateHelp");

            var cntryQuery = "";
            var planQuery = "";
            var statusQuery = "";
            var trendQuery = "";
            if (chartType == "today") {
                cntryQuery = "biz_post_order_country";
                planQuery = "biz_post_order_plans";
                statusQuery = "biz_post_order_status";
                $("#trendDiv").hide();
            } else if (chartType == "daily") {
                trendQuery = "biz_post_order_trend_daily";
                cntryQuery = "biz_post_order_country_daily";
                planQuery = "biz_post_order_plans_daily";
                statusQuery = "biz_post_order_status_daily";
                $("#trendDiv").show();
            } else if (chartType == "weekly") {
                trendQuery = "biz_post_order_trend_wkly";
                cntryQuery = "biz_post_order_country_wkly";
                planQuery = "biz_post_order_plans_wkly";
                statusQuery = "biz_post_order_status_wkly";
                $("#trendDiv").show();
            } else if (chartType == "monthly") {
                trendQuery = "biz_post_order_trend_mnthly";
                cntryQuery = "biz_post_order_country_mnthly";
                planQuery = "biz_post_order_plans_mnthly";
                statusQuery = "biz_post_order_status_mnthly";
                $("#trendDiv").show();
            } else if (chartType == "customDate") {
                trendQuery = "biz_post_order_trend_cusdt";
                cntryQuery = "biz_post_order_country_cusdt";
                planQuery = "biz_post_order_plans_cusdt";
                statusQuery = "biz_post_order_status_cusdt";
                $("#trendDiv").show();
            }
            console.log(chartType);
            plansWiseSearchData.settings.unset("search");
            if (fromDate != "" && toDate != "") {

                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                plansWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillOrderQuery", planQuery, country,
                    fromDate, toDate, serviceType));

            } else {
                plansWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillOrderQuery", planQuery, country, "", "", serviceType));
            }
            plansWiseSearchData.startSearch();
            $('#orderPlanChart').html('<div id="orderPlanPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#orderPlanPreloader').show();

            plansWiseSearchData.on('search:done', function () {
                var plansSearchResults = plansWiseSearchData.data("results");
                var isNoData = true;
                plansSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        console.log("inside data plan "+chartType);
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadPlanChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts
                                .chart(
                                    'orderPlanChart',
                                    bizPostOrderEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);

                $('#orderPlanPreloader').hide();
                refreshDateTime();
            });

            countryWiseSearchData.settings.unset("search");
            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                countryWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillOrderQuery", cntryQuery, country,
                    fromDate, toDate, serviceType));

            } else {
                countryWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillOrderQuery", cntryQuery, country, "", "", serviceType));
            }
            countryWiseSearchData.startSearch();
            $('#orderCountryChart').html('<div id="orderCountryPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#orderCountryPreloader').show();
            countryWiseSearchData.on('search:done', function () {
                var orderCountryChartSearchResults = countryWiseSearchData.data("results");
                var isNoData = true;
                orderCountryChartSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        console.log("inside data ctry "+chartType);
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadCountryChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts
                                .chart(
                                    'orderCountryChart',
                                    bizPostOrderEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);

                $('#orderCountryPreloader').hide();
                refreshDateTime();
            });

            statusWiseSearchData.settings.unset("search");
            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                statusWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillOrderQuery", statusQuery, country,
                    fromDate, toDate, serviceType));

            } else {
                statusWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillOrderQuery", statusQuery, country, "", "", serviceType));
            }
            statusWiseSearchData.startSearch();
            $('#orderStatusChart').html('<div id="orderStatusPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#orderStatusPreloader').show();

            statusWiseSearchData.on('search:done', function () {
                var isNoData = true;
                var orderStatusSearchResults = statusWiseSearchData.data("results");
                orderStatusSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        console.log("inside data status "+chartType);
                        loadStatusChart(chartType, queryResults);
                        isNoData = false;
                    }
                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts
                                .chart(
                                    'orderStatusChart',
                                    bizPostOrderEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);


                $('#orderStatusPreloader').hide();
                refreshDateTime();
            });
            if (chartType != "today") {
                orderTrendData.settings.unset("search");
                if (fromDate != "" && toDate != "") {
                    if (fromDate.indexOf(":0:0:0") == -1) {
                        fromDate = fromDate + ':0:0:0';
                    }
                    if (toDate.indexOf(":23:59:59") == -1) {
                        toDate = toDate + ":23:59:59";
                    }
                    orderTrendData.settings.set("search", getQuery("bizPostDrillOrderQuery", trendQuery, country, fromDate, toDate, serviceType));
                } else {
                    orderTrendData.settings.set("search", getQuery("bizPostDrillOrderQuery", trendQuery, country, "", "", serviceType));
                }
                orderTrendData.startSearch();
                $('#orderTrendChart').html('<div id="orderTrendPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                $('#orderTrendPreloader').show();

                orderTrendData.on('search:done', function () {
                    var isNoData = true;
                    var orderTrendSearchDataResults = orderTrendData.data("results");
                    orderTrendSearchDataResults.on("data", function (queryResults) {
                        if (undefined != queryResults.data()) {
                            console.log("inside data trend "+chartType);
                            Highcharts.chart('orderTrendChart', bizPostOrderEmpty.emptyChartConfig.emptyChart);
                            var trendChartdata;
                            isNoData = false;
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            if (chartType == "daily") {
                                trendChartdata = trendDataProcessor(finalDataJson.data, "txndate", "totalorders");
                                bizPostOrder.daily.intakeTrend.xAxis[0].categories = trendChartdata.xaxisValues;
                                bizPostOrder.daily.intakeTrend.series[0].data = trendChartdata.currentWeekData;
                                bizPostOrder.daily.intakeTrend.series[1].data = trendChartdata.previousWeekData;
                                Highcharts.chart('orderTrendChart', bizPostOrder.daily.intakeTrend);
                                console.log("inside chart trend "+chartType);
                            } else {
                                trendChartdata = trendWithoutComparison(finalDataJson.data, "txndate", "totalorders");
                                bizPostOrder.weekly.intakeTrend.xAxis[0].categories = trendChartdata.axis;
                                bizPostOrder.weekly.intakeTrend.series[0].data = trendChartdata.data;
                                Highcharts.chart('orderTrendChart', bizPostOrder.weekly.intakeTrend);
                                console.log("inside chart trend "+chartType);
                            }

                        }

                    });
                    setTimeout(
                        function () {
                            if (isNoData) {
                                Highcharts
                                    .chart(
                                        'orderTrendChart',
                                        bizPostOrderEmpty.emptyChartConfig.emptyChart);
                            }
                        }, 3000);

                    $('#orderTrendPreloader').hide();
                    refreshDateTime();
                });
            }
        }

        function getOnlySearchResultsConstructor(id,interval) {
            var searchmanager = new SearchManager({
                "refresh": "0",
                "refreshType": "delay",
                preview: true,
                cache: true,
                status_buckets: 300,
                "search": ""
            }, {
                tokens: true,
                tokenNamespace: "submitted"
            });

            return searchmanager;
        }

        function loadPlanChart(chartType, chartData) {
            if (chartType == "today") {
                var othersdata = processOthersData(getPieChart(chartData, "tariff_dec", "totalorders"));
                bizPostOrder.today.planwise.series[0].data = othersdata;
                Highcharts.chart('orderPlanChart',
                    bizPostOrder.today.planwise);
            } else {
                processStackBarData(chartData, bizPostOrder[chartType].planwise, "orderPlanChart", "", "txndate", "tariff_dec", "totalorders");
                console.log("inside chart plan "+chartType);
            }
        }

        function loadCountryChart(chartType, chartData) {
            Highcharts.chart('orderCountryChart', bizPostOrderEmpty.emptyChartConfig.emptyChart);
            if (chartType == "today") {
                countryWiseChart = Highcharts.chart('orderCountryChart', bizPostOrder.today.countrywise);
                setPieData(chartData, countryWiseChart, "country", "totalorders");
            } else {
                countryWiseChart = bizPostOrder.daily.countrywise;
                basicLineDataProcessor(chartData, countryWiseChart, 'orderCountryChart', "txndate", "country", "totalorders");
                console.log("inside chart ctry "+chartType);
                return;
            }
        }

        function loadStatusChart(chartType, queryResults) {
            Highcharts.chart('orderStatusChart', bizPostOrderEmpty.emptyChartConfig.emptyChart);
            var finalDataJson = convertResultToJSON(queryResults.data());
            var orderChartData = orderStatusSolidProcessor(finalDataJson.data, "orderstatus", "totalorders", "percentage");
            statusWiseChart = bizPostOrder.today.statuswise;
            statusWiseChart.series[0].data[0].y = orderChartData.availablePercentage;
            statusWiseChart.series[0].data[0].z = orderChartData.availableCount;
            statusWiseChart.series[1].data[0].y = orderChartData.currentPercentage;
            statusWiseChart.series[1].data[0].z = orderChartData.currentCount;
            statusWiseChart.series[2].data[0].y = orderChartData.retrievedPercentage;
            statusWiseChart.series[2].data[0].z = orderChartData.retrievedCount;
            statusWiseChart.series[3].data[0].y = orderChartData.completedPercentage;
            statusWiseChart.series[3].data[0].z = orderChartData.completedCount;
            statusWiseChart.series[4].data[0].y = orderChartData.cancelledPercentage;
            statusWiseChart.series[4].data[0].z = orderChartData.cancelledCount;
            console.log("inside chart status "+chartType);
            Highcharts.chart('orderStatusChart', statusWiseChart);
        }


        pageLoading = false;

        $('#today').click(
            function () {
                $('.custom-date').hide();
                highchartsInitialize();
                highchartsDestroy();
                // update the HelpTextIcon
                loadChart("today");
                updateHelpText('bizPostOrderToday');
            });
        $('#daily').click(
            function () {
                $('.custom-date').hide();
                highchartsInitialize();
                highchartsDestroy();
                loadChart("daily");
                // update the HelpTextIcon
                updateHelpText('bizPostOrderDaily');
            });
        $('#weekly').click(
            function () {
                $('.custom-date').hide();
                highchartsInitialize();
                highchartsDestroy();
                loadChart("weekly");
                // update the HelpTextIcon
                updateHelpText('bizPostOrderWeekly');
            });
        $('#monthly').click(
            function () {
                $('.custom-date').hide();
                highchartsInitialize();
                highchartsDestroy();
                loadChart("monthly");
                // update the HelpTextIcon
                updateHelpText('bizPostOrderMonthly');
            });
        $('#customDate').click(
            function () {
                $('.custom-date').css('display','inline-block');
                $("input[type='text']").attr("disabled", false);
                highchartsInitialize();
                highchartsDestroy();
                // update the HelpTextIcon
                loadChart("daily");
                $("#fromDate.datePicker").css('background', '#fff');
                updateHelpText('bizPostOrderCustomDate');
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
                updateHelpText('bizPostOrderCustomDate');

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

        function downloadChartData() {
            fromDate = getExportDateSetter(180);
            toDate = getExportDateSetter(0);
            var queryMapKey = "bizPostDrillOrderQuery";
            getResultsAndExport(queryMapKey, "orderTrendBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "orderCountryBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "orderPlansBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "orderStatusBusinessData", country, fromDate, toDate);
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

        //
        // DASHBOARD EDITOR
        //

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


        //
        // DASHBOARD READY
        //

        DashboardController.ready();
        pageLoading = false;

    }
);

function highchartsInitialize(chartType) {

    countryWiseChart = Highcharts.chart('orderCountryChart',
        bizPostOrder.today.countrywise);
    planWiseChart = Highcharts.chart('orderPlanChart',
        bizPostOrder.today.planwise);
    statusWiseChart = Highcharts.chart('orderStatusChart',
        bizPostOrder.today.statuswise);
    intakeTrendChart = Highcharts.chart('orderTrendChart',
        bizPostOrder.daily.intakeTrend);
}

function highchartsDestroy() {
    countryWiseChart.destroy();
    planWiseChart.destroy();
    statusWiseChart.destroy();
    intakeTrendChart.destroy();
}