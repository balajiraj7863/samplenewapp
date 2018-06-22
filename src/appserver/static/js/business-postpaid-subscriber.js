var statuswiseChart = Highcharts.chart('statuswiseChart', bizPostSub.daily.statuswise);
var planwiseChart = Highcharts.chart('planwiseChart', bizPostSub.daily.planwise);
var exitreasonwiseChart = Highcharts.chart('exitReasonChart', bizPostSub.tillDate.exitReason);
var countrywiseChart = Highcharts.chart('countrywiseChart', bizPostSub.daily.countrywise);
var subClassificationChart = Highcharts.chart('subClassificationChart', bizPostSub.daily.subClassification);
var loyalChart = Highcharts.chart('loyaltyChart', bizPostSub.tillDate.loyalty);
// trendChart = Highcharts.chart('subClassificationChart',
// bizPostSub.daily.subscriberTrend);

var countryWiseSearchData;
var statusWiseSearchData;
var subExitSearchData;
var subPlanSearchData;
var subLoyaltySearchData;
var subTrendSearchData;
var classificationSearchData;

// Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("button[type='button']").attr("disabled", true);
});

// Set up the Web Framework components

require(
    ["splunkjs/mvc", "splunkjs/mvc/utils",
        "splunkjs/mvc/tokenutils", "underscore", "jquery",

        "splunkjs/mvc/simplexml", "splunkjs/mvc/layoutview",
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
    function (mvc, utils, TokenUtils, _, $, DashboardController,
        LayoutView, Dashboard, PanelRef, ChartElement,
        EventElement, HtmlElement, ListElement, MapElement,
        SingleElement, TableElement, VisualizationElement,
        FormUtils, EventHandler, SearchEventHandler,
        DropdownInput, RadioGroupInput, LinkListInput,
        MultiSelectInput, CheckboxGroupInput, TextInput,
        TimeRangeInput, SubmitButton, SearchManager,
        SavedSearchManager, PostProcessManager, UrlTokenModel

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
        var defaultTokenModel = mvc.Components.getInstance(
            'default', {
                create: true
            });
        var submittedTokenModel = mvc.Components.getInstance(
            'submitted', {
                create: true
            });

        urlTokenModel.on('url:navigate', function () {
            defaultTokenModel.set(urlTokenModel.toJSON());
            if (!_.isEmpty(urlTokenModel.toJSON()) &&
                !_
                .all(urlTokenModel.toJSON(),
                    _.isUndefined)) {
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


        // custom changes for splunk js starts here,
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


        function updateHelpText(mapKey) {
            getHelpText(mapKey, "countrywiseHelp");
            getHelpText(mapKey, "statuswiseHelp");
            getHelpText(mapKey, "planwiseHelp");
            getHelpText(mapKey, "exitReasonHelp");
            getHelpText(mapKey, "loyaltyTrendHelp");
            getHelpText(mapKey, "subClassificationHelp");
        }
       

        function loadChart(chartType) {
            var countryWiseSearchData = getOnlySearchResultsConstructor("subCountryWiseChart", "24h");
            var statusWiseSearchData = getOnlySearchResultsConstructor("subStatusWiseChart", "24h");
            var subExitSearchData = getOnlySearchResultsConstructor("subExitReasonChart", "24h");
            var subPlanSearchData = getOnlySearchResultsConstructor("subPlanwiseChart", "24h");
            var subLoyaltySearchData = getOnlySearchResultsConstructor("subLoyaltyChart", "24h");
            var subTrendSearchData = getOnlySearchResultsConstructor("subTrendChart", "24h");
            var classificationSearchData = getOnlySearchResultsConstructor("ClassificationChart", "24h");
            var fromDate = $("#fromDate").val();
            var toDate = $("#toDate").val();
            $(".datePicker").css('border', '1px solid #ccc');
            $(".datePicker").css('background', '#eee');
            getHelpText("exportExcelData", "exportExcelDateHelp");
            var cntryQuery = "";
            var statusQuery = "";
            var planQuery = "";
            var exitQuery = "";
            var loyalQuery = "";
            var subQuery = "";
            var trendQuery = "";
            if ("tillDate" === chartType) {
                statusQuery = "biz_post_subs_status";
                cntryQuery = "biz_post_subs_country";
                planQuery = "biz_post_subs_plans";
                subQuery = "biz_post_subs_classification";
                exitQuery = "biz_post_subs_exit_reason";
                loyalQuery = "biz_post_subs_loyalty";
                $('#exitReason').show();

            } else if ("daily" === chartType) {
                $('#exitReason').hide();
                statusQuery = "biz_post_subs_status_daily";
                cntryQuery = "biz_post_subs_country_daily";
                planQuery = "biz_post_subs_plan_daily";
                subQuery = "biz_post_subs_classification_daily";
                trendQuery = "biz_post_subs_trend_daily";
            } else if ("weekly" === chartType) {
                $('#exitReason').hide();
                statusQuery = "biz_post_subs_status_wkly";
                cntryQuery = "biz_post_subs_country_wkly";
                planQuery = "biz_post_subs_plan_wkly";
                subQuery = "biz_post_subs_classification_wkly";
                trendQuery = "biz_post_subs_trend_wkly";
            } else if ("monthly" === chartType) {
                $('#exitReason').hide();
                statusQuery = "biz_post_subs_status_mnthly";
                cntryQuery = "biz_post_subs_country_mnthly";
                planQuery = "biz_post_subs_plan_mnthly";
                subQuery = "biz_post_subs_classification_mnthly";
                trendQuery = "biz_post_subs_trend_mnthly";
            } else if ("customDate" === chartType) {
                $('#exitReason').hide();
                statusQuery = "biz_post_subs_status_cusdt";
                cntryQuery = "biz_post_subs_country_cusdt";
                planQuery = "biz_post_subs_plan_cusdt";
                subQuery = "biz_post_subs_classification_cusdt";
                trendQuery = "biz_post_subs_trend_cusdt";
            }

            countryWiseSearchData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                countryWiseSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", cntryQuery, country, fromDate, toDate, serviceType));

            } else {
                countryWiseSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", cntryQuery, country, "", "", serviceType));
            }
            countryWiseSearchData.startSearch();
            showLoader("countrywiseChart", "countryChartPreloader");
            countryWiseSearchData.on('search:done', function (properties) {
                var isNoData = true;
                var cntryWiseResults = countryWiseSearchData.data("results");
                cntryWiseResults.on("data", function () {
                    if (undefined !== cntryWiseResults.data()) {
                        var rows = cntryWiseResults.data().rows;
                        if (null !== rows) {
                            var finalDataJson = convertResultToJSON(cntryWiseResults.data());
                            loadCountryChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }

                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('countrywiseChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);
                $('#countryChartPreloader').hide();
                refreshDateTime();
            });

            statusWiseSearchData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                statusWiseSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", statusQuery, country, fromDate, toDate, serviceType));

            } else {
                statusWiseSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", statusQuery, country, "", "", serviceType));
            }
            statusWiseSearchData.startSearch();
            showLoader("statuswiseChart", "subStatusWiseChart");
            statusWiseSearchData.on('search:done', function (properties) {
                var statusWiseResults = statusWiseSearchData.data("results");
                var isNoData = true;
                statusWiseResults.on("data", function () {
                    if (undefined !== statusWiseResults.data()) {
                        var rows = statusWiseResults.data().rows;
                        if (null !== rows) {
                            var finalDataJson = convertResultToJSON(statusWiseResults.data());
                            loadStatusChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }

                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('statuswiseChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);
                $('#subStatusWiseChart').hide();
                refreshDateTime();
            });
            if ("tillDate" === chartType) {
                subExitSearchData.settings.unset("search");
                if ("" !== fromDate && "" !== toDate) {
                    if (fromDate.indexOf(":0:0:0") == -1) {
                        fromDate = fromDate + ':0:0:0';
                    }
                    if (toDate.indexOf(":23:59:59") == -1) {
                        toDate = toDate + ":23:59:59";
                    }
                    subExitSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", exitQuery, country, fromDate, toDate, serviceType));

                } else {
                    subExitSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", exitQuery, country, "", "", serviceType));
                }
                subExitSearchData.startSearch();
                showLoader("exitReasonChart", "subExitReasonChart");
                subExitSearchData
                    .on(
                        'search:done',
                        function (properties) {
                            var subExitWiseResults = subExitSearchData.data("results");
                            var isNoData = true;
                            subExitWiseResults.on("data", function () {
                                if (undefined !== subExitWiseResults.data()) {
                                    var rows = subExitWiseResults.data().rows;
                                    if (null !== rows) {
                                        var finalDataJson = convertResultToJSON(subExitWiseResults.data());
                                        loadExitChart(chartType, finalDataJson.data);
                                        isNoData = false;
                                    }
                                }

                            });
                            setTimeout(
                                function () {
                                    if (isNoData) {
                                        Highcharts.chart('exitReasonChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
                                    }
                                }, 3000);
                            $('#subExitReasonChart').hide();
                            refreshDateTime();
                        });
            }

            subPlanSearchData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                subPlanSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", planQuery, country, fromDate, toDate, serviceType));

            } else {
                subPlanSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", planQuery, country, "", "", serviceType));
            }
            subPlanSearchData.startSearch();
            showLoader("planwiseChart", "subPlanwiseChart");
            subPlanSearchData.on('search:done', function (properties) {
                var subPlanWiseResults = subPlanSearchData.data("results", {
                    "count": 0,
                    "offset": 0
                });
                var isNoData = true;
                subPlanWiseResults.on("data", function () {
                    if (undefined !== subPlanWiseResults.data()) {
                        var rows = subPlanWiseResults.data().rows;
                        if (null !== rows) {
                            var finalDataJson = convertResultToJSON(subPlanWiseResults.data());
                            loadPlanChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }

                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('planwiseChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);
                $('#subPlanwiseChart').hide();
                refreshDateTime();
            });

            classificationSearchData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                classificationSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", subQuery, country, fromDate, toDate, serviceType));

            } else {
                classificationSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", subQuery, country, "", "", serviceType));
            }
            classificationSearchData.startSearch();
            showLoader("subClassificationChart", "ClassificationChart");
            classificationSearchData.on('search:done', function (properties) {
                var subClassResults = classificationSearchData.data("results");
                var isNoData = true;
                subClassResults.on("data", function () {
                    if (undefined !== subClassResults.data()) {
                        var rows = subClassResults.data().rows;
                        if (null !== rows) {
                            var finalDataJson = convertResultToJSON(subClassResults.data());
                            loadSubClassChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }

                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('subClassificationChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);
                $('#ClassificationChart').hide();
                refreshDateTime();
            });
            if ("tillDate" === chartType) {
                $("#subLabel").text("Subscriber - Loyalty View");
                subLoyaltySearchData.settings.unset("search");
                subLoyaltySearchData.settings.set("search", getQuery("bizPostDrillSubQuery", loyalQuery, country, "", "", serviceType));
                subLoyaltySearchData.startSearch();
                showLoader("loyaltyChart", "subLoyaltyChart");
                subLoyaltySearchData.on('search:done', function (properties) {
                    var loyalResults = subLoyaltySearchData.data("results");
                    var isNoData = true;
                    loyalResults.on("data", function () {
                        if (undefined !== loyalResults.data()) {
                            var rows = loyalResults.data().rows;
                            if (null !== rows) {
                                var finalDataJson = convertResultToJSON(loyalResults.data());
                                loadLoyalChart(chartType, finalDataJson.data);
                                isNoData = false;
                            }
                        }
                    });
                    setTimeout(
                        function () {
                            if (isNoData) {
                                Highcharts.chart('loyaltyChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
                            }
                        }, 3000);
                    $('#subLoyaltyChart').hide();
                    refreshDateTime();
                });
            } else {
                $("#subLabel").text("Subscriber - Trend");
                subTrendSearchData.settings.unset("search");
                if ("" !== fromDate && "" !== toDate) {
                    if (fromDate.indexOf(":0:0:0") == -1) {
                        fromDate = fromDate + ':0:0:0';
                    }
                    if (toDate.indexOf(":23:59:59") == -1) {
                        toDate = toDate + ":23:59:59";
                    }
                    subTrendSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", trendQuery, country, fromDate, toDate, serviceType));

                } else {
                    subTrendSearchData.settings.set("search", getQuery("bizPostDrillSubQuery", trendQuery, country, "", "", serviceType));
                }
                subTrendSearchData.startSearch();
                showLoader("loyaltyChart", "subLoyaltyChart");
                subTrendSearchData.on('search:done', function (properties) {
                    var trendResults = subTrendSearchData.data("results");
                    var isNoData = true;
                    trendResults.on("data", function () {
                        if (undefined !== trendResults.data()) {
                            var rows = trendResults.data().rows;
                            if (null !== rows) {
                                var finalDataJson = convertResultToJSON(trendResults.data());
                                loadTrendChart(chartType, finalDataJson.data);
                                isNoData = false;
                            }
                        }

                    });
                    setTimeout(
                        function () {
                            if (isNoData) {
                                Highcharts.chart('loyaltyChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
                            }
                        }, 3000);
                    $('#subLoyaltyChart').hide();
                    refreshDateTime();
                });

            }
        }

        function loadCountryChart(chartType, chartData) {
            Highcharts.chart('countrywiseChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
            if ("tillDate" === chartType) {
                var countryChart = Highcharts.chart('countrywiseChart', bizPostSub.tillDate.countrywise);
                setPieData(chartData, countryChart, "country", "totalsub");
            } else {
                var countryWiseChart = bizPostSub[chartType].countrywise;
                basicLineDataProcessor(chartData, countryWiseChart, 'countrywiseChart', "txndate", "country", "totalsub");
                return;
            }
        }



        function loadExitChart(chartType, rows) {
            Highcharts.chart('exitReasonChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
            if ("tillDate" === chartType) {
                var othersdata = processOthersData(getPieChart(rows, "reasondesc", "totalcount"));
                var pieWithOthersDataChartObj = Highcharts.chart('exitReasonChart', bizPostSub.tillDate.exitReason);
                pieWithOthersDataChartObj.series[0].setData(othersdata);
                return;
            }

        }

        function loadPlanChart(chartType, rows) {
            Highcharts.chart('planwiseChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
            if ("tillDate" === chartType) {
                var othersdata = processOthersData(getPieChart(rows, "plandesc", "totalcount"));
                var pieWithPlanOthersDataChartObj = Highcharts.chart('planwiseChart', bizPostSub.tillDate.planwise);
                pieWithPlanOthersDataChartObj.series[0].setData(othersdata);
                return;
            } else {
                processStackBarData(rows, bizPostSub[chartType].planwise, 'planwiseChart', "", "txndate", "plandesc", "totalcount");
                return;
            }
        }

        function loadSubClassChart(chartType, rows) {
            Highcharts.chart('subClassificationChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
            if ("tillDate" === chartType) {
                var othersdata = processOthersData(getPieChart(rows, "subclassification", "totalcount"));
                var subClassChartObj = Highcharts.chart('subClassificationChart', bizPostSub.tillDate.subClassification);
                subClassChartObj.series[0].setData(othersdata);
                return;

            } else {
                processStackBarData(rows, bizPostSub[chartType].subClassification, 'subClassificationChart', "", "txndate", "subclassification", "totalcount");
                return;
            }
        }

        function loadLoyalChart(chartType, rows) {
            Highcharts.chart('loyaltyChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
            if ("tillDate" === chartType) {
                loyalChart = Highcharts.chart('loyaltyChart', bizPostSub.tillDate.loyalty);
                setPieData(rows, loyalChart, "loyalty", "totalcount");
                return;

            }

        }

        function loadTrendChart(chartType, rows) {
            Highcharts.chart('loyaltyChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
            if ("daily" === chartType) {
                Highcharts.chart('loyaltyChart', bizPostSub.daily.subscriberTrend);
                if (undefined !== rows) {
                    var trendChartdata = trendDataProcessor(rows, "txndate", "totalsub");
                    bizPostSub.daily.subscriberTrend.xAxis[0].categories = trendChartdata.xaxisValues;
                    bizPostSub.daily.subscriberTrend.series[0].data = trendChartdata.currentWeekData;
                    bizPostSub.daily.subscriberTrend.series[1].data = trendChartdata.previousWeekData;
                    Highcharts.chart('loyaltyChart', bizPostSub.daily.subscriberTrend);
                }
                return;
            } else if ("customDate" === chartType){
                Highcharts.chart('loyaltyChart', bizPostSub.customDate.subscriberTrend);
                if (undefined !== rows) {
                    trendChartdata = trendWithoutComparison(rows, "txndate", "totalsub");
                    bizPostSub.customDate.subscriberTrend.xAxis[0].categories = trendChartdata.axis;
                    bizPostSub.customDate.subscriberTrend.series[0].data = trendChartdata.data;
                    Highcharts.chart('loyaltyChart', bizPostSub.customDate.subscriberTrend);
                }
            }else {
                Highcharts.chart('loyaltyChart', bizPostSub[chartType].subscriberTrend);
                if (undefined !== rows) {
                    trendChartdata = trendWithoutComparison(rows, "txndate", "totalsub");
                    
                    bizPostSub[chartType].subscriberTrend.xAxis[0] = [];
                    bizPostSub[chartType].subscriberTrend.xAxis[0].categories = trendChartdata.axis;
                    bizPostSub[chartType].subscriberTrend.series[0].data = trendChartdata.data;
                    Highcharts.chart('loyaltyChart', bizPostSub[chartType].subscriberTrend);
                }
                return;
            }

        }

        function loadStatusChart(chartType, rows) {
            var fixedSubsStatus = ["ACTIVE", "SUSPENDED", "CHANGED", "TERMINATED"];
            Highcharts.chart('statuswiseChart', bizPostSubEmpty.emptyChartConfig.emptyChart);
            if ("tillDate" === chartType) {
                var statusWiseChartConfig = bizPostSub.tillDate.statuswise
                for (var i = 0; i < rows.length; i++) {
                    var data = [];
                    if (undefined == statusWiseChartConfig.series[i]) {
                        statusWiseChartConfig.series[i] = [];
                    }
                    data.push(parseInt(rows[i]["subscribercount"]));
                    statusWiseChartConfig.series[i].name = rows[i]["subscriberstatus"];
                    statusWiseChartConfig.series[i].data = data;

                }
                Highcharts.chart('statuswiseChart', statusWiseChartConfig);
            } else {
                processStackBarData(rows, bizPostSub[chartType].statuswise, 'statuswiseChart', fixedSubsStatus, "txndate", "subscriberstatus", "totalcount");
                return;
            }
        }

        function getOnlySearchResultsConstructor(id, interval) {
            var searchmanager = new SearchManager({
                preview: false,
                "refresh": "0",
                "refreshType": "delay",
                cache: false,
                status_buckets: 300,
                "search": ""
            }, {
                tokens: true,
                tokenNamespace: "submitted"
            });

            return searchmanager;
        }


        $('#tillDate').click(function () {
            // Helptext update
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            loadChart("tillDate");
            updateHelpText('bizPostSubDrilldown');

        });

        $('#daily').click(function () {
            // Helptext update
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            loadChart("daily");
            updateHelpText('bizPostSubDrilldownDaily');
        });

        $('#weekly').click(function () {
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            loadChart("weekly");
            // Helptext update
            updateHelpText('bizPostSubDrilldownWeekly');
        });

        $('#monthly').click(function () {
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            loadChart("monthly");
            // Helptext update
            updateHelpText('bizPostSubDrilldownMonthly');
        });

        $('#customDate').click(function () {
            $('.custom-date').css('display','inline-block');
            $('#loyalityContainer').hide();
            $('#subscriberTrend').show();
            highchartsInitialize();
            highchartsDestroy();
            loadChart("daily");
            $("#fromDate.datePicker").css('background', '#fff');
            // Helptext update
            updateHelpText('bizPostSubDrilldown');
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
                //update the HelpTextIcon
                updateHelpText('bizPostSubDrilldownCustDate');
            } else {
                emptyDateValidation('fromDate', 'toDate');
            }
        });

        $('#daily').trigger("click");
        $(".filterDiv label").click(function () {
            return ("customDate" === this.id) ? disableCustomDatePicker(false, 'fromDate', 'toDate') : disableCustomDatePicker(true, 'fromDate', 'toDate');
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
            var queryMapKey = "bizPostDrillSubQuery";
            getResultsAndExport(queryMapKey, "subscriberCountryBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subscriberPlanBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subscriberStatusBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subscriberTrendBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subscriberClassificationBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subscriberExitReasonBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "subscriberLoyaltyBusinessData", country, fromDate, toDate);
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


        // custom changes for splunk js ends here,

        pageLoading = false;
    });

function highchartsInitialize() {
    statuswiseChart = Highcharts.chart('statuswiseChart',
        bizPostSub.tillDate.statuswise);
    planwiseChart = Highcharts.chart('planwiseChart',
        bizPostSubEmpty.emptyChartConfig.emptyChart);
    exitreasonwiseChart = Highcharts.chart('exitReasonChart',
        bizPostSubEmpty.emptyChartConfig.emptyChart);
    countrywiseChart = Highcharts.chart('countrywiseChart',
        bizPostSubEmpty.emptyChartConfig.emptyChart);
    subClassificationChart = Highcharts.chart('subClassificationChart',
        bizPostSubEmpty.emptyChartConfig.emptyChart);
    loyalChart = Highcharts.chart('loyaltyChart', bizPostSub.tillDate.loyalty);
}

function highchartsDestroy() {
    statuswiseChart.destroy();
    planwiseChart.destroy();
    exitreasonwiseChart.destroy();
    countrywiseChart.destroy();
    subClassificationChart.destroy();
    loyalChart.destroy();
}