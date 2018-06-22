// Monochrome color generations
var monochromeColors = (function () {
    var colors = [],
        base = '#2980b9',
        i;
    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 4) / 10).get());
    }
    return colors;
}());

//Resizing chart
var height = $(window).height();
var chartHeight = ((height - 336) / 2);
var incidentNoData = chartHeight / 2;

// Highchartchart container ID declarations for the page
var orderStatusChartInit = "";
var priorityChartInit = "";
var systemChartInit = "";
var queueChartInit = "";
var avgResolutionChartInit = "";
var incidentTrendChartInit = "";
var priorityModalDate = "";
var country = "";
var serviceType = "";
var utils = '';
var SearchManagerModal = '';

function highchartsInitialize() {
    orderStatusChartInit = Highcharts.chart('statuswiseChart', opsIncPostDrilldown.daily.statuswise);
    priorityChartInit = Highcharts.chart('prioritywiseChart', opsIncPostDrilldown.daily.prioritywise);
    systemChartInit = Highcharts.chart('systemwiseChart', opsIncPostDrilldown.daily.systemwise);
    queueChartInit = Highcharts.chart('queuewiseChart', opsIncPostDrilldown.daily.queuewise);
    avgResolutionChartInit = Highcharts.chart('avgResolutionChart', opsIncPostDrilldown.tillDate.avgResolution);
    incidentTrendChartInit = Highcharts.chart('incIntakeChart', opsIncPostDrilldown.daily.incidentTrend);
}

function highchartsDestroy() {
    orderStatusChartInit.destroy();
    priorityChartInit.destroy();
    systemChartInit.destroy();
    queueChartInit.destroy();
    avgResolutionChartInit.destroy();
    incidentTrendChartInit.destroy();
}

//Loading Highcharts based on the date presets
$('.customDateDisable').click(function () {
    $("input[type='text']").attr("disabled", true);
    $("#searchBtn").attr("disabled", true);
});

