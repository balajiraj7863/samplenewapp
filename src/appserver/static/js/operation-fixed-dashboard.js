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

        function updateHelpText(mapKey) {
            getHelpText(mapKey, "incidentBannerHelp");
            getHelpText(mapKey, "orderBannerHelp");
            getHelpText(mapKey, "mnpBannerHelp");
            getHelpText(mapKey, "incidentAgeingHelp");
            getHelpText(mapKey, "incidentCountryHelp");
            getHelpText(mapKey, "mnpHelp");
            getHelpText(mapKey, "orderAgeingHelp");
            getHelpText(mapKey, "orderCountrywiseHelp");
            getHelpText(mapKey, "billingMediationHelp");
        }
        updateHelpText('opsPostDashboardHelp');

        //TO SELECT COUNTRY 
        var oldCountryList = "";
        var country = "";
        var serviceType = "Fixed";

        if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
            if (localStorage.getItem("globalUserServiceTypeList").indexOf("operation-fixed") > -1) {
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
            var orderByCountryData = getOnlySearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_orderByCountry_chart", country, "", "", serviceType), "orderCountrywiseChartPreloader", "30m");
            orderByCountryData.on('search:done', function () {
                var orderByCountrySearchResults = orderByCountryData.data("results", {
                    count: 0,
                    offset: 0
                });
                orderByCountrySearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            opsPostDashboard.orderCountry.series[0].data = getPieChart(finalDataJson.data, 'country', 'totalorders');
                        }
                        Highcharts.chart('orderCountrywiseChart', opsPostDashboard.orderCountry);
                    }
                });
                $('#orderCountrywiseChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('orderCountrywiseChart', bizOpsFixedEmpty.emptyChartConfig.emptyChart);
            });

            var incidentAgeingData = getOnlySearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_incByAgeing_chart", country, "", "", serviceType), "incidentsAgeschartPreloader", "30m");
            incidentAgeingData.on('search:done', function () {
                var incidentAgeingSearchResults = incidentAgeingData.data("results", {
                    count: 0,
                    offset: 0
                });
                incidentAgeingSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            opsPostDashboard.incidentAgeing.series[0].data = ageingChartDataProcessor(finalDataJson.data, "txntime", "totalincidents");
                        }
                        Highcharts.chart('incidentsAgeschart', opsPostDashboard.incidentAgeing);
                    }
                });
                $('#incidentsAgeschartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('incidentsAgeschart', bizOpsFixedEmpty.emptyChartConfig.emptyChart);
            });


            var incidentCountryData = getOnlySearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_incByCountry_chart", country, "", "", serviceType), "countryChartPreloader", "30m");
            incidentCountryData.on('search:done', function () {
                var incidentCountrySearchResults = incidentCountryData.data("results", {
                    count: 0,
                    offset: 0
                });
                incidentCountrySearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            opsPostDashboard.incidentCountry.series[0].data = getPieChart(finalDataJson.data, 'country', 'totalincidents');
                        }
                        Highcharts.chart('countryChart', opsPostDashboard.incidentCountry);
                    }
                });
                $('#countryChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('countryChart', bizOpsFixedEmpty.emptyChartConfig.emptyChart);
            });


            var orderAgeingData = getOnlySearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_orderByAgeing_chart", country, "", "", serviceType), "orderAgingChartPreloader", "30m");
            orderAgeingData.on('search:done', function () {
                var orderAgeingSearchResults = orderAgeingData.data("results", {
                    count: 0,
                    offset: 0
                });
                orderAgeingSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            opsPostDashboard.orderAgeing.series[0].data = ageingChartDataProcessor(finalDataJson.data, "date", "totalorder");
                        }
                        Highcharts.chart('orderAgingChart', opsPostDashboard.orderAgeing);
                    }
                });
                $('#orderAgingChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('orderAgingChart', bizOpsFixedEmpty.emptyChartConfig.emptyChart);
            });


            var mnpData = getOnlySearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_mnp_chart", country, "", "", serviceType), "mnpchartPreloader", "24h");
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
                            opsPostDashboard.mnp.xAxis.categories = mnpChartData.x_axis;
                            opsPostDashboard.mnp.series[0].data = mnpChartData.portIn;
                            opsPostDashboard.mnp.series[1].data = mnpChartData.portOut;
                            opsPostDashboard.mnp.series[2].data = mnpChartData.lastweek_portIn;
                            opsPostDashboard.mnp.series[3].data = mnpChartData.lastweek_portOut;
                        }
                        Highcharts.chart('mnpChart', opsPostDashboard.mnp);
                    }
                });
                $('#mnpchartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('mnpChart', bizOpsFixedEmpty.emptyChartConfig.emptyChart);
            });

            var billiingMediationData = getOnlySearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_mediation_chart", country, "", "", serviceType), "serviceChartPreloader", "1h");
            billiingMediationData.on('search:done', function () {
                var billiingMediationSearchResults = billiingMediationData.data("results", {
                    count: 0,
                    offset: 0
                });
                billiingMediationSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            var billingChartData = colChartDataProcessor(finalDataJson.data, "txndate", "mediated", "rated");
                            opsPostDashboard.billingMediation.xAxis.categories = billingChartData.x_axis;
                            opsPostDashboard.billingMediation.series[0].data = billingChartData.portout;
                            opsPostDashboard.billingMediation.series[1].data = billingChartData.portin;
                        }
                        Highcharts.chart('serviceChart', opsPostDashboard.billingMediation);
                    }
                });
                $('#serviceChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('serviceChart', bizOpsFixedEmpty.emptyChartConfig.emptyChart);
            });

            var openIncidentHomeBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_openIncidents_banner", country, "", "", serviceType), "openIncidentHomeBannerSearch");
            openIncidentHomeBannerSearch.on('search:done', function () {
                var openIncidentHomeBannerSearchResults = openIncidentHomeBannerSearch.data("results", {
                    count: 0,
                    offset: 0
                });
                openIncidentHomeBannerSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            var openIncident_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalincidents");
                            animateCounter("openIncOpsPostBanner", openIncident_bannerTooltip.total, "openIncOpsPostBannerUnits");
                            resetBannerNotation("#openIncidentBanner_notation", true, "");
                            var priorityData = priorityDataProcessor(finalDataJson.data, 'priority', 'totalincidents');
                            $('#ops_fixed_incidentp1banner').text(priorityData.p1);
                            $('#ops_fixed_incidentp2banner').text(priorityData.p2);
                        }
                    }
                });
                resetBannerNotation("#openIncidentBanner_notation", false, "", "#openIncOpsPostBanner", "#openIncOpsPostBannerUnits");
            });

            var orderBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_order_banner", country, "", "", serviceType), "orderBannerSearch");
            orderBannerSearch.on('search:done', function () {
                var orderBannerSearchResults = orderBannerSearch.data("results", {
                    count: 0,
                    offset: 0
                });
                orderBannerSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            var order_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalorders");
                            animateCounter("orderOpsPostBanner", order_bannerTooltip.total, "orderOpsPostBannerUnits");
                            resetBannerNotation("#orderbanner_notation", true, "");
                            var orderData = orderDataProcessor(finalDataJson.data, 'orderstatus', 'totalorders');
                            $('#ops_fixed_orderCurrentBanner').text(orderData.Current);
                            $('#ops_fixed_orderCompletedBanner').text(orderData.Completed);
                        }
                    }
                });
                resetBannerNotation("#orderbanner_notation", false, "", "#orderOpsPostBanner", "#orderOpsPostBannerUnits");
            });

            var mnpBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_mnp_banner", country, "", "", serviceType), "mnpBannerSearch");
            mnpBannerSearch.on('search:done', function () {
                var mnpBannerSearchResults = mnpBannerSearch.data("results", {
                    count: 0,
                    offset: 0
                });
                mnpBannerSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            var mlnp_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "total");
                            animateCounter("mnpOpsPostBanner", mlnp_bannerTooltip.total, "mnpOpsPostBannerUnits");
                            resetBannerNotation("#mnpBanner_notation", true, "");
                        }
                    }
                });
                resetBannerNotation("#mnpBanner_notation", false, "", "#mnpOpsPostBanner", "#mnpOpsPostBannerUnits");
            });

            var subBannerSearchData = getBannerSearchResultsConstructor(getQuery("operationsPostQuery", "ops_post_sub_banner", country, "", "", serviceType), "ops_post_sub_banner");
            subBannerSearchData.on('search:done', function () {
                var subBannerSearchResults = subBannerSearchData.data("results");
                subBannerSearchResults.on("data", function (subval) {
                    if (undefined != subval.data()) {

                        var finalDataJson = convertResultToJSON(subval.data());
                        var sub_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalsub");
                        $('#subBannerTooltip').attr("data-original-title", getBannerHelpText("bizFixedHelp", "subBannerHelp"));
                        animateCounter("subbanner", sub_bannerTooltip.total, "bizFixedUnSubBannerUnits");
                        resetBannerNotation("#subbanner_notation", true, "");
                    }
                });
                resetBannerNotation("#subbanner_notation", false, "", "#subbanner", "#bizFixedUnSubBannerUnits");
                $('#subBannerTooltip').attr("data-original-title", getBannerHelpText("bizFixedHelp", "subBannerHelp"));
            });

            /*var trafficBannerSearchData = getBannerSearchResultsConstructor(getQuery("bizPostpaidQuery", "biz_postpaid_traffic_banner", country, "", "", serviceType), "biz_traffic_banner");
            trafficBannerSearchData.on('search:done', function () {
                var trafficBannerSearchResults = trafficBannerSearchData.data("results");
                trafficBannerSearchResults.on("data", function (trafficBanner) {
                    if (undefined !== trafficBanner.data()) {
                        bannertooltipTrafficData(finalDataJson.data, "hour", "source", "currentweekvalue", "lastweekvalue");
                        $('#trafficBannerTooltip').attr("data-original-title", getBannerHelpText("bizFixedHelp", "trafficBannerHelp"));
                    }
                });
                $('#trafficVoice').addClass('fa fa-times-circle');
                $('#trafficBB').addClass('fa fa-times-circle');
                $('#trafficIPTV').addClass('fa fa-times-circle');
                $('#trafficBannerTooltip').attr("data-original-title", getBannerHelpText("bizFixedHelp", "trafficBannerHelp"));
            });*/

            $('#trafficVoice').addClass('fa fa-times-circle');
            $('#trafficBB').addClass('fa fa-times-circle');
            $('#trafficIPTV').addClass('fa fa-times-circle');
            $('#trafficBannerTooltip').attr("data-original-title", getBannerHelpText("bizFixedHelp", "trafficBannerHelp"));
            
        }

        function getBannerSearchResultsConstructor(query, id) {
            var searchmanager = new SearchManager({
                //"id": id,
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


            return searchmanager;
        }

        function getOnlySearchResultsConstructor(query, id, interval) {
            var searchmanager = new SearchManager({
                // "id": id,
                "cancelOnUnload": true,
                "refresh": "0",
                "refreshType": "delay",
                "sample_ratio": 1,
                //"earliest_time": "0",
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