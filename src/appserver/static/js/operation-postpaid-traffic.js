//Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("button[type='button']").attr("disabled", true);
});
var fromDateTooltip = "";
var toDateTooltip = "";
var roamingVoiceChart = '';
var roamingSMSChart = '';
var roamingDataChart = '';

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

        //TO SELECT COUNTRY 
         // Load individual components
        var SearchManager = require("splunkjs/mvc/searchmanager");
        var utils = require("splunkjs/mvc/utils");
        var pageLoading = true;


        var fromplus = "";
        var toplus = "";
        var fromDate = '';
        var toDate = '';
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

        highchartsInitialize();
        highchartsDestroy();

        loadChart("today");

        $('#today').click(function () {
            $('.custom-date').hide();
            highchartsInitialize();
            highchartsDestroy();
            loadChart("today");
           // $('#trafficVolumeCharts').hide();
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
           // $('#trafficVolumeCharts').show();
            //update the HelpTextIcon
            updateHelpText('bizPostTrafficPrevDay');
            fromDateTooltip = $("#fromTrafficDate").val();
            toDateTooltip = $("#toTrafficDate").val();
        });
        $('#customDate').click(function () {
            $('.custom-date').css('display','inline-block');
            $("#searchBtn").attr("disabled", false);
            highchartsInitialize();
            highchartsDestroy();
            loadChart("today");
          	$(".datePicker").css('background', '#fff');
          //  $('#trafficVolumeCharts').hide();
            $("#fromTrafficDate.datePicker").css('background', '#fff');
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
            return ("customDate" === this.id) ? disableCustomDatePicker(false, 'fromTrafficDate', 'toTrafficDate') : disableCustomDatePicker(true, 'fromTrafficDate', 'toTrafficDate', true);
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

        function loadChart(chartType) {
            fromDate = $("#fromTrafficDate").val();
            toDate = $("#toTrafficDate").val();
            if ("" !== fromDate && "" !== toDate) {
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

            var vlmVoiceQuery = "biz_post_traffic_roamingVoice";
            var vlmSmsQuery = "biz_post_traffic_roamingSms";
            var vlmDataQuery = "biz_post_traffic_roamingData";

            var voiceQuery = "biz_post_traffic_voice";
            var smsQuery = "biz_post_traffic_sms";
            var dataQuery = "biz_post_traffic_data";

            if ("today" === chartType) {
                vlmVoiceQuery = "biz_post_traffic_roamingVoice";
                vlmSmsQuery = "biz_post_traffic_roamingSms";
                vlmDataQuery = "biz_post_traffic_roamingData";

                voiceQuery = "biz_post_traffic_voice";
                smsQuery = "biz_post_traffic_sms";
                dataQuery = "biz_post_traffic_data";

                $('#trafficVolumeCharts').hide();

            } else if ("prevDay" === chartType) {
                vlmVoiceQuery = "biz_post_traffic_roamingVoice_prevday";
                vlmSmsQuery = "biz_post_traffic_roamingSms_prevday";
                vlmDataQuery = "biz_post_traffic_roamingData_prevday";

                voiceQuery = "biz_post_traffic_voice_prevday";
                smsQuery = "biz_post_traffic_sms_prevday";
                dataQuery = "biz_post_traffic_data_prevday";

                $('#trafficVolumeCharts').show();
            } else if ("customDate" === chartType) {
                voiceQuery = "biz_post_traffic_voice_cusdt";
                smsQuery = "biz_post_traffic_sms_cusdt";
                dataQuery = "biz_post_traffic_data_cusdt";
                highchartsInitialize();
                $('#trafficVolumeCharts').hide();
            }

            // search for volume voice - start
            vlmVoiceData.settings.unset("search");
            vlmVoiceData.settings.set("search", getQuery("bizPostDrillTrafficQuery", vlmVoiceQuery, country,"", "", serviceType));
            vlmVoiceData.startSearch();

            vlmVoiceData.on('search:progress', function () {
                showLoader("roamingVoiceChart", "roamingVoiceChartPreloader");
            });

            vlmVoiceData.on('search:done', function () {
                var vlmVoiceResults = vlmVoiceData.data("results");
                var isNoData = true;
                vlmVoiceResults.on("data", function (queryResults) {
                    $('#roamingVoiceChartPreloader').hide();
                    if (undefined !== queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadVolumeChart(chartType, finalDataJson.data, "volVoice", "roamingVoiceChart");
                        isNoData = false;
                    }
                });
                if (isNoData) {
                    Highcharts.chart('roamingVoiceChart', bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                }
                $('#roamingVoiceChartPreloader').hide();
                refreshDateTime();

            });
            // search for volume voice - end

            // search for volume sms - start
            vlmSmsData.settings.unset("search");
            vlmSmsData.settings.set("search", getQuery("bizPostDrillTrafficQuery", vlmSmsQuery, country,"", "", serviceType));
            vlmSmsData.startSearch();

            vlmSmsData.on('search:progress', function () {
                showLoader("roamingSMSChart", "roamingSMSChartPreloader");
            });
            vlmSmsData.on('search:done', function () {
                var vlmSmsResults = vlmSmsData.data("results");
                var isNoData = true;
                vlmSmsResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadVolumeChart(chartType, finalDataJson.data, "volSms", "roamingSMSChart");
                        isNoData = false;
                    }
                });
                if (isNoData) {
                    Highcharts.chart('roamingSMSChart', bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                }
                $('#roamingSMSChartPreloader').hide();
                refreshDateTime();

            });
            // search for volume sms - end

            // search for volume data - start
            vlmDtData.settings.unset("search");
            vlmDtData.settings.set("search", getQuery("bizPostDrillTrafficQuery", vlmDataQuery, country,"", "", serviceType));
            vlmDtData.startSearch();

            vlmDtData.on('search:progress', function () {
                showLoader("roamingDataChart", "roamingDataChartPreloader");
            });
            vlmDtData.on('search:done', function () {
                var vlmDataResults = vlmDtData.data("results");
                var isNoData = true;
                vlmDataResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadVolumeChart(chartType, finalDataJson.data, "volData", "roamingDataChart");
                        isNoData = false;
                    }
                });
                if (isNoData) {
                    Highcharts.chart('roamingDataChart', bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                }
                $('#roamingDataChartPreloader').hide();
                refreshDateTime();

            });
            // search for volume data - end

            // search for voice trend- start
            voiceData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                voiceData.settings.set("search", getCustomQuery("bizPostDrillTrafficQuery", voiceQuery, country, fromDate, toDate, fromplus, toplus));
            } else {
                voiceData.settings.set("search", getQuery("bizPostDrillTrafficQuery", voiceQuery, country,"", "", serviceType));
            }
            voiceData.startSearch();
            showLoader("voiceChart", "voiceChartPreloader");
            voiceData.on('search:done', function () {
                var isNoData = true;
                var voiceDataResults = voiceData.data("results");
                voiceDataResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        processTrafficAreaData(finalDataJson.data, 'voiceChart', "hour", "value", "lastweekvalue", chartType);
                        isNoData = false;
                    }
                });
                $('#voiceChartPreloader').hide();
                refreshDateTime();
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('voiceChart', bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);

            });
            // search for voice trend- end

            // search for sms trend- start
            smsData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                smsData.settings.set("search", getCustomQuery("bizPostDrillTrafficQuery", smsQuery, country, fromDate, toDate, fromplus, toplus));
            } else {
                smsData.settings.set("search", getQuery("bizPostDrillTrafficQuery", smsQuery, country,"", "", serviceType));
            }
            smsData.startSearch();
            showLoader("smsChart", "smsChartPreloader");
            smsData.on('search:done', function () {
                var isNoData = true;
                var smsDataResults = smsData.data("results");
                smsDataResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        processTrafficAreaData(finalDataJson.data, 'smsChart', "hour", "value", "lastweekvalue",chartType);
                        isNoData = false;
                    }
                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('smsChart', bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);
                $('#smsChartPreloader').hide();
                refreshDateTime();
            });
            // search for sms trend- end

            // search for data trend - start
            dtData.settings.unset("search");
            if ("" !== fromDate && "" !== toDate) {
                dtData.settings.set("search", getCustomQuery("bizPostDrillTrafficQuery", dataQuery, country, fromDate, toDate, fromplus, toplus));
            } else {
                dtData.settings.set("search", getQuery("bizPostDrillTrafficQuery", dataQuery, country,"", "", serviceType));
            }
            dtData.startSearch();
            showLoader("activeSessionChart", "activeSessionChartPreloader");
            dtData.on('search:done', function () {
                var isNoData = true;
                var dtDataResults = dtData.data("results");
                dtDataResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        processTrafficAreaData(finalDataJson.data, 'activeSessionChart', "hour", "value", "lastweekvalue",chartType);
                        isNoData = false;
                    }
                });
                setTimeout(
                    function () {
                        if (isNoData) {
                            Highcharts.chart('activeSessionChart', bizPostTrafficEmpty.emptyChartConfig.emptyChart);
                        }
                    }, 3000);
                
                $('#activeSessionChartPreloader').hide();
                refreshDateTime();
            });
            // search for data trend - end
        }

        // To laod the volume charts for voice, sms, data
        // Param
        // chartType - type of chart
        // rows - data of splunk query
        // kpitype - kpi type for data
        // chartID - load the data to ID
        function loadVolumeChart(chartType, rows, kpitype, chartID) {
            var vlmVoiceChart = Highcharts.chart(chartID, bizPostTrafficDrill[chartType][kpitype]);
            setPieData(rows, vlmVoiceChart, "nettype", "call_count");
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
                var searchResults = searchmanager.data("results", {
                    "count": 0,
                    "offset": 0
                });
                searchResults.on("data", function (queryResults) {
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

        function getOnlySearchResultsConstructor(id) {
            var searchmanager = new SearchManager({
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

        function processTrafficAreaData(rows, chartID, hour, currWeek, lastWeek,chartType) {
            // The search results
            var kpiData = {};
            kpiData.currentWeek = "";
            kpiData.prevWeek = "";
            var kpiResultData = rows;
            var currentWeekKpi = [];
            var prevWeekKpi = [];

            if (null !== kpiResultData) {
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
            changeTab('traffic/hourly', chartID, kpiData,chartType);
        }

        var refreshHandle;

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

        function changeTab(tabName, targetEle, subData,chartType) {
            var isPrepaid = false;
            if ('traffic/hourly' === tabName) {
                createTrafficChart(targetEle, '', subData, traffiChartConfig, fromDateTooltip, toDateTooltip, new Date(), isPrepaid,chartType)
            } else if ('traffic/daily' === tabName) {
                clearInterval(refreshHandle);
                // need to pass 1st arg as follows: 'daily-gy', 'daily-voice', 'daily-sms'
                createTrafficChart(targetEle, '', subData, traffiChartConfig, fromDateTooltip, toDateTooltip, "", isPrepaid,chartType);
            }
        }

                function highchartsInitialize() {
            roamingVoiceChart = Highcharts.chart('roamingVoiceChart',
                bizPostTrafficDrill.today.volVoice);
            roamingSMSChart = Highcharts.chart('roamingSMSChart',
                bizPostTrafficDrill.today.volSms);
            roamingDataChart = Highcharts.chart('roamingDataChart',
                bizPostTrafficDrill.today.volData);
        }

        function highchartsDestroy() {
            roamingVoiceChart.destroy();
            roamingSMSChart.destroy();
            roamingDataChart.destroy();
        }

        pageLoading = false;

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