// Help Text Initialisation
function updateHelpText(mapKey) {
    getHelpText(mapKey, "statuswiseHelp");
    getHelpText(mapKey, "prioritywiseHelp");
    getHelpText(mapKey, "systemwiseHelp");
    getHelpText(mapKey, "queuewiseHelp");
    getHelpText(mapKey, "avgResolutionHelp");
    getHelpText(mapKey, "top5IncidentsHelp");
    getHelpText(mapKey, "incIntakeHelp");
}
updateHelpText('opsPostIncidentDaily');

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

        SearchManagerModal = require("splunkjs/mvc/searchmanager");
        var utils = require("splunkjs/mvc/utils");
        var pageLoading = true;

        //  custom changes for splunk js starts here,

    var oldCountryList = "";

    serviceType = "Postpaid";

    if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
        if (localStorage.getItem("globalUserServiceTypeList").indexOf("operation-postpaid") > -1) {
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
                if (localStorage.getItem("globalUserServiceTypeList").toString().match(/operation/g).length > 1) {
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


    var otherName;
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var isExportData = false;
   

    // Date Preset Implementation
    $('#tillDate').click(function () {
        $('.custom-date').hide();
        highchartsInitialize();
        highchartsDestroy();
        $('#avgIncidentTime').show();
        $('#top5Incidents').hide();
        $('#incIntakeContainer').hide();
        // Plot the new charts
        loadChart("tillDate");
        priorityModalDate = "tillDate";
        //update the HelpTextIcon
        updateHelpText('opsPostIncidentTillDate');
    });
    $('#today').click(function () {
        $('.custom-date').hide();
        highchartsInitialize();
        highchartsDestroy();
        $('#avgIncidentTime').hide();
        $('#top5Incidents').show();
        $('#incIntakeContainer').hide();
        // Plot the new charts
        loadChart("today");
        priorityModalDate = "today";
        //update the HelpTextIcon
        updateHelpText('opsPostIncidentToday');
    });
    $('#daily').click(function () {
        $('.custom-date').hide();
        highchartsInitialize();
        highchartsDestroy();
        $('#avgIncidentTime').hide();
        $('#top5Incidents').hide();
        $('#incIntakeContainer').show();
        // Plot the new charts
        loadChart("daily");
        priorityModalDate = "daily";
        //update the HelpTextIcon
        updateHelpText('opsPostIncidentDaily');
    });
    $('#weekly').click(function () {
        $('.custom-date').hide();
        highchartsInitialize();
        highchartsDestroy();
        $('#avgIncidentTime').hide();
        $('#top5Incidents').hide();
        $('#incIntakeContainer').show();
        // Plot the new charts
        loadChart("weekly");
        priorityModalDate = "weekly";
        //update the HelpTextIcon
        updateHelpText('opsPostIncidentWeekly');
    });
    $('#monthly').click(function () {
        $('.custom-date').hide();
        highchartsInitialize();
        highchartsDestroy();
        $('#avgIncidentTime').hide();
        $('#top5Incidents').hide();
        $('#incIntakeContainer').show();
        // Plot the new charts
        loadChart("monthly");
        priorityModalDate = "monthly";
        //update the HelpTextIcon
        updateHelpText('opsPostIncidentMonthly');
    });
    $('#customDate').click(function () {
        $('.custom-date').css('display','inline-block');
        highchartsInitialize();
        highchartsDestroy();
        $('#avgIncidentTime').hide();
        $('#top5Incidents').hide();
        $('#incIntakeContainer').show();
        // Plot the new charts
        loadChart("daily");
        $(".datePicker").css('background', '#fff');
        $("#fromDate.datePicker").css('background', '#fff');
        priorityModalDate = "daily";
        //update the HelpTextIcon
        updateHelpText('opsPostIncidentCustomDate');
    });
    $('#searchBtn').click(function () {
        if (undefined !== $("#fromDate").val() && undefined !== $("#toDate").val() && '' !== $("#fromDate").val() && '' !== $("#toDate").val()) {
            highchartsInitialize();
            highchartsDestroy();
            loadChart("customDate");
            priorityModalDate = "customDate";
            $(".datePicker").css('background', '#fff');
            disableCustomDatePicker(false, 'fromDate', 'toDate');
            $("#toDate.datePicker").css('background', '#eee');
            clearDatePicker('fromDate', 'toDate', '-180d', '-1d', '-180d', '-1d');
            // update the HelpTextIcon
            updateHelpText('opsPostIncidentCustomDate');
        } else {
            emptyDateValidation('fromDate', 'toDate');
        }
    });
    $('#tillDate').trigger("click");
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
        var queryMapKey = "opsPostIncidentDrillQuery";
        getResultsAndExport(queryMapKey, "incidentStatusOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "incidentPriorityOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "incidentSystemOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "incidentQueueOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "incidentIntakeTrendOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "incidentlistOperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "incidentTop5OperationData", country, fromDate, toDate);
        getResultsAndExport(queryMapKey, "incidentAvgResolutionOperationData", country, fromDate, toDate);
        return false;
    }

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
        var statuswiseChartData = getOnlySearchResultsConstructor("statuswiseChartPreloaderQuery","30m");
        var prioritywiseChartData = getOnlySearchResultsConstructor("prioritywiseChartPreloaderQuery","30m");
        var systemwiseChartData = getOnlySearchResultsConstructor("systemwiseChartPreloaderQuery","30m");
        var queuewiseChartData = getOnlySearchResultsConstructor("queuewiseChartPreloaderQuery","30m");
        var avgResolutionChartData = getOnlySearchResultsConstructor("avgResolutionChartPreloaderQuery","30m");
        var top5IncidentsData = getOnlySearchResultsConstructor("top5IncidentsPreloaderQuery","30m");
        var incIntakeChartData = getOnlySearchResultsConstructor("incIntakeChartPreloaderQuery","30m");

        // query var declarations
        var statusQuery = "";
        var priorityQuery = "";
        var systemQuery = "";
        var queueQuery = "";
        var avgResolutionQuery = "";
        var top5IncidentQuery = "";
        var intakeTrendQuery = "";

        if ("tillDate" === chartType) {
            statusQuery = "incidentStatusTillDate";
            priorityQuery = "incidentPriorityTillDate";
            systemQuery = "incidentSystemTillDate";
            queueQuery = "incidentQueueTillDate";
            avgResolutionQuery = "incidentAvgResolutionTillDate";
            top5IncidentQuery = "incidentTop5Today";
            intakeTrendQuery = "incidentIntakeTrendDaily";
        } else if ("today" === chartType) {
            statusQuery = "incidentStatusToday";
            priorityQuery = "incidentPriorityToday";
            systemQuery = "incidentSystemToday";
            queueQuery = "incidentQueueToday";
            top5IncidentQuery = "incidentTop5Today";
            avgResolutionQuery = "incidentAvgResolutionTillDate";
            intakeTrendQuery = "incidentIntakeTrendDaily";
        } else if ("daily" === chartType) {
            statusQuery = "incidentStatusDaily";
            priorityQuery = "incidentPriorityDaily";
            systemQuery = "incidentSystemDaily";
            queueQuery = "incidentQueueDaily";
            intakeTrendQuery = "incidentIntakeTrendDaily";
            top5IncidentQuery = "incidentTop5Today";
            avgResolutionQuery = "incidentAvgResolutionTillDate";
        } else if ("weekly" === chartType) {
            statusQuery = "incidentStatusWeekly";
            priorityQuery = "incidentPriorityWeekly";
            systemQuery = "incidentSystemWeekly";
            queueQuery = "incidentQueueWeekly";
            intakeTrendQuery = "incidentIntakeTrendWeekly";
            top5IncidentQuery = "incidentTop5Today";
            avgResolutionQuery = "incidentAvgResolutionTillDate";
        } else if ("monthly" === chartType) {
            statusQuery = "incidentStatusMonthly";
            priorityQuery = "incidentPriorityMonthly";
            systemQuery = "incidentSystemMonthly";
            queueQuery = "incidentQueueMonthly";
            intakeTrendQuery = "incidentIntakeTrendMonthly";
            top5IncidentQuery = "incidentTop5Today";
            avgResolutionQuery = "incidentAvgResolutionTillDate";
        } else if ("customDate" === chartType) {
            statusQuery = "incidentStatusCustomDate";
            priorityQuery = "incidentPriorityCustomDate";
            systemQuery = "incidentSystemCustomDate";
            queueQuery = "incidentQueueCustomDate";
            intakeTrendQuery = "incidentIntakeTrendCustomDate";
            top5IncidentQuery = "incidentTop5Today";
            avgResolutionQuery = "incidentAvgResolutionTillDate";
        }

        // Incident Statuswise
        statuswiseChartData.settings.unset("search");
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            statuswiseChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", statusQuery, country, fromDate, toDate, serviceType));
        } else {
            statuswiseChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", statusQuery, country, "", "", serviceType));
        }
        statuswiseChartData.startSearch();
        $('#statuswiseChart').html('<div id="statuswiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#statuswiseChartPreloader').show();

        statuswiseChartData.on('search:done', function (properties) {
            var orderStatusResults = statuswiseChartData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            orderStatusResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadIncidentStatusChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#statuswiseChartPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    if ('today' === chartType || 'tillDate' === chartType) {
                        Highcharts.chart('statuswiseChart', opsIncPostDrilldown.emptyDataConfig.statuswise);
                    } else {
                        Highcharts.chart('statuswiseChart', opsIncPostDrilldown.daily.statuswise);
                    }
                }
            }, 3000);

            refreshDateTime();
        });

        // Incident Average Resolution
        avgResolutionChartData.settings.unset("search");
        avgResolutionChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", avgResolutionQuery, country, "", "", serviceType));
        avgResolutionChartData.startSearch();

        $('#avgResolutionChart').html('<div id="avgResolutionChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#avgResolutionChartPreloader').show();

        avgResolutionChartData.on('search:done', function (properties) {
            var avgResolutionResults = avgResolutionChartData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            avgResolutionResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadIncidentAvgResolutionChart(finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#avgResolutionChartPreloader').hide();
            setTimeout(
                function () {
                    if (isNoData) {
                        Highcharts.chart('avgResolutionChart', opsIncPostDrilldown.emptyDataConfig.avgResolution);
                    }
                }, 3000);
            refreshDateTime();
        });

        // Top 5 Incident
        top5IncidentsData.settings.unset("search");
        top5IncidentsData.settings.set("search", getQuery("opsPostIncidentDrillQuery", top5IncidentQuery, country, "", "", serviceType));
        top5IncidentsData.startSearch();

        $('#top5IncidentsContainer').html('<div id="top5IncidentsPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#top5IncidentsPreloader').show();

        top5IncidentsData.on('search:done', function (properties) {
            var top5IncidentResults = top5IncidentsData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            top5IncidentResults.on("data", function () {
                if (undefined !== top5IncidentResults.data()) {
                    loadTop5IncidentChart(top5IncidentResults.data().rows);
                    isNoData = false;
                }
            });
            $('#top5IncidentsPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    $('#top5IncidentsContainer').html('<div id="noDataDisplay">No data to display</div>');
                    $('#noDataDisplay').css('line-height', chartHeight + 'px');
                }
            }, 3000);
            refreshDateTime();
        });

        // Incident Prioritywise
        prioritywiseChartData.settings.unset("search");
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            prioritywiseChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", priorityQuery, country, fromDate, toDate, serviceType));
        } else {
            prioritywiseChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", priorityQuery, country, "", "", serviceType));
        }
        prioritywiseChartData.startSearch();

        $('#prioritywiseChart').html('<div id="prioritywiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#prioritywiseChartPreloader').show();

        prioritywiseChartData.on('search:done', function () {
            var incPriorityResults = prioritywiseChartData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            incPriorityResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        loadIncidentPriorityChart(chartType, queryResults);
                        isNoData = false;
                    }
                }
            });
            $('#prioritywiseChartPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart('prioritywiseChart', opsIncPostDrilldown.emptyDataConfig.prioritywise);
                }
            }, 3000);
            refreshDateTime();
        });

        // Incident Systemwise
        systemwiseChartData.settings.unset("search");
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            systemwiseChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", systemQuery, country, fromDate, toDate, serviceType));
        } else {
            systemwiseChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", systemQuery, country, "", "", serviceType));
        }
        systemwiseChartData.startSearch();

        $('#systemwiseChart').html('<div id="systemwiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#systemwiseChartPreloader').show();

        systemwiseChartData.on('search:done', function (properties) {
            var incSystemResults = systemwiseChartData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            incSystemResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadIncidentSystemChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#systemwiseChartPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    Highcharts.chart('systemwiseChart', opsIncPostDrilldown.emptyDataConfig.systemwise);
                }
            }, 3000);

            refreshDateTime();
        });

        // Incident Queuewise
        queuewiseChartData.settings.unset("search");
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            queuewiseChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", queueQuery, country, fromDate, toDate, serviceType));
        } else {
            queuewiseChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", queueQuery, country, "", "", serviceType));
        }
        queuewiseChartData.startSearch();

        $('#queuewiseChart').html('<div id="queuewiseChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#queuewiseChartPreloader').show();

        queuewiseChartData.on('search:done', function (properties) {
            var incQueueResults = queuewiseChartData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            incQueueResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadIncidentQueueChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#queuewiseChartPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    if ('tillDate' === chartType || 'today' === chartType) {
                        opsIncPostDrilldown.tillDate.queuewise.series[0].data = [];
                        Highcharts.chart('queuewiseChart', opsIncPostDrilldown.tillDate.queuewise);
                    } else {
                        opsIncPostDrilldown.daily.queuewise.series = [];
                        Highcharts.chart('queuewiseChart', opsIncPostDrilldown.daily.queuewise);
                    }
                }
            }, 3000)

            refreshDateTime();
        });

        // Incident Intake Trend
        incIntakeChartData.settings.unset("search");
        if ("" !== fromDate && "" !== toDate) {
            if (fromDate.indexOf(":0:0:0") == -1) {
                fromDate = fromDate + ':0:0:0';
            }
            if (toDate.indexOf(":23:59:59") == -1) {
                toDate = toDate + ":23:59:59";
            }
            incIntakeChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", intakeTrendQuery, country, fromDate, toDate, serviceType));
        } else {
            incIntakeChartData.settings.set("search", getQuery("opsPostIncidentDrillQuery", intakeTrendQuery, country, "", "", serviceType));
        }
        incIntakeChartData.startSearch();

        $('#incIntakeChart').html('<div id="incIntakeChartPreloader" class="chartPreloader"><i class="fa fa-spinner fa-spin fa-4x fa-gradient"></i></div>');
        $('#incIntakeChartPreloader').show();

        incIntakeChartData.on('search:done', function (properties) {
            var orderIntakeResults = incIntakeChartData.data("results", {
                count: 0,
                offset: 0
            });
            var isNoData = true;
            orderIntakeResults.on("data", function (queryResults) {
                if (undefined !== queryResults.data()) {
                    if (null !== queryResults.data().rows) {
                        var finalDataJson = convertResultToJSON(queryResults.data());
                        loadIncidentIntakeTrendChart(chartType, finalDataJson.data);
                        isNoData = false;
                    }
                }
            });
            $('#incIntakeChartPreloader').hide();
            setTimeout(function () {
                if (isNoData) {
                    if ('daily' === chartType) {
                        opsIncPostDrilldown.daily.incidentTrend.series[0].data = [];
                        opsIncPostDrilldown.daily.incidentTrend.series[1].data = [];
                        Highcharts.chart('incIntakeChart', opsIncPostDrilldown.daily.incidentTrend);
                    } else {
                        opsIncPostDrilldown.weekly.incidentTrend.series[0].data = [];
                        Highcharts.chart('incIntakeChart', opsIncPostDrilldown.weekly.incidentTrend);
                    }
                }
            }, 3000)

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

    }
);

