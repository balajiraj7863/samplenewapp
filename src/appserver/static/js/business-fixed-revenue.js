var newOrderChrunChart = "";
var servicewiseChart = "";
var countryChart = "";
var planwiseChart = "";
var subClassificationChart = "";
var lbcServiceWiseSearch
var lbcPlanWiseSearch
var lbcCntryWiseSearch
var lbcSubClassSearch
var filterDate = "lastSixBillCycle";
var lbcDate="-";

servicewiseChart = Highcharts.chart('serviceVoice',
    bizFixedRev.lastSixBillCycle.servicewise);
countryChart = Highcharts.chart('countryRevenue',
    bizFixedRev.lastSixBillCycle.countrywise);
planwiseChart = Highcharts.chart('revenuebyPlans',
    bizFixedRev.lastSixBillCycle.planwise);
subClassificationChart = Highcharts.chart('subClassificationChart',
    bizFixedRev.lastSixBillCycle.subClassification);
newOrderChrunChart = Highcharts.chart('revenuesDrilldown',
    bizFixedRev.lastSixBillCycle.newOrderChrun);



// Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("button[type='button']").attr("disabled", true);
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
        var service = mvc.createService({
            owner: "nobody"
        });


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

        /* Country Wise Filtering */
        // TO SELECT COUNTRY
        var oldCountryList = "";
        var country = "";

        // TO SET DEFAULT DATE VALUE FOR SEARCH	
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var serviceType = "Fixed";

        if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
            if (localStorage.getItem("globalUserServiceTypeList").indexOf("business-fixed") > -1) {
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
            var revBannerSearchData = getOnlySearchResultsConstructor("revBannerSearchData", "24h");
            revBannerSearchData.settings.unset("search");
            revBannerSearchData.settings.set("search", getQuery("bizPostpaidQuery", "biz_postpaid_rev_banner", country, "", "", serviceType));

            revBannerSearchData.startSearch();
            revBannerSearchData.on('search:done', function () {
                var revBannerSearchResults = revBannerSearchData.data("results");
                revBannerSearchResults.on("data", function (dataval) {
                    if (undefined !== dataval.data()) {
                        var finalDataJson = convertResultToJSON(dataval.data());
                        var finaldata = finalDataJson.data;
                        lbcDate = finaldata[0].txndate;

                        getRevenueHelpText(mapKey, "newOrderChrunHelp", lbcDate);
                        getRevenueHelpText(mapKey, "servicewiseHelp", lbcDate);
                        getRevenueHelpText(mapKey, "countryHelp", lbcDate);
                        getRevenueHelpText(mapKey, "planwiseHelp", lbcDate);
                        getRevenueHelpText(mapKey, "subClassificationHelp", lbcDate);
                    }
                });
            });
        }
        

        $('#lastBillCycle').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            $("input[type='text']").val('');
            loadChart("lastBillCycle");
            // update the HelpTextIcon
            updateHelpText('bizFixedRevHelpLastBC');
        });

        $('#lastSixBillCycle').click(function () {
            $("#toggleRevAll").prop("checked", true);
            highchartsInitialize();
            highchartsDestroy();           
            $("input[type='text']").val('');
            loadChart("lastSixBillCycle");
            // update the HelpTextIcon
            updateHelpText('bizFixedRevHelpLastSixBC');
        });

        $('#lastSixMonths').click(function () {
            $("#toggleRevAll").prop("checked", true);
            highchartsInitialize();
            highchartsDestroy();            
            $("input[type='text']").val('');
            loadChart("lastSixMnthBillCycle");
            // update the HelpTextIcon
            updateHelpText('bizPostRevHelpLastSixM');
        });

        $('#customMonths').click(function () {
            $("#toggleRevAll").prop("checked", true);            
            $("input[type='text']").val('');
            highchartsInitialize();
            highchartsDestroy();
            loadChart("lastSixMnthBillCycle");
            $(".datePicker").css('background', '#fff');
            $("#fromMonth.datePicker").css('background', '#fff');
            // update the HelpTextIcon
            updateHelpText('bizPostRevCustomDate');
        });
        $('#searchBtn').click(function () {
            if (undefined !== $("#fromMonth").val() && undefined !== $("#toMonth").val() && '' !== $("#fromMonth").val() && '' !== $("#toMonth").val()) {
                $("#toggleRevAll").prop("checked", true);
                highchartsInitialize();
                highchartsDestroy();
                loadChart("customDate");
                $(".datePicker").css('background', '#fff');
                disableCustomDatePicker(false, 'fromMonth', 'toMonth');
                $("#toMonth.datePicker").css('background', '#eee');    
                clearDatePicker('fromMonth', 'toMonth', '-180d', '-today', '-180d', 'today');
                // update the HelpTextIcon
                updateHelpText('bizPostRevCustomDate');
            } else {
                emptyDateValidation('fromMonth', 'toMonth');
            }

        });
        $('#lastSixBillCycle').trigger("click");
        $(".filterDiv label").click(function () {
            return ("customMonths" === this.id) ? disableCustomDatePicker(false, 'fromMonth', 'toMonth') : disableCustomDatePicker(true, 'fromMonth', 'toMonth', true);
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
            var queryMapKey = "bizPostDrillRevQuery";
            getResultsAndExport(queryMapKey, "revenueServiceFixedVoiceBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueServiceFixedSmsBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueServiceFixedDataBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueCountryBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenuePlansBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueSubClassBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueOrderBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueChurnBusinessData", country, fromDate, toDate);
		      	getResultsAndExport(queryMapKey, "revenuePaymentBusinessData", country, fromDate, toDate);
			      getResultsAndExport(queryMapKey, "revenuepaymentByChannelBusinessData", country, fromDate, toDate);
            return false;
        }

        function loadChart(chartType) {
            var serviceQuery = "";
            var cntryQuery = "";
            var planQuery = "";
            var subQuery = "";
            var orderQuery = "";
            var fromDateStr = $("#fromMonth").val();
            var toDateStr = $("#toMonth").val();
            var fromDate = "";
            var toDate = "";
            $(".datePicker").css('border', '1px solid #ccc');
            $(".datePicker").css('background', '#eee');
            getHelpText("exportExcelData", "exportExcelMonthHelp");
            if ("lastBillCycle" === chartType) {
                serviceQuery = "biz_rev_fixed_service_last_bill_cycle";
                cntryQuery = "biz_rev_fixed_country_last_bill_cycle";
                planQuery = "biz_rev_post_plans_last_bill_cycle";
                subQuery = "biz_rev_post_subclass_last_bill_cycle";
                orderQuery = "biz_rev_post_order";
            } else if ("lastSixBillCycle" === chartType) {
                cntryQuery = "biz_rev_fixed_country_last_six_bill_cycle";
                planQuery = "biz_rev_post_plans_last_six_bill_cycle";
                subQuery = "biz_rev_post_subclass_last_six_bill_cycle";
                serviceQuery = "biz_rev_fixed_service_last_six_bill_cycle";
                orderQuery = "biz_rev_post_order_last_six_bill_cycle";
            } else if ("lastSixMnthBillCycle" === chartType) {
                serviceQuery = "biz_rev_fixed_service_last_six_mnth_bill_cycle";
                cntryQuery = "biz_rev_fixed_country_last_six_mnth_bill_cycle";
                planQuery = "biz_rev_post_plans_last_six_mnth_bill_cycle";
                subQuery = "biz_rev_post_subclass_last_six_mnth_bill_cycle";
                orderQuery = "biz_rev_post_order_last_six_mnth_bill_cycle";
            } else if ("customDate" === chartType) {
                serviceQuery = "biz_rev_fixed_service_voice_custdt";
                cntryQuery = "biz_rev_fixed_country_custdt";
                planQuery = "biz_rev_post_plans_custdt";
                subQuery = "biz_rev_post_subclass_custdt";
                orderQuery = "biz_rev_post_order_custdt";
            }

            // initialize search manager instance
            var plansSearchData = getOnlySearchResultsConstructor("plansChartPreloader", "24h");
            var subsClassifySearchData = getOnlySearchResultsConstructor("subClassificationChartPreloader", "24h");
            var countryWiseSearchData = getOnlySearchResultsConstructor("countryWiseChartPreloader", "24h");
            var newOrderChurnSearchData = getOnlySearchResultsConstructor("revChartPreloader", "24h");
            loadServiceChart(serviceQuery, "billedRevenue", chartType, "");


            /* Country wise search - start */
            countryWiseSearchData.settings.unset("search");
            if ("" !== fromDateStr && "" !== toDateStr) {
                fromDate = getFirstDate(fromDateStr);
                toDate = getLastDate(toDateStr);
                countryWiseSearchData.settings.set("search", getQuery("bizPostDrillRevQuery", cntryQuery, country, fromDate, toDate, serviceType));
            } else {
                countryWiseSearchData.settings.set("search", getQuery("bizPostDrillRevQuery", cntryQuery, country, "", "", serviceType));
            }
            countryWiseSearchData.startSearch();
            $('#countryRevenue')
                .html(
                    '<div id="countryWiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-5x fa-gradient"></i></div>');
            $('#countryWiseChartPreloader').show();
            countryWiseSearchData.on('search:done', function (properties) {
                var cntryWiseResults = countryWiseSearchData.data("results");
                var isNoData = true;
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
                $('#countryWiseChartPreloader').hide();
                refreshDateTime();
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('countryRevenue', bizFixedRevEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);

            });
            /* Country wise search - end */
            /* Plan wise search - start */

            plansSearchData.settings.unset("search");
            if ("" !== fromDateStr && "" !== toDateStr) {
                fromDate = getFirstDate(fromDateStr);
                toDate = getLastDate(toDateStr);
                plansSearchData.settings.set("search", getQuery("bizPostDrillRevQuery", planQuery, country, fromDate, toDate, serviceType));

            } else {
                plansSearchData.settings.set("search", getQuery("bizPostDrillRevQuery", planQuery, country, "", "", serviceType));
            }
            plansSearchData.startSearch();
            $('#revenuebyPlans')
                .html(
                    '<div id="plansChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-5x fa-gradient"></i></div>');
            $('#plansChartPreloader').show();
            plansSearchData.on('search:done', function (properties) {
                var planeWiseResults = plansSearchData.data("results");
                var isNoData = true;
                planeWiseResults.on("data", function () {
                    if (undefined !== planeWiseResults.data()) {
                        var rows = planeWiseResults.data().rows;
                        if (null !== rows) {
                            var finalDataJson = convertResultToJSON(planeWiseResults.data());
                            loadPlanChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }
                });

                refreshDateTime();
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('revenuebyPlans',
                                bizFixedRevEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);

            });

            /* Plan wise search - end */

            /* Subscriber classification search - start */
            subsClassifySearchData.settings.unset("search");
            if ("" !== fromDateStr && "" !== toDateStr) {
                fromDate = getFirstDate(fromDateStr);
                toDate = getLastDate(toDateStr);
                subsClassifySearchData.settings.set("search", getQuery("bizPostDrillRevQuery", subQuery, country, fromDate, toDate, serviceType));

            } else {
                subsClassifySearchData.settings.set("search", getQuery("bizPostDrillRevQuery", subQuery, country, "", "", serviceType));
            }
            subsClassifySearchData.startSearch();
            $('#subClassificationChart')
                .html(
                    '<div id="subClassificationChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-5x fa-gradient"></i></div>');
            $('#subClassificationChartPreloader').show();
            subsClassifySearchData.on('search:done', function (properties) {
                var subClassResults = subsClassifySearchData.data("results");
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
                refreshDateTime();
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('subClassificationChart',bizFixedRevEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);

            });
            /* Subscriber classification search - end */

            /* New order & revenue churn search - start */
            newOrderChurnSearchData.settings.unset("search");
            if ("" !== fromDateStr && "" !== toDateStr) {
                fromDate = getFirstDate(fromDateStr);
                toDate = getLastDate(toDateStr);
                newOrderChurnSearchData.settings.set("search", getQuery("bizPostDrillRevQuery", orderQuery, country, fromDate, toDate, serviceType));

            } else {
                newOrderChurnSearchData.settings.set("search", getQuery("bizPostDrillRevQuery", orderQuery, country, "", "", serviceType));
            }
            newOrderChurnSearchData.startSearch();
            $('#revenuesDrilldown').html('<div id="revChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-5x fa-gradient"></i></div>');
            $('#revChartPreloader').show();

            newOrderChurnSearchData.on('search:done', function () {
                var newOrderChurnSearchResults = newOrderChurnSearchData.data("results");
                var isNoData = true;
                newOrderChurnSearchResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        Highcharts.chart('revenuesDrilldown', bizFixedRevEmpty.emptyChartConfig.emptyChart);
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        if ("lastBillCycle" === chartType) {
                            var processResults = churnlastbillCycleProcessor(finalDataJson.data, "date", "new_orders", "revenue_churn");
                            bizFixedRev.lastBillCycle.newOrderChrun.series[0].data[0].y = processResults.newOrders;
                            bizFixedRev.lastBillCycle.newOrderChrun.series[0].data[1].y = processResults.revChurn;
                            Highcharts.chart('revenuesDrilldown', bizFixedRev.lastBillCycle.newOrderChrun);
                        } else {
                            if ("lastSixBillCycle" === chartType) {
                                newOrderChrunChart = Highcharts.chart('revenuesDrilldown', bizFixedRev.lastSixBillCycle.newOrderChrun);
                            } else if ("lastSixMnthBillCycle" === chartType || "customDate" === chartType) {
                                newOrderChrunChart = Highcharts.chart('revenuesDrilldown', bizFixedRev.lastSixMonths.newOrderChrun);
                            }
                            var mnpChartData = columnChartProcessor(finalDataJson.data, "date", "date", "new_orders", "revenue_churn");
                            newOrderChrunChart.addSeries({
                                name: "New Orders",
                                data: mnpChartData.portin,
                                stack: ("lastSixMnthBillCycle" === chartType || "customDate" === chartType) ? "male" : "normal"
                            });
                            newOrderChrunChart.addSeries({
                                name: "Revenue Churn",
                                data: mnpChartData.portout,
                                stack: ("lastSixMnthBillCycle" === chartType || "customDate" === chartType) ? "female" : "normal"
                            });
                            newOrderChrunChart.xAxis[0].setCategories(mnpChartData.x_axis);
                        }
                        isNoData = false;
                    }
                });
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('revenuesDrilldown', bizFixedRevEmpty.emptyChartConfig.emptyChart);
                    }
                }, 3000);
                $('#revChartPreloader').hide();
            });
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
                        var rows = searchResults.data().rows;
                        if ( null !== rows) {
                            exportResultToCsv(searchResults.data().rows, searchResults.data().fields, planQuery, true);
                        }
                    }
                });
            });
            return searchmanager;
        }

        function getOnlySearchResultsConstructor(id,interval) {
            var searchmanager = new SearchManager({
                preview: true,
                "refresh": "0",
                "refreshType": "delay",
                cache: true,
                status_buckets: 300,
                "search": ""
            }, {
                tokens: true,
                tokenNamespace: "submitted"
            });

            return searchmanager;
        }

        function loadCountryChart(chartType, rows) {
            Highcharts.chart('countryRevenue',
                bizFixedRevEmpty.emptyChartConfig.emptyChart);
            if ("lastBillCycle" === chartType) {
                countryChart = Highcharts.chart('countryRevenue', bizFixedRev.lastBillCycle.countrywise);
                setPieData(rows, countryChart, "country", "revenue");
                return;
            } else if ("lastSixBillCycle" === chartType) {
                //countryChart = Highcharts.chart('countryRevenue', bizFixedRev.lastSixBillCycle.countrywise);
                // setStackBarChartData(rows, countryChart);
                countryChart = bizFixedRev.lastSixBillCycle.countrywise;
                basicLineDataProcessor(rows, countryChart, 'countryRevenue', "txndate", "country", "countrywiserevenue");
                return;
            } else if ("lastSixMnthBillCycle" === chartType) {
                countryChart = bizFixedRev.lastSixMonths.countrywise;
                basicLineDataProcessor(rows, countryChart, 'countryRevenue', "txndate", "country", "countrywiserevenue");
                return;
            } else if ("customDate" === chartType) {
                countryChart = bizFixedRev.customDate.countrywise;
                basicLineDataProcessor(rows, countryChart, 'countryRevenue', "txndate", "country", "countrywiserevenue");
                return;
            }
        }

        function loadPlanChart(chartType, rows) {
            Highcharts.chart('revenuebyPlans', bizFixedRevEmpty.emptyChartConfig.emptyChart);
            if ("lastBillCycle" === chartType) {
                var othersdata = processOthersData(getPieChart(rows, "plandesc", "revenue"));
                bizFixedRev.lastBillCycle.planwise.series[0].data = othersdata;
                Highcharts.chart('revenuebyPlans', bizFixedRev.lastBillCycle.planwise);
                return;
            } else if("lastSixBillCycle" === chartType) {
                //processStackBar(rows, bizFixedRev.lastSixBillCycle.planwise, 'revenuebyPlans');
                processStackBarData(rows,bizFixedRev.lastSixBillCycle.planwise,revenuebyPlans,"", "date","plandesc","revenue");
                return;
            }
            else {
                //processStackBar(rows, bizFixedRev.lastSixBillCycle.planwise, 'revenuebyPlans');
                processStackBarData(rows,bizFixedRev.lastSixMonths.planwise,revenuebyPlans,"", "txndate","plandesc","revenue");
                return;
            }
        }

        function loadSubClassChart(chartType, rows) {
            Highcharts.chart('subClassificationChart', bizFixedRevEmpty.emptyChartConfig.emptyChart);
            var chartConfig = "";
            if ("lastBillCycle" === chartType) {
                chartConfig = bizFixedRev.lastBillCycle.subClassification;
            } else if ("lastSixBillCycle" === chartType) {
                chartConfig = bizFixedRev.lastSixBillCycle.subClassification;
            } else if ("lastSixMnthBillCycle" === chartType) {
                chartConfig = bizFixedRev.lastSixMonths.subClassification;
            } else if ("customDate" === chartType) {
                chartConfig = bizFixedRev.customDate.subClassification;
            }
            subClassificationChart = Highcharts.chart('subClassificationChart', chartConfig);
            setPieData(rows, subClassificationChart, "subclassification", "revenue");
        }

        
        function loadServiceChart(query, type, chartType, category) {
            var serviceWiseSearchData = new SearchManager({
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

            var fromDateStr = $("#fromMonth").val();
            var toDateStr = $("#toMonth").val();

            serviceWiseSearchData.settings.unset("search");
            if ("" !== fromDateStr && "" !== toDateStr) {
                fromDate = getFirstDate(fromDateStr);
                toDate = getLastDate(toDateStr);
                serviceWiseSearchData.settings.set("search", getQuery("bizPostDrillRevQuery", query, country, fromDate, toDate, serviceType));

            } else {
                serviceWiseSearchData.settings.set("search", getQuery("bizPostDrillRevQuery", query, country, "", "", serviceType));
            }
            serviceWiseSearchData.startSearch();
            $('#serviceVoice')
                .html(
                    '<div id="serviceChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-5x fa-gradient"></i></div>');
            $('#serviceChartPreloader').show();

            serviceWiseSearchData.on('search:done', function (properties) {
                var serviceWiseResults = serviceWiseSearchData.data("results");
                var isNoData = true;
                serviceWiseResults.on("data", function () {
                    if (undefined != serviceWiseResults.data()) {
                        if (chartType === "lastBillCycle") {
                            var finalDataJson = convertResultToJSON(serviceWiseResults.data());
                            var processResults = servicelastbillCycleFixedData(finalDataJson.data, "category", "totalrevenue");
                            
                            bizFixedRev.lastBillCycle.servicewiseVoice.series[0].data[0].y = processResults.Telephone;
                            bizFixedRev.lastBillCycle.servicewiseVoice.series[0].data[1].y = processResults.Broadband;
                            bizFixedRev.lastBillCycle.servicewiseVoice.series[0].data[2].y = processResults.IPTV;
                            Highcharts.chart('serviceVoice', bizFixedRevEmpty.emptyChartConfig.emptyChart);
                            Highcharts.chart('serviceVoice', bizFixedRev.lastBillCycle.servicewiseVoice);
                            
                        } else if ("lastSixBillCycle" === chartType) {
                            Highcharts.chart('serviceVoice', bizFixedRevEmpty.emptyChartConfig.emptyChart);
                            var finalDataJson = convertResultToJSON(serviceWiseResults.data());
                            processServiceStackBarData(finalDataJson.data, bizFixedRev.lastSixBillCycle.servicewise, serviceVoice, "", "date", "category", "totalrevenue");
                        } else {
                            Highcharts.chart('serviceVoice', bizFixedRevEmpty.emptyChartConfig.emptyChart);
                            var finalDataJson = convertResultToJSON(serviceWiseResults.data());
                            processServiceStackBarData(finalDataJson.data, bizFixedRev.lastSixMonths.servicewise, serviceVoice, "", "date", "category", "totalrevenue");
                        }
                    }
                    isNoData = false;
                });
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('serviceVoice', bizFixedRevEmpty.emptyChartConfig.emptyChart);
                    }
                }, 3000);
                $('#serviceChartPreloader').hide();
            });
        }

        $('input[name=datePreset]').parent().on('click', function () {
            filterDate = $(this).children().val();
        });

        $('#toggleRevAll')
            .click(
                function () {
                    $('#serviceChartPreloader').show();
                    var query = "";
                    if ("lastBillCycle" === filterDate) {
                        query = "biz_rev_fixed_service_all_last_bill_cycle";
                    } else if ("lastSixBillCycle" === filterDate) {
                        query = "biz_rev_fixed_service_all_last_six_bill_cycle";
                    } else if ("lastSixMonths" === filterDate) {
                        query = "biz_rev_fixed_service_all_last_six_mnth_bill_cycle";
                    } else if ("customMonths"=== filterDate) {
                        var fromDate = $("#fromMonth").val();
                        var toDate = $("#toMonth").val();
                        if ("" !== fromDate  &&  "" !== toDate) {
                            query = "biz_rev_fixed_service_all_custdt";
                        } else {
                            query = "biz_rev_fixed_service_all_last_six_mnth_bill_cycle";
                        }

                    }
                    loadServiceChart(query, "billedRevenue",
                        filterDate, "");

                });
        $('#toggleRevVoice')
            .click(
                function () {
                    $('#serviceChartPreloader').show();
                    var query = "";
                    if ("lastBillCycle" === filterDate) {
                        query = "biz_rev_fixed_service_voice_last_bill_cycle";
                    } else if ("lastSixBillCycle" === filterDate) {
                        query = "biz_rev_fixed_service_voice_last_six_bill_cycle";
                    } else if ("lastSixMonths" === filterDate) {
                        query = "biz_rev_fixed_service_voice_last_six_mnth_bill_cycle";
                    } else if ("customMonths"=== filterDate) {
                        var fromDate = $("#fromMonth").val();
                        var toDate = $("#toMonth").val();
                        if ("" !== fromDate  &&  "" !== toDate) {
                            query = "biz_rev_fixed_service_voice_custdt";
                        } else {
                            query = "biz_rev_fixed_service_voice_last_six_mnth_bill_cycle";
                        }

                    }
                    loadServiceChart(query, "billedRevenue",
                        filterDate, "");

                });

        $('#toggleRevSms')
            .click(
                function () {
                    $('#serviceChartPreloader').show();
                    var query = "";
                    if ("lastBillCycle" === filterDate) {
                        query = "biz_rev_fixed_service_sms_last_bill_cycle";
                    } else if ("lastSixBillCycle" === filterDate) {
                        query = "biz_rev_fixed_service_sms_last_six_bill_cycle";
                    } else if ("lastSixMonths" === filterDate) {
                        query = "biz_rev_fixed_service_sms_last_six_mnth_bill_cycle";
                    } else if ("customMonths" === filterDate) {
                        var fromDate = $("#fromMonth").val();
                        var toDate = $("#toMonth").val();
                        if ("" !== fromDate  &&  "" !== toDate) {
                            query = "biz_rev_fixed_service_sms_custdt";
                        } else {
                            query = "biz_rev_fixed_service_sms_last_six_mnth_bill_cycle";
                        }
                    }
                    loadServiceChart(query, "billedRevenue",
                        filterDate, "");

                });

        $('#toggleRevData')
            .click(
                function () {
                    $('#serviceChartPreloader').show();
                    var query = "";
                    if ("lastBillCycle" === filterDate) {
                        query = "biz_rev_fixed_service_data_last_bill_cycle";
                    } else if ("lastSixBillCycle" === filterDate) {
                        query = "biz_rev_fixed_service_data_last_six_bill_cycle";
                    } else if ("lastSixMonths" === filterDate) {
                        query = "biz_rev_fixed_service_data_last_six_mnth_bill_cycle";
                    } else if ("customMonths" === filterDate) {
                        var fromDate = $("#fromMonth").val();
                        var toDate = $("#toMonth").val();
                        if ("" !== fromDate  &&  "" !== toDate) {
                            query = "biz_rev_fixed_service_data_custdt";
                        } else {
                            query = "biz_rev_fixed_service_data_last_six_mnth_bill_cycle";
                        }
                    }
                    loadServiceChart(query, "billedRevenueData",
                        filterDate, "toggleRevData");

                });
        //  custom changes for splunk js ends here,

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

function highchartsInitialize(chartType) {
    newOrderChrunChart = Highcharts.chart('revenuesDrilldown',
        bizFixedRevEmpty.emptyChartConfig.emptyChart);
    servicewiseChart = Highcharts.chart('serviceVoice',
        bizFixedRev.lastBillCycle.servicewise);
    countryChart = Highcharts.chart('countryRevenue',
        bizFixedRev.lastBillCycle.countrywise);
    planwiseChart = Highcharts.chart('revenuebyPlans',
        bizFixedRev.lastBillCycle.planwise);
    subClassificationChart = Highcharts.chart('subClassificationChart',
        bizFixedRev.lastBillCycle.subClassification);
}

function highchartsDestroy() {
    newOrderChrunChart.destroy();
    servicewiseChart.destroy();
    countryChart.destroy();
    planwiseChart.destroy();
    subClassificationChart.destroy();
}
