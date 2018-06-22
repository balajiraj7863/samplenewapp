var walletReportVoiceChart = "";
var walletReportSmsChart = "";
var walletReportDataChart = "";

var country = "";
var serviceType = "";
var walletDate = new Date();
walletDate = (walletDate.getMonth() + 1) + "/" + walletDate.getDate() + "/" + walletDate.getFullYear();
var timerangeParam=getTimeRange(walletDate);
var latestParam="";
var earliestparam="";
var utils = '';
var SearchManagerModal = '';
function get_no_of_days(month,year)
{
    var days={
        "1":31,
        "2":28,
        "3":31,
        "4":30,
        "5":31,
        "6":30,
        "7":31,
        "8":31,
        "9":30,
        "10":31,
        "11":30,
        "12":31
    };
    if(year%4==0)
    {
        days["2"]=29;
    }

    return days[month];
}
function getTimeRange(from_date)
{
  if(null!==from_date)
  {
    
    latestParam=from_date+":23:59:59";
    from_date=new Date(from_date);
    var datenow=new Date();
    var tempFromDate = from_date.setHours(0,0,0,0);
    var tempDatenow = datenow.setHours(0,0,0,0);
    if(tempFromDate!==tempDatenow)
    {
        
        from_date= (from_date.getMonth() + 1) + "/" + 01 + "/" + from_date.getFullYear();
        earliestparam=from_date+":0:0:0";
    }
    else{
        var todayOnedate=new Date(from_date);
        if(1===todayOnedate.getDate()){
            var dateformonth=get_no_of_days(from_date.getMonth(),from_date.getFullYear());
            latestParam= (from_date.getMonth()) + "/" + dateformonth + "/" + from_date.getFullYear();
            latestParam=latestParam+":23:59:59";
            from_date= (from_date.getMonth() ) + "/" + 01 + "/" + from_date.getFullYear();
            earliestparam=from_date+":0:0:0";
        }
        else{
            var earDate= (from_date.getMonth()+1 ) + "/" + 01 + "/" + from_date.getFullYear();
            earliestparam=earDate+":0:0:0";
            from_date= (from_date.getMonth() + 1) + "/" + (from_date.getDate()-1) + "/" + from_date.getFullYear();
            latestParam=from_date+":23:59:59";
        }
    }
    
  
   return {"earliestparam":earliestparam,"latestParam":latestParam};
    //earliestparam=
  }

}

function highchartsInitialize() {
    walletReportVoiceChart = Highcharts.chart('walletReportVoiceChart', bizPreRevWallet.walletReportVoice);
    walletReportSmsChart = Highcharts.chart('walletReportSmsChart', bizPreRevWallet.walletReportSms);
    walletReportDataChart = Highcharts.chart('walletReportDataChart', bizPreRevWallet.walletReportData);
}

function highchartsDestroy() {
    walletReportVoiceChart.destroy();
    walletReportSmsChart.destroy();
    walletReportDataChart.destroy();
}

// Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("button[type='button']").attr("disabled", true);
});

