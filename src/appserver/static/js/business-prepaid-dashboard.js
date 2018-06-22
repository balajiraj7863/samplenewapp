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

    //  custom changes for splunk js starts here

    getHelpText("bizPrepaidHelp", "revHelp");
    getHelpText("bizPrepaidHelp", "incidentHelp");
    getHelpText("bizPrepaidHelp", "topupChannelHelp");
    getHelpText("bizPrepaidHelp", "subHelp");
    getHelpText("bizPrepaidHelp", "topupTrendHelp");
    getHelpText("bizPrepaidHelp", "mnpChartHelp");

    //TO SELECT COUNTRY 
    var oldCountryList = "";
    var country = "";
    var serviceType = "Prepaid";

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
                oldCountryList = newCountryList
            }
        }
    });

    function reloadAll() {
        var revBannerSearchData = getBannerSearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_rev_banner", country, "", "", serviceType), "biz_prepaid_rev_banner", "24h");
        revBannerSearchData.on('search:done', function () {
            var revBannerSearchResults = revBannerSearchData.data("results");
            revBannerSearchResults.on("data", function (dataval) {
                if (undefined !== dataval.data()) {
                    // var datavalTooltip = dataval.data().rows.join().split(',');
                    var finalDataJson = convertResultToJSON(dataval.data());
                    var revenue_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "revenue");
                    $('#revBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "revBannerHelp"));
                    animateCounter("rev_banner", revenue_bannerTooltip.total, "bizPostpaidBillRevBannerUnits");
                    $("#rev_banner_notation").text('').css('color', '#fff').text('$');
                    resetBannerNotation("#rev_banner_notation", true, "$");
                    // $('#rev_banner_date').text(" ");
                    // (null !== finalDataJson.data[0].date) ? $('#rev_banner_date').text(finalDataJson.data[0].date): $('#rev_banner_date').text("Previous Day");


                }
            });
            resetBannerNotation("#rev_banner_notation", false);
            $('#revBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "revBannerHelp"));
        });

        var topupBannerSearchData = getBannerSearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_topup_banner", country, "", "", serviceType), "biz_prepaid_topup_banner", "24h");
        topupBannerSearchData.on('search:done', function () {
            var topupBannerSearchResults = topupBannerSearchData.data("results");
            topupBannerSearchResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    // var datavalTooltip = queryResults.data().rows.join().split(',');
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var topup_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "topup");
                    $('#topupBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "topupBannerHelp"));
                    animateCounter("topup_banner", topup_bannerTooltip.total, "topupBannerUnits");
                    resetBannerNotation("#topup_banner_notation", true, "");
                }
            });
            resetBannerNotation("#topup_banner_notation", false);
            $('#topupBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "topupBannerHelp"));
        });

        var subBannerSearchData = getBannerSearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_Prepaid_sub_banner", country, "", "", serviceType), "biz_Prepaid_sub_banner", "24h");
        subBannerSearchData.on('search:done', function () {
            var subBannerSearchResults = subBannerSearchData.data("results");
            subBannerSearchResults.on("data", function (subval) {
                if (undefined !== subval.data()) {
                    // var datavalTooltip = subval.data().rows.join().split(',');
                    var finalDataJson = convertResultToJSON(subval.data());
                    var sub_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalsub");
                    $('#subBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "subBannerHelp"));
                    animateCounter("subbanner", sub_bannerTooltip.total, "bizPostpaidUnSubBannerUnits");
                    resetBannerNotation("#subbanner_notation", true, "");
                   // $('#subbanner_date').text(" ");
                   // (null !== finalDataJson.data[0].date) ? $('#subbanner_date').text(finalDataJson.data[0].date): $('#subbanner_date').text("In total");
                }
            });
            resetBannerNotation("#subbanner_notation", false, "", "#subbanner", "#bizPostpaidUnSubBannerUnits");
            $('#subBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "subBannerHelp"));





        });

        // var orderBannerSearch = getBannerSearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_order_banner", country, "", "", serviceType), "biz_prepaid_order_banner");
        // orderBannerSearch.on('search:done', function () {
        //     var orderBannerSearchResults = orderBannerSearch.data("results");
        //     orderBannerSearchResults.on("data", function (orderval) {
        //         if (undefined !== orderval.data()) {
        //             //var datavalTooltip = orderval.data().rows.join().split(',');
        //             var finalDataJson = convertResultToJSON(orderval.data());
        //             var order_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalorders");
        //             $('#orderBannerTooltip').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "orderBannerHelp"));
        //             animateCounter("orderbanner", order_bannerTooltip.total, "bizPostpaidUnOrderBannerUnits");
        //             resetBannerNotation("#orderbanner_notation", true, "");
        //         }
        //     });
        //     resetBannerNotation("#orderbanner_notation", false);
        //     $('#orderBannerTooltip').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "orderBannerHelp"));
        // });

        // var incBannerSearchData = getBannerSearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_inc_banner", country, "", "", serviceType), "biz_prepaid_inc_banner");
        // incBannerSearchData.on('search:done', function () {
        //     var incBannerSearchResults = incBannerSearchData.data("results");
        //     incBannerSearchResults.on("data", function (incResults) {
        //         if (undefined !== incResults.data()) {
        //             var finalDataJson = convertResultToJSON(incResults.data());
        //             var inc_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalincidents");
        //             $('#incBannerTooltip').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "incidentBannerHelp"));
        //             animateCounter("incidentbanner", inc_bannerTooltip.total, "bizPostpaidUnIncBannerUnits");
        //             resetBannerNotation("#incidentbanner_notation", true, "");
        //         }
        //     });
        //     resetBannerNotation("#incidentbanner_notation", false);
        //     $('#incBannerTooltip').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "incidentBannerHelp"));
        // });

        var dailyRevTrendBannerSearchData = getBannerSearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_rev_trend_banner", country, "", "", serviceType), "biz_prepaid_rev_trend_banner", "24h");
        dailyRevTrendBannerSearchData.on('search:done', function () {
            var dailyRevTrendBannerSearchResults = dailyRevTrendBannerSearchData.data("results");
            dailyRevTrendBannerSearchResults.on("data", function (dailyRevTrendBanner) {
                if (undefined !== dailyRevTrendBanner.data()) {
                    var finalDataJson = convertResultToJSON(dailyRevTrendBanner.data());
                    bannertooltipDailyRevData(finalDataJson.data, "usagecattype", "currentvalue", "lastweekvalue");
                    $('#revTrendBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "revTrendBannerHelp"));
                }
            });
            $('#revTrendData').addClass('fa fa-times-circle');
            $('#revTrendVoice').addClass('fa fa-times-circle');
            $('#revTrendSMS').addClass('fa fa-times-circle');
            $('#revTrendBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "revTrendBannerHelp"));
        });

        var revSearchData = getOnlySearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_rev_chart", country, "", "", serviceType), "revChartPreloader", "24h");
        revSearchData.on('search:done', function () {
            var revSearchDataResults = revSearchData.data("results");
            revSearchDataResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var trendChartdata = trendDataProcessor(finalDataJson.data, "txndate", "totalrevenue");
                    revchartConfig.xAxis[0].categories = trendChartdata.xaxisValues;
                    revchartConfig.series[0].data = trendChartdata.currentWeekData;
                    revchartConfig.series[1].data = trendChartdata.previousWeekData;
                    Highcharts.chart('revenueChart', revchartConfig);
                }

            });
            $('#revChartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('revenueChart', revchartConfig);
        });

        var incidentPriorityData = getOnlySearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_priority_chart", country, "", "", serviceType), "biz_prepaid_priority_chart", "24h");
        incidentPriorityData.on('search:done', function () {
            var incidentPrioritySearchResults = incidentPriorityData.data("results", {
                count: 0,
                offset: 0
            });
            incidentPrioritySearchResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    var finalData = [{
                            name: 'P1',
                            y: 0,
                            color: '#ff0000'
                        },
                        {
                            name: 'P2',
                            y: 0,
                            color: '#ef5956'
                        },
                        {
                            name: 'P3',
                            y: 0,
                            color: '#f69653',
                        },
                        {
                            name: 'P4',
                            y: 0,
                            color: '#fdb94e'
                        }
                    ];
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var priorityData = priorityDataProcessor(finalDataJson.data, 'priority', 'totalincidents');
                    finalData[0].y = priorityData.p1;
                    finalData[1].y = priorityData.p2;
                    finalData[2].y = priorityData.p3;
                    finalData[3].y = priorityData.p4;
                    incidentPriorityChart.series[0].data = finalData;
                    Highcharts.chart('incidentPriorityChart', incidentPriorityChart);
                }
            });
            $('#incidentPriorityChartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('incidentPriorityChart', incidentPriorityChart);
        });

        var subSearchData = getOnlySearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_sub_chart", country, "", "", serviceType), "subChartPreloader", "24h");
        subSearchData.on('search:done', function () {
            var subSearchResults = subSearchData.data("results");
            subSearchResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var trendChartdata = trendDataProcessor(finalDataJson.data, "txndate", "totalsub");
                    subchartConfig.xAxis[0].categories = trendChartdata.xaxisValues;
                    subchartConfig.series[0].data = trendChartdata.currentWeekData;
                    subchartConfig.series[1].data = trendChartdata.previousWeekData;
                    Highcharts.chart('subscriberChart', subchartConfig);
                }

            });
            $('#subChartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('subscriberChart', subchartConfig);
        });
        var topupByChannelData = getOnlySearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_topupChannel_chart", country, "", "", serviceType), "biz_prepaid_topupChannel_chart", "24h");
        topupByChannelData.on('search:done', function () {
            var topupByChannelResults = topupByChannelData.data("results");
            topupByChannelResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var topupResults = averageResolution(finalDataJson.data, 'channel', 'revenue', 'topup');
                    topupByChannelConfig.xAxis[0].categories = topupResults.Categories;
                    topupByChannelConfig.series[0].data = topupResults.AverageResolution;
                    topupByChannelConfig.series[1].data = topupResults.TotalIncidentsCount;
                    Highcharts.chart('topupChannelChart', topupByChannelConfig);
                }

            });
            $('#topupChannelPreloader').hide();
            refreshDateTime();
            Highcharts.chart('topupChannelChart', topupByChannelConfig);
        });
        var topupTrendData = getOnlySearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_topup_trend_chart", country, "", "", serviceType), "subChartPreloader", "24h");
        topupTrendData.on('search:done', function () {
            var topupTrendResults = topupTrendData.data("results");
            topupTrendResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var trendChartdata = trendDataProcessor(finalDataJson.data, "txndate", "topup");
                    topupTrendConfig.xAxis[0].categories = trendChartdata.xaxisValues;
                    topupTrendConfig.series[0].data = trendChartdata.currentWeekData;
                    topupTrendConfig.series[1].data = trendChartdata.previousWeekData;
                    Highcharts.chart('topupTrendChart', topupTrendConfig);
                }

            });
            $('#topupTrendChartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('topupTrendChart', topupTrendConfig);
        });

        var mnpData = getOnlySearchResultsConstructor(getQuery("bizPrepaidQuery", "biz_prepaid_MNP_chart", country, "", "", serviceType), "biz_prepaid_MNP_chart", "24h");
        mnpData.on('search:done', function () {
            var mnpSearchResults = mnpData.data("results");
            mnpSearchResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var mnpChartData = trendMNPDataProcessor(finalDataJson.data, "date", "portin", "portout");
                    MNPchartConfig.xAxis.categories = mnpChartData.x_axis;
                    MNPchartConfig.series[0].data = mnpChartData.portIn;
                    MNPchartConfig.series[1].data = mnpChartData.portOut;
                    MNPchartConfig.series[2].data = mnpChartData.lastweek_portIn;
                    MNPchartConfig.series[3].data = mnpChartData.lastweek_portOut;
                    Highcharts.chart('mnpChart', MNPchartConfig);
                }
            });
            $('#mnpchartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('mnpChart', MNPchartConfig);
        });
    }

    function getOnlySearchResultsConstructor(query, id, interval) {
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
        $('#' + id).show();
        return searchmanager;
    }

    function getBannerSearchResultsConstructor(query, id, interval) {
        var searchmanager = new SearchManager({
            "cancelOnUnload": true,
            "sample_ratio": 1,
            "earliest_time": "0",
            "status_buckets": 0,
            "refresh": "0",
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
        //  custom changes for splunk js ends here

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

    });