var business_home_charts_banners = [];
var totalLabels = [];
// <![CDATA[

        // <![CDATA[
        //
        // LIBRARY REQUIREMENTS
        //
        // In the require function, we include the necessary libraries and modules for
        // the HTML dashboard. Then, we pass variable names for these libraries and
        // modules as function parameters, in order.
        // 
        // When you add libraries or modules, remember to retain this mapping order
        // between the library or module and its function parameter. You can do this by
        // adding to the end of these lists, as shown in the commented examples below.
        // initialising global variables

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

               //  custom changes for splunk js starts here
               getHelpText("bizHomeHelp", "revChartHelp");
    getHelpText("bizHomeHelp", "subChartHelp");
    getHelpText("bizHomeHelp", "orderChartHelp");
    getHelpText("bizHomeHelp", "mnpChartHelp");
    
    var oldCountryList = "";
    var country = "";
    var serviceType = "";
    $('.phaseTwo').hide();
    if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
        if (null != localStorage.getItem("globalUserServiceTypeList").toString().match(/business-*/g) && localStorage.getItem("globalUserServiceTypeList").toString().match(/business-*/g).length > 1) {
            oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
            country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
            serviceType = (null !== localStorage.getItem("loggedInUserData") && "" !== localStorage.getItem("loggedInUserData")) ? getServiceTypes(JSON.parse(localStorage.getItem("loggedInUserData")), "user_type", "business", "service_type").toString().split(',').join('","') : "";
            loadSuccessPage();
            reloadAll()
        } else {
            loadErrorPage()
        }
    } else {
        loadErrorPage();
        var getDataInterval = setInterval(function () {
            if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
                if (null != localStorage.getItem("globalUserServiceTypeList").toString().match(/business-*/g) && localStorage.getItem("globalUserServiceTypeList").toString().match(/business-*/g).length > 1) {
                    oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
                    country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
                    serviceType = (null !== localStorage.getItem("loggedInUserData") && "" !== localStorage.getItem("loggedInUserData")) ? getServiceTypes(JSON.parse(localStorage.getItem("loggedInUserData")), "user_type", "business", "service_type").toString().split(',').join('","') : "";
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
            if (oldCountryList != newCountryList) {
                country = localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","');
                reloadAll();
                oldCountryList = newCountryList
            }
        }
    });

    function reloadAll() {
        business_home_charts_banners = [
            "business_home_unbilled_revenue_chart",
            "business_home_unbilled_revenue_banner",
            "business_home_incident_banner",
            "business_home_order_banner",
            "business_home_subscriber_banner",
            "business_home_subscriber_chart",
            "business_home_order_chart",
            "business_home_mnp_chart"
        ];
        business_home_charts_banners.forEach(function(kpi)
    {
        eval(kpi+"()");
    })

    }

    function business_home_unbilled_revenue_chartrenderer(queryResults, jobResultsFlag) {
        if (jobResultsFlag) {
            queryResults = current_results;

        }
        var finalDataJson = convertResultToJSON(queryResults);
        var trendChartdata = trendDataProcessor(finalDataJson.data, "txndate", "totalrevenue");
        revenueChartConfig.xAxis[0].categories = trendChartdata.xaxisValues;
        revenueChartConfig.series[0].data = trendChartdata.currentWeekData;
        revenueChartConfig.series[1].data = trendChartdata.previousWeekData;
        Highcharts.chart('revenueChart', revenueChartConfig)
    }

    function business_home_order_bannerrenderer(orderResults, jobResultsFlag) {
        if (jobResultsFlag) {
            orderResults = current_results;

        }
        var finalDataJson = convertResultToJSON(orderResults);
        var order_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalorders");
        $('#orderBannerTooltip').attr("data-original-title", "Prepaid : " + order_bannerTooltip.prepaid + "<br/>" + "Postpaid : " + order_bannerTooltip.postpaid + "<br/>Fixed : " + order_bannerTooltip.fixed + "<br/>" + getBannerHelpText("bizHomeHelp", "orderBannerHelp"));
        animateCounter("orderbanner", order_bannerTooltip.total, "bizPostpaidOrderBannerUnits");
        resetBannerNotation("#orderbanner_notation", true, "");
        var orderData = orderDataProcessor(finalDataJson.data, 'orderstatus', 'totalorders');
        $('#biz_home_orderCurrentBanner').text(orderData.Current);
        $('#biz_home_orderCompletedBanner').text(orderData.Completed)
    }

    function business_home_subscriber_chartrenderer(subResults, jobResultsFlag) {
        if (jobResultsFlag) {
            subResults = current_results;

        }
        var finalDataJson = convertResultToJSON(subResults);
        var trendChartdata = trendDataProcessor(finalDataJson.data, "txndate", "totalsub");
        SubscriberChartConfig.xAxis[0].categories = trendChartdata.xaxisValues;
        SubscriberChartConfig.series[0].data = trendChartdata.currentWeekData;
        SubscriberChartConfig.series[1].data = trendChartdata.previousWeekData;
        Highcharts.chart('SubscriberChart', SubscriberChartConfig)
    }

    function business_home_unbilled_revenue_bannerrenderer(revBillResults, jobResultsFlag) {
        if (jobResultsFlag) {
            revBillResults = current_results;

        }
        var finalDataJson = convertResultToJSON(revBillResults);
        var revenue_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "service", "revenue");
        $('#revBannerTooltip').attr("data-original-title", " Prepaid : $" + revenue_bannerTooltip.prepaid + "<br/>Unbilled Postpaid : $" + revenue_bannerTooltip.postpaid + "<br/>Unbilled Fixed : $" + revenue_bannerTooltip.fixed + "<br/>" + getBannerHelpText("bizHomeHelp", "revBannerHelp"));
        animateCounter("rev_billbanner", revenue_bannerTooltip.total, "bizPostpaidRevBannerUnits");
        resetBannerNotation("#rev_billbanner_notation", true, "$")
    }

    function business_home_incident_bannerrenderer(incResults, jobResultsFlag) {
        if (jobResultsFlag) {
            incResults = current_results;

        }
        var finalDataJson = convertResultToJSON(incResults);
        var inc_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalincidents");
        $('#incBannerTooltip').attr("data-original-title", "Prepaid : " + inc_bannerTooltip.prepaid + "<br/>" + "Postpaid : " + inc_bannerTooltip.postpaid + "<br/>Fixed : " + inc_bannerTooltip.fixed + "<br/>" + getBannerHelpText("bizHomeHelp", "incidentBannerHelp"));
        animateCounter("incidentbanner", inc_bannerTooltip.total, "bizPostpaidIncBannerUnits");
        resetBannerNotation("#incidentbanner_notation", true, "");
        var priorityData = priorityDataProcessor(finalDataJson.data, 'priority', 'totalincidents');
        $('#biz_home_incidentp1banner').text(priorityData.p1);
        $('#biz_home_incidentp2banner').text(priorityData.p2)
    }

    function business_home_subscriber_bannerrenderer(subResults, jobResultsFlag) {
        if (jobResultsFlag) {
            subResults = current_results;

        }
        var finalDataJson = convertResultToJSON(subResults);
        var sub_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalsub");
        $('#subBannerTooltip').attr("data-original-title", "Prepaid : " + sub_bannerTooltip.prepaid + "<br/>" + "Postpaid : " + sub_bannerTooltip.postpaid + "<br/>Fixed : " + sub_bannerTooltip.fixed + "<br/>" + getBannerHelpText("bizHomeHelp", "subBannerHelp"));
        animateCounter("subbanner", sub_bannerTooltip.total, "bizPostpaidSubBannerUnits");
        resetBannerNotation("#subbanner_notation", true, "")
    }

    function business_home_mnp_chartrenderer(results, jobResultsFlag) {
        if (jobResultsFlag) {
            results = current_results;

        }
        var finalDataJson = convertResultToJSON(results);
        var mnpChartData = colChartDataProcessor(finalDataJson.data, "date", "portin", "portout");
        mnpChartConfig.xAxis.categories = mnpChartData.x_axis;
        mnpChartConfig.series[0].data = mnpChartData.portin;
        mnpChartConfig.series[1].data = mnpChartData.portout;
        Highcharts.chart('mnpChart', mnpChartConfig)
    }

    function business_home_order_chartrenderer(results, jobResultsFlag) {
        if (jobResultsFlag) {
            results = current_results;

        }

        var finalDataJson = convertResultToJSON(results);
        var orderChartData = orderSolidGaugeDataProcessor(finalDataJson.data, "servicetype", "servicetotalorders", "avgdata");
        orderChartConfig.series[0].data[0].y = orderChartData.prepaidPercentage;
        orderChartConfig.series[0].data[0].z = orderChartData.prepaidCount;
        orderChartConfig.series[1].data[0].y = orderChartData.postpaidPercentage;
        orderChartConfig.series[1].data[0].z = orderChartData.postpaidCount;
        orderChartConfig.series[2].data[0].y = orderChartData.fixedPercentage;
        orderChartConfig.series[2].data[0].z = orderChartData.fixedCount;
        Highcharts.chart('orderPieChart', orderChartConfig)
    }

    function business_home_subscriber_chart() {
        var subSearchData = getOnlySearchResultsConstructor11(getQuery("bizHomeQuery", "biz_sub_chart", country, "", "", serviceType), "5m", "business_home_subscriber_chart");

        subSearchData.on('search:done', function () {
            var subSearchResults = subSearchData.data("results");
            var isdone = false;
            var data1 = new Promise((resolve, reject) => {
                subSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        isdone = true;
                       resolve(queryResults.data());
                    }
                });
            });
            var loadData = function (queryResults) {
                $('#subChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('SubscriberChart', bizHomeEmpty.emptyChartConfig.emptyChart);
                if (undefined !== queryResults) {
                    business_home_subscriber_chartrenderer(queryResults,false);
                }
            };
            var setnodata = setInterval(function () {
                if (!isdone) {
                    $('#subChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('SubscriberChart', bizHomeEmpty.emptyChartConfig.emptyChart);
                } else {
                    clearInterval(setnodata);
                }
            }, 6000);
            data1.then(loadData);
        });

    }



    function business_home_mnp_chart() {
        var mnpData = getOnlySearchResultsConstructor11(getQuery("bizHomeQuery", "biz_MNP_chart", country, "", "", serviceType), "5m", "business_home_mnp_chart");
        mnpData.on('search:done', function () {
            var mnpSearchResults = mnpData.data("results");
            var isdone = false;
            var data1 = new Promise((resolve, reject) => {
            mnpSearchResults.on("data", function (queryResults) {
                if (undefined != queryResults.data()) {
                    isdone = true;
                   resolve(queryResults.data());
                }
            });
        });
          
        
        var loadData = function (queryResults) {
            $('#mnpchartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('mnpChart', bizHomeEmpty.emptyChartConfig.emptyChart);
            if (undefined !== queryResults) {
                business_home_mnp_chartrenderer(queryResults, false);
            }
        };
        var setnodata = setInterval(function () {
            if (!isdone) {
                $('#mnpchartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('mnpChart', bizHomeEmpty.emptyChartConfig.emptyChart);
            } else {
                clearInterval(setnodata);
            }
        }, 6000);
        data1.then(loadData);
    });
    }

    function business_home_order_chart() {
        var orderData = getOnlySearchResultsConstructor11(getQuery("bizHomeQuery", "biz_order_chart", country, "", "", serviceType), "5m", "business_home_order_chart");
        orderData.on('search:done', function () {
            var oldJob = false;
            var orderSearchResults = orderData.data("results");
            var isdone = false;
            var data1 = new Promise((resolve, reject) => {
            orderSearchResults.on("data", function (queryResults) {
                if (undefined != queryResults.data()) {
                    isdone = true;
                   resolve(queryResults.data());
                }
            });
        });
           
    
        var loadData = function (queryResults) {
            $('#orderChartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('orderPieChart', bizHomeEmpty.emptyChartConfig.emptyChart);
            if (undefined !== queryResults) {
                business_home_order_chartrenderer(queryResults, oldJob);
            }
        };
        var setnodata = setInterval(function () {
            if (!isdone) {
                $('#orderChartPreloader').hide();
                refreshDateTime();
                Highcharts.chart('orderPieChart', bizHomeEmpty.emptyChartConfig.emptyChart);
            } else {
                clearInterval(setnodata);
            }
        }, 6000);
        data1.then(loadData);
    });
    }

    function business_home_unbilled_revenue_chart() {
        var revSearchData = getOnlySearchResultsConstructor11(getQuery("bizHomeQuery", "biz_rev_chart", country, "", "", serviceType), "5m", "business_home_unbilled_revenue_chart");
        revSearchData.on('search:done', function () {
            var revSearchDataResults = revSearchData.data("results");
            var isdone = false;
            var data1 = new Promise((resolve, reject) => {
            revSearchDataResults.on("data", function (queryResults) {
                if (undefined != queryResults.data()) {
                    isdone = true;
                   resolve(queryResults.data());
                }
            });
        });
         
       
        var loadData = function (queryResults) {
            $('#revchartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('revenueChart', bizHomeEmpty.emptyChartConfig.emptyChart);
            if (undefined !== queryResults) {
                business_home_unbilled_revenue_chartrenderer(queryResults, false);
            }
        };
        var setnodata = setInterval(function () {
            if (!isdone) {
                $('#revchartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('revenueChart', bizHomeEmpty.emptyChartConfig.emptyChart);
            } else {
                clearInterval(setnodata);
            }
        }, 6000);
        data1.then(loadData);
    });
    }
    function business_home_subscriber_banner() {
        var subBannerSearchData = getOnlySearchResultsConstructor11(getQuery("bizHomeQuery", "biz_sub_banner", country, "", "", serviceType), "5m", "business_home_subscriber_banner");
        subBannerSearchData.on('search:done', function () {
            var subBannerSearchResults = subBannerSearchData.data("results");
            subBannerSearchResults.on("data", function (subResults) {
                if (undefined != subResults.data()) {
                    business_home_subscriber_bannerrenderer(subResults.data(), false);

                }
            });
            resetBannerNotation("#subbanner_notation", false, "", "#subbanner", "#bizPostpaidSubBannerUnits");
            $('#subBannerTooltip').attr("data-original-title", getBannerHelpText("bizHomeHelp", "subBannerHelp"));
        })
    }

    function business_home_unbilled_revenue_banner() {
        var revBannerSearchData = getOnlySearchResultsConstructor11(getQuery("bizHomeQuery", "biz_rev_banner", country, "", "", serviceType), "5m", "business_home_unbilled_revenue_banner");
        revBannerSearchData.on('search:done', function () {
            var revBannerSearchResults = revBannerSearchData.data("results");
            revBannerSearchResults.on("data", function (revBillResults) {
                if (undefined != revBillResults.data()) {
                    business_home_unbilled_revenue_bannerrenderer(revBillResults.data(), false);

                }
            });
            resetBannerNotation("#rev_billbanner_notation", false, "", "#rev_billbanner", "#bizPostpaidRevBannerUnits");
            $('#revBannerTooltip').attr("data-original-title", getBannerHelpText("bizHomeHelp", "revBannerHelp"));
        })
    }

    function business_home_order_banner() {
        var orderBannerSearch = getOnlySearchResultsConstructor11(getQuery("bizHomeQuery", "biz_order_banner", country, "", "", serviceType), "5m", "business_home_order_banner");
        orderBannerSearch.on('search:done', function () {
            var orderBannerSearchResults = orderBannerSearch.data("results");
            orderBannerSearchResults.on("data", function (orderResults) {
                if (undefined != orderResults.data()) {
                    business_home_order_bannerrenderer(orderResults.data(), false);

                }
            });
            resetBannerNotation("#orderbanner_notation", false, "", "#orderbanner", "#bizPostpaidOrderBannerUnits");
            $('#orderBannerTooltip').attr("data-original-title", getBannerHelpText("bizHomeHelp", "orderBannerHelp"));
        })
    }

    function business_home_incident_banner() {
        var incBannerSearchData = getOnlySearchResultsConstructor11(getQuery("bizHomeQuery", "biz_inc_banner", country, "", "", serviceType), "5m", "business_home_incident_banner");
        incBannerSearchData.on('search:done', function () {
            var incBannerSearchResults = incBannerSearchData.data("results");
            incBannerSearchResults.on("data", function (incResults) {
                if (undefined != incResults.data()) {
                    business_home_incident_bannerrenderer(incResults.data(), false);

                }
            });
            resetBannerNotation("#incidentbanner_notation", false, "", "#incidentbanner", "#bizPostpaidIncBannerUnits");
            $('#incBannerTooltip').attr("data-original-title", getBannerHelpText("bizHomeHelp", "incidentBannerHelp"));
        })
    }


   

    function getOnlySearchResultsConstructor11(query, interval, label) {
        var searchmanager = new SearchManager({
            "cancelOnUnload": true,
            "refresh": "5m",
            "refreshType": "delay",
            "sample_ratio": 1,
            "earliest_time": "0",
            "status_buckets": 0,
            "search": query,
            "app": utils.getCurrentApp(),
            "auto_cancel": 90,
            "preview": true,
            "tokenDependencies": {},
            "runWhenTimeIsUndefined": false,
            "cache": true,
            "label": label,
        }, {
            tokens: true,
            tokenNamespace: "submitted"
        })
        return searchmanager
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
           