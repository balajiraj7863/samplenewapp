
//Loading Highcharts based on the date presets
$('.customDateDisable').click(function() {
    $("input[type='text']").attr("disabled", true);
    $("button[type='button']").attr("disabled", true);
});
var fromDateTooltip = "";
                var toDateTooltip = "";
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

        //TO SELECT COUNTRY 
        var fromplus = "";
        var toplus = "";
        roamingVoiceChart = Highcharts.chart('roamingVoiceChart',
            bizPostTrafficDrill.today.volVoice);
        roamingSMSChart = Highcharts.chart('roamingSMSChart',
            bizPostTrafficDrill.today.volSms);
        roamingDataChart = Highcharts.chart('roamingDataChart',
            bizPostTrafficDrill.today.volData);

        updateHelpText('bizPostTrafficToday');

        function updateHelpText(mapKey) {
            getHelpText(mapKey, "voiceHelp");
            getHelpText(mapKey, "smsHelp");
            getHelpText(mapKey, "dataHelp");
            getHelpText(mapKey, "volVoiceHelp");
            getHelpText(mapKey, "volSmsHelp");
            getHelpText(mapKey, "volDataHelp");
        }

       /* Country Wise Filtering */
        // TO SET DEFAULT DATE VALUE FOR SEARCH 
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var isExportData = false;
            //TO SELECT COUNTRY 
        var oldCountryList = "";
        var country = "";
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


        highchartsInitialize();
        highchartsDestroy();

        loadChart("today");

        function loadChart(chartType) {
            var fromDate = $("#fromTrafficDate").val();
            var toDate = $("#toTrafficDate").val();
            if (fromDate != "" && toDate != "") {
                var fromplusdate = 0;
                var toplusdate = 0;
                fromplus = fromDate + ':23:59:59';
                toplus = toDate + ':23:59:59';
                fromDate = fromDate + ':0:0:0';
                toDate = toDate + ":0:0:0";

            }
            $(".datePicker").css('border', '1px solid #ccc');
            $(".datePicker").css('background', '#eee');
            getHelpText("exportExcelData", "exportExcelDateHelp");
            vlmVoiceData = getOnlySearchResultsConstructor("roamingVoiceChartPreloader");
            vlmSmsData = getOnlySearchResultsConstructor("roamingSMSChartPreloader");
            vlmDtData = getOnlySearchResultsConstructor("roamingDataChartPreloader");
            voiceData = getOnlySearchResultsConstructor("trafficVoiceSearch");
            smsData = getOnlySearchResultsConstructor("trafficSmsSearch");
            dtData = getOnlySearchResultsConstructor("trafficSessionsSearch");
            //	Highcharts.chart('voiceChart', bizPostTrafficDrill.today.volVoice);
            var vlmVoiceQuery = "biz_post_traffic_roamingVoice";
            var vlmSmsQuery = "biz_post_traffic_roamingSms";
            var vlmDataQuery = "biz_post_traffic_roamingData";

            var voiceQuery = "biz_post_traffic_voice";
            var smsQuery = "biz_post_traffic_sms";
            var dataQuery = "biz_post_traffic_data";

            if (chartType == "today") {
                vlmVoiceQuery = "biz_post_traffic_roamingVoice";
                vlmSmsQuery = "biz_post_traffic_roamingSms";
                vlmDataQuery = "biz_post_traffic_roamingData";

                voiceQuery = "biz_post_traffic_voice";
                smsQuery = "biz_post_traffic_sms";
                dataQuery = "biz_post_traffic_data";

                $('#roamingVoiceChart').show();
                $('#roamingSMSChart').show();
                $('#roamingDataChart').show();

            } else if (chartType == "prevDay") {
                vlmVoiceQuery = "biz_post_traffic_roamingVoice_prevday";
                vlmSmsQuery = "biz_post_traffic_roamingSms_prevday";
                vlmDataQuery = "biz_post_traffic_roamingData_prevday";

                voiceQuery = "biz_post_traffic_voice_prevday";
                smsQuery = "biz_post_traffic_sms_prevday";
                dataQuery = "biz_post_traffic_data_prevday";

                $('#roamingVoiceChart').show();
                $('#roamingSMSChart').show();
                $('#roamingDataChart').show();
            } else if (chartType == "customDate") {
                voiceQuery = "biz_post_traffic_voice_cusdt";
                smsQuery = "biz_post_traffic_sms_cusdt";
                dataQuery = "biz_post_traffic_data_cusdt";
                highchartsInitialize();

            }


            // search for volume voice -start
            vlmVoiceData.settings.unset("search");
            vlmVoiceData.settings.set("search", getQuery(
                "bizPostDrillTrafficQuery", vlmVoiceQuery, country, "", "", serviceType));
            vlmVoiceData.startSearch();

            vlmVoiceData.on('search:progress', function () {

                showLoader("roamingVoiceChart", "roamingVoiceChartPreloader");

            });

            vlmVoiceData.on('search:done', function () {
                var vlmVoiceResults = vlmVoiceData.data("results");
                var isNoData = true;
                vlmVoiceResults.on("data", function (queryResults) {
                    $('#roamingVoiceChartPreloader').hide();
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadVolumeChart(chartType, finalDataJson.data, "volVoice", "roamingVoiceChart");
                        isNoData = false;
                    }
                });

                if (isNoData) {
                    Highcharts.chart('roamingVoiceChart',
                        bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                }
                $('#roamingVoiceChartPreloader').hide();

            });
            // search for volume voice -end
            // search for volume sms -start
            vlmSmsData.settings.unset("search");
            vlmSmsData.settings.set("search", getQuery(
                "bizPostDrillTrafficQuery", vlmSmsQuery, country, "", "", serviceType));
            vlmSmsData.startSearch();

            vlmSmsData.on('search:progress', function () {
                showLoader("roamingSMSChart", "roamingSMSChartPreloader");
            });
            vlmSmsData.on('search:done', function () {
                var vlmSmsResults = vlmSmsData.data("results");
                var isNoData = true;
                vlmSmsResults.on("data",
                    function (queryResults) {
                        if (undefined != queryResults.data()) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            loadVolumeChart(chartType, finalDataJson.data, "volSms", "roamingSMSChart");
                            isNoData = false;
                        }
                    });
                if (isNoData) {
                    Highcharts.chart('roamingSMSChart',
                        bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                }
                $('#roamingSMSChartPreloader').hide();

            });
            // search for volume sms -end
            // search for volume data -start
            vlmDtData.settings.unset("search");
            vlmDtData.settings.set("search", getQuery(
                "bizPostDrillTrafficQuery", vlmDataQuery, country, "", "", serviceType));
            vlmDtData.startSearch();

            vlmDtData.on('search:progress', function () {
                showLoader("roamingDataChart", "roamingDataChartPreloader");
            });
            vlmDtData.on('search:done', function () {
                var vlmDataResults = vlmDtData.data("results");
                var isNoData = true;
                vlmDataResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadVolumeChart(chartType, finalDataJson.data, "volData", "roamingDataChart");
                        isNoData = false;
                    }
                });
                if (isNoData) {
                    Highcharts.chart('roamingDataChart',
                        bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                }
                $('#roamingDataChartPreloader').hide();

            });
            // search for volume data -end
            // search for voice trend-start

            voiceData.settings.unset("search");

            if (fromDate != "" && toDate != "") {

                voiceData.settings.set("search", getCustomQuery(
                    "bizPostDrillTrafficQuery", voiceQuery, country,
                    fromDate, toDate, fromplus, toplus));
            } else {
                voiceData.settings.set("search", getQuery(
                    "bizPostDrillTrafficQuery", voiceQuery, country, "", "", serviceType));

            }

            voiceData.startSearch();

            voiceData.on('search:progress', function () {
                showLoader("voiceChart", "voiceChartPreloader");
            });
            voiceData.on('search:done', function () {
                var voiceDataResults = voiceData.data("results");
                voiceDataResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        processTrafficAreaData(finalDataJson.data, "voiceChart", "hour", "value", "lastweekvalue"); // The
                        // Traffic
                        // search
                        // results
                    }
                });
                $('#voiceChartPreloader').hide();
                Highcharts.chart('voiceChart',
                    bizPostTrafficEmpty.emptyChartConfig.emptyChart);

            });

            // search for voice trend-end
            // search for sms trend-start
            smsData.settings.unset("search");
            if (fromDate != "" && toDate != "") {

                smsData.settings.set("search", getCustomQuery(
                    "bizPostDrillTrafficQuery", smsQuery, country,
                    fromDate, toDate, fromplus, toplus));
            } else {
                smsData.settings.set("search", getQuery(
                    "bizPostDrillTrafficQuery", smsQuery, country, "", "", serviceType));
            }

            smsData.startSearch();

            smsData.on('search:progress', function () {
                showLoader("smsChart", "smsChartPreloader");
            });
            smsData.on('search:done', function () {
                var smsDataResults = smsData.data("results");
                smsDataResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        processTrafficAreaData(finalDataJson.data, "smsChart", "hour", "value", "lastweekvalue"); // The
                        // Traffic
                        // search
                        // results
                    }
                });
                Highcharts.chart('smsChart',
                    bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                $('#smsChartPreloader').hide();

            });

            // search for sms trend-end

            // search for data trend -start
            dtData.settings.unset("search");

            if (fromDate != "" && toDate != "") {

                dtData.settings.set("search", getCustomQuery(
                    "bizPostDrillTrafficQuery", dataQuery, country,
                    fromDate, toDate, fromplus, toplus));
            } else {
                dtData.settings.set("search", getQuery(
                    "bizPostDrillTrafficQuery", dataQuery, country, "", "", serviceType));
            }

            dtData.startSearch();
            dtData.on('search:progress', function (properties) {
                showLoader("activeSessionChart", "activeSessionChartPreloader");
                //$('#activeSessionChartPreloader').show();
            });
            dtData.on('search:done', function () {
                var dtDataResults = dtData.data("results");
                dtDataResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {


                        var finalDataJson = convertResultToJSON(queryResults.data());
                        processTrafficAreaData(finalDataJson.data, "activeSessionChart", "hour", "value", "lastweekvalue");
                        // Traffic
                        // search
                        // results
                    }
                });
                Highcharts.chart('activeSessionChart',
                    bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                $('#activeSessionChartPreloader').hide();

            });
            // search for data trend - end
        }

        function loadVolumeChart(chartType, rows, kpitype, chartID) {


            var vlmVoiceChart = Highcharts.chart(chartID, bizPostTrafficDrill[chartType][kpitype]);
            setPieData(rows, vlmVoiceChart, "nettype", "call_count");


        }




        function processTrafficAreaData(rows, chartID, hour, currWeek, lastWeek) {
            // The search results
            var kpiData = {};
            kpiData.currentWeek = "";
            kpiData.prevWeek = "";
            var kpiResultData = rows;
            var currentWeekKpi = [];
            var prevWeekKpi = [];

            if (kpiResultData != null) {
                for (var i = 0; i < kpiResultData.length; i++) {
                    var curtempKpi = [];
                    var prevtempKpi = [];
                    curtempKpi.push(parseFloat(kpiResultData[i][hour]), parseFloat(kpiResultData[i][currWeek]));
                    prevtempKpi.push(parseFloat(kpiResultData[i][hour]), parseFloat(kpiResultData[i][lastWeek]));
                    currentWeekKpi.push(curtempKpi);
                    prevWeekKpi.push(prevtempKpi);
                }
            }
            kpiData = {
                "currentWeek": currentWeekKpi,
                "prevWeek": prevWeekKpi
            };
            changeTab('traffic/hourly', chartID, kpiData);
        }


        function processTrafficVoice(rows) {

            // The search results
            var voiceData;
            var voiceResultData = rows;
            var currentWeekVoice = [];
            var curtempVoice = [];
            var prevWeekVoice = [];
            var prevtempVoice = [];

            if (voiceResultData != null) {
                //Code to plot data to MNP Chart
                for (var i = 0; i < voiceResultData.length; i++) {
                    curtempVoice = [];
                    prevtempVoice = [];
                    for (var j = 0; j < voiceResultData[i].length; j++) {
                        if (j == 0) {
                            curtempVoice.push(
                                parseFloat(voiceResultData[i][j]),
                                parseFloat(voiceResultData[i][j + 1]));
                        }
                        if (j == 1) {
                            prevtempVoice.push(
                                parseFloat(voiceResultData[i][j - 1]),
                                parseFloat(voiceResultData[i][j + 1]));
                        }
                    }
                    currentWeekVoice.push(curtempVoice);
                    prevWeekVoice.push(prevtempVoice);
                }
            }
            voiceData = {
                "currentWeek": currentWeekVoice,
                "prevWeek": prevWeekVoice
            };
            changeTab('traffic/hourly', 'voiceChart', voiceData);
        }

        $('#today').click(function () {
            $('.custom-date').hide();
            $("#toTrafficDate").val('');
            $("#fromTrafficDate").val('');
            highchartsInitialize();
            highchartsDestroy();
            loadChart("today");
            $('#trafficVolumeCharts').show();
            //update the HelpTextIcon
            updateHelpText('bizPostTrafficToday');
            fromDateTooltip = $("#fromTrafficDate").val();
            toDateTooltip = $("#toTrafficDate").val();
        });
        $('#prevDay').click(function () {
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            loadChart("prevDay");
            $('#trafficVolumeCharts').show();
            //update the HelpTextIcon
            updateHelpText('bizPostTrafficPrevDay');
            $("#toTrafficDate").val('');
            $("#fromTrafficDate").val('');
            fromDateTooltip = $("#fromTrafficDate").val();
            toDateTooltip = $("#toTrafficDate").val();
        });
        $('#customDate').click(function () {
            $('.custom-date').css('display','inline-block');
            $("#toTrafficDate").attr("disabled", false);
            $("#fromTrafficDate").attr("disabled", false);
            $("#searchBtn").attr("disabled", false);
            highchartsInitialize();
            highchartsDestroy();
            loadChart("today");
            $(".datePicker").css('background', '#fff');
            $("#fromTrafficDate.datePicker").css('background', '#fff');
            $('#trafficVolumeCharts').hide();
            //update the HelpTextIcon
            updateHelpText('bizPostTrafficCustomDate');
            fromDateTooltip = $("#fromTrafficDate").val();
            toDateTooltip = $("#toTrafficDate").val();
        });

        $('#searchBtn').click(function () {

            if (undefined !== $("#fromTrafficDate").val() && undefined !== $("#toTrafficDate").val() && '' !== $("#fromTrafficDate").val() && '' !== $("#toTrafficDate").val()) {

                fromDateTooltip = $("#fromTrafficDate").val();
                toDateTooltip = $("#toTrafficDate").val();
                highchartsInitialize();
                highchartsDestroy();
                loadChart("customDate");
                $(".datePicker").css('background', '#fff');
                disableCustomDatePicker(false, 'fromTrafficDate', 'toTrafficDate');
                $("#toTrafficDate.datePicker").css('background', '#eee');

                clearDatePicker('fromTrafficDate', 'toTrafficDate', '-180d', '-1d', '-180d', '-1d');
                // update the HelpTextIcon
                updateHelpText('bizPostOrderCustomDate');
            } else {
                emptyDateValidation('fromTrafficDate', 'toTrafficDate');
            }

        });

        $(".filterDiv label").click(function () {
            return ("customDate" === this.id) ? disableCustomDatePicker(false, 'fromTrafficDate', 'toDate') : disableCustomDatePicker(true, 'fromTrafficDate', 'toTrafficDate', true);
        });


        $('#downloadExportData').click(function () {
            $("#exportTableModal").modal("show");
            $(".datePicker").css('background', '#eee');
            $("#modalInfoText").text(getBannerHelpText("exportExcelData", "modalInfoText"));
            downloadChartData();
            setTimeout(function () {
                $('#exportTableModal').modal('hide');
            }, 2500);
        });

        function downloadChartData() {
            fromplus = getExportDatePlusSetter(90);
            toplus = getExportDatePlusSetter(0);
            fromDate = getExportDateSetter(180);
            toDate = getExportDateSetter(0);
            var queryMapKey = "bizPostDrillTrafficQuery";
            getResultsAndExport(queryMapKey, "trafficVoiceBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "trafficSmsBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "trafficDataBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "trafficVoicePrevdayBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "trafficSmsPrevdayBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "trafficDataPrevdayBusinessData", country, fromDate, toDate);
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
            searchmanager.settings.set("search", getCustomQuery(mapKey, planQuery, country, fromDate, toDate, fromplus, toplus, serviceType));

            searchmanager.startSearch();
            searchmanager.on('search:progress', function (properties) {});

            searchmanager.on('search:done', function (properties) {

                var searchResults = searchmanager.data("results");
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

        function getOnlySearchResultsConstructor(id) {
            var randomValue = Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15);
            var searchmanager = new SearchManager({
                "id": id + randomValue,
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

        function processTrafficSessions(rows) {

            // The search results
            var sessionsData;
            var sessionsResultData = rows;
            var currentWeekData = [];
            var curtempData = [];
            var prevWeekData = [];
            var prevtempData = [];

            if (sessionsResultData != null) {
                //Code to plot data to MNP Chart
                for (var i = 0; i < sessionsResultData.length; i++) {
                    curtempData = [];
                    prevtempData = [];
                    for (var j = 0; j < sessionsResultData[i].length; j++) {
                        if (j == 0) {
                            curtempData
                                .push(
                                    parseFloat(sessionsResultData[i][j]),
                                    parseFloat(sessionsResultData[i][j + 1]));
                        }
                        if (j == 1) {
                            prevtempData
                                .push(
                                    parseFloat(sessionsResultData[i][j - 1]),
                                    parseFloat(sessionsResultData[i][j + 1]));
                        }
                    }
                    currentWeekData.push(curtempData);
                    prevWeekData.push(prevtempData);
                }
            }

            sessionsData = {
                "currentWeek": currentWeekData,
                "prevWeek": prevWeekData
            };
            changeTab('traffic/hourly', 'activeSessionChart', sessionsData);
        }

        function processTrafficSms(rows) {
            var smsData;
            // The search results
            var smsResultData = rows;
            var currentWeekSms = [];
            var curtempSms = [];
            var prevWeekSms = [];
            var prevtempSms = [];

            if (smsResultData != null) {
                //Code to plot data to MNP Chart
                for (var i = 0; i < smsResultData.length; i++) {
                    curtempSms = [];
                    prevtempSms = [];
                    for (var j = 0; j < smsResultData[i].length; j++) {
                        if (j == 0) {
                            curtempSms.push(
                                parseFloat(smsResultData[i][j]),
                                parseFloat(smsResultData[i][j + 1]));
                        }
                        if (j == 1) {
                            prevtempSms.push(
                                parseFloat(smsResultData[i][j - 1]),
                                parseFloat(smsResultData[i][j + 1]));
                        }
                    }
                    currentWeekSms.push(curtempSms);
                    prevWeekSms.push(prevtempSms);
                }
            }
            smsData = {
                "currentWeek": currentWeekSms,
                "prevWeek": prevWeekSms
            };
            changeTab('traffic/hourly', 'smsChart', smsData);
        }

        // function refreshHourly() {
        //     updateTrafficChart('activeSessionChart', sessionsData, new Date())
        //     updateTrafficChart('voiceChart', voiceData, new Date());
        //     updateTrafficChart('smsChart', smsData, new Date());
        // }

        var traffiChartConfig = {
            chart: {
                type: 'arearange',
                zoomType: 'x'
            },
            credits: {
                enabled: false
            },
            colors: ['#EB9532'],
            title: {
                text: ''
            },
            exporting: {
                filename: "Traffic Chart"
            },
            xAxis: {
                minTickInterval: "00:00",
                minorTickInterval: 2,
                dateTimeLabelFormats: {
                    minute: '%I:%M %p'
                }
            },
            yAxis: {
                title: {
                    text: 'TPH'
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            legend: {
                enabled: false
            },
        };

        var refreshHandle;

        function changeTab(tabName, targetEle, subData) {
            var isPrepaid = false;
            if (tabName == 'traffic/hourly') {
                createTrafficChart(targetEle, '', subData, traffiChartConfig, fromDateTooltip, toDateTooltip, new Date(), isPrepaid, "")
            } else if (tabName == 'traffic/daily') {
                clearInterval(refreshHandle);
                // need to pass 1st arg as follows: 'daily-gy', 'daily-voice', 'daily-sms'
                createTrafficChart(targetEle, '', subData, traffiChartConfig, fromDateTooltip, toDateTooltip, "", isPrepaid, "");
            }
            }
            

            function highchartsInitialize() {

                /*voiceChart = Highcharts.chart('voiceChart',
                        bizPostTrafficDrill.today.countrywise);
                smsChart = Highcharts.chart('smsChart',
                        bizPostOrder.today.planwise);
                activeSessionChart = Highcharts.chart('activeSessionChart',
                        bizPostTrafficDrill.today.volSms);*/
                roamingVoiceChart = Highcharts.chart('roamingVoiceChart',
                    bizPostTrafficDrill.today.volVoice);
                roamingSMSChart = Highcharts.chart('roamingSMSChart',
                    bizPostTrafficDrill.today.volSms);
                roamingDataChart = Highcharts.chart('roamingDataChart',
                    bizPostTrafficDrill.today.volData);
            
            
            }
            
            function highchartsDestroy() {
                /*	voiceChart.destroy();
                    smsChart.destroy();
                    activeSessionChart.destroy();*/
                roamingVoiceChart.destroy();
                roamingSMSChart.destroy();
                roamingDataChart.destroy();
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

    });