function getOnlySearchResultsConstructor(id,interval) {
    var searchmanager = new SearchManagerModal({
        //"id": id,
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

function getOnlyModalSearchResultsConstructor(id) {
    var searchmanager = new SearchManagerModal({
        //"id": id,
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
function loadIncidentStatusChart(chartType, rows) {
    var orderStatusChart;
    var fixedIncidentStatus = ["QUEUED", "CLOSED", "INPROG", "RESOLVED", "NEW", "PENDING", "DELAYED", "ESCALATED"];
    if ("tillDate" === chartType || "today" === chartType) {
        orderStatusChart = Highcharts.chart('statuswiseChart', opsIncPostDrilldown.today.statuswise);
        setPieData(rows, orderStatusChart, 'status', 'totalincidents');
    } else if ("daily" === chartType || "weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        processStackBarData(rows, opsIncPostDrilldown.daily.statuswise, "statuswiseChart", fixedIncidentStatus, "txndate", "status", "totalincidents");
    } 
}

function loadIncidentAvgResolutionChart(queryResults) {
    if (undefined !== queryResults) {
        var dataSeries = averageResolution(queryResults, 'sourcesystem', 'totalincidents', 'avgtime');
        opsIncPostDrilldown.tillDate.avgResolution.xAxis[0].categories = dataSeries.Categories;
        opsIncPostDrilldown.tillDate.avgResolution.series[0].data = dataSeries.TotalIncidentsCount;
        opsIncPostDrilldown.tillDate.avgResolution.series[1].data = dataSeries.AverageResolution;
        Highcharts.chart('avgResolutionChart', opsIncPostDrilldown.tillDate.avgResolution);
    }
}

function loadTop5IncidentChart(queryResultData) {
    var tableHeader = '<table class="table table-bordered table-hover"><thead><tr><th>Ticket ID</th><th>Reported Date</th><th>Summary</th><th>Created By</th><th>Owner</th><th>Priority</th><th>Status</th></tr></thead>';
    if (null !== queryResultData) {
        //Code to list maintenanceWindowData.
        if (queryResultData.length > 0) {
            for (var i = 0; i < queryResultData.length; i++) {
                tableHeader += '<tr><td>' + formatNullValue(queryResultData[i][0]) + '</td><td>' + queryResultData[i][1] + '</td><td>' + queryResultData[i][2] + '</td><td>' + queryResultData[i][3] + '</td><td>' + queryResultData[i][4] + '</td><td>' + queryResultData[i][5] + '</td><td>' + queryResultData[i][6] + '</td></tr>';
            }
        } else {
            tableHeader += '<td align="center" colspan="7"> No data to display </td>';
        }
        tableHeader += '</tbody></table>';
        $('#top5IncidentsContainer').html(tableHeader);
    }
    $('#top5IncidentsPreloader').hide();
}

function loadIncidentPriorityChart(chartType, queryResults) {
    var finalData = [{
            name: 'P1',
            y: 0,
            color: '#ff0000'
        },
        {
            name: 'P2',
            y: 0,
            color: '#ef5956'
        },
        {
            name: 'P3',
            y: 0,
            color: '#f69653',
        },
        {
            name: 'P4',
            y: 0,
            color: '#fdb94e'
        }
    ];
    var finalDataJson = convertResultToJSON(queryResults.data());
    var priorityData = priorityDataProcessor(finalDataJson.data, 'priority', 'totalincidents');
    finalData[0].y = priorityData.p1;
    finalData[1].y = priorityData.p2;
    finalData[2].y = priorityData.p3;
    finalData[3].y = priorityData.p4;
    opsIncPostDrilldown.tillDate.prioritywise.series[0].data = finalData;
    Highcharts.chart('prioritywiseChart', opsIncPostDrilldown.tillDate.prioritywise);
}

function loadIncidentSystemChart(chartType, rows) {
    var incidentSystem;
    incidentSystem = Highcharts.chart('systemwiseChart', opsIncPostDrilldown.tillDate.systemwise);
    setPieData(rows, incidentSystem, 'sourcesystem', 'totalincidents');
}

function loadIncidentQueueChart(chartType, rows) {
    var incidentQueue;
    if ("tillDate" === chartType || "today" === chartType) {
        incidentQueue = Highcharts.chart('queuewiseChart', opsIncPostDrilldown.tillDate.queuewise);
        setPieData(rows, incidentQueue, 'ownergroup', 'totalincidents');
    } else {
        incidentQueue = opsIncPostDrilldown.daily.queuewise;
        basicLineDataProcessor(rows, incidentQueue, 'queuewiseChart', 'txndate', 'ownergroup', 'totalincidents');
        return;
    }
}

function loadIncidentIntakeTrendChart(chartType, queryResults) {
    var incidentIntakeCC;
    var processedIntakeData;

    if ("daily" === chartType) {
        incidentIntakeCC = opsIncPostDrilldown.daily.incidentTrend;
        var trendChartdata = trendDataProcessor(queryResults, 'txndate', 'totalincidents');
        incidentIntakeCC.xAxis[0].categories = trendChartdata.xaxisValues;
        incidentIntakeCC.series[0].data = trendChartdata.currentWeekData;
        incidentIntakeCC.series[1].data = trendChartdata.previousWeekData;
        Highcharts.chart('incIntakeChart', incidentIntakeCC);
    } else if ("weekly" === chartType || "monthly" === chartType || "customDate" === chartType) {
        incidentIntakeCC = opsIncPostDrilldown.weekly.incidentTrend;
        processedIntakeData = trendWithoutComparison(queryResults, 'txndate', 'totalincidents');
        incidentIntakeCC.xAxis[0] = [];
        incidentIntakeCC.xAxis[0].categories = processedIntakeData.axis;
        incidentIntakeCC.series[0].data = processedIntakeData.data;
        Highcharts.chart('incIntakeChart', incidentIntakeCC);
    }
}

function processIncidentDetailsResults(resultData) {
    if (undefined !== resultData) {
        // The search results
        var incidentDetails = resultData.rows;
        if (null !== incidentDetails) {
            var tableData = '<table class="table table-bordered table-hover"><thead><tr><th>Ticket ID</th><th>Reported Date</th><th>Summary</th><th>Created By</th><th>Owner</th><th>Priority</th><th>Status</th></tr></thead>';
            //Code to list incidentDetails.
            for (var i = 0; i < incidentDetails.length; i++) {
                tableData += '<tr><td>' + formatNullValue(incidentDetails[i][0]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][1]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][2]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][3]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][4]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][5]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][6]) + '</td></tr>';
            }
            tableData += '</tbody></table>';
            $('#incidentPriorityChartPreloader').show();
            $('#incidentSysTableModal').modal('show');
            $('#topSystemContainer').html(tableData);
            $('#loader').hide();
        }
    }
}

