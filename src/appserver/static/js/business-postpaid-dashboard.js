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
 var lbcDate="-";
 var business_postpaid_home_charts_banners = [
    "business_postpaid__home_revenue_banner",
    "business_postpaid__home_unBillrevBanner_chart",
    "business_postpaid__home_subscriber_banner",
    "business_postpaid__home_order_banner",
    "business_postpaid__home_incident_banner",
    "business_postpaid__home_mnp_chart",
    "business_postpaid__home_revenue_chart",
    "business_postpaid__home_subscriber_chart",
    "business_postpaid__home_adjustment_chart",
    "business_postpaid__home_payment_chart",
    "business_postpaid__home_paymentsChannel_chart"
];
 var channelchartConfig = {
    chart: {
        type: 'column',
        spacingBottom: 10,
        spacingTop: 10,
        spacingLeft: 10,
        spacingRight: 10
    },
    title: {
        text: ''
    },
    exporting: {
        filename: "Channelwise Payments View Chart"
    },
    credits: false,
    colors: ['#869D96', '#EE7674', '#F9B5AC', '#9DBF9E', '#436f8e', '#987284'],
    xAxis: {
        categories: [],
        crosshair: true,
        labels: {
            rotation: 0
        },
        title: {
            text: 'Date',
            enabled: false
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Revenue($)'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            },
            formatter: planwiseStackDatalabelFormatter
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        useHTML: true,
        shared: true,
        headerFormat: '<b>{point.x}</b><br/>',
        formatter: planRevenueStackTooltipFormatter
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }

    },
    series: []
};
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


    getHelpText("bizPostpaidHelp", "unbillRevChartHelp");
    getHelpText("bizPostpaidHelp", "subChartHelp");
    getHelpText("bizPostpaidHelp", "adjChartHelp");
    getHelpText("bizPostpaidHelp", "paymentChartHelp");
    getHelpText("bizPostpaidHelp", "mnpChartHelp");
    getHelpText("bizPostpaidHelp", "paymentChannelChartHelp");

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
       
    business_postpaid_home_charts_banners.forEach(function (kpi) {
        eval(kpi+"()");
    });
}

function business_postpaid__home_revenue_banner() {

    var revBannerSearchData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_rev_banner", country, "", "", serviceType), "biz_postpaid_rev_banner",  "");
    revBannerSearchData.on('search:done', function () {
        var revBannerSearchResults = revBannerSearchData.data("results");
        revBannerSearchResults.on("data", function (dataval) {
            if (undefined !== dataval.data()) {
                var finalDataJson = convertResultToJSON(dataval.data());
                var revenue_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalrevenue");
                var finaldata = finalDataJson.data;
                lbcDate = finaldata[0].txndate;
                $('#revBannerTooltip').attr("data-original-title", String.format(getBannerHelpText("bizPostpaidHelp", "revBannerHelp"), lbcDate));
                animateCounter("rev_banner", revenue_bannerTooltip.total, "bizPostpaidBillRevBannerUnits");
                $("#rev_banner_notation").text('').css('color', '#fff').text('$');
                resetBannerNotation("#rev_banner_notation", true, "$");
            }
        });
        resetBannerNotation("#rev_banner_notation", false, "", "#rev_banner", "#bizPostpaidBillRevBannerUnits");
        $('#revBannerTooltip').attr("data-original-title", String.format(getBannerHelpText("bizPostpaidHelp", "revBannerHelp"), lbcDate));
       
    });


}

function business_postpaid__home_unBillrevBanner_chart() {

    var unBillrevBannerSearchData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_unrev_banner", country, "", "", serviceType), "biz_postpaid_unrev_banner",  "");
    unBillrevBannerSearchData.on('search:done', function () {
        var unBillrevBannerSearchResults = unBillrevBannerSearchData.data("results");
        unBillrevBannerSearchResults.on("data", function (unbilledRevenueResults) {
            if (undefined !== unbilledRevenueResults.data()) {
                var finalDataJson = convertResultToJSON(unbilledRevenueResults.data());
                var unbilled_revenue_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "revenue");
                $('#unbilledRevBannerTooltip').attr("data-original-title", getBannerHelpText("bizPostpaidHelp", "unbillRevBannerHelp"));
                animateCounter("unbilled_rev_banner", unbilled_revenue_bannerTooltip.total, "bizPostpaidUnRevBannerUnits");
                resetBannerNotation("#unbilled_rev_banner_notation", true, "$");
            }
        });
        resetBannerNotation("#unbilled_rev_banner_notation", false, "", "#unbilled_rev_banner", "#bizPostpaidUnRevBannerUnits");
        $('#unbilledRevBannerTooltip').attr("data-original-title", getBannerHelpText("bizPostpaidHelp", "unbillRevBannerHelp"));
    });
}

