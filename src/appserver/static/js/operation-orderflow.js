var height = window.innerHeight;
var half_height = height - 150;
var svgHeight = height - 180;
$('.tab-pane').css('height', half_height);
$('object').css('height', svgHeight);
$('svg').css('height', svgHeight);
var queryConsolidated = OperationsOrderFlowQuery.consolidated_order_flow;
var queryConsolidatedMnp = OperationsOrderFlowQuery.consolidated_mnp_flow;
refreshDateTime();
getHelpText("orderflow", "consolidated_order_flow_help");
var orderSearch = null;
var mulCounter = 0;
var mnpmulCounter = 0;
var SearchManagerModal = "";
var utils = "";
var onetime = !0;
var modalOrderIdSearch = '';
var modalOrderSysname = '';
var modalOrderStatus = '';
var tableHeader = '';
var tableHeaderCount = 0;
var flowType = '';
var profileCodeValue = '';
var orderCatagory = "all_ordertype";
var profileCode = "allflow";
var oldCountryList = "";
var country = "";
var serviceType = '';


require([
        "splunkjs/mvc",
        "splunkjs/mvc/utils",
        "splunkjs/mvc/tokenutils",
        "underscore",


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

        SearchManagerModal = require("splunkjs/mvc/searchmanager");
        utils = require("splunkjs/mvc/utils");
        oldCountryList = "";
        country = "";
    serviceType = 'Postpaid';
    var sourceParamReplacedQuery = getSourceparam(queryConsolidated, "order_flow");
    var finalQuery = getprofileparam(sourceParamReplacedQuery, "order_flow");
    if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
        if (localStorage.getItem("globalUserServiceTypeList").indexOf("operation-postpaid") > -1) {
            oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
            country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
            loadSuccessPage();
            loadConsolidatedData(finalQuery, "order_flow");
        } else {
            loadErrorPage();
        }
    } else {
        loadErrorPage();
        var getDataInterval = setInterval(function () {
            if (null != localStorage.getItem("globalUserServiceTypeList") && "" !== localStorage.getItem("globalUserServiceTypeList")) {
                if (localStorage.getItem("globalUserServiceTypeList").toString().match(/operation-*/g).length > 1) {
                    oldCountryList = (null !== localStorage.getItem("selectedOldCountryList") && "" !== localStorage.getItem("selectedOldCountryList")) ? JSON.parse(localStorage.getItem("selectedOldCountryList")).sort().toString().replace(/[\[\]"]+/g, '') : "";
                    country = (null !== localStorage.getItem("selectedCountryList") && "" !== localStorage.getItem("selectedCountryList")) ? localStorage.getItem("selectedCountryList").replace(/[\[\]"]+/g, '').split(',').join('","') : "";
                    loadSuccessPage();
                    loadConsolidatedData(finalQuery, "order_flow");
                    clearInterval(getDataInterval);
                }
            }
        }, 100);
        }
        var pageLoading = !0;
        country = "Bahamas"
        function getSourceparam(query, flow) {
            if (flow === "order_flow") {
                var orderflowtype = $('#orderflow_onchange').val();
                orderCatagory = $("input[name='order_radio_type']:checked").val();
                var source_finder = "";
                if (orderflowtype == "allflow") {
                    source_finder = orderflow_queryMapping[orderCatagory]
                } else {
                    source_finder = orderflow_profile_queryMapping[orderCatagory]
                }
                query = query.replace(/sourceparam/gi, source_finder);
                return query
            }
            if (flow === "mnp_flow") {
                var mnporderflowtype = $('#mnpflow_change').val();
                orderCatagory = $("input[name='mnp_order_radio_type']:checked").val();
                var mnp_source_finder = "";
                if (mnporderflowtype == "allflow") {
                    mnp_source_finder = mnp_orderflow_queryMapping[orderCatagory]
                } else {
                    mnp_source_finder = mnp_orderflow_profile_queryMapping[orderCatagory]
                }
                query = query.replace(/sourceparam/gi, mnp_source_finder);
                return query
            }
        }
    
        function getprofileparam(query, flow) {
            if (flow === "order_flow") {
                var orderCatagory = $('#orderflow_onchange').val();
                if (orderCatagory == "allflow") {
                    query = query.replace(/profileParem/gi, '');
                    return query
                } else {
                    var profileCode = profileCodeMapping[orderCatagory];
                    query = query.replace(/profileParem/gi, '"ProfileCode"=' + profileCode);
                    return query
                }
            }
            if (flow === "mnp_flow") {
                var mnp_orderCatagory = $('#mnpflow_change').val();
                if (mnp_orderCatagory == "allflow") {
                    query = query.replace(/profileParem/gi, '');
                    return query
                } else {
                    var mnp_profileCode = profileCodeMapping[mnp_orderCatagory];
                    query = query.replace(/profileParem/gi, '"ProfileCode"=' + mnp_profileCode);
                    return query
                }
            }
        }   
        $('#mnptab').click(function () {
            d3.selectAll('.loadmodalwindow').text('--');
            d3.selectAll('.loadMnpmodalwindow').text('--');
            var sourceParamReplacedQuery = getSourceparam(queryConsolidatedMnp, "mnp_flow");
            var finalQuery = getprofileparam(sourceParamReplacedQuery, "mnp_flow");
            loadConsolidatedData(finalQuery, "mnp_flow");
            getHelpText("mnpflow", "consolidated_order_flow_help");
            $('#status').show();
            $('#preloader').show();
            refreshDateTime();
        });
        $('#ordertab').click(function () {
            d3.selectAll('.loadMnpmodalwindow').text('--');
            d3.selectAll('.loadmodalwindow').text('--');
            var sourceParamReplacedQuery = getSourceparam(queryConsolidated, "order_flow");
            var finalQuery = getprofileparam(sourceParamReplacedQuery, "order_flow");
            loadConsolidatedData(finalQuery, "order_flow");
            getHelpText("orderflow", "consolidated_order_flow_help");
            $('#status').show();
            $('#preloader').show();
            refreshDateTime()
        });
    

        function loadConsolidatedData(consolidated_query, flow) {
            $('#preloader').show();
            $('#status').show();
             var countryReplace=consolidated_query.replace(/countryParam/,country);
        var serviceReplace=countryReplace.replace(/serviceTypeParam/,serviceType);
        var flowDetailsData = getOnlySearchResultsConstructor(serviceReplace, "queryConsolidated");
        console.log(serviceReplace);
            flowDetailsData.on('search:progress', function () {
                $('#preloader').show();
                $('#status').show();
            });
            flowDetailsData.on('search:done', function () {
                var subSearchResults = flowDetailsData.data("results", {
                    "count": 0,
                    "offset": 0
                });
                $('#preloader').hide();
                $('#status').hide();
                refreshDateTime();
                d3.selectAll('.loadMnpmodalwindow').text('--');
                d3.selectAll('.loadmodalwindow').text('--');
                subSearchResults.on("data", function (queryResults) {
                    if (undefined != queryResults.data()) {
                        if (flow == "order_flow")
                            orderFlowProcessor(queryResults.data().rows);
                        if (flow == "mnp_flow")
                            mnpOrderFlowProcessing(queryResults.data().rows)
                    }
                })
            })
        }
        $('.loadmodalwindow').click(function (idvalue) {
            var idC = $(this).attr("id");
            var systemnamesplitter = idC.split('-');
            orderStatusOnclick(systemnamesplitter[0], systemnamesplitter[1])
        });
        $('.loadMnpmodalwindow').click(function (idvalue) {
            var mnpId = $(this).attr("id");
            var systemnamesplitter = mnpId.split('-');
            mnpOrderStatusOnclick(systemnamesplitter[0], systemnamesplitter[1])
        });
    
        function orderStatusOnclick(sysname, sysstatus) {
            $('#status').show();
            $('#downloadprocessText').text("");
            flowType = "order";
            modalOrderSysname = sysname;
            modalOrderStatus = sysstatus;
            var profileCodeValue = $('#orderflow_onchange').val();
            profileCodeValue = profileCodeMapping[profileCodeValue];
            processOrderDetailsResults(sysname)
        }
    
        function processOrderDetailsResults(system) {
            var orderArr = [];
            if (undefined != system) {
                var tableData = '';
                if (system == "workorder") {
					tableData = '<thead><tr><th>WorkOrderNo</th><th>AccountNo</th><th>StatusCode</th><th>CreatedDate</th><th>ActualCompletedDate</th><th>ProfileDescription</th><th>PlanName</th></tr></thead><tbody>';
					tableHeader = tableData
				} else if (system == "mmlcommands") {
					tableData = '';
					tableData = '<thead><tr><th>WorkOrderNo</th><th>StartDate</th><th>MMLCommandUID</th><th>EquipmentUID</th><th>StatusCode</th><th>NetwotrkDescription</th><th width="10%">PlanName</th><th>MMLCommand</th><th>ResponseFromSwitch</th><th>OperationCode</th></tr></thead><tbody>';
					tableHeader = tableData;
					tableHeaderCount = 9
				}else if (system == "sigma_orders") {
					var tableData = '';
					tableData = '<thead><tr><th>SubOrderID</th><th>ExternalKey</th><th>CreatedDateTime</th><th>CreatedBy</th><th>Message</th><th>StatusCode</th></tr></thead><tbody>';
					tableHeader = tableData;
					tableHeaderCount = 6
				}else if (system == "sigma_suborders") {
					tableData = '';
					tableData = '<thead><tr><th>SUB_ORDR_ID</th><th>SUB_ID</th><th>OrderStatusID</th><th>OrderType</th><th>StatusCode</th><th>Message</th><th>OrderSRCNumber</th><th>ExternalKey</th><th>CreatedDateTime</th><th>CreatedBy</th><th>SuborderKey</th><th>HasImpact</th><th>ModifiedDateTime</th><th>ModifiedBy</th><th>OrderPreviousStatusId</th></tr></thead><tbody>';
					tableHeader = tableData;
					tableHeaderCount = 15
				}else  {
					tableData = '<thead><tr><th>WorkOrderNo</th><th>ActivatedDate</th><th>ClearedDate</th><th>StatusCode</th><th>SequenceNo</th><th>StepDefinitionCode</th><th>CodeDescription</th><th>ClearUser</th></tr></thead><tbody>';
					tableHeader = tableData;
					tableHeaderCount = 8
				}
                tableData += '</tbody>';
                $('#orderTableModal').modal('show');
                $('#paginationId').html('');
                $('#search').val('');
                $('#paginationId').html(tableData);
                $('#paginationId').hide()
            }
        }
    
        function mnpOrderStatusOnclick(sysname, sysstatus) {
            flowType = "mnp";
            $('#downloadprocessText').text("");
            modalOrderSysname = sysname;
            modalOrderStatus = sysstatus;
            var profileCodeValue = $('#mnpflow_change').val();
            profileCodeValue = profileCodeMapping[profileCodeValue];
            processOrderDetailsResults(sysname)
        }
        $('#orderflow_onchange').change(function () {
            var flowDetails = $('#orderflow_onchange').val();
            var sourceParamReplacedQuery = getSourceparam(queryConsolidated, "order_flow");
            var finalQuery = getprofileparam(sourceParamReplacedQuery, "order_flow");
            loadConsolidatedData(finalQuery, "order_flow");
            if (flowDetails.toUpperCase() == "ALLFLOW") {
                for (var i = 1; i < totalSystems.length; i++) {
                    $('#' + totalSystems[i]).css('visibility', 'visible')
                }
                for (var i = 0; i < totalLinksAvailable.length; i++) {
                    $('#' + totalLinksAvailable[i]).css('visibility', 'visible')
                }
            } else {
                for (var i = 0; i < totalSystems.length; i++) {
                    $('#' + totalSystems[i] + '').css('visibility', 'hidden')
                }
                for (var i = 0; i < totalLinksAvailable.length; i++) {
                    $('#' + totalLinksAvailable[i]).css('visibility', 'hidden')
                }
                var systemSplitter = orderFlowMapping[flowDetails].split(',');
                for (var i = 0; i < systemSplitter.length; i++) {
                    $('#' + systemSplitter[i] + '').css('visibility', 'visible');
                    if (i < systemSplitter.length - 1)
                        $("#link_" + systemSplitter[i] + "_" + systemSplitter[i + 1]).css('visibility', 'visible')
                }
            }
        });
        $('#mnpflow_change').change(function () {
            var flowDetails = $('#mnpflow_change').val();
            var sourceParamReplacedQuery = getSourceparam(queryConsolidatedMnp, "mnp_flow");
            var finalQuery = getprofileparam(sourceParamReplacedQuery, "mnp_flow");
            loadConsolidatedData(finalQuery, "mnp_flow");
            if (flowDetails.toUpperCase() == "ALLFLOW") {
                for (var i = 1; i < 16; i++) {
                    $('#mnpsys' + i + '').css('visibility', 'visible')
                }
                for (var i = 0; i < linksAvailable.length; i++) {
                    $('#' + linksAvailable[i]).css('visibility', 'visible')
                }
            } else {
                for (var i = 1; i < 16; i++) {
                    $('#mnpsys' + i + '').css('visibility', 'hidden')
                }
                for (var i = 0; i < linksAvailable.length; i++) {
                    $('#' + linksAvailable[i]).css('visibility', 'hidden')
                }
                var mnpsystemSplitter = mnpFlowMapping[flowDetails].split(',');
                for (var i = 0; i < mnpsystemSplitter.length; i++) {
                    $('#' + mnpsystemSplitter[i] + '').css('visibility', 'visible');
                    if (i < mnpsystemSplitter.length - 1)
                        $("#link_" + mnpsystemSplitter[i] + "_" + mnpsystemSplitter[i + 1]).css('visibility', 'visible')
                }
            }
        });
        $('.order_radio_type').click(function (id11) {
            var sourceParamReplacedQuery = getSourceparam(queryConsolidated, "order_flow");
            var finalQuery = getprofileparam(sourceParamReplacedQuery, "order_flow");
            loadConsolidatedData(finalQuery, "order_flow")
        });
        $('.mnp_order_radio_type').click(function (id11) {
            var sourceParamReplacedQuery = getSourceparam(queryConsolidatedMnp, "mnp_flow");
            var finalQuery = getprofileparam(sourceParamReplacedQuery, "mnp_flow");
            loadConsolidatedData(finalQuery, "mnp_flow")
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

        // DASHBOARD READY
        DashboardController.ready();
        pageLoading = false;

    }
);
// method to fill the null values in modal window
function formatNullcsvValue(tableVal) {
    return (null == tableVal) ? '--' : tableVal.replace(/(\r\n|\n|\r)/gm, "")
}
//method to return  search manger instance  for consolidated flow
function getOnlySearchResultsConstructor(query, id) {
    var searchmanager = new SearchManagerModal({
        "cancelOnUnload": !0,
        "sample_ratio": 1,
        "earliest_time": "0",
        "status_buckets": 0,
        "search": query,
        "auto_cancel": 90,
        "preview": !0,
        "tokenDependencies": {},
        "runWhenTimeIsUndefined": !1
    }, {
        tokens: !0,
        tokenNamespace: "submitted"
    });
    $('#' + id).show();
    return searchmanager
}

function getorderOnlySearchResultsConstructor(query, id) {
    var searchmanager = new SearchManagerModal({
        "cancelOnUnload": !0,
        "sample_ratio": 1,
        "status_buckets": 0,
        "search": query,
        "auto_cancel": 90,
        "preview": !0,
        "tokenDependencies": {},
        "runWhenTimeIsUndefined": !1
    }, {
        tokens: !0,
        tokenNamespace: "submitted"
    });
    $('#' + id).show();
    return searchmanager
}

function getorderOnlyMNpSearchResultsConstructor(query, id) {
    var searchmanager = new SearchManagerModal({
        "cancelOnUnload": !0,
        "sample_ratio": 1,
        "earliest_time": "0",
        "status_buckets": 0,
        "search": query,
        "auto_cancel": 90,
        "preview": !0,
        "tokenDependencies": {},
        "runWhenTimeIsUndefined": !1
    }, {
        tokens: !0,
        tokenNamespace: "submitted"
    });
    $('#' + id).show();
    return searchmanager
}

function tooltipboot(ids) {
    var tooltip=ids.replace(/_/g,' ');
    $('svg #' + ids + '').tooltip({
        title: tooltip,
        html: !0,
        placement: 'right',
        container: 'body'
    })
}

function orderFlowProcessor(dataSeries) {
    if (undefined != dataSeries) {
        var avgResolutionData = dataSeries;
        if (avgResolutionData != null) {
            for (var i = 0; i < avgResolutionData.length; i++) {
                var dataArray = avgResolutionData[i]
                for (var j = 0; j < dataArray.length; j++) {
                    if (j == 1) {
                        for (var sys = 0; sys < totalMnpSysNames.length; sys++) {
                            if (dataArray[j].replace(/[/" "()-]/g, '').toLowerCase() == totalSysNames[sys]) {
                                var sys1_status = dataArray[j - 1].split(" ");
                                var sys1_count = dataArray[j + 1].split(" ");
                                renderStatusCount(sys1_status, sys1_count, totalSysNames[sys], !1)
                            }
                        }
                    }
                }
            }
        }
    }
}

function mnpOrderFlowProcessing(dataSeries) {
    if (undefined != dataSeries) {
        var avgResolutionData = dataSeries;
        if (null != avgResolutionData) {
            for (var i = 0; i < avgResolutionData.length; i++) {
                var dataArray = avgResolutionData[i]
                for (var j = 0; j < dataArray.length; j++) {
                    if (j == 1) {
                        for (var sys = 0; sys < totalMnpSysNames.length; sys++) {
                            if (dataArray[j].replace(/[/" "()-]/g, '').toLowerCase() == totalMnpSysNames[sys]) {
                                var sys1_status = dataArray[j - 1].split(" ");
                                var sys1_count = dataArray[j + 1].split(" ");
                                renderStatusCount(sys1_status, sys1_count, totalMnpSysNames[sys], !0)
                            }
                        }
                    }
                }
            }
        }
    }
}
var renderStatusCount = function (stats, count, systemName, mnpFlow) {
    var obj = {};
    var required_status = [];
    var StatusCountArray = [];
    var lockedCount = 0;
    for (var i = 0; i < stats.length; i++) {
        var locked = stats[i].toLowerCase();
        if (locked == "lw" || locked == "lg" || locked == "lp") {
            lockedCount += parseInt(count[i])
        }
        obj[stats[i]] = parseInt(count[i])
    }
    obj.LO = lockedCount;
    required_status = orderFlowSystemStausMapper[systemName];
    if (mnpFlow) {
        required_status = mnpFlowSystemStausMapper[systemName];
        if (totalSysNames.indexOf(systemName) != -1) {
            systemName = "mnp" + systemName
        }
    }
    $.each(required_status, function (index, value) {
        (null != (obj[value]) || undefined != (obj[value])) ? StatusCountArray.push(obj[value]): StatusCountArray.push("--")
    });
    d3.select("#" + systemName + "_statusgp").selectAll('text').data(StatusCountArray).text(function (d) {
        return d
    })
}

function getModalQuery(sysname) {
    var qry = "";
    if (total_modals.indexOf(sysname.toLowerCase()) == -1) {
        qry = modal_query_mapping.model_work_orders_steps
    } else {
        qry = modal_query_mapping[sysname.toLowerCase()]
    }
    qry = OperationsOrderFlowQuery[qry];
    return qry
}


function orderQuerySelector(sysname, sysstatus, profile_code) {
    var modalorderSearch = getorderOnlySearchResultsConstructor("", "moddal");
    modalorderSearch.settings.unset("search");
    var flow_type = "WorkOrder_Flow";
    sysname = modelWindowMapping[sysname];
    var qry = getModalQuery(sysname);
    qry = replaceInnerparam(qry, flow_type, sysname, sysstatus, profile_code);
    qry=qry.replace(/countryParam/gi,country);
    qry=qry.replace(/serviceTypeParam/gi,serviceType);
    modalorderSearch.settings.unset("search");
    modalorderSearch.settings.set("search", qry);
    modalOrderIdSearch = modalorderSearch.query.changed.search;
    return modalorderSearch
}

function replaceInnerparam(query, flowtype, sysname, sysstatus, profile_code) {
    var orderCatagory = $("input[name='order_radio_type']:checked").val();
    var inerparam = modelExcelDownloadQueryMapping[orderCatagory];
    var replaced_query = query.replace(/innerParem/gi, inerparam);
    replaced_query = getOrderFlowQuery(replaced_query, "country", sysname, sysstatus, flowtype, profile_code);
    return replaced_query
}

function mnpQuerySelector(sysname, sysstatus, profile_code) {
    var mnpModalorderSearch = getorderOnlyMNpSearchResultsConstructor("", "mnpmoddal");
    var flow_type = "MNP_Portout";
    sysname = mnpModelWindowMapping[sysname];
    var qry = getModalQuery(sysname);
    $('#status').show();
    qry = replaceInnerparam(qry, flow_type, sysname, sysstatus, profile_code);
    qry=qry.replace(/countryParam/gi,country);
    qry=qry.replace(/serviceTypeParam/gi,serviceType);
    mnpModalorderSearch.settings.unset("search");
    mnpModalorderSearch.settings.set("search", qry);
    return mnpModalorderSearch
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    setTimeout(function () {
        $('#orderTableModal').modal('hide')
    }, 1000)
}

function exportTableToCSV(filename) {
    var csv = [];
    var length = 0;
    $('#downloadprocessText').text("");
    var rows = document.querySelectorAll("table tr");
    if (flowType === "order") {
        var profileCodeValue = $('#orderflow_onchange').val();
        profileCodeValue = profileCodeMapping[profileCodeValue];
        if (profileCodeValue.toLowerCase() === "allflow") {
            profileCodeValue = "*"
        }
        var modalorderExcelSearch = orderQuerySelector(modalOrderSysname, modalOrderStatus, profileCodeValue)
    }
    if (flowType === "mnp") {
        var profileCodeValuemnp = $('#mnpflow_change').val();
        profileCodeValuemnp = profileCodeMapping[profileCodeValuemnp];
        if (profileCodeValuemnp.toLowerCase() === "allflow") {
            profileCodeValuemnp = "*"
        }
        var modalorderExcelSearch = mnpQuerySelector(modalOrderSysname, modalOrderStatus, profileCodeValuemnp)
    }
    for (var i = 0; i < rows.length && i < 1; i++) {
        var row = [],
            cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv.push(row.join(","))
    }
    modalorderExcelSearch.startSearch();
    console.log(modalorderExcelSearch.query.attributes.search);
    modalorderExcelSearch.on('search:progress', function (properties) {
        $('#downloadprocess').show()
    });
    modalorderExcelSearch.on('search:done', function (properties) {
        var orderSearchResults = modalorderExcelSearch.data("results", {
            "count": 0,
            "offset": 0
        });
        orderSearchResults.on("data", function (tableData) {
            $('#downloadprocessText').text("");
            var orderDetails = tableData.data().rows;
            length = orderDetails.length;
            for (var i = 0; i < orderDetails.length; i++) {
                var rows = orderDetails[i];
                var csvHeader = [];
                for (var j = 0; j < rows.length; j++) {
                    csvHeader.push(formatNullcsvValue(orderDetails[i][j]))
                }
                csv.push(csvHeader.join(","))
            }
            downloadCSV(csv.join("\n"), filename)
        });
        $('#downloadprocess').hide();
        if (length == 0) {
            $('#downloadprocessText').text("No order found");
            setTimeout(function () {
                $('#orderTableModal').modal('hide')
            }, 1000)
        }
    })
}

function getOrderFlowQuery(query, countryParam, sysname, sysstatus, flow_type, profilecode) {
    if (undefined !== sysname) {
        query = query.replace(/sysname/gi, sysname)
    }
    if (undefined !== sysstatus) {
        query = query.replace(/sysstatus/gi, sysstatus)
    }
    if (undefined !== flow_type) {
        query = query.replace(/flowtype/gi, flow_type)
    }
    if (undefined !== profilecode) {
        query = query.replace(/profile_param/gi, profilecode)
    }
    return query
}