// Help Text Initialisation
function updateHelpText(mapKey) {
    getHelpText(mapKey, "walletReportVoiceHelp");
    getHelpText(mapKey, "walletReportSmsHelp");
    getHelpText(mapKey, "walletReportDataHelp");
}
updateHelpText('bizPreRevWalletHelp');

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

       
        // Load individual components
   
    var pageLoading = true;

    //  custom changes for splunk js starts here,

    var oldCountryList = "";
    serviceType = "Prepaid";
    SearchManagerModal = require("splunkjs/mvc/searchmanager");
    utils = require("splunkjs/mvc/utils");
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
                    oldCountryList = newCountryList;

                }

            }
        });

        function reloadAll() {
            var targetEle = $(".filterDiv .active").find('input');
            targetEle.trigger('click');
        }

        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var isExportData = false;


        // Need to change
        $('#downloadExportData').click(function () {
            $("#exportTableModal").modal("show");
            $("#modalInfoText").text(getBannerHelpText("exportExcelData", "modalInfoText"));
            $(".datePicker").css('background', '#eee');
            downloadChartData();
            setTimeout(function () {
                $('#exportTableModal').modal('hide');
            }, 2500);
        });

        // Need to change
        function downloadChartData() {
            fromDate = getExportDateSetter(180);
            toDate = getExportDateSetter(0);
            var queryMapKey = "bizPreDrillRevWalletQuery";
            getResultsAndExport(queryMapKey, "wallet_wise_excel_export_data", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "wallet_wise_excel_export_voice", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "wallet_wise_excel_export_sms", country, fromDate, toDate);
        
            return false;
        }
        $('.walletApply').click(function () {
            if (undefined !== $("#walletDate").val() && '' !== $("#walletDate").val()) {
                highchartsInitialize();
                highchartsDestroy();
                walletDate = $("#walletDate").val();
                walletDate = new Date(walletDate);
                walletDate = (walletDate.getMonth() + 1) + "/" + walletDate.getDate() + "/" + walletDate.getFullYear();
                timerangeParam=getTimeRange(walletDate);
                loadChart();
            }
        });
        // Need to change
        function getResultsAndExport(mapKey, planQuery, country, fromDate, toDate) {
            var searchmanager = new SearchManagerModal({
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
                        if (null !== queryResults.data().rows) {
                            exportResultToCsv(searchResults.data().rows, searchResults.data().fields, planQuery, true);
                        }
                    }
                });
            });

            return searchmanager;
        }
        loadChart();

        function loadChart() {


        // initialize search manager instance
        var walletReportVoiceChartData = getOnlySearchResultsConstructor("walletReportVoiceChartPreloader","24h");
        var walletReportSmsChartData = getOnlySearchResultsConstructor("walletReportSmsChartPreloader","24h");
        var walletReportDataChartData = getOnlySearchResultsConstructor("walletReportDataChartPreloader","24h");

        // query var declarations
        var wallet_wise_prev_day_voice = "wallet_wise_prev_day_voice";
        var wallet_wise_prev_day_sms = "wallet_wise_prev_day_sms";
        var wallet_wise_prev_day_data = "wallet_wise_prev_day_data";


			getHelpText("exportExcelData", "exportExcelDateHelp");
            // Subscriber Status SDP1 Data loading
            walletReportVoiceChartData.settings.unset("search");


            walletReportVoiceChartData.startSearch();
        $('#walletReportVoiceChart').html('<div id="walletReportVoiceChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#walletReportVoiceChartPreloader').show();
        walletReportVoiceChartData.settings.unset("search");
        var datetosend=getTimeRange(walletDate);
        var voiceQuery = getQuery("bizPreDrillRevWalletQuery", wallet_wise_prev_day_voice, country, "", "", serviceType);
        voiceQuery = voiceQuery.replace(/earliestParam/, datetosend.earliestparam);
        voiceQuery = voiceQuery.replace(/latestParam/, datetosend.latestParam);
        console.log(voiceQuery);
        walletReportVoiceChartData.settings.set("search", voiceQuery);
        walletReportVoiceChartData.on('search:done', function (properties) {
            var walletReportVoiceResults = walletReportVoiceChartData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            walletReportVoiceResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadWalletReportChart(finalDataJson.data,'walletReportVoice','walletReportVoiceChart');
                        isNoData = false;
                    }
                }
            });
            $('#walletReportVoiceChartPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart("walletReportVoiceChart", bizPreRevWalletEmpty["emptyChart"]);
                    //Highcharts.chart('walletReportVoiceChart', bizPreRevWallet.walletReportVoice);
                }
            }, 3000);

            refreshDateTime();
        });

        // Subscriber Status SDP2 Data loading        
        walletReportSmsChartData.settings.unset("search");

        walletReportSmsChartData.startSearch();
        $('#walletReportSmsChart').html('<div id="walletReportSmsChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#walletReportSmsChartPreloader').show();

        walletReportSmsChartData.settings.unset("search");
        var smsQuery = getQuery("bizPreDrillRevWalletQuery", wallet_wise_prev_day_sms, country, "", "", serviceType);
        smsQuery = smsQuery.replace(/earliestParam/, datetosend.earliestparam);
        smsQuery = smsQuery.replace(/latestParam/, datetosend.latestParam);
        console.log(smsQuery);
        walletReportSmsChartData.settings.set("search", smsQuery);
        walletReportSmsChartData.on('search:done', function (properties) {
            var walletReportSmsResults = walletReportSmsChartData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            walletReportSmsResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadWalletReportChart(finalDataJson.data,'walletReportSms','walletReportSmsChart');
                        isNoData = false;
                    }
                }
            });
            $('#walletReportSmsChartPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart("walletReportSmsChart", bizPreRevWalletEmpty["emptyChart"]);
                   // Highcharts.chart('walletReportSmsChart', bizPreRevWallet.walletReportSms);
                }
            }, 3000);
            refreshDateTime();
        });

        // Subscriber Lifecycle Chart Data Loading

        walletReportDataChartData.settings.unset("search");
        
        var dataQuery = getQuery("bizPreDrillRevWalletQuery", wallet_wise_prev_day_data, country, "", "", serviceType);
        dataQuery = dataQuery.replace(/earliestParam/, datetosend.earliestparam);
        dataQuery = dataQuery.replace(/latestParam/, datetosend.latestParam);
        console.log(dataQuery);
        walletReportDataChartData.settings.set("search", dataQuery);

        walletReportDataChartData.startSearch();

        $('#walletReportDataChart').html('<div id="walletReportDataChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#walletReportDataChartPreloader').show();

        walletReportDataChartData.on('search:done', function (properties) {
            var subLifecycleResults = walletReportDataChartData.data("results", {
                count: 0,
                offset: 0
            });
          
            var isNoData = true;
            subLifecycleResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadWalletReportChart(finalDataJson.data,'walletReportData','walletReportDataChart');
                        isNoData = false;
                    }
                }
            });
            $('#walletReportDataChartPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart("walletReportDataChart", bizPreRevWalletEmpty["emptyChart"]);
                   // Highcharts.chart('walletReportDataChart', bizPreRevWallet.walletReportData);
                }
            }, 3000);

            refreshDateTime();
        });

    }

        // custom changes for splunk js ends here

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

    });

    function getOnlySearchResultsConstructor(id,interval) {
        var searchmanager = new SearchManagerModal({
            preview: false,
            "refresh": "0",
            "refreshType": "delay",
            "preview": true,
            "cache": true,
            "status_buckets": 300,
            "search": ""
        }, {
            tokens: true,
            tokenNamespace: "submitted"
        });
    
        return searchmanager;
    }

// Chart Processing business logic
function loadWalletReportChart(rows,chartConfigName,id) {
   
      
    var processResults = wallettempData(rows, "txndate", "accounttype", "revenue");
    bizPreRevWallet[chartConfigName].xAxis.categories=processResults.catagories;
    bizPreRevWallet[chartConfigName].series[0].data=processResults.ma;
    bizPreRevWallet[chartConfigName].series[1].data=processResults.da;
   
    Highcharts.chart(id, bizPreRevWallet[chartConfigName]);
   
  
   

}