function business_postpaid__home_subscriber_banner() {

    var subBannerSearchData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_sub_banner", country, "", "", serviceType), "biz_postpaid_sub_banner",  "");
    subBannerSearchData.on('search:done', function () {
        var subBannerSearchResults = subBannerSearchData.data("results");
        subBannerSearchResults.on("data", function (subval) {
            if (undefined !== subval.data()) {
                var finalDataJson = convertResultToJSON(subval.data());
                var sub_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalsub");
                $('#subBannerTooltip').attr("data-original-title", getBannerHelpText("bizPostpaidHelp", "subBannerHelp"));
                animateCounter("subbanner", sub_bannerTooltip.total, "bizPostpaidUnSubBannerUnits");
                resetBannerNotation("#subbanner_notation", true, "");
            }
        });
        resetBannerNotation("#subbanner_notation", false, "", "#subbanner", "#bizPostpaidUnSubBannerUnits");
        $('#subBannerTooltip').attr("data-original-title", getBannerHelpText("bizPostpaidHelp", "subBannerHelp"));
    });

}

function business_postpaid__home_order_banner () {

    var orderBannerSearch = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_order_banner", country, "", "", serviceType), "biz_postpaid_order_banner",  "");
    orderBannerSearch.on('search:done', function () {
        var orderBannerSearchResults = orderBannerSearch.data("results");
        orderBannerSearchResults.on("data", function (orderval) {
            if (undefined !== orderval.data()) {
                var finalDataJson = convertResultToJSON(orderval.data());
                var order_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalorders");
                $('#orderBannerTooltip').attr("data-original-title", getBannerHelpText("bizPostpaidHelp", "orderBannerHelp"));
                animateCounter("orderbanner", order_bannerTooltip.total, "bizPostpaidUnOrderBannerUnits");
                resetBannerNotation("#orderbanner_notation", true, "");
                var orderData = orderDataProcessor(finalDataJson.data, 'orderstatus', 'totalorders');
                $('#biz_post_orderCurrentBanner').text(orderData.Current);
                $('#biz_post_orderCompletedBanner').text(orderData.Completed);
            }
        });
        resetBannerNotation("#orderbanner_notation", false, "", "#orderbanner", "#bizPostpaidUnOrderBannerUnits");
        $('#orderBannerTooltip').attr("data-original-title", getBannerHelpText("bizPostpaidHelp", "orderBannerHelp"));
    });
}

function business_postpaid__home_incident_banner() {

    var incBannerSearchData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_inc_banner", country, "", "", serviceType), "biz_postpaid_inc_banner", "");
    incBannerSearchData.on('search:done', function () {
        var incBannerSearchResults = incBannerSearchData.data("results");
        incBannerSearchResults.on("data", function (incResults) {
            if (undefined !== incResults.data()) {
                var finalDataJson = convertResultToJSON(incResults.data());
                var inc_bannerTooltip = bannertooltipDataCommon(finalDataJson.data, "servicetype", "totalincidents");


                $('#incBannerTooltip').attr("data-original-title", getBannerHelpText("bizPostpaidHelp", "incidentBannerHelp"));
                animateCounter("incidentbanner", inc_bannerTooltip.total, "bizPostpaidUnIncBannerUnits");
                var priorityData = priorityDataProcessor(finalDataJson.data, 'priority', 'totalincidents');
                $('#incidentp1banner').text(priorityData.p1);
                $('#incidentp2banner').text(priorityData.p2);
                resetBannerNotation("#incidentbanner_notation", true, "");
            }
        });
        resetBannerNotation("#incidentbanner_notation", false, "", "#incidentbanner", "#bizPostpaidUnIncBannerUnits");
        $('#incBannerTooltip').attr("data-original-title", getBannerHelpText("bizPostpaidHelp", "incidentBannerHelp"));
    });

}


function business_postpaid__home_revenue_chart () {
    var revSearchData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_rev_chart", country, "", "", serviceType), "revChartPreloader", "24h");
    revSearchData.on('search:done', function () {
        var revSearchDataResults = revSearchData.data("results");
        revSearchDataResults.on("data", function (queryResults) {
            if (undefined !== queryResults.data()) {
                var finalDataJson = convertResultToJSON(queryResults.data());
                var trendChartdata = trendDataProcessor(finalDataJson.data, "txndate", "totalrevenue");
                unbillRevchartConfig.xAxis[0].categories = trendChartdata.xaxisValues;
                unbillRevchartConfig.series[0].data = trendChartdata.currentWeekData;
                unbillRevchartConfig.series[1].data = trendChartdata.previousWeekData;
                Highcharts.chart('revenueChart', unbillRevchartConfig);
            }

        });
        $('#revChartPreloader').hide();
        refreshDateTime();
        Highcharts.chart('revenueChart', bizPostEmpty.emptyChartConfig.emptyChart);
    });
}

