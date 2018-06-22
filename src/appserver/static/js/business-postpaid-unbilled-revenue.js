var countryWiseSearchData;
var plansSearchData;
var subsClassifySearchData;
var volWiseSearchData;
var serviceWiseSearchData;
var oldCountryList, country;
var filterDate = "daily";
var revServicewiseChart = Highcharts.chart('serviceVoice',
    bizPostUnbillRev.daily.revService);
var volServiceswiseChart = Highcharts.chart('volumeByServices',
    bizPostUnbillRev.daily.volUsageService);
var countrywiseChart = Highcharts.chart('countryRevenue',
    bizPostUnbillRev.daily.countrywise);
var planwiseChart = Highcharts.chart('revenuebyPlans',
    bizPostUnbillRev.daily.planwise);
var subClassificationChart = Highcharts.chart('subClassificationChart',
    bizPostUnbillRev.daily.subClassification);


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


        var SearchManager = require("splunkjs/mvc/searchmanager");
        var utils = require("splunkjs/mvc/utils");

        var pageLoading = true;
        updateHelpText('bizPostunbillRevDaily');

        function updateHelpText(mapKey) {
            getHelpText(mapKey, "revServicewiseHelp");
            getHelpText(mapKey, "volServiceswiseHelp");
            getHelpText(mapKey, "countrywiseHelp");
            getHelpText(mapKey, "planwiseHelp");
            getHelpText(mapKey, "subClassificationHelp");
        }

        // TO SELECT COUNTRY
        var oldCountryList = localStorage.getItem("selectedOldCountryList");
        var country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
        var serviceType = "Postpaid";   
        // TO SET DEFAULT DATE VALUE FOR SEARCH
        // setDefaultDateValue();
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var isExportData = false;

        // TO SELECT COUNTRY
        var oldCountryList = "";
        var country = "";
        var serviceType = "Postpaid";   
        // TO SET DEFAULT DATE VALUE FOR SEARCH
        // setDefaultDateValue();
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var isExportData = false;

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

        /** *date preset start* */

      

        /** date preset end* */

        /*
         * $("#searchBtn").click(function() {
         * search2.settings.unset("search"); fromDate =
         * $("#fromDate").val(); toDate = $("#toDate").val();
         * search2.settings.set("search", getQuery("unbilled_service",
         * country, fromDate, toDate)); search2.startSearch();
         * 
         * });
         */

        $('#prevDay').click(function () {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            highchartsInitialize();
            highchartsDestroy();
            $("input[type='text']").val('');
            loadChart("previousDay");
            // update the HelpTextIcon
            updateHelpText('bizPostunbillRevPrevDay');
        });

        $('#daily').click(function () {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            $("#option1").prop("checked", true);
            $("input[type='text']").val('');
            // Plot the new charts
            highchartsInitialize();
            highchartsDestroy();
            loadChart("daily");
            // update the HelpTextIcon
            updateHelpText('bizPostunbillRevDaily');
        });

        $('#weekly').click(function () {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            $("#option1").prop("checked", true);
            $("input[type='text']").val('');
            // Plot the new charts
            highchartsInitialize();
            highchartsDestroy();
            loadChart("weekly");
            // update the HelpTextIcon
            updateHelpText('bizPostunbillRevWeekly');
        });

        $('#monthly').click(function () {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            $("#option1").prop("checked", true);
            $("input[type='text']").val('');
            // Plot the new charts
            highchartsInitialize();
            highchartsDestroy();
            loadChart("monthly");
            // update the HelpTextIcon
            updateHelpText('bizPostunbillRevMonthly');
        });

        $('#customDate').click(function () {
            $("#toggleRevAll").prop("checked", true);
            $("#toggleVolVoice").prop("checked", true);
            $("#option1").prop("checked", true);
            loadChart("daily");
            $(".datePicker").css('background', '#fff');
            $("#fromDate.datePicker").css('background', '#fff');
            // update the HelpTextIcon
            updateHelpText('bizPostunbillRevCustomDate');
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
                updateHelpText('bizPostunbillRevCustomDate');
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

            if (chartType == "previousDay") {
                serviceQuery = "biz_rev_post_unbill_service_all_pd";
                cntryQuery = "biz_rev_post_unbill_country";
                planQuery = "biz_rev_post_unbill_plans";
                subQuery = "biz_rev_post_unbill_subs";
                volQuery = "biz_rev_post_unbill_volume_voice_pd";
            } else if (chartType == "daily") {
                serviceQuery = "biz_rev_post_unbill_service_all_daily";
                cntryQuery = "biz_rev_post_unbill_country_daily";
                planQuery = "biz_rev_post_unbill_plans_daily";
                subQuery = "biz_rev_post_unbill_subs_daily";
                volQuery = "biz_rev_post_unbill_vol_voice_daily";
            } else if (chartType == "weekly") {
                serviceQuery = "biz_rev_post_unbill_service_all_wkly";
                cntryQuery = "biz_rev_post_unbill_country_wkly";
                planQuery = "biz_rev_post_unbill_plans_wkly";
                subQuery = "biz_rev_post_unbill_subs_wkly";
                volQuery = "biz_rev_post_unbill_vol_voice_wkly";
            } else if (chartType == "monthly") {
                serviceQuery = "biz_rev_post_unbill_service_all_mnthly";
                cntryQuery = "biz_rev_post_unbill_country_mnthly";
                planQuery = "biz_rev_post_unbill_plans_mnthly";
                subQuery = "biz_rev_post_unbill_subs_mnthly";
                volQuery = "biz_rev_post_unbill_vol_voice_mnthly";
            } else if (chartType == "customDate") {
                serviceQuery = "biz_rev_post_unbill_service_all_cusdt";
                cntryQuery = "biz_rev_post_unbill_country_cusdt";
                planQuery = "biz_rev_post_unbill_plans_cusdt";
                subQuery = "biz_rev_post_unbill_subs_cusdt";
                volQuery = "biz_rev_post_unbill_vol_voice_cusdt";
            }

            // initialize search manager instance
            plansSearchData = getOnlySearchResultsConstructor("revenuebyPlansPreloader","24h");
            subsClassifySearchData = getOnlySearchResultsConstructor("subClassificationChartPreloader","24h");
            countryWiseSearchData = getOnlySearchResultsConstructor("countryRevenuePreloader","24h");
            // serviceWiseSearchData =
            // getOnlySearchResultsConstructor("serviceWiseChartPreloader");
            volWiseSearchData = getOnlySearchResultsConstructor("volWiseChartPreloader","24h");
            loadServiceChart(serviceQuery, "unBilledServiceRevenue",
                filterDate, "");

            loadVolumeChart(volQuery, "unBilledServiceVol", filterDate, "");

            /* plan wise search - start */
            plansSearchData.settings.unset("search");

            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                plansSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", planQuery, country,
                    fromDate, toDate, serviceType));

            } else {
                plansSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", planQuery, country,"", "", serviceType));
            }
            plansSearchData.startSearch();
            $('#revenuebyPlans')
                .html(
                    '<div id="revenuebyPlansPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#revenuebyPlansPreloader').show();

            plansSearchData
                .on(
                    'search:done',
                    function () {
                        var plansSearchResults = plansSearchData
                            .data("results");
                        var isNoData = true;
                        plansSearchResults.on("data", function (
                            queryResults) {
                            if (undefined != queryResults.data()) {
                                var finalDataJson = convertResultToJSON(queryResults.data());
                                loadPlanChart(chartType, finalDataJson.data);
                               // loadPlanChart(chartType, queryResults.data().rows);
                                   
                                isNoData = false;
                            }
                        });

                        refreshDateTime();
                        setTimeout(
                            function () {
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
            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                subsClassifySearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", subQuery, country,
                    fromDate, toDate, serviceType));

            } else {
                subsClassifySearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", subQuery, country,"", "", serviceType));
            }
            subsClassifySearchData.startSearch();
            $('#subClassificationChart')
                .html(
                    '<div id="subClassificationChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#subClassificationChartPreloader').show();
            subsClassifySearchData
                .on(
                    'search:done',
                    function () {
                        var subsClassifySearchResults = subsClassifySearchData
                            .data("results");
                        var isNoData = true;
                        subsClassifySearchResults
                            .on(
                                "data",
                                function (queryResults) {
                                    if (undefined != queryResults
                                        .data()) {

                                            var finalDataJson = convertResultToJSON(queryResults.data());
                                            loadSubClassChart(chartType, finalDataJson.data);
                                        // loadSubClassChart(
                                        //     chartType,
                                        //     queryResults
                                        //     .data().rows);
                                        isNoData = false;
                                    }
                                });
                        $('#subClassificationChartPreloader')
                            .hide();
                        refreshDateTime();
                        setTimeout(
                            function () {
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
            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                countryWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", cntryQuery, country,
                    fromDate, toDate, serviceType));

            } else {
                countryWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", cntryQuery, country,"", "", serviceType));
            }
            countryWiseSearchData.startSearch();
            $('#countryRevenue').html('<div id="countryRevenuePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#countryRevenuePreloader').show();

            countryWiseSearchData.on('search:done', function () {
                var countryWiseSearchResults = countryWiseSearchData.data("results");
                var isNoData = true;
                countryWiseSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadCountryChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                });
                $('#countryRevenuePreloader').hide();
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('countryRevenue', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
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

        function loadServiceChart(query, type, chartType, category) {
            Highcharts.chart('serviceVoice',
                bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
            var serviceWiseSearchData = new SearchManager({
                // "id" : id+randomValue,
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
            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                serviceWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", query, country,
                    fromDate, toDate, serviceType));

            } else {
                serviceWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", query, country,"", "", serviceType));
            }
            serviceWiseSearchData.startSearch();
            $('#serviceVoice')
                .html(
                    '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#serviceVoicePreloader').show();

            serviceWiseSearchData
                .on(
                    'search:done',
                    function (properties) {
                        var serviceWiseResults = serviceWiseSearchData
                            .data("results");
                        var isNoData = true;
                        serviceWiseResults
                            .on(
                                "data",
                                function () {

                                    if (undefined != serviceWiseResults
                                        .data()) {
                                        if (chartType == "previousDay") {
                                            // var processResults = servicelastbillCycleProcessor(serviceWiseResults
                                            //     .data().rows);
                                            var finalDataJson = convertResultToJSON(serviceWiseResults.data());
                                            var processResults = servicelastbillCycleData(finalDataJson.data, "uagecattype", "nettype", "revenue");
                                            if (category == "toggleRevData") {
                                                bizPostUnbillRev.previousDay.servicewisedata.series[0].data[0].y = processResults.Onnet;
                                                bizPostUnbillRev.previousDay.servicewisedata.series[0].data[1].y = processResults.Roaming;
                                                Highcharts
                                                    .chart(
                                                        'serviceVoice',
                                                        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                                Highcharts
                                                    .chart(
                                                        'serviceVoice',
                                                        bizPostUnbillRev.previousDay.servicewisedata);
                                            } else {
                                                bizPostUnbillRev.previousDay.servicewiseVoice.series[0].data[0].y = processResults.Onnet;
                                                bizPostUnbillRev.previousDay.servicewiseVoice.series[0].data[1].y = processResults.Offnet;
                                                bizPostUnbillRev.previousDay.servicewiseVoice.series[0].data[2].y = processResults.Roaming;
                                                Highcharts
                                                    .chart(
                                                        'serviceVoice',
                                                        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                                Highcharts
                                                    .chart(
                                                        'serviceVoice',
                                                        bizPostUnbillRev.previousDay.servicewiseVoice);
                                            }

                                        } else if("daily" === chartType || "weekly" === chartType || "customDate" === chartType)  {
                                            Highcharts.chart('serviceVoice', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                            var jsonData = convertResultToJSON(serviceWiseResults.data());
                                            var results = revenueColumnStack(jsonData.data, "txndate", "nettype", "totalrevenue");
                                            if (category == "toggleRevData") {
                                                bizPostUnbillRev.daily.revServiceData.xAxis.categories = results.axis;
                                                bizPostUnbillRev.daily.revServiceData.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                bizPostUnbillRev.daily.revServiceData.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                                                Highcharts.chart('serviceVoice', bizPostUnbillRev.daily.revServiceData);
                                            } else {
                                                bizPostUnbillRev.daily.revService.xAxis.categories = results.axis;
                                                bizPostUnbillRev.daily.revService.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                bizPostUnbillRev.daily.revService.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                                                bizPostUnbillRev.daily.revService.series[2].data = (undefined !== results.nettype[2]) ? results.nettype[2] : 0;
                                                Highcharts.chart('serviceVoice', bizPostUnbillRev.daily.revService);
                                            }
                                            //processServiceWiseResults(serviceWiseResults.data().rows, type, chartType);
                                        } else {
                                            Highcharts.chart('serviceVoice', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                            var jsonData = convertResultToJSON(serviceWiseResults.data());
                                            ;
                                            var results = revenueColumnStack(jsonData.data, "txndate", "nettype", "totalrevenue");
                                            if (category == "toggleRevData") {
                                                bizPostUnbillRev.monthly.revServiceData.xAxis.categories = results.axis;
                                                bizPostUnbillRev.monthly.revServiceData.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                bizPostUnbillRev.monthly.revServiceData.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                                                Highcharts.chart('serviceVoice', bizPostUnbillRev.monthly.revServiceData);
                                            } else {
                                                bizPostUnbillRev.monthly.revService.xAxis.categories = results.axis;
												bizPostUnbillRev.monthly.revService.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                bizPostUnbillRev.monthly.revService.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                                                bizPostUnbillRev.monthly.revService.series[2].data = (undefined !== results.nettype[2]) ? results.nettype[2] : 0;
                                                Highcharts.chart('serviceVoice', bizPostUnbillRev.monthly.revService);
                                            }
                                            //processServiceWiseResults(serviceWiseResults.data().rows, type, chartType);
                                        }
                                        isNoData = false;
                                    }
                                });
                        refreshDateTime();
                        setTimeout(
                            function () {
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

        // $('.customDateDisable').click(function () {
        //     $("input[type='text']").attr("disabled", true);
        //     $("button[type='button']").attr("disabled", true);
        // });

        $('#toggleRevVoice')
            .click(
                function () {
                    $('#serviceVoice')
                        .html(
                            '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#serviceVoicePreloader').show();
                    var query = "";
                    if (filterDate == "previousDay") {
                        query = "biz_rev_post_unbill_service_voice_pd";
                    } else if (filterDate == "daily") {
                        query = "biz_rev_post_unbill_service_voice_daily";
                    } else if (filterDate == "weekly") {
                        query = "biz_rev_post_unbill_service_voice_wkly";
                    } else if (filterDate == "monthly") {
                        query = "biz_rev_post_unbill_service_voice_mnthly";
                    } else if (filterDate == "customDate") {

                        if (fromDate != "" && toDate != "") {
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
                function () {
                    $('#serviceVoice')
                        .html(
                            '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#serviceVoicePreloader').show();
                    var query = "";
                    if (filterDate == "previousDay") {
                        query = "biz_rev_post_unbill_service_sms_pd";
                    } else if (filterDate == "daily") {
                        query = "biz_rev_post_unbill_service_sms_daily";
                    } else if (filterDate == "weekly") {
                        query = "biz_rev_post_unbill_service_sms_wkly";
                    } else if (filterDate == "monthly") {
                        query = "biz_rev_post_unbill_service_sms_mnthly";
                    } else if (filterDate == "customDate") {

                        if (fromDate != "" && toDate != "") {
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
                function () {
                    $('#serviceVoice')
                        .html(
                            '<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#serviceVoicePreloader').show();
                    var query = "";
                    if (filterDate == "previousDay") {
                        query = "biz_rev_post_unbill_service_data_pd";
                    } else if (filterDate == "daily") {
                        query = "biz_rev_post_unbill_service_data_daily";
                    } else if (filterDate == "weekly") {
                        query = "biz_rev_post_unbill_service_data_wkly";
                    } else if (filterDate == "monthly") {
                        query = "biz_rev_post_unbill_service_data_mnthly";
                    } else if (filterDate == "customDate") {

                        if (fromDate != "" && toDate != "") {
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

            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0';
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59";
                }
                volWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", query, country,
                    fromDate, toDate, serviceType));

            } else {
                volWiseSearchData.settings.set("search", getQuery(
                    "bizPostDrillRevUnbillQuery", query, country,"", "", serviceType));
            }
            volWiseSearchData.startSearch();


            volWiseSearchData
                .on(
                    'search:done',
                    function (properties) {
                        var volWiseResults = volWiseSearchData
                            .data("results");
                        var isNoData = true;
                        volWiseResults
                            .on(
                                "data",
                                function () {
                                    if (undefined != volWiseResults
                                        .data()) {
                                        if (chartType == "previousDay") {
                                            // var processResults = servicelastbillCycleProcessor(volWiseResults
                                            //     .data().rows);
                                            var finalDataJson = convertResultToJSON(volWiseResults.data());
                                            var processResults = servicelastbillCycleData(finalDataJson.data, "uagecattype", "nettype", "volume");
                                            if (category == "toggleVolData") {
                                                bizPostUnbillRev.previousDay.volUsageServiceData.series[0].data[0].y = processResults.Onnet;
                                                bizPostUnbillRev.previousDay.volUsageServiceData.series[0].data[1].y = processResults.Roaming;
                                                Highcharts
                                                    .chart(
                                                        'volumeByServices',
                                                        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                                Highcharts
                                                    .chart(
                                                        'volumeByServices',
                                                        bizPostUnbillRev.previousDay.volUsageServiceData);
                                            } else if (category == "toggleVolSms") {
                                                bizPostUnbillRev.previousDay.volUsageServiceSms.series[0].data[0].y = processResults.Onnet;
                                                bizPostUnbillRev.previousDay.volUsageServiceSms.series[0].data[1].y = processResults.Offnet;
                                                bizPostUnbillRev.previousDay.volUsageServiceSms.series[0].data[2].y = processResults.Roaming;
                                                Highcharts
                                                    .chart(
                                                        'volumeByServices',
                                                        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                                Highcharts
                                                    .chart(
                                                        'volumeByServices',
                                                        bizPostUnbillRev.previousDay.volUsageServiceSms);
                                            }else {
                                                bizPostUnbillRev.previousDay.volUsageServiceVoice.series[0].data[0].y = processResults.Onnet;
                                                bizPostUnbillRev.previousDay.volUsageServiceVoice.series[0].data[1].y = processResults.Offnet;
                                                bizPostUnbillRev.previousDay.volUsageServiceVoice.series[0].data[2].y = processResults.Roaming;
                                                Highcharts
                                                    .chart(
                                                        'volumeByServices',
                                                        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                                Highcharts
                                                    .chart(
                                                        'volumeByServices',
                                                        bizPostUnbillRev.previousDay.volUsageServiceVoice);
                                            }

                                        } else if ("daily" === chartType || "weekly" === chartType) {
                                            Highcharts
                                                .chart(
                                                'volumeByServices',
                                                bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                            var jsonData = convertResultToJSON(volWiseResults.data());

                                            var results = revenueColumnStack(jsonData.data, "txndate", "nettype", "call_count");
                                            if (category == "toggleVolData") {
                                                bizPostUnbillRev.daily.volUsageServiceData.xAxis.categories = results.axis;
                                                bizPostUnbillRev.daily.volUsageServiceData.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                bizPostUnbillRev.daily.volUsageServiceData.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                                                Highcharts
                                                    .chart(
                                                    'volumeByServices',
                                                    bizPostUnbillRev.daily.volUsageServiceData);
                                            } 
											else if (category == "toggleVolSms") {
                                                 bizPostUnbillRev.daily.volUsageServiceSms.xAxis.categories = results.axis;
                                                bizPostUnbillRev.daily.volUsageServiceSms.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                Highcharts
                                                    .chart(
                                                    'volumeByServices',
                                                    bizPostUnbillRev.daily.volUsageServiceSms);
                                            }else {

                                                bizPostUnbillRev.daily.volUsageService.xAxis.categories = results.axis;
                                                bizPostUnbillRev.daily.volUsageService.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                bizPostUnbillRev.daily.volUsageService.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                                                bizPostUnbillRev.daily.volUsageService.series[2].data = (undefined !== results.nettype[2]) ? results.nettype[2] : 0;
                                                Highcharts
                                                    .chart(
                                                    'volumeByServices',
                                                    bizPostUnbillRev.daily.volUsageService);
                                            }

                                        } else {
                                            Highcharts
                                                .chart(
                                                'volumeByServices',
                                                bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                            var jsonData = convertResultToJSON(volWiseResults.data());

                                            var results = revenueColumnStack(jsonData.data, "txndate", "nettype", "call_count");
                                            if (category == "toggleVolData") {
                                                bizPostUnbillRev.monthly.volUsageServiceData.xAxis.categories = results.axis;
                                                bizPostUnbillRev.monthly.volUsageServiceData.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                bizPostUnbillRev.monthly.volUsageServiceData.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                                                Highcharts
                                                    .chart(
                                                    'volumeByServices',
                                                    bizPostUnbillRev.monthly.volUsageServiceData);
                                            } else if (category == "toggleVolSms") {
                                                 bizPostUnbillRev.monthly.volUsageServiceSms.xAxis.categories = results.axis;
                                                bizPostUnbillRev.monthly.volUsageServiceSms.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                Highcharts
                                                    .chart(
                                                    'volumeByServices',
                                                    bizPostUnbillRev.monthly.volUsageServiceSms);
                                            }else {

                                                bizPostUnbillRev.monthly.volUsageService.xAxis.categories = results.axis;
                                                bizPostUnbillRev.monthly.volUsageService.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                                                bizPostUnbillRev.monthly.volUsageService.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                                                bizPostUnbillRev.monthly.volUsageService.series[2].data = (undefined !== results.nettype[2]) ? results.nettype[2] : 0;
                                                Highcharts
                                                    .chart(
                                                    'volumeByServices',
                                                    bizPostUnbillRev.monthly.volUsageService);
                                            }

                                        }
                                        isNoData = false;
                                    }
                                });
                        refreshDateTime();
                        setTimeout(
                            function () {
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
                function () {
                    $('#volumeByServices')
                        .html(
                            '<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#volumeByServicesPreloader').show();
                    var query = "";

                    if (filterDate == "previousDay") {
                        query = "biz_rev_post_unbill_volume_voice_pd";
                    } else if (filterDate == "daily") {
                        query = "biz_rev_post_unbill_vol_voice_daily";
                    } else if (filterDate == "weekly") {
                        query = "biz_rev_post_unbill_vol_voice_wkly";
                    } else if (filterDate == "monthly") {
                        query = "biz_rev_post_unbill_vol_voice_mnthly";
                    } else if (filterDate == "customDate") {
                        var fromDate = $("#fromDate").val();
                        var toDate = $("#toDate").val();

                        if (fromDate != "" && toDate != "") {
                            query = "biz_rev_post_unbill_vol_voice_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_vol_voice_daily";
                        }
                    }
                    loadVolumeChart(query, "unBilledServiceVol",
                        filterDate, "toggleVolVoice");
                });
        $('#toggleVolVoice')
            .click(
                function () {
                    $('#volumeByServices')
                        .html(
                            '<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#volumeByServicesPreloader').show();
                    var query = "";

                    if (filterDate == "previousDay") {
                        query = "biz_rev_post_unbill_volume_voice_pd";
                    } else if (filterDate == "daily") {
                        query = "biz_rev_post_unbill_vol_voice_daily";
                    } else if (filterDate == "weekly") {
                        query = "biz_rev_post_unbill_vol_voice_wkly";
                    } else if (filterDate == "monthly") {
                        query = "biz_rev_post_unbill_vol_voice_mnthly";
                    } else if (filterDate == "customDate") {
                        var fromDate = $("#fromDate").val();
                        var toDate = $("#toDate").val();

                        if (fromDate != "" && toDate != "") {
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
                function () {
                    $('#volumeByServices')
                        .html(
                            '<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#volumeByServicesPreloader').show();
                    var query = "";
                    if (filterDate == "previousDay") {
                        query = "biz_rev_post_unbill_volume_sms_pd";
                    } else if (filterDate == "daily") {
                        query = "biz_rev_post_unbill_vol_sms_daily";
                    } else if (filterDate == "weekly") {
                        query = "biz_rev_post_unbill_vol_sms_wkly";
                    } else if (filterDate == "monthly") {
                        query = "biz_rev_post_unbill_vol_sms_mnthly";
                    } else if (filterDate == "customDate") {
                        var fromDate = $("#fromDate").val();
                        var toDate = $("#toDate").val();

                        if (fromDate != "" && toDate != "") {
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
                function () {
                    $('#volumeByServices')
                        .html(
                            '<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
                    $('#volumeByServicesPreloader').show();
                    var query = "";
                    if (filterDate == "previousDay") {
                        query = "biz_rev_post_unbill_volume_data_pd";
                    } else if (filterDate == "daily") {
                        query = "biz_rev_post_unbill_vol_data_daily";
                    } else if (filterDate == "weekly") {
                        query = "biz_rev_post_unbill_vol_data_wkly";
                    } else if (filterDate == "monthly") {
                        query = "biz_rev_post_unbill_vol_data_mnthly";
                    } else if (filterDate == "customDate") {

                        if (fromDate != "" && toDate != "") {
                            query = "biz_rev_post_unbill_vol_data_cusdt";
                        } else {
                            query = "biz_rev_post_unbill_vol_data_daily";
                        }
                    }
                    loadVolumeChart(query,
                        "unBilledServiceVolData", filterDate,
                        "toggleVolData");
                });


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
$('input[name=datePreset]').parent().on('click', function () {
    filterDate = $(this).children().val();
});

function loadCountryChart(chartType, chartData) {
    Highcharts.chart('countryRevenue', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
    if (chartType == "previousDay") {
        var countryChart = Highcharts.chart('countryRevenue', bizPostUnbillRev.previousDay.countrywise);
        setPieData(chartData, countryChart, "country", "countrywiserevenue");
    } else {
        countryChart = bizPostUnbillRev[chartType].countrywise;
        basicLineDataProcessor(chartData, countryChart, 'countryRevenue', "txndate", "country", "countrywiserevenue");
    }
}

function loadPlanChart(chartType, chartData) {
    Highcharts.chart('revenuebyPlans',
        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
    if (chartType == "previousDay") {
        var othersdata = processOthersData(getPieChart(chartData, "plandesc", "revenue"));
        bizPostUnbillRev.previousDay.planwise.series[0].data = othersdata;
        Highcharts.chart('revenuebyPlans',
            bizPostUnbillRev.previousDay.planwise);
    } else if ("daily" === chartType) {
        processStackBarData(chartData, bizPostUnbillRev.daily.planwise, "revenuebyPlans","", "txndate", "plandesc", "revenue");
        return;
    } else {
            processStackBarData(chartData, bizPostUnbillRev.weekly.planwise, "revenuebyPlans","", "txndate", "plandesc", "revenue");
            return;
    
        }
}

function loadSubClassChart(chartType, chartData) {
    Highcharts.chart('subClassificationChart',
        bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
        var planDescription="subclassification";
        var revenue="revenue";
    if (chartType == "previousDay") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizPostUnbillRev.previousDay.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    } else if (chartType == "daily") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizPostUnbillRev.daily.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    } else if (chartType == "weekly") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizPostUnbillRev.weekly.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    } else if (chartType == "monthly") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizPostUnbillRev.monthly.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    } else if (chartType == "customDate") {
        var subClassificationChart = Highcharts.chart('subClassificationChart',
            bizPostUnbillRev.customDate.subClassification);
            setPieData(chartData, subClassificationChart,planDescription,revenue);
    }
}

function highchartsInitialize() {
    revServicewiseChart = Highcharts.chart('serviceVoice',
        bizPostUnbillRev.previousDay.revService);
    volServiceswiseChart = Highcharts.chart('volumeByServices',
        bizPostUnbillRev.previousDay.volUsageService);
    countrywiseChart = Highcharts.chart('countryRevenue',
        bizPostUnbillRev.previousDay.countrywise);
    planwiseChart = Highcharts.chart('revenuebyPlans',
        bizPostUnbillRev.previousDay.planwise);
    subClassificationChart = Highcharts.chart('subClassificationChart',
        bizPostUnbillRev.previousDay.subClassification);
}

function highchartsDestroy() {
    revServicewiseChart.destroy();
    volServiceswiseChart.destroy();
    countrywiseChart.destroy();
    planwiseChart.destroy();
    subClassificationChart.destroy();
}