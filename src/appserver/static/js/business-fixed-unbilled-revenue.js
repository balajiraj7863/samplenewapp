var countryWiseSearchData;
var plansSearchData;
var subsClassifySearchData;
var volWiseSearchData;
var serviceWiseSearchData;
var oldCountryList, country;
var filterDate = "daily";
var revServicewiseChart = Highcharts.chart('serviceVoice',
    bizFixedUnbillRev.daily.revService);
var volServiceswiseChart = Highcharts.chart('volumeByServices',
    bizFixedUnbillRev.daily.volUsageService);
var countrywiseChart = Highcharts.chart('countryRevenue',
    bizFixedUnbillRev.daily.countrywise);
var planwiseChart = Highcharts.chart('revenuebyPlans',
    bizFixedUnbillRev.daily.planwise);
var subClassificationChart = Highcharts.chart('subClassificationChart',
    bizFixedUnbillRev.daily.subClassification);
$("input[type='text']").attr("disabled", true);
$("button[type='button']").attr("disabled", true);


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
    function(
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

        urlTokenModel.on('url:navigate', function() {
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

         // Load individual components
        var SearchManager = require("splunkjs/mvc/searchmanager");
        var utils = require("splunkjs/mvc/utils");

        var pageLoading = true;
        updateHelpText('bizFixedunbillRevDaily');

        function updateHelpText(mapKey) {
            getHelpText(mapKey, "revServicewiseHelp");
            getHelpText(mapKey, "volServiceswiseHelp");
            getHelpText(mapKey, "countrywiseHelp");
            getHelpText(mapKey, "planwiseHelp");
            getHelpText(mapKey, "subClassificationHelp");
        }

        /* Country Wise Filtering */
        // TO SET DEFAULT DATE VALUE FOR SEARCH	
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var isExportData = false;
        var serviceType="Fixed";
         //TO SELECT COUNTRY 
    var oldCountryList = "";
    var country = "";
  
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

        /** *date preset start* */



        /** date preset end* */

        /*
         * $("#unbillSearchBtn").click(function() {
         * search2.settings.unset("search"); fromDate =
         * $("#fromDate").val(); toDate = $("#toDate").val();
         * search2.settings.set("search", getQuery("unbilled_service",
         * country, fromDate, toDate)); search2.startSearch();
         * 
         * });
         */

        $('#prevDay').click(function() {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            highchartsInitialize();
            highchartsDestroy();
            $("input[type='text']").val('');
            loadChart("previousDay");
            // update the HelpTextIcon
            updateHelpText('bizFixedunbillRevPrevDay');
        });

        $('#daily').click(function() {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            $("#option1").prop("checked", true);
            $("input[type='text']").val('');
            // Plot the new charts
            highchartsInitialize();
            highchartsDestroy();
            loadChart("daily");
            // update the HelpTextIcon
            updateHelpText('bizFixedunbillRevDaily');
        });

        $('#weekly').click(function() {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            $("#option1").prop("checked", true);
            $("input[type='text']").val('');
            // Plot the new charts
            highchartsInitialize();
            highchartsDestroy();
            loadChart("weekly");
            // update the HelpTextIcon
            updateHelpText('bizFixedunbillRevWeekly');
        });

        $('#monthly').click(function() {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            $("#option1").prop("checked", true);
            $("input[type='text']").val('');
            // Plot the new charts
            highchartsInitialize();
            highchartsDestroy();
            loadChart("monthly");
            // update the HelpTextIcon
            updateHelpText('bizFixedunbillRevMonthly');
        });

        $('#customDate').click(function() {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            $("#option1").prop("checked", true);
            loadChart("daily");
            $(".datePicker").css('background', '#fff');
            $("#fromDate.datePicker").css('background', '#fff');
            // update the HelpTextIcon
            updateHelpText('bizFixedunbillRevCustomDate');
        });

        $('#searchBtn').click(function() {
            if (undefined !== $("#fromDate").val() && undefined !== $("#toDate").val() && '' !== $("#fromDate").val() && '' !== $("#toDate").val()) {
                highchartsInitialize();
                highchartsDestroy();
                loadChart("customDate");
                $(".datePicker").css('background', '#fff');
                disableCustomDatePicker(false, 'fromDate', 'toDate');
                $("#toDate.datePicker").css('background', '#eee');    
                clearDatePicker('fromDate', 'toDate', '-180d', '-1d', '-180d', '-1d');
                // update the HelpTextIcon
                updateHelpText('bizPostunbillRevCustomDate');
            } else {
                emptyDateValidation('fromDate', 'toDate');
            }

        });
        $('#daily').trigger("click");
        $(".filterDiv label").click(function () {
            return ("customDate" === this.id) ? disableCustomDatePicker(false, 'fromDate', 'toDate') : disableCustomDatePicker(true, 'fromDate', 'toDate', true);
        });


        $('#downloadExportData').click(function() {
            $("#exportTableModal").modal("show");
            $("#modalInfoText").text(getBannerHelpText("exportExcelData", "modalInfoText"));
            $(".datePicker").css('background', '#eee');
            downloadChartData();
            setTimeout(function() {
                $('#exportTableModal').modal('hide');
            }, 2500);
        });

        function downloadChartData() {
            fromDate = getExportDateSetter(180);
            toDate = getExportDateSetter(0);
            var queryMapKey = "bizPostDrillRevUnbillQuery";
            getResultsAndExport(queryMapKey, "revenueUnbillServiceAllBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillServiceVoiceBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillServiceSmsBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillServiceDataBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillVolVoiceBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillVolSmsBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillVolDataBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillCountryBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillPlansBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueUnbillSubsBusinessData", country, fromDate, toDate);
            return false;
        }

        function loadChart(chartType) {
            var serviceQuery = "";
            var volQuery = "";
            var cntryQuery = "";
            var planQuery = "";
            var subQuery = "";
            fromDate = $("#fromDate").val();
            toDate = $("#toDate").val();
            $(".datePicker").css('border', '1px solid #ccc');
            $(".datePicker").css('background', '#eee');
            getHelpText("exportExcelData", "exportExcelDateHelp");

            if ("previousDay" === chartType) {
                serviceQuery = "biz_rev_fixed_unbill_service";
                cntryQuery = "biz_rev_fixed_unbill_country";
                planQuery = "biz_rev_post_unbill_plans";
                subQuery = "biz_rev_post_unbill_subs";
                volQuery = "biz_rev_fixed_unbill_volume";
            } else if ("daily" === chartType) {
                serviceQuery = "biz_rev_fixed_unbill_service_daily";
                cntryQuery = "biz_rev_fixed_unbill_country_daily";
                planQuery = "biz_rev_post_unbill_plans_daily";
                subQuery = "biz_rev_post_unbill_subs_daily";
                volQuery = "biz_rev_fixed_unbill_vol_daily";
            } else if ("weekly" === chartType) {
                serviceQuery = "biz_rev_fixed_unbill_service_wkly";
                cntryQuery = "biz_rev_fixed_unbill_country_wkly";
                planQuery = "biz_rev_post_unbill_plans_wkly";
                subQuery = "biz_rev_post_unbill_subs_wkly";
                volQuery = "biz_rev_fixed_unbill_vol_wkly";
            } else if ("monthly" === chartType) {
                serviceQuery = "biz_rev_fixed_unbill_service_mnthly";
                cntryQuery = "biz_rev_fixed_unbill_country_mnthly";
                planQuery = "biz_rev_post_unbill_plans_mnthly";
                subQuery = "biz_rev_post_unbill_subs_mnthly";
                volQuery = "biz_rev_fixed_unbill_vol_mnthly";
            } else if ("customDate" === chartType) {
                serviceQuery = "biz_rev_fixed_unbill_service_cusdt";
                cntryQuery = "biz_rev_fixed_unbill_country_cusdt";
                planQuery = "biz_rev_post_unbill_plans_cusdt";
                subQuery = "biz_rev_post_unbill_subs_cusdt";
                volQuery = "biz_rev_fixed_unbill_vol_cusdt";
            }

            // initialize search manager instance
            plansSearchData = getOnlySearchResultsConstructor("revenuebyPlansPreloader", "24h");
            subsClassifySearchData = getOnlySearchResultsConstructor("subClassificationChartPreloader", "24h");
            countryWiseSearchData = getOnlySearchResultsConstructor("countryRevenuePreloader", "24h");
            // serviceWiseSearchData =
            // getOnlySearchResultsConstructor("serviceWiseChartPreloader");
            volWiseSearchData = getOnlySearchResultsConstructor("volWiseChartPreloader", "24h");
            loadServiceChart(serviceQuery, "unBilledServiceRevenue",
                filterDate, "");

            loadVolumeChart(volQuery, "unBilledServiceVol", filterDate, "");

            /* plan wise search - start */
            plansSearchData.settings.unset("search");

            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                plansSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", planQuery, country,
                    fromDate, toDate,serviceType));

            } else {
                plansSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", planQuery, country,"","",serviceType));
            }
            plansSearchData.startSearch();
            $('#revenuebyPlans')
                .html(
                    '<div id="revenuebyPlansPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#revenuebyPlansPreloader').show();

            plansSearchData
                .on(
                    'search:done',
                    function() {
                        var plansSearchResults = plansSearchData
                            .data("results");
                        var isNoData = true;
                        plansSearchResults.on("data", function(
                            queryResults) {
                            if (undefined != queryResults.data()) {
                                var finalDataJson = convertResultToJSON(queryResults.data());
                                loadPlanChart(chartType, finalDataJson.data);
                                isNoData = false;
                            }
                        });

                        refreshDateTime();
                        setTimeout(
                            function() {
                                if (isNoData) {
                                    Highcharts
                                        .chart(
                                            'revenuebyPlans',
                                            bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                }
                            }, 3000);

                        $('#revenuebyPlansPreloader').hide();
                    });
            /* plan wise search - end */

            /* Subscriber classification wise search - start */
            subsClassifySearchData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                subsClassifySearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", subQuery, country,
                    fromDate, toDate,serviceType));

            } else {
                subsClassifySearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", subQuery, country,"","",serviceType));
            }
            subsClassifySearchData.startSearch();
            $('#subClassificationChart')
                .html(
                    '<div id="subClassificationChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#subClassificationChartPreloader').show();
            subsClassifySearchData
                .on(
                    'search:done',
                    function() {
                        var subsClassifySearchResults = subsClassifySearchData
                            .data("results");
                        var isNoData = true;
                        subsClassifySearchResults
                            .on(
                                "data",
                                function(queryResults) {
                                    if (undefined != queryResults
                                        .data()) {
                                            var finalDataJson = convertResultToJSON(queryResults.data());
                                            loadSubClassChart(chartType, finalDataJson.data);
                                        isNoData = false;
                                    }
                                });
                        $('#subClassificationChartPreloader')
                            .hide();
                        refreshDateTime();
                        setTimeout(
                            function() {
                                if (isNoData) {
                                    Highcharts
                                        .chart(
                                            'subClassificationChart',
                                            bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                }
                            }, 3000);

                    });
            /* Subscriber classification wise search - end */
            /* Country wise search - start */
            countryWiseSearchData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                countryWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", cntryQuery, country,
                    fromDate, toDate,serviceType));

            } else {
                countryWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", cntryQuery, country,"","",serviceType));
            }
            countryWiseSearchData.startSearch();
            $('#countryRevenue')
                .html(
                    '<div id="countryRevenuePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#countryRevenuePreloader').show();

            countryWiseSearchData
                .on(
                    'search:done',
                    function() {
                        var countryWiseSearchResults = countryWiseSearchData
                            .data("results");
                        var isNoData = true;
                        countryWiseSearchResults
                            .on(
                                "data",
                                function(queryResults) {
                                    if (undefined != queryResults
                                        .data()) {
                                            var finalDataJson = convertResultToJSON(queryResults.data());
                                            loadCountryChart(chartType, finalDataJson.data);
                                        isNoData = false;
                                    }
                                });
                        $('#countryRevenuePreloader').hide();
                        refreshDateTime();
                        setTimeout(
                            function() {
                                if (isNoData) {
                                    Highcharts
                                        .chart(
                                            'countryRevenue',
                                            bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                }
                            }, 3000);


                    });
            /* Country wise search - end */
        }

        function getOnlySearchResultsConstructor(id,interval) {
            var searchmanager = new SearchManager({
                // "id" : id,
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
            searchmanager.settings.set("search", getQuery(mapKey, planQuery, country, fromDate, toDate,serviceType));

            searchmanager.startSearch();
            searchmanager.on('search:progress', function(properties) {});

            searchmanager.on('search:done', function(properties) {
                var searchResults = searchmanager.data("results");
                searchResults.on("data", function(queryResults) {
                    if (undefined !== queryResults.data()) {
                        var rows = searchResults.data().rows;
                        if (null !== rows) {
                            exportResultToCsv(searchResults.data().rows, searchResults.data().fields, planQuery, true);
                        }
                    }
                });
            });

            return searchmanager;
        }

        function loadServiceChart(query, type, chartType, category) {
            Highcharts.chart('serviceVoice',
                bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
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
            serviceWiseSearchData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                serviceWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", query, country,
                    fromDate, toDate,serviceType));

            } else {
                serviceWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", query, country,"","",serviceType));
            }
            serviceWiseSearchData.startSearch();
            $('#serviceVoice')
                .html(
                    '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#serviceVoicePreloader').show();

            serviceWiseSearchData
                .on(
                    'search:done',
                    function(properties) {
                        var serviceWiseResults = serviceWiseSearchData
                            .data("results");
                        var isNoData = true;
                        serviceWiseResults
                            .on(
                                "data",
                                function() {

                                    if (undefined != serviceWiseResults
                                        .data()) {
                                        if ("previousDay" === chartType) {
                                            var finalDataJson = convertResultToJSON(serviceWiseResults.data());
                                            var processResults = servicelastbillCycleFixedData(finalDataJson.data, "category", "totalrevenue");
                                            bizFixedUnbillRev.previousDay.servicewiseVoice.series[0].data[0].y = processResults.Telephone;
                                            bizFixedUnbillRev.previousDay.servicewiseVoice.series[0].data[1].y = processResults.Broadband;
                                            bizFixedUnbillRev.previousDay.servicewiseVoice.series[0].data[2].y = processResults.IPTV;
                                            Highcharts
                                                .chart(
                                                'serviceVoice',
                                                bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                            Highcharts
                                                .chart(
                                                'serviceVoice',
                                                bizFixedUnbillRev.previousDay.servicewiseVoice);


                                        } else {
                                            Highcharts.chart('serviceVoice', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                           var finalDataJson = convertResultToJSON(serviceWiseResults.data());
                                           processServiceStackBarData(finalDataJson.data,bizFixedUnbillRev.daily.revService,serviceVoice,"", "date","category","totalrevenue");
                                        }
                                        isNoData = false;
                                    }
                                });
                        refreshDateTime();
                        setTimeout(
                            function() {
                                if (isNoData) {
                                    Highcharts
                                        .chart(
                                            'serviceVoice',
                                            bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                }
                            }, 3000);

                        $('#serviceVoicePreloader').hide();
                    });
        }

        // Loading Highcharts based on the date presets

        $('.customDateDisable').click(function() {
            $("input[type='text']").attr("disabled", true);
            $("button[type='button']").attr("disabled", true);
        });

        $('#toggleRevAll')
            .click(
                function() {
                    $('#serviceVoice')
                        .html(
                            '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#serviceVoicePreloader').show();
                    var query = "";
                    if ("previousDay" === filterDate ) {
                        query = "biz_rev_post_unbill_service_voice_pd";
                    } else if ("daily" === filterDate ) {
                        query = "biz_rev_post_unbill_service_voice_daily";
                    } else if ("weekly" === filterDate ) {
                        query = "biz_rev_post_unbill_service_voice_wkly";
                    } else if ("monthly" === filterDate ) {
                        query = "biz_rev_post_unbill_service_voice_mnthly";
                    } else if ("customDate" === filterDate ) {

                        if ("" !== fromDate && "" !== toDate) {
                            query = "biz_rev_post_unbill_service_voice_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_service_voice_daily";
                        }

                    }
                    loadServiceChart(query,
                        "unBilledServiceRevenue", filterDate,
                        "");
                    $('#serviceChartPreloader').hide();
                });
        $('#toggleRevVoice')
            .click(
                function() {
                    $('#serviceVoice')
                        .html(
                            '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#serviceVoicePreloader').show();
                    var query = "";
                    if ("previousDay" === filterDate ) {
                        query = "biz_rev_post_unbill_service_voice_pd";
                    } else if ("daily" === filterDate ) {
                        query = "biz_rev_post_unbill_service_voice_daily";
                    } else if ("weekly" === filterDate ) {
                        query = "biz_rev_post_unbill_service_voice_wkly";
                    } else if ("monthly" === filterDate ) {
                        query = "biz_rev_post_unbill_service_voice_mnthly";
                    } else if ("customDate" === filterDate ) {

                        if ("" !== fromDate && "" !== toDate) {
                            query = "biz_rev_post_unbill_service_voice_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_service_voice_daily";
                        }

                    }
                    loadServiceChart(query,
                        "unBilledServiceRevenue", filterDate,
                        "");
                    $('#serviceChartPreloader').hide();
                });

        $('#toggleRevSms')
            .click(
                function() {
                    $('#serviceVoice')
                        .html(
                            '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#serviceVoicePreloader').show();
                    var query = "";
                    if ("previousDay" === filterDate ) {
                        query = "biz_rev_post_unbill_service_sms_pd";
                    } else if ("daily" === filterDate ) {
                        query = "biz_rev_post_unbill_service_sms_daily";
                    } else if ("weekly" === filterDate ) {
                        query = "biz_rev_post_unbill_service_sms_wkly";
                    } else if ("monthly" === filterDate ) {
                        query = "biz_rev_post_unbill_service_sms_mnthly";
                    } else if ("customDate" === filterDate ) {

                        if ("" !== fromDate && "" !== toDate) {
                            query = "biz_rev_post_unbill_service_sms_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_service_sms_daily";
                        }
                    }
                    loadServiceChart(query,
                        "unBilledServiceRevenue", filterDate,
                        "");
                    $('#serviceChartPreloader').hide();
                });

        $('#toggleRevData')
            .click(
                function() {
                    $('#serviceVoice')
                        .html(
                            '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#serviceVoicePreloader').show();
                    var query = "";
                    if ("previousDay" === filterDate ) {
                        query = "biz_rev_post_unbill_service_data_pd";
                    } else if ("daily" === filterDate ) {
                        query = "biz_rev_post_unbill_service_data_daily";
                    } else if ("weekly" === filterDate ) {
                        query = "biz_rev_post_unbill_service_data_wkly";
                    } else if ("monthly" === filterDate ) {
                        query = "biz_rev_post_unbill_service_data_mnthly";
                    } else if ("customDate" === filterDate ) {

                        if ("" !== fromDate && "" !== toDate) {
                            query = "biz_rev_post_unbill_service_data_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_service_data_daily";
                        }
                    }
                    loadServiceChart(query,
                        "unBilledServiceRevenueData",
                        filterDate, "toggleRevData");
                    $('#serviceChartPreloader').hide();
                });

        function loadVolumeChart(query, type, chartType, category) {
            $('#volumeByServices')
                .html(
                    '<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#volumeByServicesPreloader').show();
            var volWiseSearchData = new SearchManager({
                // "id" : id,
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
            volWiseSearchData.settings.unset("search");

            if ("" !== fromDate && "" !== toDate) {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                volWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", query, country,
                    fromDate, toDate,serviceType));

            } else {
                volWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", query, country,"","",serviceType));
            }
            volWiseSearchData.startSearch();


            volWiseSearchData
                .on(
                    'search:done',
                    function(properties) {
                        var volWiseResults = volWiseSearchData
                            .data("results");
                        var isNoData = true;
                        volWiseResults
                            .on(
                                "data",
                                function() {
                                    if (undefined != volWiseResults
                                        .data()) {
                                        if ("previousDay" === chartType ) {

                                            var finalDataJson = convertResultToJSON(volWiseResults.data());
                                            var processResults = servicelastbillCycleFixedData(finalDataJson.data, "category","totalrevenue");
                                            //var processResults = servicelastbillCycleProcessor(volWiseResults .data().rows);
                                           
                                                bizFixedUnbillRev.previousDay.volUsageServiceVoice.series[0].data[0].y = processResults.Telephone;
                                                bizFixedUnbillRev.previousDay.volUsageServiceVoice.series[0].data[1].y = processResults.Broadband;
                                                bizFixedUnbillRev.previousDay.volUsageServiceVoice.series[0].data[2].y = processResults.IPTV;
                                                Highcharts
                                                    .chart(
                                                        'volumeByServices',
                                                        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                                Highcharts
                                                    .chart(
                                                        'volumeByServices',
                                                        bizFixedUnbillRev.previousDay.volUsageServiceVoice);
                                          

                                        } else {
                                            Highcharts
                                                .chart(
                                                'volumeByServices',
                                                bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                            var finalDataJson = convertResultToJSON(volWiseResults.data());
                                            processServiceStackBarData(finalDataJson.data, bizFixedUnbillRev.daily.volUsageService, volumeByServices, "", "date", "category", "totalrevenue");

                                        }
                                        isNoData = false;
                                    }
                                });
                        refreshDateTime();
                        setTimeout(
                            function() {
                                if (isNoData) {
                                    Highcharts
                                        .chart(
                                            'volumeByServices',
                                            bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                }
                            }, 3000);

                        $('#volumeByServicesPreloader').hide();
                    });
        }


            $('#toggleVolVoice')
            .click(
                function() {
                    $('#volumeByServices')
                        .html(
                            '<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#volumeByServicesPreloader').show();
                    var query = "";

                    if ("previousDay" === filterDate ) {
                        query = "biz_rev_post_unbill_volume_voice_pd";
                    } else if ("daily" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_voice_daily";
                    } else if ("weekly" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_voice_wkly";
                    } else if ("monthly" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_voice_mnthly";
                    } else if ("customDate" === filterDate ) {
                        var fromDate = $("#fromDate").val();
                        var toDate = $("#toDate").val();

                        if ("" !== fromDate && "" !== toDate) {
                            query = "biz_rev_post_unbill_vol_voice_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_vol_voice_daily";
                        }
                    }
                    loadVolumeChart(query, "unBilledServiceVol",
                        filterDate, "toggleVolVoice");
                });

        $('#toggleVolSms')
            .click(
                function() {
                    $('#volumeByServices')
                        .html(
                            '<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#volumeByServicesPreloader').show();
                    var query = "";
                    if ("previousDay" === filterDate ) {
                        query = "biz_rev_post_unbill_volume_sms_pd";
                    } else if ("daily" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_sms_daily";
                    } else if ("weekly" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_sms_wkly";
                    } else if ("monthly" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_sms_mnthly";
                    } else if ("customDate" === filterDate ) {
                        var fromDate = $("#fromDate").val();
                        var toDate = $("#toDate").val();

                        if ("" !== fromDate && "" !== toDate) {
                            query = "biz_rev_post_unbill_vol_sms_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_vol_sms_daily";
                        }
                    }
                    loadVolumeChart(query, "unBilledServiceVol",
                        filterDate, "toggleVolSms");
                });

        $('#toggleVolData')
            .click(
                function() {
                    $('#volumeByServices')
                        .html(
                            '<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#volumeByServicesPreloader').show();
                    var query = "";
                    if ("previousDay" === filterDate ) {
                        query = "biz_rev_post_unbill_volume_data_pd";
                    } else if ("daily" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_data_daily";
                    } else if ("weekly" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_data_wkly";
                    } else if ("monthly" === filterDate ) {
                        query = "biz_rev_post_unbill_vol_data_mnthly";
                    } else if ("customDate" === filterDate ) {

                        if ("" !== fromDate && "" !== toDate) {
                            query = "biz_rev_post_unbill_vol_data_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_vol_data_daily";
                        }
                    }
                    loadVolumeChart(query,
                        "unBilledServiceVolData", filterDate,
                        "toggleVolData");
                });

        pageLoading = false;

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
$('input[name=datePreset]').parent().on('click', function() {
    filterDate = $(this).children().val();
});

function loadCountryChart(chartType, chartData) {
    Highcharts.chart('countryRevenue', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
    if ("previousDay"==chartType ) {
        var countryChart = Highcharts.chart('countryRevenue', bizFixedUnbillRev.previousDay.countrywise);
        setPieData(chartData, countryChart, "country", "countrywiserevenue");
    } else {
        countryChart = bizFixedUnbillRev[chartType].countrywise;
        basicLineDataProcessor(chartData, countryChart, 'countryRevenue', "txndate", "country", "countrywiserevenue");
    }
}

function loadPlanChart(chartType, chartData) {
    Highcharts.chart('revenuebyPlans',
        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
    //below all if - else conditions are required since series data is getting duplicate while using common chart config, ones fix for that done will combine all condition to one else case.
    if ("previousDay" === chartType) {
        var othersdata = processOthersData(getPieChart(chartData, "plandesc", "revenue"));
        bizFixedUnbillRev.previousDay.planwise.series[0].data = othersdata;
        Highcharts.chart('revenuebyPlans',
            bizFixedUnbillRev.previousDay.planwise);
    } else if ("daily" === chartType) {
        processStackBarData(chartData, bizFixedUnbillRev.daily.planwise, "revenuebyPlans", "", "txndate", "plandesc", "revenue");
    } else if ("weekly" === chartType) {
        processStackBarData(chartData, bizFixedUnbillRev.weekly.planwise, "revenuebyPlans", "", "txndate", "plandesc", "revenue");
    } else if ("monthly" === chartType) {
        processStackBarData(chartData, bizFixedUnbillRev.monthly.planwise, "revenuebyPlans", "", "txndate", "plandesc", "revenue");
    } else if ("customDate"=== chartType) {
        processStackBarData(chartData, bizFixedUnbillRev.customDate.planwise, "revenuebyPlans", "", "txndate", "plandesc", "revenue");
        return;
    }
}

function loadSubClassChart(chartType, chartData) {
    Highcharts.chart('subClassificationChart',
        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
        var planDescription="subclassification";
        var revenue="revenue";
    if ("previousDay" === chartType ) {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizFixedUnbillRev.previousDay.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    } else if (chartType == "daily") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizFixedUnbillRev.daily.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    } else if (chartType == "weekly") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizFixedUnbillRev.weekly.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    } else if (chartType == "monthly") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizFixedUnbillRev.monthly.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    } else if (chartType == "customDate") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizFixedUnbillRev.customDate.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    }
}

function highchartsInitialize() {
    revServicewiseChart = Highcharts.chart('serviceVoice',
        bizFixedUnbillRev.previousDay.revService);
    volServiceswiseChart = Highcharts.chart('volumeByServices',
        bizFixedUnbillRev.previousDay.volUsageService);
    countrywiseChart = Highcharts.chart('countryRevenue',
        bizFixedUnbillRev.previousDay.countrywise);
    planwiseChart = Highcharts.chart('revenuebyPlans',
        bizFixedUnbillRev.previousDay.planwise);
    subClassificationChart = Highcharts.chart('subClassificationChart',
        bizFixedUnbillRev.previousDay.subClassification);
}

function highchartsDestroy() {
    revServicewiseChart.destroy();
    volServiceswiseChart.destroy();
    countrywiseChart.destroy();
    planwiseChart.destroy();
    subClassificationChart.destroy();
}