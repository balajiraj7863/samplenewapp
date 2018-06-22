// Highchartchart container ID declarations for the page
var revArpuChart = "";
var TypeOfPackageParam = "500MB_Daily-Bolton";

var country = "";
var serviceType = "";
$('.mtdApply').removeAttr('disabled');
var mtdDate = new Date();
mtdDate = (mtdDate.getMonth() + 1) + "/" + mtdDate.getDate() + "/" + mtdDate.getFullYear();
var timerangeParam = getTimeRange(mtdDate);
var latestParam = "";
var earliestparam = "";
var currenttab = "500mb";
var SearchManagerModal="";
var utils = '';
function get_no_of_days(month, year) {
    var days = {
        "1": 31,
        "2": 28,
        "3": 31,
        "4": 30,
        "5": 31,
        "6": 30,
        "7": 31,
        "8": 31,
        "9": 30,
        "10": 31,
        "11": 30,
        "12": 31
    };
    if (year % 4 == 0) {
        days["2"] = 29;
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
    revArpuChart = Highcharts.chart('revArpuChart', bizPreRevArpu.arpu);
}

function highchartsDestroy() {
    revArpuChart.destroy();
}

// Help Text Initialisation
function updateHelpText(mapKey) {
    getHelpText(mapKey, "revArpuHelp");
}
updateHelpText('bizPreRevArpuHelp');


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

        utils = require("splunkjs/mvc/utils");
        SearchManagerModal=require("splunkjs/mvc/searchmanager");
        var pageLoading = true;

        //  custom changes for splunk js starts here,

        var oldCountryList = "";
        serviceType = "Prepaid";
     
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
    
        loadChart("500mb");
    
        // Date Preset Implementation
        $('#500mb').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            TypeOfPackageParam = "500MB_Daily-Bolton"
            currenttab = "500mb";
    
            // Plot the new charts
            loadChart("500mb");
        });
        $('#1gb').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            currenttab = "1gb";
            TypeOfPackageParam = "1GB_10_Days- BoltOn"
            // Plot the new charts
            loadChart("1gb");
        });
        $('#2gb').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            currenttab = "2gb";
            TypeOfPackageParam = "2GB_20_Days-BoltON"
            // Plot the new charts
            loadChart("2gb");
        });
        $('#6gb').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            currenttab = "6gb";
            TypeOfPackageParam = "6GB_30_Days-BoltOn"
            // Plot the new charts
            loadChart("6gb");
        });
        $('#15gb').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            currenttab = "15gb";
            TypeOfPackageParam = "15GB_30_Days-BoltON"
            // Plot the new charts
            loadChart("15gb");
        });
        $('#small').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            currenttab = "small";
            TypeOfPackageParam = "Prepaid_Bundle_small"
            // Plot the new charts
            loadChart("small");
        });
        $('#medium').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            currenttab = "medium";
            TypeOfPackageParam = "Prepaid_Bundle_Medium"
            // Plot the new charts
            loadChart("medium");
        });
        $('#large').click(function () {
            highchartsInitialize();
            highchartsDestroy();
            currenttab = "large";
            TypeOfPackageParam = "Prepaid_Bundle_Large"
            // Plot the new charts
            loadChart("large");
        });
      	$('#roaming250mb').click(function () {
              highchartsInitialize();
              highchartsDestroy();
              currenttab = "roaming250mb";
              TypeOfPackageParam = "Data Roaming Plan 250MB"
              // Plot the new charts
              loadChart("roaming250mb");
          });
      	$('#roaming1gb').click(function () {
              highchartsInitialize();
              highchartsDestroy();
              currenttab = "roaming1gb";
              TypeOfPackageParam = "Data Roaming Plan 1GB"
              // Plot the new charts
              loadChart("roaming1gb");
          });
    
        $('.mtdApply').click(function () {
            if (undefined !== $("#mtdDate").val() && '' !== $("#mtdDate").val()) {
                highchartsInitialize();
                highchartsDestroy();
                mtdDate = $("#mtdDate").val();
                mtdDate = new Date(mtdDate);
                mtdDate = (mtdDate.getMonth() + 1) + "/" + mtdDate.getDate() + "/" + mtdDate.getFullYear();
                timerangeParam=getTimeRange(mtdDate);
                loadChart(currenttab);
            }
        });
    
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
            var queryMapKey = "bizPreDrillArpuQuery";
            getResultsAndExport(queryMapKey, "arpuExport", country, fromDate, toDate);
            return false;
        }
    
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
    
        function loadChart(chartType) {
            var fromDate = $("#fromDate").val();
            var toDate = $("#toDate").val();
            $(".datePicker").css('border', '1px solid #ccc');
            $(".datePicker").css('background', '#eee');
            getHelpText("exportExcelData", "exportExcelDateHelp");
    
            // initialize search manager instance
            var revArpuChartData = getOnlySearchResultsConstructor("revArpuChartPreloader","24h");
    
            // query var declarations
            var ArpuQuery = "arpuQuery";
    
            // if ("500mb" === chartType) {
            //     ArpuQuery = "arpuQuery";
            // } else if ("1gb" === chartType) {
            //     ArpuQuery = "arpuQuery";
            // } else if ("2gb" === chartType) {
            //     ArpuQuery = "arpuQuery";
            // } else if ("6gb" === chartType) {
            //     ArpuQuery = "arpuQuery";
            // }
    
            // Subscriber Status SDP1 Data loading
            revArpuChartData.settings.unset("search");
            var datetosend=getTimeRange(mtdDate);
            var arpuQuery = getQuery("bizPreDrillArpuQuery", ArpuQuery, country, fromDate, toDate, serviceType);
            arpuQuery = arpuQuery.replace(/TypeOfPackageParam/gi, TypeOfPackageParam);
           // arpuQuery = arpuQuery.replace(/DateParam/gi, mtdDate);
            arpuQuery = arpuQuery.replace(/earliestParam/, datetosend.earliestparam);
            arpuQuery = arpuQuery.replace(/latestParam/, datetosend.latestParam);
            revArpuChartData.settings.set("search", arpuQuery);
    
            revArpuChartData.startSearch();
            $('#revArpuChart').html('<div id="revArpuChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
            $('#revArpuChartPreloader').show();
    
            revArpuChartData.on('search:done', function (properties) {
                var arpuResults = revArpuChartData.data("results", {
                    count: 0,
                    offset: 0
                });
                var isNoData = true;
                arpuResults.on("data", function (queryResults) {
                    if (undefined !== queryResults.data()) {
                        if (null !== queryResults.data().rows) {
                            var finalDataJson = convertResultToJSON(queryResults.data());
                            loadArpuChart(chartType, finalDataJson.data);
                            isNoData = false;
                        }
                    }
                });
                $('#revArpuChartPreloader').hide();
                setTimeout(function () {
                    if (isNoData) {
                        Highcharts.chart('revArpuChart', bizPreRevArpu.emptyconfig);
                    }
                }, 3000);
    
                refreshDateTime();
            });
    
        }
        function getOnlySearchResultsConstructor(id,interval) {
            var searchmanager = new SearchManagerModal({
             
                "refresh":'0',
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
        function loadArpuChart(chartType, rows) {
            var arpuChartConfig = bizPreRevArpu.arpu;
            // if ("500mb" === chartType) {
            var arpuChartdata = processArpuData(rows, "txndate", "usercount", "revenue", "arpu");
            arpuChartConfig.xAxis[0].categories = arpuChartdata.x_axis;
            arpuChartConfig.series[0].data = arpuChartdata.arpu;
            arpuChartConfig.series[1].data = arpuChartdata.revenue;
            arpuChartConfig.series[2].data = arpuChartdata.userCount;
            Highcharts.chart('revArpuChart', arpuChartConfig);
            // }
        }
// custom changes for splunk js ends here,

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