function processIncidentPriorityDetailsResults(resultData) {
    if (undefined !== resultData) {
        // The search results
        var incidentDetails = resultData.rows;
        if (null !== incidentDetails) {
            var tableData = '<table class="table table-bordered table-hover"><thead><tr><th>Incident ID</th><th>Reported Date</th><th>Summary</th><th>Created By</th><th>Owner</th><th>Severity</th><th>Status</th></tr></thead>';
            //Code to list incidentDetails.
            for (var i = 0; i < incidentDetails.length; i++) {
                tableData += '<tr><td>' + formatNullValue(incidentDetails[i][0]) +
                   // '</td><td>' + formatNullValue(incidentDetails[i][1]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][2]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][3]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][4]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][5]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][6]) +
                    '</td><td>' + formatNullValue(incidentDetails[i][7]) +
                    '</td></tr>';

            }
            tableData += '</tbody></table>';
            $('#incidentPriorityChartPreloader').show();
            $('#incidentTableModal').modal('show');
            $('#topPriorityContainer').html(tableData);
            $('#loader').hide();
        }
    }
}

function IncidentOnclick(system) {

    $('#preloader, #status, #loader').show();
    var priorityModalQuery = "";
    if ("tillDate" === priorityModalDate) {
        priorityModalQuery = "incidentlistTillDate";
    } else if ("today" === priorityModalDate) {
        priorityModalQuery = "incidentlistToday";
    } else if ("daily" === priorityModalDate) {
        priorityModalQuery = "incidentlistDaily";
    } else if ("weekly" === priorityModalDate) {
        priorityModalQuery = "incidentlistWeekly";
    } else if ("monthly" === priorityModalDate) {
        priorityModalQuery = "incidentlistMonthly";
    } else if ("customDate" === priorityModalDate) {
        priorityModalQuery = "incidentlistCustom";
    }

    var urgency = system.split("")[1]; // get priority from name
    var incIntakeChartData = getOnlyModalSearchResultsConstructor();
    incIntakeChartData.settings.unset("search");
    if ($("#fromDate").val() != "" && $("#toDate").val() != "") {
        if ($("#fromDate").val().indexOf(":0:0:0") == -1) {
            fromDate = $("#fromDate").val() + ':0:0:0';
        }
        if ($("#toDate").val().indexOf(":23:59:59") == -1) {
            toDate = $("#toDate").val() + ":23:59:59";
        }
        incIntakeChartData.settings.set("search", getQueryForOpsIncident("opsPostIncidentDrillQuery", priorityModalQuery, country, system, fromDate, toDate, serviceType));
    } else {
        incIntakeChartData.settings.set("search", getQueryForOpsIncident("opsPostIncidentDrillQuery", priorityModalQuery, country, system, "", "", serviceType));
    }
    incIntakeChartData.startSearch();
    incIntakeChartData.on('search:progress', function (properties) {

    });
    incIntakeChartData.on('search:done', function (properties) {
        var incidentDetailsResults = incIntakeChartData.data("results", {
            count: 0,
            offset: 0
        });
        incidentDetailsResults.on("data", function () {
            processIncidentDetailsResults(incidentDetailsResults.data()); // The search results
            $('#preloader, #status, #loader').hide();
        });
        $('#preloader, #status, #loader').hide();
        $('#incidentPriorityChartPreloader').show();
        $('#incidentSysTableModal').modal('show');
        var tableData = '<table class="table table-bordered table-hover"><thead><tr><th id="noDataDisplay">No data to display</th></tr></thead>';
        $('#topSystemContainer').html(tableData);
    });
}

