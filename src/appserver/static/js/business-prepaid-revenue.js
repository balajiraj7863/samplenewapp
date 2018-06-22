var countryWiseSearchData;
var volWiseSearchData;
var serviceWiseSearchData;

var mtdVoiceSearchData;
var mtdSmsSearchData;
var mtdDataSearchData;
var mtdTopupSearchData;
$('.mtdApply').removeAttr('disabled');
var oldCountryList, country;
var filterDate = "previousDay";
var mtdDate = new Date();
var month_number = mtdDate.getMonth();
mtdDate = mtdDate.getFullYear() + "" + "-" + (mtdDate.getMonth() + 1) + "-" + (mtdDate.getDate()-1);
var revServicewiseChart = Highcharts.chart('serviceVoice', bizPostUnbillRev.previousDay.revService);
var volServiceswiseChart = Highcharts.chart('volumeByServices', bizPostUnbillRev.previousDay.volUsageService);
var countrywiseChart = Highcharts.chart('countryRevenue', bizPostUnbillRev.previousDay.countrywise);
// mtd charts initialising
var voiceMtdChart = Highcharts.chart('voiceMTDChart', mtdChartConfig.voiceMtd);
var smsMtdChart = Highcharts.chart('smsMTDChart', mtdChartConfig.smsMtd);
var dataMtdChart = Highcharts.chart('dataMTDChart', mtdChartConfig.dataMtd);
var topupMtdChart = Highcharts.chart('topupMTDChart', mtdChartConfig.topupMtd);
var currenttab = "previousDay";

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
        var pageLoading = !0;
        updateHelpText('bizPreRevDaily');

        function updateHelpText(mapKey) {
            getHelpText(mapKey, "revServicewiseHelp");
            getHelpText(mapKey, "volServiceswiseHelp");
            getHelpText(mapKey, "countrywiseHelp");
            getHelpText(mapKey, "voiceMTDHelp");
            getHelpText(mapKey, "smsMTDHelp");
            getHelpText(mapKey, "dataMTDHelp");
            getHelpText(mapKey, "topupMTDHelp");
        }
        $('.mtdCharts').hide();
        var oldCountryList = "";
        var country = "";
        var serviceType = "Prepaid";
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var isExportData = !1;
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
            var targetEle = $(".filterDiv .active").find('input');
            targetEle.trigger('click')
        }
        // highchartsInitialize();
        // highchartsDestroy();
        // loadChart("daily");
        $('.customDateDisable').click(function () {
            $("input[type='text']").attr("disabled", true);
            $("button[type='button']").attr("disabled", true);
        });
        $('#prevDay').click(function () {
            currenttab = "previousDay";
            filterDate=currenttab;
            $('.mtdCharts').hide();
            $('.nonMtdCharts').show();
            $("#toggleRevAll").prop("checked", !0);
            $("#toggleVolVoice").prop("checked", !0);
            highchartsInitialize();
            highchartsDestroy();
            $("input[type='text']").val('');
            loadChart("previousDay");
            updateHelpText('bizPreRevPrevDay')
        });
        $('#daily').click(function () {
            currenttab = "daily";
            filterDate = currenttab;
            $('.mtdCharts').hide();
            $('.nonMtdCharts').show();
            $("#toggleRevAll").prop("checked", !0);
            $("#toggleVolVoice").prop("checked", !0);
            $("#option1").prop("checked", !0);
            $("input[type='text']").val('');
            highchartsInitialize();
            highchartsDestroy();
            loadChart("daily");
            updateHelpText('bizPreRevDaily')
        });
        $('#weekly').click(function () {
            currenttab = "weekly";
            filterDate = currenttab;
            $('.mtdCharts').hide();
            $('.nonMtdCharts').show();
            $("#toggleRevAll").prop("checked", !0);
            $("#toggleVolVoice").prop("checked", !0);
            $("#option1").prop("checked", !0);
            $("input[type='text']").val('');
            highchartsInitialize();
            highchartsDestroy();
            loadChart("weekly");
            updateHelpText('bizPreRevWeekly')
        });
        $('#monthly').click(function () {
            currenttab = "monthly";
            filterDate = currenttab;
            $('.mtdCharts').hide();
            $('.nonMtdCharts').show();
            $("#toggleRevAll").prop("checked", !0);
            $("#toggleVolVoice").prop("checked", !0);
            $("#option1").prop("checked", !0);
            $("input[type='text']").val('');
            highchartsInitialize();
            highchartsDestroy();
            loadChart("monthly");
            updateHelpText('bizPreRevMonthly')
        });
        $('#monthToDate').click(function () {
            currenttab = "monthToDate";
            $('.mtdCharts').show();
            $('.nonMtdCharts').hide();
            $("#toggleRevAll").prop("checked", !0);
            $("#toggleVolVoice").prop("checked", !0);
            $("#option1").prop("checked", !0);
            $(".datePicker").css('background', '#fff');
            $("#fromDate.datePicker").css('background', '#fff');
            $('.mtdApply').removeAttr('disabled');
            $("#searchBtn").attr("disabled", false);
            processMtdCharts();
            updateHelpText('bizPreRevMTD');
        });
        $('#customDate').click(function () {
            currenttab = "daily";
            filterDate = "customDate";
            $('.mtdCharts').hide();
            $('.nonMtdCharts').show();
            $("#toggleRevAll").prop("checked", !0);
            $("#toggleVolVoice").prop("checked", !0);
            $("#option1").prop("checked", !0);
    
    
    
            // load the from and to date at first time
            var display_from_date = new Date();
            var display_to_date = new Date();
            // var d = new Date();
            display_to_date.setDate(display_to_date.getDate() - 1);
            display_from_date.setDate(display_from_date.getDate() - 7);
            display_from_date = (display_from_date.getMonth() + 1) + "/" + display_from_date.getDate() + "/" + display_from_date.getFullYear();
            display_to_date = (display_to_date.getMonth() + 1) + "/" + display_to_date.getDate() + "/" + display_to_date.getFullYear();
    
            $("#fromDate").val(display_from_date);
            $("#toDate").val(display_to_date);
            loadChart("daily");
            $(".datePicker").css('background', '#fff');
            $("#fromDate.datePicker").css('background', '#fff');
            updateHelpText('bizPreRevCustomDate')
        });
    
        $('.mtdApply').click(function () {
            if (undefined !== $("#mtdDate").val() && '' !== $("#mtdDate").val()) {
                highchartsInitialize();
                highchartsDestroy();
                mtdDate = $("#mtdDate").val();
                var  selectedMtdDate = new Date(mtdDate);
                month_number = selectedMtdDate.getMonth();
                processMtdCharts();
                updateHelpText('bizPreRevCustomDate')
            }
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
                updateHelpText('bizPreRevCustomDate')
            } else {
                emptyDateValidation('fromDate', 'toDate')
            }
        });
    
        $('#daily').trigger("click");
        $(".filterDiv label").click(function () {
            return ("customDate" === this.id || "monthToDate" === this.id) ? disableCustomDatePicker(false, 'fromDate', 'toDate') : disableCustomDatePicker(true, 'fromDate', 'toDate', true);
        });
        $('#downloadExportData').click(function () {
            $("#exportTableModal").modal("show");
            $("#modalInfoText").text(getBannerHelpText("exportExcelData", "modalInfoText"));
            $(".datePicker").css('background', '#eee');
            downloadChartData();
            setTimeout(function () {
                $('#exportTableModal').modal('hide')
            }, 2500)
        });
    
        function downloadChartData() {
            fromDate = getExportDateSetter(180);
            toDate = getExportDateSetter(0);
            var queryMapKey = "bizPreDrillRevQuery";
            getResultsAndExport(queryMapKey, "revenueServiceAllBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueServiceVoiceBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueServiceSmsBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueServiceDataBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueVolVoiceBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueVolSmsBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueVolDataBusinessData", country, fromDate, toDate);
            getResultsAndExport(queryMapKey, "revenueCountryBusinessData", country, fromDate, toDate);
            return !1
        }
    
        function processMtdCharts() {
            $('.mtdApply').removeAttr('disabled');
            var smsCumulativeQuery = "";
            var voiceCumulativeQuery = "";
            var dataCumulativeQuery = "";
            var topupCumulativeQueryery = "";
            voiceCumulativeQuery = "voice_cumulative_revenue";
            smsCumulativeQuery = "sms_cumulative_revenue";
            dataCumulativeQuery = "data_cumulative_revenue";
            topupCumulativeQueryery = "topup_cumulative_revenue";
    
            
    
            mtdVoiceSearchData = getOnlySearchResultsConstructor("revenuebyPlansPreloader", "24h");
            var qry1 = getQuery("bizPreDrillRevMTDQuery", voiceCumulativeQuery, country, fromDate, toDate, serviceType);
            qry1 = qry1.replace(/dateparam/gi, mtdDate);
            mtdVoiceSearchData.settings.set("search", qry1)
    
            mtdVoiceSearchData.startSearch();
            $('#voiceMTDChart').html('<div id="voiceMTDChartchartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#voiceMTDChartchartPreloader').show();
            mtdVoiceSearchData.on('search:done', function () {
                var mtdSearchResults = mtdVoiceSearchData.data("results");
                var isNoData = !0;
                mtdSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        // loadPlanChart(chartType, finalDataJson.data);
                        var results = cumulativeChartProcessor(finalDataJson.data, "day", "revenue1", "revenue2", "revenue3");
                        mtdChartConfig.voiceMtd.series[0].data = results.rev3;
                        mtdChartConfig.voiceMtd.series[1].data = results.rev2;
                        mtdChartConfig.voiceMtd.series[2].data = results.rev1;
                        mtdChartConfig.voiceMtd.xAxis.categories = results.days;
    
                        mtdChartConfig.voiceMtd.series[0].name = getMonthForMtd(month_number - 2);
                        mtdChartConfig.voiceMtd.series[1].name = getMonthForMtd(month_number - 1);
                        mtdChartConfig.voiceMtd.series[2].name = getMonthForMtd(month_number);
    
                        Highcharts.chart('voiceMTDChart', mtdChartConfig.voiceMtd);
    
                        isNoData = !1
                    }
                });
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('voiceMTDChart', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart)
                    }
                }, 3000);
                $('#voiceMTDChartchartPreloader').hide()
            });
    
    
            mtdSmsSearchData = getOnlySearchResultsConstructor("revenuebyPlansPreloader", "24h");
            var qry2 = getQuery("bizPreDrillRevMTDQuery", smsCumulativeQuery, country, fromDate, toDate, serviceType);
            qry2 = qry2.replace(/dateparam/gi, mtdDate);
            mtdSmsSearchData.settings.set("search", qry2)
    
            mtdSmsSearchData.startSearch();
            $('#smsMTDChart').html('<div id="smsMTDChartchartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#smsMTDChartchartPreloader').show();
            mtdSmsSearchData.on('search:done', function () {
                var mtdSearchResults = mtdSmsSearchData.data("results");
                var isNoData = !0;
                mtdSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        // loadPlanChart(chartType, finalDataJson.data);
                        var results = cumulativeChartProcessor(finalDataJson.data, "day", "revenue1", "revenue2", "revenue3");
                        mtdChartConfig.smsMtd.series[0].data = results.rev3;
                        mtdChartConfig.smsMtd.series[1].data = results.rev2;
                        mtdChartConfig.smsMtd.series[2].data = results.rev1;
                        mtdChartConfig.smsMtd.xAxis.categories = results.days;
    
                        mtdChartConfig.smsMtd.series[0].name = getMonthForMtd(month_number - 2);
                        mtdChartConfig.smsMtd.series[1].name = getMonthForMtd(month_number - 1);
                        mtdChartConfig.smsMtd.series[2].name = getMonthForMtd(month_number);
    
                        Highcharts.chart('smsMTDChart', mtdChartConfig.smsMtd);
    
                        isNoData = !1
                    }
                });
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('smsMTDChart', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart)
                    }
                }, 3000);
                $('#smsMTDChartchartPreloader').hide()
            });
    
            mtdDataSearchData = getOnlySearchResultsConstructor("revenuebyPlansPreloader", "24h");
    
    
            var qry3 = getQuery("bizPreDrillRevMTDQuery", dataCumulativeQuery, country, fromDate, toDate, serviceType);
            qry3 = qry3.replace(/dateparam/gi, mtdDate);
            mtdDataSearchData.settings.set("search", qry3)
    
            mtdDataSearchData.startSearch();
            $('#dataMTDChart').html('<div id="dataMTDChartchartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#dataMTDChartchartPreloader').show();
            mtdDataSearchData.on('search:done', function () {
                var mtdSearchResults = mtdDataSearchData.data("results");
                var isNoData = !0;
                mtdSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        // loadPlanChart(chartType, finalDataJson.data);
                        var results = cumulativeChartProcessor(finalDataJson.data, "day", "revenue1", "revenue2", "revenue3");
                        mtdChartConfig.dataMtd.series[0].data = results.rev3;
                        mtdChartConfig.dataMtd.series[1].data = results.rev2;
                        mtdChartConfig.dataMtd.series[2].data = results.rev1;
                        mtdChartConfig.dataMtd.xAxis.categories = results.days;
    
                        mtdChartConfig.dataMtd.series[0].name = getMonthForMtd(month_number - 2);
                        mtdChartConfig.dataMtd.series[1].name = getMonthForMtd(month_number - 1);
                        mtdChartConfig.dataMtd.series[2].name = getMonthForMtd(month_number);
    
                        Highcharts.chart('dataMTDChart', mtdChartConfig.dataMtd);
    
                        isNoData = !1;
                    }
                });
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('dataMTDChart', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart)
                    }
                }, 3000);
                $('#dataMTDChartchartPreloader').hide()
            });
    
            mtdTopupSearchData = getOnlySearchResultsConstructor("revenuebyPlansPreloader", "24h");
            var qry4 = getQuery("bizPreDrillRevMTDQuery", topupCumulativeQueryery, country, fromDate, toDate, serviceType);
            qry4 = qry4.replace(/dateparam/gi, mtdDate);
            mtdTopupSearchData.settings.set("search", qry4)
    
            mtdTopupSearchData.startSearch();
            $('#topupMTDChart').html('<div id="topupMTDChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#topupMTDChartPreloader').show();
            mtdTopupSearchData.on('search:done', function () {
                var mtdSearchResults = mtdTopupSearchData.data("results");
                var isNoData = !0;
                mtdSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        // loadPlanChart(chartType, finalDataJson.data);
                        var results = cumulativeChartProcessor(finalDataJson.data, "day", "revenue1", "revenue2", "revenue3");
                        mtdChartConfig.topupMtd.series[0].data = results.rev3;
                        mtdChartConfig.topupMtd.series[1].data = results.rev2;
                        mtdChartConfig.topupMtd.series[2].data = results.rev1;
                        mtdChartConfig.topupMtd.xAxis.categories = results.days;
    
                        mtdChartConfig.topupMtd.series[0].name = getMonthForMtd(month_number - 2);
                        mtdChartConfig.topupMtd.series[1].name = getMonthForMtd(month_number - 1);
                        mtdChartConfig.topupMtd.series[2].name = getMonthForMtd(month_number);
    
                        Highcharts.chart('topupMTDChart', mtdChartConfig.topupMtd);
    
                        isNoData = !1
                    }
                });
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('topupMTDChart', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart)
                    }
                }, 3000);
                $('#topupMTDChartPreloader').hide()
            });

            function getMonthForMtd(month_number) {
                if (month_number < 0) {
                    month_number = month_number + 12;
                }
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return months[month_number];
            }
        }
    
        function loadChart(chartType) {
            var serviceQuery = "";
            var volQuery = "";
            var cntryQuery = "";
            var volumequery = "biz_rev_pre_volume_voice_pd";
            var servicequery = "biz_rev_pre_service_all_pd";
    
    
            fromDate = $("#fromDate").val();
            toDate = $("#toDate").val();
            $(".datePicker").css('border', '1px solid #ccc');
            $(".datePicker").css('background', '#eee');
            getHelpText("exportExcelData", "exportExcelDateHelp");
            if (chartType == "previousDay") {
                serviceQuery = "biz_rev_pre_service_all_pd";
                cntryQuery = "biz_rev_pre_country";
                volQuery = "biz_rev_pre_volume_voice_pd"
            } else if (chartType == "daily") {
                serviceQuery = "biz_rev_pre_service_all_daily";
                cntryQuery = "biz_rev_pre_country_daily";
                volQuery = "biz_rev_pre_vol_voice_daily";
                volumequery = volQuery;
                servicequery = serviceQuery;
            } else if (chartType == "weekly") {
                serviceQuery = "biz_rev_pre_service_all_wkly";
                cntryQuery = "biz_rev_pre_country_wkly";
                volQuery = "biz_rev_pre_vol_voice_wkly";
                volumequery = volQuery;
                servicequery = serviceQuery;
            } else if (chartType == "monthly") {
                serviceQuery = "biz_rev_pre_service_all_mnthly";
                cntryQuery = "biz_rev_pre_country_mnthly";
                volQuery = "biz_rev_pre_vol_voice_mnthly";
                volumequery = volQuery;
                servicequery = serviceQuery;
            } else if (chartType == "customDate") {
                serviceQuery = "biz_rev_pre_service_all_cusdt";
                cntryQuery = "biz_rev_pre_country_cusdt";
                volQuery = "biz_rev_pre_vol_voice_cusdt";
                volumequery = volQuery;
                servicequery = serviceQuery;
            }
            loadVolumeChart(volumequery, "unBilledServiceVol", "previousDay", "toggleVolVoice")
    
            loadServiceChart(servicequery, "unBilledServiceRevenueData", "previousDay", "toggleRevData");
            countryWiseSearchData = getOnlySearchResultsConstructor("", "24h");
            countryWiseSearchData.settings.unset("search");
            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0'
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59"
                }
                countryWiseSearchData.settings.set("search", getQuery("bizPreDrillRevQuery", cntryQuery, country, fromDate, toDate, serviceType))
            } else {
                countryWiseSearchData.settings.set("search", getQuery("bizPreDrillRevQuery", cntryQuery, country, "", "", serviceType))
            }
            countryWiseSearchData.startSearch();
            $('#countryRevenue').html('<div id="countryRevenuePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#countryRevenuePreloader').show();
            countryWiseSearchData.on('search:done', function () {
                var countryWiseSearchResults = countryWiseSearchData.data("results");
                var isNoData = !0;
                countryWiseSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadCountryChart(chartType, finalDataJson.data);
                        isNoData = !1
                    }
                });
                $('#countryRevenuePreloader').hide();
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('countryRevenue', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart)
                    }
                }, 3000)
            })
        }
    
    
        function getOnlySearchResultsConstructor(id, interval) {
            var searchmanager = new SearchManager({
                preview: !0,
                "refresh": "0",
                "refreshType": "delay",
                cache: !0,
                status_buckets: 300,
                "search": ""
            }, {
                tokens: !0,
                tokenNamespace: "submitted"
            });
            return searchmanager
        }
    
        function getResultsAndExport(mapKey, planQuery, country, fromDate, toDate) {
            var searchmanager = new SearchManager({
                preview: !0,
                "refresh": "24h",
                "refreshType": "delay",
                cache: !0,
                status_buckets: 300,
                "search": ""
            }, {
                tokens: !0,
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
                            exportResultToCsv(searchResults.data().rows, searchResults.data().fields, planQuery, !0)
                        }
                    }
                })
            });
            return searchmanager
        }
    
        function loadServiceChart(query, type, chartType, category) {
            Highcharts.chart('serviceVoice', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
            var serviceWiseSearchData = new SearchManager({
                preview: !0,
                "refresh": "24h",
                "refreshType": "delay",
                cache: !0,
                status_buckets: 300,
                "search": ""
            }, {
                tokens: !0,
                tokenNamespace: "submitted"
            });
            serviceWiseSearchData.settings.unset("search");
            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0'
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59"
                }
                serviceWiseSearchData.settings.set("search", getQuery("bizPreDrillRevQuery", query, country, fromDate, toDate, serviceType))
            } else {
                serviceWiseSearchData.settings.set("search", getQuery("bizPreDrillRevQuery", query, country, "", "", serviceType))
            }
            serviceWiseSearchData.startSearch();
            $('#serviceVoice').html('<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#serviceVoicePreloader').show();
            serviceWiseSearchData.on('search:done', function (properties) {
                var serviceWiseResults = serviceWiseSearchData.data("results");
                var isNoData = !0;
                serviceWiseResults.on("data", function () {
                    if (undefined != serviceWiseResults.data()) {
                        if (currenttab == "previousDay") {
                            var finalDataJson = convertResultToJSON(serviceWiseResults.data());
                            var processResults = revenuetempData(finalDataJson.data, "uagecattype", "nettype", "revenue");
                            //processServiceWiseResults(serviceWiseResults.data().rows, type, chartType);
                            if (category == "toggleRevData") {
                                bizPostUnbillRev.previousDay.servicewisedata.series[0].data[0].y = processResults.international;
                                bizPostUnbillRev.previousDay.servicewisedata.series[0].data[1].y = processResults.national;
                                Highcharts.chart('serviceVoice', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                Highcharts.chart('serviceVoice', bizPostUnbillRev.previousDay.servicewisedata)
                            } else {
                                //processServiceWiseResults(serviceWiseResults.data().rows, type, chartType);
                                bizPostUnbillRev.previousDay.servicewiseVoice.series[0].data[0].y = processResults.international;
                                bizPostUnbillRev.previousDay.servicewiseVoice.series[0].data[1].y = processResults.national;
                                Highcharts.chart('serviceVoice', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                Highcharts.chart('serviceVoice', bizPostUnbillRev.previousDay.servicewiseVoice)
                            }
                        } else {
                            Highcharts.chart('serviceVoice', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                            var jsonData = convertResultToJSON(serviceWiseResults.data());
                            var results = revenueColumnStack(jsonData.data, "txndate", "nettype", "totalrevenue");
                            bizPostUnbillRev.daily.revService.xAxis.categories = results.axis;
                            bizPostUnbillRev.daily.revService.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                            bizPostUnbillRev.daily.revService.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                            Highcharts.chart('serviceVoice', bizPostUnbillRev.daily.revService)
                        }
                        isNoData = !1
                    }
                });
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('serviceVoice', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                    }
                }, 3000);
                $('#serviceVoicePreloader').hide()
            })
        }
        $('#toggleRevAll').click(function () {
            $('#serviceVoice').html('<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#serviceVoicePreloader').show();
            var query = "";
            if (filterDate == "previousDay") {
                query = "biz_rev_pre_service_all_pd"
            } else if (filterDate == "daily") {
                query = "biz_rev_pre_service_all_daily"
            } else if (filterDate == "weekly") {
                query = "biz_rev_pre_service_all_wkly"
            } else if (filterDate == "monthly") {
                query = "biz_rev_pre_service_all_mnthly"
            } else if (filterDate == "customDate") {
                if (fromDate != "" && toDate != "") {
                    query = "biz_rev_pre_service_all_cusdt"
                } else {
                    query = "biz_rev_pre_service_all_daily"
                }
            }
    
            loadServiceChart(query, "unBilledServiceRevenue", filterDate, "");
            $('#serviceChartPreloader').hide()
        });
        $('#toggleRevVoice').click(function () {
            $('#serviceVoice').html('<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#serviceVoicePreloader').show();
            var query = "";
            if (filterDate == "previousDay") {
                query = "biz_rev_pre_service_voice_pd"
            } else if (filterDate == "daily") {
                query = "biz_rev_pre_service_voice_daily"
            } else if (filterDate == "weekly") {
                query = "biz_rev_pre_service_voice_wkly"
            } else if (filterDate == "monthly") {
                query = "biz_rev_pre_service_voice_mnthly"
            } else if (filterDate == "customDate") {
                if (fromDate != "" && toDate != "") {
                    query = "biz_rev_pre_service_voice_cusdt"
                } else {
                    query = "biz_rev_pre_service_voice_daily"
                }
            }
    
            loadServiceChart(query, "unBilledServiceRevenue", filterDate, "");
            $('#serviceChartPreloader').hide()
        });
        $('#toggleRevSms').click(function () {
            $('#serviceVoice').html('<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#serviceVoicePreloader').show();
            var query = "";
            if (filterDate == "previousDay") {
                query = "biz_rev_pre_service_sms_pd"
            } else if (filterDate == "daily") {
                query = "biz_rev_pre_service_sms_daily"
            } else if (filterDate == "weekly") {
                query = "biz_rev_pre_service_sms_wkly"
            } else if (filterDate == "monthly") {
                query = "biz_rev_pre_service_sms_mnthly"
            } else if (filterDate == "customDate") {
                if (fromDate != "" && toDate != "") {
                    query = "biz_rev_pre_service_sms_cusdt"
                } else {
                    query = "biz_rev_pre_service_sms_daily"
                }
            }
            loadServiceChart(query, "unBilledServiceRevenue", filterDate, "");
            $('#serviceChartPreloader').hide()
        });
        $('#toggleRevData').click(function () {
            $('#serviceVoice').html('<div id="serviceVoicePreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#serviceVoicePreloader').show();
            var query = "";
            if (filterDate == "previousDay") {
                query = "biz_rev_pre_service_data_pd"
            } else if (filterDate == "daily") {
                query = "biz_rev_pre_service_data_daily"
            } else if (filterDate == "weekly") {
                query = "biz_rev_pre_service_data_wkly"
            } else if (filterDate == "monthly") {
                query = "biz_rev_pre_service_data_mnthly"
            } else if (filterDate == "customDate") {
                if (fromDate != "" && toDate != "") {
                    query = "biz_rev_pre_service_data_cusdt"
                } else {
                    query = "biz_rev_pre_service_data_daily"
                }
            }
            loadServiceChart(query, "unBilledServiceRevenueData", filterDate, "toggleRevData");
            $('#serviceChartPreloader').hide()
        });
    
        function loadVolumeChart(query, type, chartType, category) {
            $('#volumeByServices').html('<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#volumeByServicesPreloader').show();
            var volWiseSearchData = new SearchManager({
                preview: !0,
                "refresh": "24h",
                "refreshType": "delay",
                cache: !0,
                status_buckets: 300,
                "search": ""
            }, {
                tokens: !0,
                tokenNamespace: "submitted"
            });
            volWiseSearchData.settings.unset("search");
            if (fromDate != "" && toDate != "") {
                if (fromDate.indexOf(":0:0:0") == -1) {
                    fromDate = fromDate + ':0:0:0'
                }
                if (toDate.indexOf(":23:59:59") == -1) {
                    toDate = toDate + ":23:59:59"
                }
                volWiseSearchData.settings.set("search", getQuery("bizPreDrillRevQuery", query, country, fromDate, toDate, serviceType))
            } else {
                volWiseSearchData.settings.set("search", getQuery("bizPreDrillRevQuery", query, country, "", "", serviceType))
            }
            volWiseSearchData.startSearch();
            volWiseSearchData.on('search:done', function (properties) {
                var volWiseResults = volWiseSearchData.data("results");
                var isNoData = !0;
                volWiseResults.on("data", function () {
                    if (undefined != volWiseResults.data()) {
                        if (currenttab == "previousDay") {
                            var finalDataJson = convertResultToJSON(volWiseResults.data());
                            var processResults = revenuetempData(finalDataJson.data, "uagecattype", "nettype", "volume");
                            if (category == "toggleVolData") {
                                bizPostUnbillRev.previousDay.volUsageServiceData.series[0].data[0].y = processResults.international;
                                bizPostUnbillRev.previousDay.volUsageServiceData.series[0].data[1].y = processResults.national;
                                Highcharts.chart('volumeByServices', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                Highcharts.chart('volumeByServices', bizPostUnbillRev.previousDay.volUsageServiceData)
                            } else {
                                bizPostUnbillRev.previousDay.volUsageServiceVoice.series[0].data[0].y = processResults.international;
                                bizPostUnbillRev.previousDay.volUsageServiceVoice.series[0].data[1].y = processResults.national;
                                Highcharts.chart('volumeByServices', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                                Highcharts.chart('volumeByServices', bizPostUnbillRev.previousDay.volUsageServiceVoice)
                            }
                        } else {
                            Highcharts.chart('volumeByServices', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                            var jsonData = convertResultToJSON(volWiseResults.data());
                            var results = revenueColumnStack(jsonData.data, "txndate", "nettype", "call_count");
    
                            bizPostUnbillRev.daily.volUsageService.xAxis.categories = results.axis;
                            bizPostUnbillRev.daily.volUsageService.series[0].data = (undefined !== results.nettype[0]) ? results.nettype[0] : 0;
                            bizPostUnbillRev.daily.volUsageService.series[1].data = (undefined !== results.nettype[1]) ? results.nettype[1] : 0;
                            Highcharts.chart('volumeByServices', bizPostUnbillRev.daily.volUsageService)
                        }
                        isNoData = !1
                    }
                });
                refreshDateTime();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('volumeByServices', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
                    }
                }, 3000);
                $('#volumeByServicesPreloader').hide()
            })
        }
        $('#toggleVolVoice').click(function () {
            $('#volumeByServices').html('<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#volumeByServicesPreloader').show();
            var query = "";
            if (filterDate == "previousDay") {
                query = "biz_rev_pre_volume_voice_pd"
            } else if (filterDate == "daily") {
                query = "biz_rev_pre_vol_voice_daily"
            } else if (filterDate == "weekly") {
                query = "biz_rev_pre_vol_voice_wkly"
            } else if (filterDate == "monthly") {
                query = "biz_rev_pre_vol_voice_mnthly"
            } else if (filterDate == "customDate") {
                var fromDate = $("#fromDate").val();
                var toDate = $("#toDate").val();
                if (fromDate != "" && toDate != "") {
                    query = "biz_rev_pre_vol_voice_cusdt"
                } else {
                    query = "biz_rev_pre_vol_voice_daily"
                }
            }
            loadVolumeChart(query, "unBilledServiceVol", filterDate, "toggleVolVoice")
        });
        $('#toggleVolSms').click(function () {
            $('#volumeByServices').html('<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#volumeByServicesPreloader').show();
            var query = "";
            if (filterDate == "previousDay") {
                query = "biz_rev_volume_sms_pd"
            } else if (filterDate == "daily") {
                query = "biz_rev_pre_vol_sms_daily"
            } else if (filterDate == "weekly") {
                query = "biz_rev_pre_vol_sms_wkly"
            } else if (filterDate == "monthly") {
                query = "biz_rev_pre_vol_sms_mnthly"
            } else if (filterDate == "customDate") {
                var fromDate = $("#fromDate").val();
                var toDate = $("#toDate").val();
                if (fromDate != "" && toDate != "") {
                    query = "biz_rev_pre_vol_sms_cusdt"
                } else {
                    query = "biz_rev_pre_vol_sms_daily"
                }
            }
            loadVolumeChart(query, "unBilledServiceVol", filterDate, "toggleVolSms")
        });
        $('#toggleVolData').click(function () {
            $('#volumeByServices').html('<div id="volumeByServicesPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#volumeByServicesPreloader').show();
            var query = "";
            if (filterDate == "previousDay") {
                query = "biz_rev_volume_data_pd"
            } else if (filterDate == "daily") {
                query = "biz_rev_pre_vol_data_daily"
            } else if (filterDate == "weekly") {
                query = "biz_rev_pre_vol_data_wkly"
            } else if (filterDate == "monthly") {
                query = "biz_rev_pre_vol_data_mnthly"
            } else if (filterDate == "customDate") {
                if (fromDate != "" && toDate != "") {
                    query = "biz_rev_pre_vol_data_cusdt"
                } else {
                    query = "biz_rev_pre_vol_data_daily"
                }
            }
            loadVolumeChart(query, "unBilledServiceVolData", filterDate, "toggleVolData")
        })


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
    filterDate = $(this).children().val()
});
// $('input[name=datePreset]').parent().on('click', function () {
//     filterDate = $(this).children().val()
// });

