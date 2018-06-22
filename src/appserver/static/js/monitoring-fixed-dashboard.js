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

        //  custom changes for splunk js starts here,

        updateHelpText('monitorFixedDashboardHelp');

        // help text for the two tabs
        function updateHelpText(mapKey) {
            getHelpText(mapKey, "siteStatusHelp");
            getHelpText(mapKey, "interfaceMonitorHelp");
            getHelpText(mapKey, "openIncHelp");
            getHelpText(mapKey, "alarmHelp");
            getHelpText(mapKey, "mainWindowHelp");
            getHelpText(mapKey, "serverAvailHelp");
            getHelpText(mapKey, "topIncHelp");
        }

        var height = $(window).height();
        //Resizing chart
        var chartHeight = ((height - 336) / 2);
        var serverTable = height - 480;
        // Margin-top for Mobile and web
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
        if (!isMobile) {
            $('.server-table').css('height', serverTable);
            $('#chartPreloader').css('height', chartHeight);
        } else {
            $('.server-table').css('height', '250px');
            $('#chartPreloader').css('height', '250px');
        }

        //TO SELECT COUNTRY 
        var oldCountryList = "";
        var country = "";
        var serviceType = 'Fixed';

        if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
            if (localStorage.getItem("globalUserServiceTypeList").indexOf("monitoring-fixed") > -1) {
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
                    if (localStorage.getItem("globalUserServiceTypeList").toString().match(/monitoring/g).length > 1) {
                        oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
                        country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
                        loadSuccessPage();
                        reloadAll();
                        clearInterval(getDataInterval);
                    }
                }
            }, 100);
        }
        $('.country-setting').click(
            function () {
                var newCountryList = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? JSON.parse(localStorage.getItem("selectedCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
                if (!$("#wrapper").hasClass("toggled")) {
                    if (oldCountryList !== newCountryList) {
                        country = localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","');
                        reloadAll();
                        oldCountryList = newCountryList;
                    }
                }
            });
        var svgElement = d3.select("svg");
        var interfaceValList = '';
        var interfaceList = d3.map()
            //.set("cursmp01", "smp1_bes_line")
            //.set("cursmp02", "smp2_bes_line");
            .set("", "");
        // click for IM flow
        $(".interfaceMonitorId").click(function () {
            $("#preloader").show();
            $('#status').show();
            $('#preloader').delay(2000).fadeOut('slow');
            $('#status').delay(2000).fadeOut('slow');
            var availableQueue = [];
            var height = window.innerHeight;
            var half_height = height - 120;
            var svgHeight = height - 170;
            $('.tab-pane').css('height', half_height);
            $('object').css('height', svgHeight);
            $('#svg svg').css('height', svgHeight);

            interfaceValList = interfaceList;
            loadInterfaces("mon_post_interfaceAvail", interfaceValList);

            function loadInterfaces(queryKey, interfaceValList) {
                // get the base query to load the availablity of the interfaces in SVG.
                var interfaceStatusResults = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", queryKey, '', '', interfaceValList.keys()), "30m");

                interfaceStatusResults.on("search:progress", function () {
                    $("#preloader").show();
                    $('#status').show();
                });

                interfaceStatusResults.on("search:done", function () {
                    var interfaceResults = interfaceStatusResults.data("results", {
                        "count": 0,
                        "offset": 0
                    });
                    interfaceResults.on("data", function () {
                        // this data will have queue details which are changed in latest time frame, other queuestatus will be Not_Availasble
                        if (undefined != interfaceResults.data() || null != interfaceResults.data()) {
                            // The search results
                            var finalDataJson = convertResultToJSON(interfaceResults.data());
                            var notAvailableQueue = loadInterfaceElements(finalDataJson.data, availableQueue);
                            notAvailableQueue = removeDuplFromQueueName(notAvailableQueue);
                            var tempStr = notAvailableQueue.toString().split('\",\"');
                            notAvailableQueue = tempStr.join('\" OR \"');
                            // click of individual interfaces lines
                            svgElement.selectAll(".interface_shape").on("click", function (d) {
                                var thisNode = d3.select(this);
                                var interfaceData = '';
                                refreshModalRows();
                                if ("InterfaceFound" === thisNode.attr("status")) {
                                    // query for getting the missed queues
                                    var interfaceDetailsQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_interfaceQueueStatus", '', '', thisNode.attr("hostname"), notAvailableQueue), "0");

                                    interfaceDetailsQuery.on("search:progress", function () {
                                        $("#preloader").show();
                                        $('#status').show();
                                    });

                                    interfaceDetailsQuery.on("search:done", function () {
                                        var interfaceDetailsResults = interfaceDetailsQuery.data("results", {
                                            "count": 0,
                                            "offset": 0
                                        });
                                        interfaceDetailsResults.on("data", function () {
                                            if (undefined !== interfaceDetailsResults.data()) {
                                                // The search results
                                                //availableQueue = removeDuplFromQueueName(availableQueue);
                                                var finalData = convertResultToJSON(interfaceDetailsResults.data());
                                                var interfaceDetailsData = processQueueDetails(availableQueue, finalData.data);
                                                loadInterfaceDetails(interfaceDetailsData, thisNode,
                                                    "interface_details_table_header",
                                                    "interface_details_table_values");
                                            }
                                        });
                                        if (undefined !== interfaceData && '' !== interfaceData) {
                                            loadInterfaceDetails(availableQueue, thisNode,
                                                "interface_details_table_header",
                                                "interface_details_table_values");
                                        } else {
                                            loadNoDataIntoModal("interface_details_table_header", "interface_details_table_values", "No Data to display");
                                        }
                                    });
                                } else if ("InterfaceNotFound" === thisNode.attr("status")) {
                                    loadInterfaceDataIntoModal("No Data", "interface_details_table_header", "interface_details_table_values", thisNode);
                                }
                                $("#preloader").hide();
                                $('#status').hide();
                            });
                        }
                    });
                    $("#preloader").hide();
                    $('#status').hide();
                });

            }
            var nodesStatusResults = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_nodeAvail"), "30m");

            nodesStatusResults.on("search:progress", function () {
                $("#preloader").show();
                $('#status').show();
            });

            nodesStatusResults.on("search:done", function () {
                var nodesResults = nodesStatusResults.data("results", {
                    "count": 0,
                    "offset": 0
                });
                nodesResults.on("data", function () {
                    if (undefined != nodesResults.data()) {
                        //The search results
                        var nodeResultsJSON = convertResultToJSON(nodesResults.data());
                        loadNodeElements(nodeResultsJSON.data);
                        svgElement.selectAll(".nodes_shape").on("click", function (d) {
                            var thisNode = d3.select(this).select('.nodeAvail');
                            refreshModalRows();
                            if ("Found" === thisNode.attr("status")) {
                                var nodesCPUQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_cpuLoad", thisNode.attr("servername")), "0");

                                nodesCPUQuery.on("search:progress", function () {
                                    $("#preloader").show();
                                    $('#status').show();
                                });

                                nodesCPUQuery.on("search:done", function () {
                                    var nodesCPUResults = nodesCPUQuery.data("results", {
                                        "count": 0,
                                        "offset": 0
                                    });
                                    nodesCPUResults.on("data", function () {
                                        if (undefined !== nodesCPUResults.data()) {
                                            // The search results
                                            var nodeCPUData = convertResultToJSON(nodesCPUResults.data());
                                            loadNodeDetails(nodeCPUData.data, thisNode, "node_cpu_table_header", "node_cpu_table_values");
                                        }
                                    });
                                    loadNoDataIntoModal("node_cpu_table_header", "node_cpu_table_values", "No Data to display");
                                });

                                var nodesAlertQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_Alerts", thisNode.attr("servername")), "0");

                                nodesAlertQuery.on("search:done", function () {
                                    var nodesAlertResults = nodesAlertQuery.data("results", {
                                        "count": 0,
                                        "offset": 0
                                    });
                                    nodesAlertResults.on("data", function () {
                                        if (undefined !== nodesAlertResults.data()) {
                                            // The search results
                                            var nodeAlertData = convertResultToJSON(nodesAlertResults.data());
                                            loadNodeDetails(nodeAlertData.data, thisNode, "node_alerts_table_header", "node_alerts_table_values");
                                        }
                                    });
                                    loadNoDataIntoModal("node_alerts_table_header", "node_alerts_table_values", "No Data to display");
                                });

                                var nodesDetailsQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_nodeDetails", thisNode.attr("servername")), "0");

                                nodesDetailsQuery.on("search:done", function () {
                                    var nodesDetailsResults = nodesDetailsQuery.data("results", {
                                        "count": 0,
                                        "offset": 0
                                    });
                                    nodesDetailsResults.on("data", function () {
                                        if (undefined !== nodesDetailsResults.data()) {
                                            // The search results
                                            var nodeDetailsData = convertResultToJSON(nodesDetailsResults.data());
                                            loadNodeDetails(nodeDetailsData.data, thisNode, "node_details_table_header", "node_details_table_values");
                                        }
                                    });
                                    loadNoDataIntoModal("node_details_table_header", "node_details_table_values", "No Data to display");
                                });

                                var nodesDiskQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_diskUsage", thisNode.attr("servername")), "0");

                                nodesDiskQuery.on("search:done", function () {
                                    var nodesDiskResults = nodesDiskQuery.data("results", {
                                        "count": 0,
                                        "offset": 0
                                    });
                                    nodesDiskResults.on("data", function () {
                                        if (undefined !== nodesDiskResults.data()) {
                                            // The search results
                                            var nodeDiskData = convertResultToJSON(nodesDiskResults.data());
                                            loadNodeDetails(nodeDiskData.data, thisNode, "node_disk_table_header", "node_disk_table_values");
                                        }
                                    });
                                    loadNoDataIntoModal("node_disk_table_header", "node_disk_table_values", "No Data to display");
                                });
                                
                                var nodesProcessQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_processUsage", thisNode.attr("servername")), "0");

                                nodesProcessQuery.on("search:done", function () {
                                    var nodesProcessResults = nodesProcessQuery.data("results", {
                                        "count": 0,
                                        "offset": 0
                                    });
                                    nodesProcessResults.on("data", function () {
                                        if (undefined !== nodesProcessResults.data()) {
                                            // The search results
                                            var nodeProcessData = convertResultToJSON(nodesProcessResults.data());
                                            loadNodeDetails(nodeProcessData.data, thisNode, "node_process_table_header", "node_process_table_values");
                                        }
                                    });
                                    loadNoDataIntoModal("node_process_table_header", "node_process_table_values", "No Data to display");
                                });
                                    var nodesErrorQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_errorLog", thisNode.attr("servername")),  "0");

                                    nodesErrorQuery.on("search:done", function () {
                                        var nodesErrorResults = nodesErrorQuery.data("results", {
                                            "count": 0,
                                            "offset": 0
                                        });
                                        nodesErrorResults.on("data", function () {
                                            if (undefined !== nodesErrorResults.data()) {
                                                // The search results
                                                var nodeErrorData = convertResultToJSON(nodesErrorResults.data());
                                                loadNodeDetails(nodeErrorData.data, thisNode, "node_error_table_header", "node_error_table_values");
                                            }
                                        });
                                        loadNoDataIntoModal("node_error_table_header", "node_error_table_values", "No Data to display");
                                    });

                            } else if ("NotFound" === thisNode.attr("status")) {
                                loadDataIntoModal("No Data", "node_details_table_header", "node_details_table_header", thisNode);
                            }
                            $("#preloader").hide();
                            $('#status').hide();
                        });
                    }
                });
                $("#preloader").hide();
                $('#status').hide();
            });
        });

        $("#homeId").click(function () {
            $("#preloader").show();
            $('#status').show();
            $('#preloader').delay(2000).fadeOut('slow');
            $('#status').delay(2000).fadeOut('slow');
        });

        $(".siteMonitorId").click(function () {
            $("#preloader").show();
            $('#status').show();
            $('#preloader').delay(2000).fadeOut('slow');
            $('#status').delay(2000).fadeOut('slow');
            //Animate CSS
            $('.card').addClass('animated zoomIn');
            //Height of the Tab and maps
            var height = $(window).height();
            var mapHeight = (height - 220);
            $("#monitoringMap").css("height", mapHeight);

            var tabHeight = (height - 160);
            $(".card-tab").css("height", tabHeight);

            var svgHeight = height - 400;
            $('.svg-container').css('height', svgHeight);
            var data = {};
            $("#servers option").each(function (i, el) {
                data[$(el).data("value")] = $(el).val();
            });

            $('#server-selected').change(function () {
                var value = $('#server-selected').val();
                var maptarget = $('#servers [value="' + value + '"]').data('value');
                $("#server_search").attr('data', maptarget);
            });

            // Nassau -> 25.0479835, -77.355413 & Curacao -> 12.0989103, -68.8585774 & Haiti(map center) -> 18.594395, -72.3074326 (Dont delete it)

            var myCenter = new google.maps.LatLng(18.594395, -72.3074326);
            var pmap;
            var curacao, nassau, all;

            initialize();

            function initialize() {
                $('.locate-in-map').click(function (event) {
                    if ("" != $("#server-selected").val()) {
                        $("#server-selected").css("border:", "0px");
                        var ll = $(this).attr('data');
                        if ('ALL' == $("#server-selected").val().toUpperCase()) {
                            google.maps.event.trigger(all, 'click');
                        } else if ('CURACAO' == $("#server-selected").val().toUpperCase()) {
                            google.maps.event.trigger(curacao, 'click');
                        } else if ('NASSAU' == $("#server-selected").val().toUpperCase()) {
                            google.maps.event.trigger(nassau, 'click');
                        }
                        if ('ALL' != $("#server-selected").val().toUpperCase()) {
                            var nll = ll.split(",");
                            var n_latLng = new google.maps.LatLng(nll[0], nll[1]);
                            pmap.panTo(n_latLng);
                        }
                        $("#server-selected").val('');
                    } else {
                        $("#server-selected").css("border:", "2px solid red");
                    }
                });


                pmap = new google.maps.Map(document.getElementById('monitoringMap'), {
                    center: myCenter,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false,
                    zoom: 5,
                    labels: true
                });

                all = new google.maps.Marker({
                    position: new google.maps.LatLng(12.0989103, -68.8585774),
                    map: pmap,
                    //icon: 'static/images/server.png'
                });

                all.addListener('click', function () {
                    siteDetailsData(["Curacao", "Nassau"], true);
                    $(".site-table").show();
                });

                curacao = new google.maps.Marker({
                    position: new google.maps.LatLng(12.0989103, -68.8585774),
                    map: pmap,
                    //icon: 'static/images/server.png'
                });
                curacao.addListener('click', function () {
                    siteDetailsData("Curacao");
                    $(".site-table").show();
                });

                nassau = new google.maps.Marker({
                    position: new google.maps.LatLng(25.0479835, -77.355413),
                    map: pmap,
                    //icon: 'static/images/server.png'
                });
                nassau.addListener('click', function () {
                    siteDetailsData("Nassau");
                    $(".site-table").show();
                });

                google.maps.event.trigger(all, 'click');

            }

        });

        
        $("#interfacePostMonitorId").trigger("click");
        $("#sitePostMonitorId").trigger("click");
        $("#homePostId").trigger("click");

        // create serverlist as per lookup to sync with the data in SVG
        var serverList = d3.map()
            .set("BSPDAPPCERL01", "ceri_app_node1_icon")
            .set("BSPDAPPCERL02", "ceri_app_node2_icon")
            .set("BSPDAPPCERL03", "ceri_app_node3_icon")
            .set("BSPDWEBCERW01", "ceri_ws_node1_icon")
            .set("BSPDWEBCERW02", "ceri_ws_node2_icon")
            .set("BSPDWEBCERW03", "ceri_ws_node3_icon")
            .set("BSPDBESCERU01", "ceri_be_node1_icon")
            .set("BSPDBESCERU02", "ceri_be_node2_icon")
            .set("BSPDBESCERU03", "ceri_be_node3_icon")
            .set("cursmp01", "sig_node1_icon")
            .set("cursmp02", "sig_node2_icon")
            .set("mzplatform", "dr_node1_icon")
            .set("mzexecution", "dr_node2_icon")
            .set("mzexection2", "dr_node3_icon");





        function reloadAll() {

            //Incident by Priority
            var incByPriorityQuery = getQuery("monitorPostpaidQuery", "mon_post_incSeverity_chart", country, "", "", serviceType);
            var incByPrioritySearch = getOnlySearchResultsConstructor(incByPriorityQuery, "30m");

            incByPrioritySearch.on('search:progress', function (properties) {
                // Print just the event count from the search job
                $('#monitorPreloader').show();
            });
            incByPrioritySearch.on('search:done', function (properties) {
                var planType = [];
                var config = "";
                var incByPriorityResults = incByPrioritySearch.data("results");
                incByPriorityResults.on("data", function () {
                    if (undefined != incByPriorityResults.data()) {
                        var finalDataJson = convertResultToJSON(incByPriorityResults.data());
                        planType = priorityDataProcessor(finalDataJson.data, "priority", "totalincidents");
                    }
                    config = setIncByPriorityConfig(planType);
                    Highcharts.chart('incidentPriorityChart', config);
                });
                Highcharts.chart('incidentPriorityChart', monitorHome.incidentPriorityChartEmpty);
                $('#monitorPreloader').hide();

            });

            //Top 5 Incidents
            var topIncidentQuery = getQuery("monitorPostpaidQuery", "mon_post_incSearch_chart", country, "", "", serviceType);
            var topIncidentSearch = getOnlySearchResultsConstructor(topIncidentQuery, "30m");

            var incidentTableData = getTableHeaderValue("topIncident");
            topIncidentSearch.on('search:progress', function (properties) {
                // Print just the event count from the search job
                $('#monitorPreloader').show();
            });
            topIncidentSearch.on('search:done', function (properties) {
                var topIncidentResults = topIncidentSearch.data("results");
                topIncidentResults.on("data", function () {
                    if (undefined !== topIncidentResults.data()) {
                        var finalDataJson = convertResultToJSON(topIncidentResults.data());
                        processQueryResults(finalDataJson.data, incidentTableData, "topIncident", "topIncidentsDiv", "ticketid", "scheduler", "remarks");
                    }
                });
                showNoData(incidentTableData, "topIncidentsDiv", 2);
            });


            //Maintenance Window
            var maintenanceWindowQuery = getQuery("monitorPostpaidQuery", "mon_post_incMainWindow_chart", country, "", "", serviceType);
            var maintenanceWindowSearch = getOnlySearchResultsConstructor(maintenanceWindowQuery, "30m");

            var maintainTableData = getTableHeaderValue("maintenanceWindow");
            maintenanceWindowSearch.on('search:progress', function (properties) {
                // Print just the event count from the search job
                $('#monitorPreloader').show();
            });
            maintenanceWindowSearch.on('search:done', function (properties) {
                var maintenanceWindowResults = maintenanceWindowSearch.data("results", {
                    count: 0,
                    offset: 0
                });
                maintenanceWindowResults.on("data", function () {
                    if (undefined !== maintenanceWindowResults.data()) {
                        var finalDataJson = convertResultToJSON(maintenanceWindowResults.data());
                        processQueryResults(finalDataJson.data, maintainTableData, "maintenanceWindow", "maintenanceWindowDiv", "schedule", "ticketid", "remarks");
                    }
                });
                showNoData(maintainTableData, "maintenanceWindowDiv", 3);
            });


            //Alarm Summary
            var alarmData = null;
            var alarmDataQuery = getQuery("monitorPostpaidQuery", "mon_post_incAlarm_chart", country, "", "", serviceType);
            var alarmDataSearch = getOnlySearchResultsConstructor(alarmDataQuery, "30m");

            alarmDataSearch.on('search:progress', function (properties) {
                // Print just the event count from the search job
                $('#monitorPreloader').show();
            });
            var alarmDataResults = alarmDataSearch.data("results");
            alarmDataSearch.on('search:done', function (properties) {
                alarmDataResults.on("data", function () {
                    if (undefined !== alarmDataResults.data()) {
                        var finalDataJson = convertResultToJSON(alarmDataResults.data());
                        processAlarmDataResults(finalDataJson.data, "severity", "severitycount");
                    }
                });
            });

            function processAlarmDataResults(rows, severity, severityCount) {
                // The search results
                alarmData = rows;
                var criticalCount = 0;
                var majorCount = 0;
                var minorCount = 0;
                if (null !== alarmData && alarmData.length > 0) {
                    //Code to list alarmData.
                    for (var i = 0; i < alarmData.length; i++) {
                        var alarmSeverity = alarmData[i][severity];
                        if ('critical' === alarmSeverity.toLowerCase()) {
                            criticalCount = alarmData[i][severitycount];
                        }
                        if ('major' === alarmSeverity.toLowerCase()) {
                            majorCount = alarmData[i][severitycount];
                        }
                        if ('minor' === alarmSeverity.toLowerCase()) {
                            minorCount = alarmData[i][severitycount];
                        }
                    }
                }
                $("#criticalCount").text(criticalCount);
                $("#majorCount").text(majorCount);
                $("#minorCount").text(minorCount);

                if (criticalCount != 0) {
                    $("#criticalBtn").addClass("animated");
                    $("#criticalBtn").addClass("infinite");
                    $("#criticalBtn").addClass("pulse");
                }
                setButtonSize(criticalCount, "criticalBtn");
                setButtonSize(majorCount, "majorBtn")
                setButtonSize(minorCount, "minorBtn")
            }

            // Set the alarm button size
            function setButtonSize(alarmCount, alarmButton) {
                if (0 !== alarmCount && alarmCount > 999) {
                    $("#" + alarmButton + " span").css("margin-left", "-4px");
                } else if (alarmCount <= 0) {
                    $("#" + alarmButton + " span").css('cursor', 'default');
                }
            }

            //Incident details 
            var incidentDetailsSearch = getOnlySearchResultsConstructor("", "0");
            var incidentDetailsTableData = "";

            function IncidentOnclick(priority) {
                $('#preloader').show();
                $('#status').show();
                var urgency = priority.split("")[1]; // get priority from name
                incidentDetailsSearch.settings.unset("search");
                incidentDetailsSearch.settings.set("search", getMonitoringQuery("monitorPostpaidQuery", "mon_post_incidentModal_chart", urgency, "", country, serviceType));
                incidentDetailsSearch.startSearch();
                incidentDetailsSearch.on('search:progress', function (properties) {
                    // Print just the event count from the search job
                    $('#monitorPreloader').show();
                });
                incidentDetailsSearch.on('search:done', function (properties) {
                    var incidentDetailsResults = incidentDetailsSearch.data("results", {
                        "count": 0,
                        "offset": 0
                    });
                    incidentDetailsResults.on("data", function () {
                        if (undefined !== incidentDetailsResults.data()) {
                            incidentDetailsTableData = '';
                            incidentDetailsTableData = getTableHeaderValue("incidentDetails");
                            var finalDataJson = convertResultToJSON(incidentDetailsResults.data());
                            processQueryResults(finalDataJson.data, incidentDetailsTableData, "incidentDetails", "incDetailDiv", "incidentid", "reporteddate", "summary", "sourcesystem", "createdby", "owner", "severity", "status");
                            $('#incident-modal').modal('show');
                        }
                        $('#monitorPreloader').hide();
                        $('#preloader').hide();
                        $('#status').hide();
                    });
                });
            }

            //System availabilty
            var sysAvailDataQuery = getQuery("monitorPostpaidQuery", "mon_post_incSysAvail_chart", country, "", "", serviceType);
            var sysAvailDataSearch = getOnlySearchResultsConstructor(sysAvailDataQuery, "30m");
            var sysAvailTableData = getTableHeaderValue("sysAvail");
            sysAvailDataSearch.on('search:progress', function (properties) {
                // Print just the event count from the search job
                $('#monitorPreloader').show();
            });
            var sysAvailDataResults = sysAvailDataSearch.data("results");
            sysAvailDataResults.on("data", function () {
                if (undefined !== sysAvailDataResults.data()) {
                    var finalDataJson = convertResultToJSON(sysAvailDataResults.data());
                    processQueryResults(finalDataJson.data, sysAvailTableData, "sysAvail", "sysAvailDiv", "country", "location", "available");
                }
                $('#monitorPreloader').hide();
            });

            //Alarm on click details 
            var alarmDetails = null;
            var alarmDetailsSearch = getOnlySearchResultsConstructor('', "0");

            $("#minorBtn").on("click", {
                severity: "Minor"
            }, alarmOnclick);

            $("#majorBtn").on("click", {
                severity: "Major"
            }, alarmOnclick);

            $("#criticalBtn").on("click", {
                severity: "Critical"
            }, alarmOnclick);

            function alarmOnclick(event) {
                $('#minor-modal').modal('hide');
                $('#major-modal').modal('hide');
                $('#critical-modal').modal('hide');
                var isSearch = false;
                var severity = event.data.severity; // get severity from event onclick
                if ("Minor" === severity) {
                    var minorVal = $("#minorBtn span").text();
                    if (minorVal > 0) {
                        isSearch = true;
                        $('#preloader').show();
                        $('#status').show();
                    }
                } else if ("Major" === severity) {
                    var majorVal = $("#majorBtn span").text();
                    if (majorVal > 0) {
                        isSearch = true;
                        $('#preloader').show();
                        $('#status').show();
                    }
                } else if ("Critical" === severity) {
                    var criticalVal = $("#criticalBtn span").text();
                    if (criticalVal > 0) {
                        isSearch = true;
                        $('#preloader').show();
                        $('#status').show();
                    }
                }

                if (isSearch) {
                    alarmDetailsSearch.settings.unset("search");
                    alarmDetailsSearch.settings.set("search", getMonitoringQuery("monitorHomeQuery", "mon_home_alarmModal_chart", severity));
                    alarmDetailsSearch.startSearch();

                    alarmDetailsSearch.on('search:progress', function (properties) {
                        // Print just the event count from the search job
                        $('#monitorPreloader').show();
                    });
                    var alarmDetailsResults = alarmDetailsSearch.data("results");
                    alarmDetailsResults.on("data", function () {
                        if (undefined !== alarmDetailsResults.data()) {
                            var finalDataJson = convertResultToJSON(alarmDataResults.data());
                            processAlarmDetailsResults(finalDataJson.data, severity, "date", "country", "servicetype", "application", "server_name", "server_ip", "severity", "whitelisted", "summary"); // The search results
                        }
                        $('#monitorPreloader').hide();
                        $('#preloader').hide();
                        $('#status').hide();
                    });
                }
            }

            function processAlarmDetailsResults(rows, severity, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
                // The search results
                alarmDetails = rows;
                if (null !== alarmDetails) {
                    var tableData =
                        '<table class="table table-hover table-bordered"><thead><tr><th width= "10%">Date</th><th width= "10%">Country</th><th width="10%">Service</th><th width="10%">Application</th><th width="15%">Host</th><th width="5%">IP Address</th><th width="10%">Status</th><th width="5%">WhiteListed</th><th width="50%">Summary</th></tr></thead><tbody>';
                    //Code to list alarmDetails.
                    for (var i = 0; i < alarmDetails.length; i++) {
                        tableData += '<tr><td>' + formatNullValue(alarmDetails[i][arg1]) + '</td><td>' + formatNullValue(alarmDetails[i][arg2]) +
                            '</td><td>' + formatNullValue(alarmDetails[i]
                                [arg3]) + '</td><td>' + formatNullValue(alarmDetails[i][arg4]) + '</td><td>' + formatNullValue(alarmDetails[i][arg5]) +
                            '</td><td>' + formatNullValue(alarmDetails[i][arg6]) +
                            '</td><td>' + formatNullValue(alarmDetails[i][arg7]) + '</td><td>' + formatNullValue(alarmDetails[i][arg8]) + '</td><td>' +
                            formatNullValue(alarmDetails[i][arg9]) +
                            '</td></tr>';
                    }
                    tableData += '</tbody></table>';
                    if ('Minor' === severity) {
                        $('#minor-modal').modal('show');
                        $('#minorAlarmDiv').html(tableData);
                    } else if ('Major' === severity) {
                        $('#major-modal').modal('show');
                        $('#majorAlarmDiv').html(tableData);
                    } else {
                        $('#critical-modal').modal('show');
                        $('#criticalAlarmDiv').html(tableData);
                    }
                }
            }

            function setIncByPriorityConfig(plan_type) {
                var finalData = [{
                        name: 'P1',
                        y: 0,
                        color: '#eb2b27'
                    },
                    {
                        name: 'P2',
                        y: 0,
                        color: '#FF7518'
                    },
                    {
                        name: 'P3',
                        y: 0,
                        color: '#eb2b27'
                    },
                    {
                        name: 'P4',
                        y: 0,
                        color: '#FF7518'
                    }
                ];
                finalData[0].y = plan_type.p1;
                finalData[1].y = plan_type.p2;
                finalData[2].y = plan_type.p3;
                finalData[3].y = plan_type.p4;
                monitorHome.incidentPriorityChart.series[0].data = finalData;
                return monitorHome.incidentPriorityChart;
            }

            // TO show no data text in data table
            function showNoData(tableData, divEle, colspanNo) {
                tableData += '<td align="center" colspan="' + colspanNo + '"> No data to display </td>';
                tableData += '</tbody></table>';
                $('#' + divEle).html(tableData);
            }

            // Results are processed to get into table
            function processQueryResults(queryResultData, queryTableData, tableType, divEle, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
                if (null !== queryResultData) {
                    //Code to list maintenanceWindowData.
                    if (queryResultData.length > 0) {
                        queryTableData = generateDataTable(tableType, queryResultData, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
                    } else {
                        queryTableData += '<td align="center" colspan="3"> No data to display </td>';
                    }
                    queryTableData += '</tbody></table>';
                    $('#' + divEle).html('').html(queryTableData);
                }
                $('#monitorPreloader').hide();
            }

            // Get Table header
            function getTableHeaderValue(tableType) {
                var tableHeader = '';
                if ("maintenanceWindow" == tableType) {
                    tableHeader += '<table class="table table-condensed"><tbody><tr class="bg-grey"><th width="25%">Schedule</th><th width="25%">SR#</th><th>Activity</th></tr>';
                } else if ("topIncident" == tableType) {
                    tableHeader += '<table class="table table-condensed"><tbody><tr class="bg-orange"><th width="25%">Date</th><th>Comments</th></tr>';
                } else if ("incidentDetails" == tableType) {
                    tableHeader += '<table class="table table-hover table-bordered"><thead><tr><th>Ticket ID</th><th width="15%">Reported Date</th><th>Summary</th><th>SourceSystem</th><th>Raised By</th><th>Owner</th><th>Severity</th><th>Status</th></tr></thead><tbody>';
                } else if ("sysAvail" == tableType) {
                    tableHeader += '<table class="table table-condensed table-hover"><thead><tr><td>Country</td><td class="text-center">Site</td><td class="text-center">Status</td></tr></thead><tbody>';
                }
                return tableHeader;
            }

            // Generate table values with data
            function generateDataTable(tableType, queryResultData, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
                if ("maintenanceWindow" == tableType) {
                    for (var i = 0; i < queryResultData.length; i++) {
                        maintainTableData += '<tr><td class="bg-grey">' + formatNullValue(queryResultData[i][arg1]) + '</td><td>' +
                            formatNullValue(queryResultData[i][arg2]) + '</td><td>' +
                            formatNullValue(queryResultData[i][arg3]) + '</td></tr>';
                    }
                    return maintainTableData;
                } else if ("topIncident" == tableType) {
                    for (var i = 0; i < queryResultData.length; i++) {
                        incidentTableData += '<tr><td class="bg-orange">' + formatNullValue(queryResultData[i][arg2]) + '</td><td>' + formatNullValue(queryResultData[
                                i][arg3]) +
                            '</td></tr>';
                    }
                    return incidentTableData;
                } else if ("incidentDetails" == tableType) {
                    for (var i = 0; i < queryResultData.length; i++) {
                        incidentDetailsTableData += '<tr><td>' + formatNullValue(queryResultData[i][arg1]) + '</td><td>' +
                            formatNullValue(queryResultData[i][arg2]) +
                            '</td><td>' +
                            formatNullValue(queryResultData[i][arg3]) + '</td><td>' + formatNullValue(queryResultData[i][arg4]) + '</td><td>' +
                            formatNullValue(queryResultData[i][arg5]) +
                            '</td><td>' + formatNullValue(queryResultData[i][arg6]) + '</td><td>' + formatNullValue(queryResultData[i][arg7]) +
                            '</td><td>' + formatNullValue(queryResultData[i][arg8]) +
                            '</td></tr>';
                    }
                    return incidentDetailsTableData;
                } else if ("sysAvail" == tableType) {
                    for (var i = 0; i < queryResultData.length; i++) {
                        sysAvailTableData += '<tr><td><b>' + formatNullValue(queryResultData[i][arg1]) +
                            '</b></td><td class="text-center"><div class="table-icon">' + formatNullValue(queryResultData[i][arg2]) + '</div></td>';
                        var sysAvail = formatNullValue(queryResultData[i][arg3]);

                        if (sysAvail == 1) {
                            sysAvailTableData +=
                                '<td class="text-center"><div class="table-icon"><i class="fa fa-arrow-circle-up text-dark-green" aria-hidden="true"></i></div></td></tr>';
                        } else {
                            sysAvailTableData +=
                                '<td class="text-center"><div class="table-icon"><i class="fa fa-arrow-circle-down text-red" aria-hidden="true"></i></div></td></tr>';
                        }
                    }
                    return sysAvailTableData;
                }
                return '';
            }


            // Chart config for incident severtity chart
            var monitorHome = {
                "incidentPriorityChart": {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        spacing: [0, 0, 0, 0]
                    },
                    title: {
                        text: ''

                    },
                    exporting: {
                        filename: "Incidents"
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    colors: ['#eb2b27', '#FF7518'],
                    credits: false,
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: true,
                                distance: 50,
                                style: {
                                    fontWeight: 'bold',
                                    color: 'black'
                                }
                            },
                            startAngle: -90,
                            endAngle: 90,
                            center: ['50%', '75%']
                        }
                    },
                    legend: {
                        itemDistance: 20,
                        padding: 0,
                        itemMarginTop: 4,
                        itemMarginBottom: 2
                    },
                    series: [{
                        type: 'pie',
                        name: 'Incident Count',
                        innerSize: '45%',
                        data: [],
                        point: {
                            events: {
                                click: function (event) {
                                    if (this.y > 0) {
                                        IncidentOnclick(this.name);
                                    }
                                }
                            }
                        }
                    }]
                },
                "incidentPriorityChartEmpty": {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        spacing: [0, 0, 0, 0]
                    },
                    title: {
                        text: ''

                    },
                    exporting: {
                        filename: "Incidents"
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    colors: ['#eb2b27', '#FF7518'],
                    credits: false,
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: true,
                                distance: 50,
                                style: {
                                    fontWeight: 'bold',
                                    color: 'black'
                                }
                            },
                            startAngle: -90,
                            endAngle: 90,
                            center: ['50%', '75%']
                        }
                    },
                    legend: {
                        itemDistance: 20,
                        padding: 0,
                        itemMarginTop: 4,
                        itemMarginBottom: 2
                    },
                    series: [{
                        type: 'pie',
                        name: 'Incident Count',
                        innerSize: '45%',
                        data: [],
                        point: {
                            events: {
                                click: function (event) {
                                    if (this.y > 0) {
                                        IncidentOnclick(this.name);
                                    }
                                }
                            }
                        }
                    }]
                }
            }




        }

        function siteDetailsData(siteCentre, isAll) {

            var siteDetailsQuery = getOnlySearchResultsConstructor(getInterfaceMonitorQuery("monitorPostpaidQuery", "mon_post_siteCentre", '', siteCentre.toString().replace(/[\[\]"]+/g, '').split(',').join('","')), "30m");

            siteDetailsQuery.on("search:progress", function () {
                $("#preloader").show();
                $('#status').show();
            });

            siteDetailsQuery.on("search:done", function () {
                var siteDetailsResults = siteDetailsQuery.data("results", {
                    "count": 0,
                    "offset": 0
                });
                siteDetailsResults.on("data", function () {
                    if (undefined !== siteDetailsResults.data()) {
                        // The search results
                        var nodeSiteData = convertResultToJSON(siteDetailsResults.data());
                        loadSiteDetails(nodeSiteData.data, "site_details_table_header", "site_details_table_values", siteCentre, isAll);
                    }
                });
                $("#site-name #siteName").text('');
                if (null !== isAll && "" !== isAll && isAll) {
                    $("#site-name #siteName").text("Consolidated");
                } else {
                    $("#site-name #siteName").text(siteCentre);
                }
                loadNoDataIntoModal("site_details_table_header", "site_details_table_values", "No Data to display");
            });

        }

        function loadNodeElements(nodeData) {
            if ('' != nodeData || undefined != nodeData) {
                svgElement.selectAll(".nodes_shape").each(function () {
                    d3.select(this).select('.nodeAvail').attr("status", "NotFound");
                    d3.select(this).attr("data-original-title", "Not Available");
                }).datum(nodeData).each(function (d, i) {
                    var tooltipData = '';
                    if (i < nodeData.length) {
                        if (null != serverList.get(nodeData[i].servername)) {
                            var thisNode = d3.select("#" + serverList.get(nodeData[i].servername));
                            var processData = nodeData[i];
                            Object.keys(processData).forEach(function eachKey(key, indxVal) {
                                thisNode.attr(key.toLowerCase(), '').attr(key.toLowerCase(), nodeData[i][key]); // to set hostname as attr in the interface node
                                if (indxVal <= 4) {
                                    tooltipData += key.toUpperCase() + ' : ' + (null === nodeData[i][key] ? '-' : nodeData[i][key]) + '\n';
                                }
                            });
                            thisNode.attr("status", "Found");
                            thisNode.datum(processData).classed({
                                'pass': function (d, i) {
                                    return getNodeStatus(d.available, d.health_check) == 1 ? true : false;
                                },
                                'warn': function (d, i) {
                                    return getNodeStatus(d.available, d.health_check) == -1 ? true : false;
                                },
                                'fail': function (d, i) {
                                    return getNodeStatus(d.available, d.health_check) == 0 ? true : false;
                                }
                            });
                            d3.select(thisNode.node().parentNode).attr("data-original-title", tooltipData);
                        }
                    }
                });
            }
        }

        // to load the contents into the interface lines as per the data.
        function loadInterfaceElements(nodeData, availableQueue) {
            var notAvailableQueue = [];
            availableQueue = nodeData;
            if ('' != nodeData || undefined != nodeData) {
                svgElement.selectAll(".interface_shape").each(function () {
                    d3.select(this).attr("status", "InterfaceNotFound");
                    d3.select(this).attr("data-original-title", "Not Available");
                });
                svgElement.selectAll("[type='sigma']").each(function () {
                    d3.select(this).attr("status", "InterfaceNotFound");
                    d3.select(this).attr("data-original-title", "Not Available");
                }).datum(nodeData).each(function (d) {
                    var tooltipData = '';
                    var queueCount = 0;
                    for (var i = 0; i < nodeData.length; i++) {
                        if (null != interfaceValList.get(nodeData[i].hostname)) {
                            var thisNode = d3.select("#" + interfaceValList.get(nodeData[i].hostname));
                            Object.keys(nodeData[i]).forEach(function eachKey(key) {
                                thisNode.attr(key.toLowerCase(), '').attr(key.toLowerCase(), nodeData[i][key]); // to set hostname as attr in the interface node
                            });
                            thisNode.attr('queueCount', queueCount);
                            if (undefined !== nodeData[i]) {
                                if (nodeData[i].queuestatus !== "JMX OK" || nodeData[i].queuestatus !== "Not_Available") {
                                    queueCount++;
                                    thisNode.attr('queueCount', '').attr('queueCount', queueCount);
                                }
                            }
                            tooltipData = 'Host Name : ' + nodeData[i].hostname;
                            if (undefined !== nodeData[i] && nodeData[i].queuestatus == "Not_Available") {
                                notAvailableQueue.push(nodeData[i].queuename);
                                availableQueue = removeByAttr(availableQueue, "queuename", nodeData[i].queuename);
                            }
                            thisNode.attr("status", "InterfaceFound");
                            thisNode.classed({
                                'interface-pass': queueCount == 0 ? true : false,
                                'interface-warn': queueCount >= 1 ? true : false,
                                'interface-fail': queueCount < 0 ? true : false
                            });
                            d3.select(thisNode.node()).attr("data-original-title", tooltipData);
                        }
                    }
                });
            }
            return notAvailableQueue;
        }

        function loadDataIntoModal(loadData, headerElement, valueElement, thisEle) {
            $("#" + valueElement + " tr").html('');
            $("#" + headerElement + " tr").html('');
            $("#nodeModalLabel span").text('');
            $("#node-modal .modal-body .table-responsive > div").css('display', 'block');
            if ("No Data" === loadData) {
                refreshModalRows();
                d3.select("#" + headerElement + " tr").append('th').text(function (d) {
                    return "Node Not Available";
                });
                //var nodeAlias = thisEle.attr("label");
                var nodeAlias = "Details";
                d3.select("#nodeModalLabel").data(nodeAlias).append("span").text(function (d) {
                    return nodeAlias;
                }).classed({
                    'unknown': true
                });
                $("#node-modal .modal-body .table-responsive > div").css('display', 'none');
            } else if (undefined != loadData) {
                for (var indx = 0; indx < loadData.length; indx++) {
                    $("#" + headerElement + " tr").html('');
                    $("#" + valueElement).append('<tr>');
                    d3.select("#" + headerElement + " tr").selectAll('th').data(d3.keys(loadData[indx])).enter()
                        .append('th').text(function (head) {
                            return head.toUpperCase();
                        });
                    d3.select("#" + valueElement + " tr:nth-child(" + (indx + 1) + ")").selectAll('td').data(d3.values(loadData[indx])).enter()
                        .append('td').text(function (val) {
                            return val;
                        });
                }
            }
            $('#node-modal').modal('show');
            $('#preloader').hide();
            $('#status').hide();
        }

        function loadNodeDetails(data, thisEle, nodeDivHeader, nodeDivValues) {
            loadDataIntoModal(data, nodeDivHeader, nodeDivValues, thisEle);
            var nodeAlias = thisEle.attr("servername");
            var isNodeAvailable = thisEle.attr("available");
            var isNodeSafe = thisEle.attr("health_check");
            d3.select("#nodeModalLabel").data(nodeAlias).append("span").text(function (d) {
                return nodeAlias;
            }).classed({
                'pass': getNodeStatus(isNodeAvailable, isNodeSafe) === 1 ? true : false,
                'warn': getNodeStatus(isNodeAvailable, isNodeSafe) === -1 ? true : false,
                'fail': getNodeStatus(isNodeAvailable, isNodeSafe) === 0 ? true : false
            });
            $('#preloader').hide();
            $('#status').hide();
        }

        function loadInterfaceDetails(data, thisEle, nodeDivHeader, nodeDivValues) {
            loadInterfaceDataIntoModal(data, nodeDivHeader, nodeDivValues, thisEle);
            var queueStatusCount = thisEle.attr("queueCount");
            var nodeAlias = thisEle.attr("hostname");
            d3.select("#interfaceModalLabel").data(nodeAlias).append("span").text(function (d) {
                return nodeAlias;
            }).classed({
                'interface-pass': queueStatusCount == 0 ? true : false,
                'interface-warn': queueStatusCount >= 1 ? true : false,
                'interface-fail': queueStatusCount < 0 ? true : false
            });
            $('#preloader').hide();
            $('#status').hide();
        }

        function loadSiteDetails(data, nodeDivHeader, nodeDivValues, siteName, isAll) {
            $('#preloader').show();
            $('#status').show();
            loadSiteDataIntoModal(data, nodeDivHeader, nodeDivValues, siteName, isAll);
            $('#preloader').hide();
            $('#status').hide();
        }

        function loadNoDataIntoModal(headerEle, valueEle, textVal) {
            $("#" + valueEle + " tr").html('');
            $("#" + headerEle + " tr").html('');
            var msgText = '<th>' + textVal + '</th>';
            $("#" + headerEle + " tr").html(msgText);
            $("#preloader").hide();
            $('#status').hide();
        }

        // remove duplicate entries of final queue names -> double check to avoid duplicates
        function removeDuplFromQueueName(arr) {
            let unique_array = [];
            for (let i = 0; i < arr.length; i++) {
                if (unique_array.indexOf('\"' + arr[i] + '\"') == -1) {
                    unique_array.push('\"' + arr[i] + '\"');
                }
            }
            return unique_array;
        }

        // add the avaliable and not available interface details
        function processQueueDetails(data1, data2) {
            for (var indx = 0; indx < data2.length; indx++) {
                if (undefined !== data1 && data1.length > 0) {
                    data1.push(data2[indx]);
                } else {
                    return data2;
                }
            }
            return data1;
        }

        function loadInterfaceDataIntoModal(loadData, headerElement, valueElement, thisEle) {
            $("#" + valueElement).html('');
            $("#" + headerElement + " tr").html('');
            $("#interfaceModalLabel span").text('');
            $("#interface-modal .modal-body .table-responsive > div").css('display', 'block');
            var interfaceHostName = thisEle.attr("hostname");
            if ("No Data" === loadData) {
                refreshModalRows();
                d3.select("#" + headerElement + " tr").append('th').text(function (d) {
                    return "Interface Details Not Available";
                });
                //var nodeAlias = thisEle.attr("label");
                var nodeAlias = "Details";
                d3.select("#interfaceModalLabel").data(nodeAlias).append("span").text(function (d) {
                    return nodeAlias;
                }).classed({
                    'unknown': true
                });
                $("#interface-modal .modal-body .table-responsive > div").css('display', 'none');
            } else if (undefined != loadData) {
                for (var indx = 0; indx < loadData.length; indx++) {
                    $("#" + valueElement).append('<tr>');
                    Object.keys(loadData[indx]).forEach(function eachKey(key) {
                        if (0 === indx) {
                            $("#" + headerElement + " tr").append('<th>' + key.toUpperCase() + '</th>');
                        }
                        if (interfaceHostName == loadData[indx].hostname) {
                            $("#" + valueElement + " tr:nth-child(" + (indx + 1) + ")").append('<td>' + loadData[indx][key] + '</td>');
                        }
                    });
                }
            }
            $('#interface-modal').modal('show');
            $('#preloader').hide();
            $('#status').hide();
        }

        function loadSiteDataIntoModal(loadData, headerElement, valueElement, siteName, isAll) {
            $("#" + valueElement).html('');
            $("#" + headerElement + " tr").html('');
            $("#site-name #siteName").text('');
            if (null !== isAll && "" !== isAll && isAll) {
                $("#site-name #siteName").text("Consolidated");
            } else {
                $("#site-name #siteName").text(siteName);
            }
            if ("No Data" === loadData) {
                refreshModalRows();
                d3.select("#" + headerElement + " tr").append('th').text(function (d) {
                    return "Site Not Available";
                });
            } else if (undefined != loadData) {
                for (var indx = 0; indx < loadData.length; indx++) {
                    $("#" + valueElement).append('<tr>');
                    Object.keys(loadData[indx]).forEach(function eachKey(key) {
                        if (0 === indx) {
                            $("#" + headerElement + " tr").append('<th>' + key.toUpperCase() + '</th>');
                        }
                        $("#" + valueElement + " tr:nth-child(" + (indx + 1) + ")").append('<td>' + manipulateVal(loadData[indx][key], key) + '</td>');
                    });
                }
            }
            $('#preloader').hide();
            $('#status').hide();
        }

        // Manipulate the fa icon for availablity and severity
        function manipulateVal(val, field) {
            if ('AVAILABLE' === field.toUpperCase()) {
                return 1 == val ? '<div style="text-align:center;"><i class="fa fa-arrow-circle-up fa-2x text-dark-green"></i></div>' : '<div style="text-align:center;"><i class="fa fa-arrow-circle-down fa-2x text-red"></i></div>';
            } else if ('HEALTH_CHECK' === field.toUpperCase()) {
                return 1 == val ? '<div style="text-align:center;"><i class="fa fa-check fa-2x text-dark-green"></i></div>' : '<div style="text-align:center;"><i class="fa fa-times fa-2x text-red"></i></div>';
            } else {
                return val;
            }
        }

        // set color for the nodes status
        function getNodeStatus(data, severeFlag) {
            if (undefined !== data && null !== data) {
                if (null != severeFlag && 1 != severeFlag && 1 == data) {
                    return -1;
                } else if ((undefined === severeFlag || null == severeFlag || 1 == severeFlag) && 1 == data) {
                    return 1;
                } else if (undefined === severeFlag && 0 == data) {
                    return 0;
                }
            }
            return 0;
        }

        function getOnlySearchResultsConstructor(query, interval) {
            var searchmanager = new SearchManager({
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
                "runWhenTimeIsUndefined": false
            }, {
                tokens: true,
                tokenNamespace: "submitted"
            });
            return searchmanager;
        }

        // clear all modal irrespective of the needed one.
        function refreshModalRows() {
            $("#node_details_table_header tr").html('');
            $("#node_details_table_values tr").html('');
            $("#interface_details_table_header tr").html('');
            $("#interface_details_table_values tr").html('');
            $("#node_cpu_table_header tr").html('');
            $("#node_cpu_table_values tr").html('');
            $("#node_disk_table_header tr").html('');
            $("#node_disk_table_values tr").html('');
            $("#node_alerts_table_header tr").html('');
            $("#node_alerts_table_values tr").html('');
        }
        //  custom changes for splunk js starts here,

        pageLoading = false;
        // DASHBOARD EDITOR
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

    }
);