function IncidentOnclickPriority(priority) {

    $('#preloader, #status, #loader').show();
    var priorityModalQuery = "";
    if (priorityModalDate == "tillDate") {
        priorityModalQuery = "incidentlistTillDatePriority";
    } else if (priorityModalDate == "today") {
        priorityModalQuery = "incidentlistTodayPriority";
    } else if (priorityModalDate == "daily") {
        priorityModalQuery = "incidentlistDailyPriority";
    } else if (priorityModalDate == "weekly") {
        priorityModalQuery = "incidentlistWeeklyPriority";
    } else if (priorityModalDate == "monthly") {
        priorityModalQuery = "incidentlistMonthlyPriority";
    } else if (priorityModalDate == "customDate") {
        priorityModalQuery = "incidentlistCustomPriority";
    }

    var urgency = priority.split("")[1]; // get priority from name
    var incIntakeChartData = getOnlyModalSearchResultsConstructor();
    incIntakeChartData.settings.unset("search");
    if ($("#fromDate").val() !== "" && $("#toDate").val() !== "") {
        if ($("#fromDate").val().indexOf(":0:0:0") == -1) {
            fromDate = $("#fromDate").val() + ':0:0:0';
        }
        if ($("#toDate").val().indexOf(":23:59:59") == -1) {
            toDate = $("#toDate").val() + ":23:59:59";
        }
        incIntakeChartData.settings.set("search", getQueryForOpsIncident("opsPostIncidentDrillQuery", priorityModalQuery, country, urgency, fromDate, toDate, serviceType));
    } else {
        incIntakeChartData.settings.set("search", getQueryForOpsIncident("opsPostIncidentDrillQuery", priorityModalQuery, country, urgency, "", "", serviceType));
    }
    incIntakeChartData.startSearch();
    incIntakeChartData.on('search:progress', function (properties) {

    });
    incIntakeChartData.on('search:done', function (properties) {
        var incidentDetailsResults = incIntakeChartData.data("results", {
            count: 0,
            offset: 0
        });
        incidentDetailsResults.on("data", function () {
            processIncidentPriorityDetailsResults(incidentDetailsResults.data()); // The search results
            $('#preloader, #status, #loader').hide();
        });
        $('#preloader, #status, #loader').hide();
        $('#incidentPriorityChartPreloader').show();
        $('#incidentTableModal').modal('show');
        var tableData = '<table class="table table-bordered table-hover"><thead><tr><th id="noDataDisplay">No data to display</th></tr></thead>';
        $('#topPriorityContainer').html(tableData);
    });
}