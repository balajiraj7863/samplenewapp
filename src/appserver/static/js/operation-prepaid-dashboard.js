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
            getHelpText(mapKey, "topupBannerHelp");
            getHelpText(mapKey, "incidentBannerHelp");
            getHelpText(mapKey, "orderBannerHelp");
            getHelpText(mapKey, "mnpBannerHelp");
            getHelpText(mapKey, "voucherBannerHelp");

            getHelpText(mapKey, "topupHelp");
            getHelpText(mapKey, "autoRenewalHelp");
            getHelpText(mapKey, "mobileResultsHelp");
            getHelpText(mapKey, "voucherHelp");
            getHelpText(mapKey, "incidentHelp");
            getHelpText(mapKey, "mnpHelp");
        }
        updateHelpText('opsPreHomeHelp');

        //TO SELECT COUNTRY 
        var oldCountryList = "";
        var country = "";
        var serviceType = "Prepaid";
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
            country = country.toLowerCase();
            country  = country.charAt(0).toUpperCase() + country.substr(1); 
            // Fetching Banner data
            var topupBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_topup_banner", country, "", "", serviceType), "topupBannerSearch","5m");
            topupBannerSearch.on('search:done', function () {
                var topupBannerSearchResults = topupBannerSearch.data("results", {
                    count: 0,
                    offset: 0
                });
                topupBannerSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            var topup_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "topup");
                            getBannerHelpText("opsPreHomeHelp", "topupBannerHelp");
                            animateCounter("topupOpsPreBanner", topup_bannerTooltip.total, "topupOpsPreBannerUnits");
                            resetBannerNotation("#topupBanner_notation", true, "");
                        }
                    }
                });
                resetBannerNotation("#topupBanner_notation", false,"", "#topupOpsPreBanner", "#topupOpsPreBannerUnits");
            });
    
            var openIncidentBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_openIncidents_banner", country, "", "", serviceType), "openIncidentHomeBannerSearch","30m");
            openIncidentBannerSearch.on('search:done', function () {
                var openIncidentBannerSearchResults = openIncidentBannerSearch.data("results", {
                    count: 0,
                    offset: 0
                });
                openIncidentBannerSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            var openIncident_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalincidents");
                            getBannerHelpText("opsPreHomeHelp", "incidentBannerHelp");
                            animateCounter("openIncOpsPreBanner", openIncident_bannerTooltip.total, "openIncOpsPreBannerUnits");
                            resetBannerNotation("#openIncidentBanner_notation", true, "");
                            var priorityData = priorityDataProcessor(finalDataJson.data, 'priority', 'totalincidents');
                            $('#ops_pre_incidentp1banner').text( priorityData.p1);
                            $('#ops_pre_incidentp2banner').text( priorityData.p2);
                        }
                    }
                });
                resetBannerNotation("#openIncidentBanner_notation", false,"", "#openIncOpsPreBanner", "#openIncOpsPreBannerUnits");
            });

            var subBannerSearchData = getBannerSearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_sub_banner", country, "", "", serviceType), "ops_pre_sub_banner", "24h");
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
    
            var trafficBannerSearchData = getBannerSearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_preTraffic_banner", country, "", "", serviceType), "ops_preTraffic_banner","5m");
            trafficBannerSearchData.on('search:done', function () {
                var trafficBannerSearchResults = trafficBannerSearchData.data("results");
                trafficBannerSearchResults.on("data", function (trafficBanner) {
                    if (undefined !== trafficBanner.data()) {
                        var finalDataJson = convertResultToJSON(trafficBanner.data());
                        bannertooltipDailyRevData1(finalDataJson.data, "type", "currentvalue", "lastweekvalue");
                        $('#trafficBannerHelp').attr("data-original-title", getBannerHelpText("bizPrepaidHelp", "trafficBannerHelp"));
                    }
                });
                $('#trafficData').addClass('fa fa-times-circle');
                $('#trafficVoice').addClass('fa fa-times-circle');
                $('#trafficSMS').addClass('fa fa-times-circle');
                $('#trafficBannerHelp').attr("data-original-title", getBannerHelpText("bizHomeHelp", "trafficBannerHelp"));
            });
    
            // var orderBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_order_banner", country, "", "", serviceType), "orderBannerSearch","24h");
            // orderBannerSearch.on('search:done', function () {
            //     var orderBannerSearchResults = orderBannerSearch.data("results", {
            //         count: 0,
            //         offset: 0
            //     });
            //     orderBannerSearchResults.on("data", function (queryResults) {
            //         if (undefined !== queryResults.data()) {
            //             if (null !== queryResults.data().rows) {
            //                 var finalDataJson = convertResultToJSON(queryResults.data());
            //                 var order_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalorders");
            //                 getBannerHelpText("opsPreHomeHelp", "orderBannerHelp");
            //                 animateCounter("orderOpsPreBanner", order_bannerTooltip.total, "orderOpsPreBannerUnits");
            //                 resetBannerNotation("#orderbanner_notation", true, "");
            //             }
            //         }
            //     });
            //     resetBannerNotation("#orderbanner_notation", false,"", "#orderOpsPreBanner", "#orderOpsPreBannerUnits");
            // });
    
            var mnpBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_mnp_banner", country, "", "", serviceType), "mnpBannerSearch","24h");
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
                            getBannerHelpText("opsPreHomeHelp", "mnpBannerHelp");
                            animateCounter("mnpOpsPreBanner", mlnp_bannerTooltip.total, "mnpOpsPreBannerUnits");
                            resetBannerNotation("#mnpBanner_notation", true, "");
                        }
                    }
                });
                resetBannerNotation("#mnpBanner_notation", false,"", "#mnpOpsPreBanner", "#mnpOpsPreBannerUnits");
            });
    
            // var voucherBannerSearch = getBannerSearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_voucher_banner", country, "", "", serviceType), "voucherBannerSearch","24h");
            // voucherBannerSearch.on('search:done', function () {
            //     var voucherBannerSearchResults = voucherBannerSearch.data("results", {
            //         count: 0,
            //         offset: 0
            //     });
            //     voucherBannerSearchResults.on("data", function (queryResults) {
            //         if (undefined !== queryResults.data()) {
            //             if (null !== queryResults.data().rows) {
            //                 var finalDataJson = convertResultToJSON(queryResults.data());
            //                 var voucher_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "total");
            //                 getBannerHelpText("opsPreHomeHelp", "voucherBannerHelp");
            //                 animateCounter("voucherPreBanner", voucher_bannerTooltip.total, "voucherPreBannerUnits");
            //                 resetBannerNotation("#voucherBanner_notation", true, "");
            //             }
            //         }
            //     });
            //     resetBannerNotation("#voucherBanner_notation", false,"", "#voucherPreBanner", "#voucherPreBannerUnits");
            // });
    
            // Fetching Chart data
    
            var topupData = getOnlySearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_topup_chart", country, "", "", serviceType), "topupData", "30m");
            topupData.on('search:done', function () {
                var topupDataSearchResults = topupData.data("results", {
                    count: 0,
                    offset: 0
                });
                topupDataSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            var topupResults = averageResolution(finalDataJson.data, 'channel', 'revenue', 'topup');
                            opsPreDashboard.topup.xAxis[0].categories = topupResults.Categories;
                            opsPreDashboard.topup.series[0].data = topupResults.AverageResolution;
                            opsPreDashboard.topup.series[1].data = topupResults.TotalIncidentsCount;
                        }
                        Highcharts.chart('topupChart', opsPreDashboard.topup);
                    }
                });
                $('#topupChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('topupChart', opsPreDashboard.topup);
            });
    
            // var autoRenewalData = getOnlySearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_autoRenewal_chart", country, "", "", serviceType), "autoRenewData", "30m");
            // autoRenewalData.on('search:done', function () {
            //     var autoRenewalDataSearchResults = autoRenewalData.data("results", {
            //         count: 0,
            //         offset: 0
            //     });
            //     autoRenewalDataSearchResults.on("data", function (queryResults) {
            //         if (undefined !== queryResults.data()) {
            //             if (null !== queryResults.data().rows) {
            //                 var finalDataJson = convertResultToJSON(queryResults.data());
            //                 opsPreDashboard.autoRenewal.series[0].data = getPieChart(finalDataJson.data, '', '');
            //             }
            //             Highcharts.chart('autoRenewalChart', opsPreDashboard.autoRenewal);
            //         }
            //     });
            //     $('#autoRenewalChartPreloader').hide();
            //     refreshDateTime();
            //     Highcharts.chart('autoRenewalChart', opsPreDashboard.autoRenewal);
            // });
    
            var mobileTestResults = getOnlySearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_mobileTestResult_chart", country, "", "", serviceType), "mobileTestResults", "30m");
            mobileTestResults.on('search:done', function () {
                var mobileTestResultSearchResults = mobileTestResults.data("results", {
                    count: 0,
                    offset: 0
                });
                mobileTestResultSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            opsPreDashboard.mobileResults.series[0].data = getPieChart(finalDataJson.data, 'resultgroup', 'values(totalcount)');
                        }
                        Highcharts.chart('mobileResultsChart', opsPreDashboard.mobileResults);
                    }
                });
                $('#mobileResultsChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('mobileResultsChart', opsPreDashboard.mobileResults);
            });
    
            // var voucherStatus = getOnlySearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_voucherStatus_chart", country, "", "", serviceType), "voucherStatus", "24h");
            // voucherStatus.on('search:done', function () {
            //     var voucherStatusSearchResults = voucherStatus.data("results", {
            //         count: 0,
            //         offset: 0
            //     });
            //     voucherStatusSearchResults.on("data", function (queryResults) {
            //         if (undefined !== queryResults.data()) {
            //             if (null !== queryResults.data().rows) {
            //                 var finalDataJson = convertResultToJSON(queryResults.data());
            //                 var voucherStatusData = colChartDataProcessor(finalDataJson.data, "", "", "");
            //                 opsPreDashboard.voucherStatus.xAxis.categories = voucherStatusData.x_axis;
            //                 opsPreDashboard.voucherStatus.series[0].data = voucherStatusData.portin;
            //                 opsPreDashboard.voucherStatus.series[1].data = voucherStatusData.portout;
            //             }
            //             Highcharts.chart('voucherStatusChart', opsPreDashboard.voucherStatus);
            //         }
            //     });
            //     $('#voucherStatusChartPreloader').hide();
            //     refreshDateTime();
            //     Highcharts.chart('voucherStatusChart', opsPreDashboard.voucherStatus);
            // });
    
            var openIncidentData = getOnlySearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_incByCountry_chart", country, "", "", serviceType), "openIncidents", "30m");
            openIncidentData.on('search:done', function () {
                var openIncidentSearchResults = openIncidentData.data("results", {
                    count: 0,
                    offset: 0
                });
                openIncidentSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            opsPreDashboard.incident.series[0].data = getPieChart(finalDataJson.data, 'country', 'totalincidents');
                        }
                        Highcharts.chart('incidentChart', opsPreDashboard.incident);
                    }
                });
                $('#incidentChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('incidentChart', opsPreDashboard.incident);
            });
            
            var mnpData = getOnlySearchResultsConstructor(getQuery("operationsPrepaidQuery", "ops_pre_mnp_chart", country, "", "", serviceType), "ops_pre_mnp_chart", "24h");
            mnpData.on('search:done', function () {
                var mnpSearchResults = mnpData.data("results");
                mnpSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        var mnpChartData = trendMNPDataProcessor(finalDataJson.data, "date", "portin", "portout");
                        opsPreDashboard.mnp.xAxis.categories = mnpChartData.x_axis;
                        opsPreDashboard.mnp.series[0].data = mnpChartData.portIn;
                        opsPreDashboard.mnp.series[1].data = mnpChartData.portOut;
                        opsPreDashboard.mnp.series[2].data = mnpChartData.lastweek_portIn;
                        opsPreDashboard.mnp.series[3].data = mnpChartData.lastweek_portOut;
                        Highcharts.chart('mnpChart', opsPreDashboard.mnp);
                    }
                });
                $('#mnpchartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('mnpChart', opsPreDashboard.mnp);
            });
        }
    
        function getBannerSearchResultsConstructor(query, id,interval) {
            var searchmanager = new SearchManager({
                "id": id,
                "cancelOnUnload": true,
                "sample_ratio": 1,
                "earliest_time": "0",
                "refresh":interval,
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
                "id": id,
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