function loadCountryChart(chartType, chartData) {
    Highcharts.chart('countryRevenue', bizPostUnbillRevEmpty.emptyChartConfig.emptyChart);
    if (chartType == "previousDay") {
        var countryChart = Highcharts.chart('countryRevenue', bizPostUnbillRev.previousDay.countrywise);
        setPieData(chartData, countryChart, "country", "countrywiserevenue")
    } else {
        countryChart = bizPostUnbillRev[chartType].countrywise;
        basicLineDataProcessor(chartData, countryChart, 'countryRevenue', "txndate", "country", "countrywiserevenue")
    }
}

function highchartsInitialize() {
    revServicewiseChart = Highcharts.chart('serviceVoice', bizPostUnbillRev.previousDay.revService);
    volServiceswiseChart = Highcharts.chart('volumeByServices', bizPostUnbillRev.previousDay.volUsageService);
    countrywiseChart = Highcharts.chart('countryRevenue', bizPostUnbillRev.previousDay.countrywise);

    voiceMtdChart = Highcharts.chart('voiceMTDChart', mtdChartConfig.voiceMtd);
    smsMtdChart = Highcharts.chart('smsMTDChart', mtdChartConfig.smsMtd);
    dataMtdChart = Highcharts.chart('dataMTDChart', mtdChartConfig.dataMtd);
    topupMtdChart = Highcharts.chart('topupMTDChart', mtdChartConfig.topupMtd);
}

function highchartsDestroy() {
    revServicewiseChart.destroy();
    volServiceswiseChart.destroy();
    countrywiseChart.destroy();

    voiceMtdChart.destroy();
    smsMtdChart.destroy();
    dataMtdChart.destroy();
    topupMtdChart.destroy();

}