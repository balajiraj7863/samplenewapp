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



        //  custom changes for splunk js starts here,
        getHelpText("opsHomeHelp", "topupHelp");
    getHelpText("opsHomeHelp", "opsHomeIncChartHelp");
    getHelpText("opsHomeHelp", "opsHomeIncPriorityChartHelp");
    getHelpText("opsHomeHelp", "opsHomeTodaysOrderChartHelp");
    getHelpText("opsHomeHelp", "opsHomeMLnpChartHelp");
    var oldCountryList = "";
    var country = "";
    var serviceType = "";
    $('.phaseTwo').hide();
    if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
        if (null != localStorage.getItem("globalUserServiceTypeList").toString().match(/operation-*/g) && localStorage.getItem("globalUserServiceTypeList").toString().match(/operation-*/g).length > 1) {
            oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
            country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
            serviceType = (null !== localStorage.getItem("loggedInUserData") && "" !== localStorage.getItem("loggedInUserData")) ? getServiceTypes(JSON.parse(localStorage.getItem("loggedInUserData")), "user_type", "operation", "service_type").toString().split(',').join('","') : "";
            loadSuccessPage();
            reloadAll()
        } else {
            loadErrorPage()
        }
    } else {
        loadErrorPage();
        var getDataInterval = setInterval(function () {
            if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
                if (null != localStorage.getItem("globalUserServiceTypeList").toString().match(/operation-*/g) && localStorage.getItem("globalUserServiceTypeList").toString().match(/operation-*/g).length > 1) {
                    oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
                    country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
                    serviceType = (null !== localStorage.getItem("loggedInUserData") && "" !== localStorage.getItem("loggedInUserData")) ? getServiceTypes(JSON.parse(localStorage.getItem("loggedInUserData")), "user_type", "operation", "service_type").toString().split(',').join('","') : "";
                    loadSuccessPage();
                    reloadAll();
                    clearInterval(getDataInterval)
                }
            }
        }, 100)
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
        var openIncidentHomeBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsHomeQuery", "ops_home_openIncidents_banner", country, "", "", serviceType), "openIncidentHomeBannerSearch");
        openIncidentHomeBannerSearch.on('search:done', function () {
            var openIncidentHomeBannerSearchResults = openIncidentHomeBannerSearch.data("results", {
                count: 0,
                offset: 0
            });
            openIncidentHomeBannerSearchResults.on("data", function (openIncidentResults) {
                if (undefined !== openIncidentResults.data()) {
                    var finalDataJson = convertResultToJSON(openIncidentResults.data());
                    var openInc_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalincidents");
                    $('#openIncBannerTooltip').attr("data-original-title", "" + "Prepaid : " + openInc_bannerTooltip.prepaid + "<br/>Postpaid : " + openInc_bannerTooltip.postpaid + "<br/>Fixed : " + openInc_bannerTooltip.fixed + "<br/>" + getBannerHelpText("opsHomeHelp", "openIncidentBannerHelp"));
                    animateCounter("openIncidentBanner", openInc_bannerTooltip.total, "ops_home_open_incident_banner_units");
                    resetBannerNotation("#openIncidentBanner_notation", true, "");
                    var priorityData = priorityDataProcessor(finalDataJson.data, 'priority', 'totalincidents');
                    $('#ops_home_incidentp1banner').text(priorityData.p1);
                    $('#ops_home_incidentp2banner').text(priorityData.p2)
                }
            });
            resetBannerNotation("#openIncidentBanner_notation", false, "", "#openIncidentBanner", "#ops_home_open_incident_banner_units");
            $('#openIncBannerTooltip').attr("data-original-title", getBannerHelpText("opsHomeHelp", "openIncidentBannerHelp"))
        });
        var orderBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsHomeQuery", "ops_home_order_banner", country, "", "", serviceType), "orderBannerSearch");
        orderBannerSearch.on('search:done', function () {
            var orderBannerSearchResults = orderBannerSearch.data("results", {
                count: 0,
                offset: 0
            });
            orderBannerSearchResults.on("data", function (orderResults) {
                if (undefined !== orderResults.data()) {
                    var finalDataJson = convertResultToJSON(orderResults.data());
                    var order_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalorders");
                    $('#orderBannerTooltip').attr("data-original-title", "Prepaid : " + order_bannerTooltip.prepaid + "<br/>" + "Postpaid : " + order_bannerTooltip.postpaid + "<br/>Fixed : " + order_bannerTooltip.fixed + "<br/>" + getBannerHelpText("opsHomeHelp", "orderBannerHelp"));
                    animateCounter("orderBanner", order_bannerTooltip.total, "ops_home_open_order_banner_units");
                    resetBannerNotation("#orderbanner_notation", true, "");
                    var orderData = orderDataProcessor(finalDataJson.data, 'orderstatus', 'totalorders');
                    $('#ops_home_orderCurrentBanner').text(orderData.Current);
                    $('#ops_home_orderCompletedBanner').text(orderData.Completed)
                }
            });
            resetBannerNotation("#orderbanner_notation", false, "", "#orderBanner", "#ops_home_open_order_banner_units");
            $('#orderBannerTooltip').attr("data-original-title", getBannerHelpText("opsHomeHelp", "orderBannerHelp"))
        });
        var mnpBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsHomeQuery", "ops_home_mnp_banner", country, "", "", serviceType), "mnpBannerSearch");
        mnpBannerSearch.on('search:done', function () {
            var mnpBannerSearchResults = mnpBannerSearch.data("results", {
                count: 0,
                offset: 0
            });
            mnpBannerSearchResults.on("data", function (mlnpResults) {
                if (undefined !== mlnpResults.data()) {
                    var finalDataJson = convertResultToJSON(mlnpResults.data());
                    var mlnp_bannerTooltip = bannertooltipMNPData(finalDataJson.data, "servicetype", "total");
                    $('#MNPBannerTooltip').attr("data-original-title", "" + "Prepaid : " + mlnp_bannerTooltip.prepaid + "<br/>" + "Postpaid : " + mlnp_bannerTooltip.postpaid + "<br/>" + "Fixed : " + mlnp_bannerTooltip.fixed + "<br/>" + getBannerHelpText("opsHomeHelp", "mnpBannerHelp"));
                    $('#MNPBanner').text(mlnp_bannerTooltip.total);
                    resetBannerNotation("#mnpBanner_notation", true, "")
                }
            });
            resetBannerNotation("#mnpBanner_notation", false, "", "#MNPBanner", "#ops_home_open_mnp_banner_units");
            $('#MNPBannerTooltip').attr("data-original-title", getBannerHelpText("opsHomeHelp", "mnpBannerHelp"))
        });
        var trafficBannerSearchData = getOnlySearchResultsConstructor(getQuery("operationsHomeQuery", "ops_traffic_banner", country, "", "", serviceType), "biz_traffic_banner");
        trafficBannerSearchData.on('search:done', function () {
            var trafficBannerSearchResults = trafficBannerSearchData.data("results");
            trafficBannerSearchResults.on("data", function (trafficBanner) {
                if (undefined != trafficBanner.data()) {
                    var finalDataJson = convertResultToJSON(trafficBanner.data());
                    bannertooltipDailyRevData1(finalDataJson.data, "type", "currentvalue", "lastweekvalue");
                    $('#trafficBannerTooltip').attr("data-original-title", getBannerHelpText("bizHomeHelp", "trafficBannerHelp"))
                }
            });
            $('#trafficData').addClass('fa fa-times-circle');
            $('#trafficVoice').addClass('fa fa-times-circle');
            $('#trafficSMS').addClass('fa fa-times-circle');
            $('#trafficBannerTooltip').attr("data-original-title", getBannerHelpText("bizHomeHelp", "trafficBannerHelp"))
        });
        var opsOpenincidentcountryWiseData = getOnlySearchResultsConstructor(getQuery("operationsHomeQuery", "ops_home_openIncidents_chart", country, "", "", serviceType), "IncidentChartPreloader", "30m");
        opsOpenincidentcountryWiseData.on('search:done', function () {
            var opsOpenincidentcountryWiseSearchResults = opsOpenincidentcountryWiseData.data("results", {
                count: 0,
                offset: 0
            });
            var isdone = false;
            var data1 = new Promise((resolve, reject) => {
                opsOpenincidentcountryWiseSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        isdone=true;
                        resolve(queryResults);
                    }
                })
            });
            var loadData = function (queryResults) {
                $('#IncidentChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('incidentChart', opsHomeEmpty.emptyChartConfig.emptyChart);
                var rows = queryResults.data().rows;
                if (null !== rows) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    opsHomeDashboard.openincidentChart.series[0].data = getPieChart(finalDataJson.data, 'country', 'totalincidents')
                }
                Highcharts.chart('incidentChart', opsHomeDashboard.openincidentChart)
            };
            var setnodata = setInterval(function () {
                if (!isdone) {
                    $('#IncidentChartPreloader').hide();
                    refreshDateTime();
                    Highcharts.chart('incidentChart', opsHomeEmpty.emptyChartConfig.emptyChart)
                } else {
                    clearInterval(setnodata)
                }
            }, 6000);
            data1.then(loadData)
        });
        var todaysOrderStatusData = getOnlySearchResultsConstructor(getQuery("operationsHomeQuery", "ops_home_todaysOrder_chart", country, "", "", serviceType), "orderChartPreloader", "30m");
        todaysOrderStatusData.on('search:done', function () {
            var todaysOrderStatusSearchResults = todaysOrderStatusData.data("results", {
                count: 0,
                offset: 0
            });
            var isdone = false;
            var data1 = new Promise((resolve, reject) => {
                todaysOrderStatusSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        isdone = true;
                        resolve(queryResults.data())
                    }
                })
            });
            var loadData = function (queryResults) {
                $('#orderChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('orderChart', opsHomeEmpty.emptyChartConfig.emptyChart);
                if (undefined !== queryResults) {
                    var finalDataJson = convertResultToJSON(queryResults);
                    opsHomeDashboard.todaysorderChart.series[0].data = getPieChart(finalDataJson.data, 'orderstatus', 'statuscount');
                    Highcharts.chart('orderChart', opsHomeDashboard.todaysorderChart)
                }
            };
            var setnodata = setInterval(function () {
                if (!isdone) {
                    $('#orderChartPreloader').hide();
                    refreshDateTime();
                    Highcharts.chart('orderChart', opsHomeEmpty.emptyChartConfig.emptyChart)
                } else {
                    clearInterval(setnodata)
                }
            }, 6000);
            data1.then(loadData)
        });
        var incidentPriorityData = getOnlySearchResultsConstructor(getQuery("operationsHomeQuery", "ops_home_incPriority_chart", country, "", "", serviceType), "incidentPriorityChartPreloader", "30m");
        incidentPriorityData.on('search:done', function () {
            var incidentPrioritySearchResults = incidentPriorityData.data("results", {
                count: 0,
                offset: 0
            });
            var isdone = false;
            var data1 = new Promise((resolve, reject) => {
                incidentPrioritySearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        isdone=true;
                        resolve(queryResults);
                    }
                })
            });
            var loadData = function (queryResults) {
                $('#incidentPriorityChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('incidentPriorityChart', opsHomeEmpty.emptyChartConfig.emptyChart);
                var finalData = [{
                    name: 'P1',
                    y: 0,
                    color: '#ff0000'
                }, {
                    name: 'P2',
                    y: 0,
                    color: '#ef5956'
                }, {
                    name: 'P3',
                    y: 0,
                    color: '#f69653',
                }, {
                    name: 'P4',
                    y: 0,
                    color: '#fdb94e'
                }];
                var finalDataJson = convertResultToJSON(queryResults.data());
                var priorityData = priorityDataProcessor(finalDataJson.data, 'priority', 'totalincidents');
                finalData[0].y = priorityData.p1;
                finalData[1].y = priorityData.p2;
                finalData[2].y = priorityData.p3;
                finalData[3].y = priorityData.p4;
                opsHomeDashboard.incidentPriorityChart.series[0].data = finalData;
                Highcharts.chart('incidentPriorityChart', opsHomeDashboard.incidentPriorityChart)
            };
            var setnodata = setInterval(function () {
                if (!isdone) {
                    $('#incidentPriorityChartPreloader').hide();
                    refreshDateTime();
                    Highcharts.chart('incidentPriorityChart', opsHomeEmpty.emptyChartConfig.emptyChart)
                } else {
                    clearInterval(setnodata)
                }
            }, 6000);
            data1.then(loadData)
        });
        var mnpData = getOnlySearchResultsConstructor(getQuery("operationsHomeQuery", "ops_home_mnp_chart", country, "", "", serviceType), "ops_home_mnp_chart", "24h");
        mnpData.on('search:done', function () {
            var mnpSearchResults = mnpData.data("results", {
                count: 0,
                offset: 0
            });
            var isdone = false;
            var data1 = new Promise((resolve, reject) => {
                mnpSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        isdone=true;
                        resolve(queryResults)
                    }
                })
            });
            var loadData = function (queryResults) {
                $('#mnpchartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('mnpChart', opsHomeEmpty.emptyChartConfig.emptyChart);
                if (undefined !== queryResults) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var mnpChartData = trendMNPHomeDataProcessor(finalDataJson.data, "date", "portin", "portout");
                    opsHomeDashboard.mnpChartConfig.xAxis.categories = mnpChartData.x_axis;
                    opsHomeDashboard.mnpChartConfig.series[0].data = mnpChartData.portIn;
                    opsHomeDashboard.mnpChartConfig.series[1].data = mnpChartData.portOut;
                    opsHomeDashboard.mnpChartConfig.series[2].data = mnpChartData.lastweek_portIn;
                    opsHomeDashboard.mnpChartConfig.series[3].data = mnpChartData.lastweek_portOut;
                    Highcharts.chart('mnpChart', opsHomeDashboard.mnpChartConfig)
                }
            };
            var setnodata = setInterval(function () {
                if (!isdone) {
                    $('#mnpchartPreloader').hide();
                    refreshDateTime();
                    Highcharts.chart('mnpChart', opsHomeEmpty.emptyChartConfig.emptyChart)
                } else {
                    clearInterval(setnodata)
                }
            }, 6000);
            data1.then(loadData)
        })
    }

    function getBannerSearchResultsConstructor(query, id) {
        var searchmanager = new SearchManager({
            "cancelOnUnload": true,
            "sample_ratio": 1,
            "earliest_time": "0",
            "status_buckets": 0,
            "search": query,
            "latest_time": "now",
            "app": utils.getCurrentApp(),
            "auto_cancel": 90,
            "preview": true,
            "tokenDependencies": {},
            "runWhenTimeIsUndefined": false
        }, {
            tokens: true,
            tokenNamespace: "submitted"
        });
        return searchmanager
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
            "latest_time": "now",
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
        return searchmanager
    }

        //  custom changes for splunk js ends here,


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