function business_postpaid__home_subscriber_chart () {
    var subSearchData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_sub_chart", country, "", "", serviceType), "subChartPreloader", "24h");
    subSearchData.on('search:done', function () {
        var subSearchResults = subSearchData.data("results");
        subSearchResults.on("data", function (queryResults) {
            if (undefined !== queryResults.data()) {
                var finalDataJson = convertResultToJSON(queryResults.data());
                var trendChartdata = trendDataProcessor(finalDataJson.data, "txndate", "totalsub");
                subchartConfig.xAxis[0].categories = trendChartdata.xaxisValues;
                subchartConfig.series[0].data = trendChartdata.currentWeekData;
                subchartConfig.series[1].data = trendChartdata.previousWeekData;
                Highcharts.chart('subscriberChart', subchartConfig);
            }

        });
        $('#subChartPreloader').hide();
        refreshDateTime();
        Highcharts.chart('subscriberChart', bizPostEmpty.emptyChartConfig.emptyChart);
    });

}

    function business_postpaid__home_mnp_chart () {
        var mnpData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_MNP_chart", country, "", "", serviceType), "mnpchartPreloader", "24h");
        mnpData.on('search:done', function () {
            var mnpSearchResults = mnpData.data("results");
            mnpSearchResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data().rows) {
                    var finalDataJson = convertResultToJSON(queryResults.data());
                    var mnpChartData = trendMNPDataProcessor(finalDataJson.data, "date", "portin", "portout");
                    MNPchartConfig.xAxis.categories = mnpChartData.x_axis;
                    MNPchartConfig.series[0].data = mnpChartData.portin;
                    MNPchartConfig.series[1].data = mnpChartData.portout;
                    MNPchartConfig.series[2].data = mnpChartData.lastweek_portIn;
                    MNPchartConfig.series[3].data = mnpChartData.lastweek_portOut;
                    Highcharts.chart('mnpChart', MNPchartConfig);
                }
            });
            $('#mnpchartPreloader').hide();
            refreshDateTime();
            Highcharts.chart('mnpChart', bizPostEmpty.emptyChartConfig.emptyChart);
        });
    }

function business_postpaid__home_adjustment_chart () {
    var adjustmentData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_adj_chart", country, "", "", serviceType), "adjChartPreloader", "24h");
    adjustmentData.on('search:done', function () {
        var adjustmentSearchResults = adjustmentData.data("results");
        adjustmentSearchResults.on("data", function (queryResults) {
            if (undefined !== queryResults.data()) {
                var finalDataJson = convertResultToJSON(queryResults.data());
                var adjChartData = processAdj(finalDataJson.data, "adjustmentreason", "subscribercount", "adjustmentamount");
                adjchartConfig.xAxis.categories = adjChartData.x_axis;
                adjchartConfig.series[0].data = adjChartData.Adjust;
                adjchartConfig.series[1].data = adjChartData.Amt;
                Highcharts.chart('adjustmentChart', adjchartConfig);
            }
        });
        $('#adjChartPreloader').hide();
        refreshDateTime();
        Highcharts.chart('adjustmentChart', bizPostEmpty.emptyChartConfig.emptyChart);
    });
}

function business_postpaid__home_payment_chart () {
    var paymentData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_pay_chart", country, "", "", serviceType), "paymentChartPreloader", "24h");
    paymentData.on('search:done', function () {
        var paymentSearchResults = paymentData.data("results");
        paymentSearchResults.on("data", function (queryResults) {
            if (undefined !== queryResults.data()) {
                var finalDataJson = convertResultToJSON(queryResults.data());
                var adjChartData = processPaymentData(finalDataJson.data, "_time", "subscribercount: cerillion", "amount: cerillion");
                paymentchartConfig.xAxis[0].categories = adjChartData.x_axis;
                paymentchartConfig.series[1].data = adjChartData.Adjust;
                paymentchartConfig.series[3].data = adjChartData.Amt;
                Highcharts.chart('paymentChart', paymentchartConfig);
            }
        });
        $('#paymentChartPreloader').hide();
        refreshDateTime();
        Highcharts.chart('paymentChart', bizPostEmpty.emptyChartConfig.emptyChart);
    });
}

function business_postpaid__home_paymentsChannel_chart () {
    var paymentsChannelData = getOnlySearchResultsConstructor1(getQuery("bizPostpaidQuery", "biz_postpaid_pay_channel_chart", country, "", "", serviceType), "paymentChannelChartPreloader", "24h");
    paymentsChannelData.on('search:done', function () {
        var bizPayChannelSearchResults = paymentsChannelData.data("results");
        bizPayChannelSearchResults.on("data", function (queryResults) {
            if (undefined !== queryResults.data()) {
                var finalDataJson = convertResultToJSON(queryResults.data());
                processStackBarData(finalDataJson.data, channelchartConfig, "paymentChannelChart", "", "txndate", "location_des", "amount");
            }
        });
        $('#paymentChannelChartPreloader').hide();
        refreshDateTime();
        Highcharts.chart('paymentChannelChart', bizPostEmpty.emptyChartConfig.emptyChart);
    });
}



function getOnlySearchResultsConstructor1(query, interval, refresh) {
    var searchmanager =
        new SearchManager({
            "cancelOnUnload": true,
            "refresh": "0",
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
           // "sid": sid
            //"id" : "ownid",
            //"sid" : "admin__admin__search__RMD5b2a90aaab04c6846_1526290535.476"
            //"sid" : "admin__admin__search__ownid_1526198468.27175"
        }, {
            tokens: true,
            tokenNamespace: "submitted"
        }) 
       
    return searchmanager;
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
