var totalLinksAvailable = ["link_sys1_sys2", "link_sys2_sys6", "link_sys2_sys3", "link_sys2_sys5", "link_sys2_sys9", "link_sys2_sys8", "link_sys2_sys4", "link_sys3_sys10", "link_sys4_sys11", "link_sys8_sys12", "link_sys12_sys7", "link_sys8_sys13", "link_sys13_sys8", "link_sys11_sys5", "link_sys10_sys4", "link_sys10_sys7", "link_sys11_sys6", "link_sys2_sys13", "link_sys6_sys7", "link_sys13_sys7", "link_sys5_sys6", "link_sys13_sys12", "link_sys2_sys7", "link_sys11_sys14", "link_sys5_sys14", "link_sys4_sys14", "link_sys7_sys14", "link_sys12_sys14","link_sys11_sys12","link_sys7_sys_dummy"];
var totalSysNames = ["workorder", "sigma_suborders", "sigma_orders", "activateonnetwork", "agreementstep", "autocoordinatecomposite", "ceaseprepaidservice", "ceaseonnetwork", "ceaserepatriateprepaid", "issuesimcardanddevice", "mmlcommands", "calcapplycontracttermcharg", "rollbackprepaidmigration", "takesecuritydeposit", "refundsecuritydepositgsm","dummystep"];
var totalMnpSysNames = ["workorder", "sigma_suborders", "sigma_orders", "activateonnetwork", "agreementstep", "waiticcarenetworkactivation", "sendportingdeactivationresp", "processingportingrequest", "processingportingdeactivate", "issuesimcardanddevice", "mmlcommands", "iccarecompleteportin", "iccarecompleteportout", "iccareinitiateportout", "iccareconfirmrequestapprovl", "refundsecuritydepositgsm", "takesecuritydeposit", "ceaseonnetwork"];
var totalSystems = ["sys1", "sys2", "sys3", "sys4", "sys5", "sys6", "sys7", "sys8", "sys9", "sys10", "sys11", "sys12", "sys13", "sys14","dummy"];
var orderFlowMapping = {
    "Provide_GSM": "sys1,sys2,sys8,sys13,sys7,sys14",
    "Cease_service": "sys1,sys2,sys3,sys10,sys7,sys14",
    "Recover_Order": "sys1,sys2,sys5,sys6",
    "Change_or_tariff_Recover": "sys1,sys2,sys6,sys7,sys14",
    "Change_or_tariff_Provide": "sys1,sys2,sys6,sys7,sys14",
    "Cease_Service_GSM_Mobile": "sys1,sys2,sys3,sys10,sys4,sys11,sys5,sys14",
    "Provide_BlackBerryDevice": "sys1,sys2",
    "Provide_HandSetDevice": "sys1,sys2",
    "Trasnfer_of_Libability_": "sys1,sys2",
    "Trasnfer_of_Libability_GSM_Provide": "sys1,sys2",
    "Provide_Additional": "sys1,sys2,sys7,sys14",
    "Change_of_address": "sys1,sys2,sys9",
    "change_of_number_Recover_prepaid": "sys1,sys2,sys4,sys11,sys6,sys7,sys14",
    "Change_of_number_GSM_Recover": "sys1,sys2,sys6,sys7,sys14",
    "Change_of_Number_GSM_Provide": "sys1,sys2,sys6,sys7,sys14",
    "Provide_Line_features": "sys1,sys2,sys7,sys14",
    "Change_of_SIM_Provide": "sys1,sys2,sys7,sys14",
    "Provide_LTE": "sys1,sys2,sys8,sys13,sys7,sys14",
    "GMPP": "sys1,sys2,sys8,sys13,sys12,sys7,sys14"
}
var mnpFlowMapping = {
    "postpaid_portout_recover": "mnpsys1,mnpsys2,mnpsys4,mnpsys7,mnpsys12,mnpsys16",
    "postpaid_portin_provider": "mnpsys1,mnpsys2,mnpsys6,mnpsys10,mnpsys5,mnpsys8,mnpsys13,mnpsys16",
    "prepaid_portin_provider": "mnpsys1,mnpsys2,mnpsys5,mnpsys9,mnpsys14,mnpsys13,mnpsys15,mnpsys16",
    "prepaid_portout_recover": "mnpsys1,mnpsys2,mnpsys3,mnpsys7,mnpsys11,mnpsys16",
   
}
// var orderFlowSystemStausMapper = {
//     "workorder": ["RE", "CO", "AV", "CA", "CU"],
//     "activateonnetwork": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "ceaseprepaidservice": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "agreementstep": ["DE", "CO", "AV", "CA", "PE"],
//     "rollbackprepaidmigration": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "ceaseonnetwork": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "autocoordinatecomposite": ["DE", "CO", "AV", "CA", "PE"],
//     "ceaserepatriateprepaid": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "takesecuritydeposit": ["DE", "CO", "AV", "CA", "PE"],
//     "refundsecuritydepositgsm": ["DE", "CO", "AV", "CA", "PE"],
//     "issuesimcardanddevice": ["DE", "CO", "AV", "CA", "PE"],
//     "calcapplycontracttermcharg": ["DE", "CO", "AV", "CA", "PE"],
//     "sigma_suborders": ["initial", "final", "node", "ultimate", "transient"],
//     "sigma_orders": ["initial", "final", "node", "ultimate", "transient"],
//     "mmlcommands": ["AP", "CA", "CH", "DM", "DS", "ES", "FA", "HF", "NC", "NS", "TO", "TS", "PD", "OH", "WE", "PE", "PSXFA", "PSXSU", "QD", "RJ", "SE", "SU", "US"],
//     "dummystep":["CO","AV"]
// }
// var mnpFlowSystemStausMapper = {
//     "workorder": ["RE", "CO", "AV", "CA", "CU"],
//     "activateonnetwork": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "iccareinitiateportout": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "agreementstep": ["DE", "CO", "AV", "CA", "PE"],
//     "processingportingdeactivate": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "ceaseonnetwork":["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "processingportingrequest": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "sendportingdeactivationresp": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "waiticcarenetworkactivation": ["DE", "CO", "AV", "CA", "PE"],
//     "iccareconfirmrequestapprovl": ["DE", "CO", "AV", "CA", "PE"],
//     "takesecuritydeposit": ["DE", "CO", "AV", "CA", "PE"],
//     "refundsecuritydepositgsm": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "issuesimcardanddevice": ["DE", "CO", "AV", "CA", "PE"],
//     "iccarecompleteportin":["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "iccarecompleteportout": ["DE", "CO", "AV", "LO", "CA", "PE", "CU"],
//     "sigma_suborders": ["initial", "final", "node", "ultimate", "transient"],
//     "sigma_orders": ["initial", "final", "node", "ultimate", "transient"],
//     "mmlcommands": ["AP", "CA", "CH", "DM", "DS", "ES", "FA", "HF", "NC", "NS", "TO", "TS", "PD", "OH", "WE", "PE", "PSXFA", "PSXSU", "QD", "RJ", "SE", "SU", "US"]
// }

var orderFlowSystemStausMapper = {
    "workorder": ["RE", "CO", "AV", "CU"],
    "activateonnetwork": [  "CO", "AV", "LO",    "CU"],
    "ceaseprepaidservice": [  "CO", "AV", "LO",    "CU"],
    "agreementstep": [  "CO", "AV",  "PE"],
    "rollbackprepaidmigration": [  "CO", "AV", "LO",    "CU"],
    "ceaseonnetwork": [  "CO", "AV", "LO",    "CU"],
    "autocoordinatecomposite": [  "CO", "AV",  "PE"],
    "ceaserepatriateprepaid": [  "CO", "AV", "LO",    "CU"],
    "takesecuritydeposit": [  "CO", "AV",  "PE"],
    "refundsecuritydepositgsm": [  "CO", "AV",  "PE"],
    "issuesimcardanddevice": [  "CO", "AV",  "PE"],
    "calcapplycontracttermcharg": [  "CO", "AV",  "PE"],
    "sigma_suborders": ["initial", "final", "node", "ultimate", "transient"],
    "sigma_orders": ["initial", "final", "node", "ultimate", "transient"],
    "mmlcommands": ["AP",  "CH", "DM", "DS", "ES", "FA", "HF", "NC", "NS", "TO", "TS", "PD", "OH", "WE",   "PSXFA", "PSXSU", "QD", "RJ", "SE", "SU", "US"],
    "dummystep":["CO","AV"]
}
var mnpFlowSystemStausMapper = {
    "workorder": ["RE", "CO", "AV",  "CU"],
    "activateonnetwork": [  "CO", "AV", "LO",    "CU"],
    "iccareinitiateportout": [  "CO", "AV", "LO",    "CU"],
    "agreementstep": [  "CO", "AV",  "PE"],
    "processingportingdeactivate": [  "CO", "AV", "LO",    "CU"],
    "ceaseonnetwork":[  "CO", "AV", "LO",    "CU"],
    "processingportingrequest": [  "CO", "AV", "LO",    "CU"],
    "sendportingdeactivationresp": [  "CO", "AV", "LO",    "CU"],
    "waiticcarenetworkactivation": [  "CO", "AV",  "PE"],
    "iccareconfirmrequestapprovl": [  "CO", "AV",  "PE"],
    "takesecuritydeposit": [  "CO", "AV",  "PE"],
    "refundsecuritydepositgsm": [  "CO", "AV", "LO",    "CU"],
    "issuesimcardanddevice": [  "CO", "AV",  "PE"],
    "iccarecompleteportin":[  "CO", "AV", "LO",    "CU"],
    "iccarecompleteportout": [  "CO", "AV", "LO",    "CU"],
    "sigma_suborders": ["initial", "final", "node", "ultimate", "transient"],
    "sigma_orders": ["initial", "final", "node", "ultimate", "transient"],
    "mmlcommands": ["AP",  "CH", "DM", "DS", "ES", "FA", "HF", "NC", "NS", "TO", "TS", "PD", "OH", "WE",   "PSXFA", "PSXSU", "QD", "RJ", "SE", "SU", "US"]
}

var modelWindowMapping = {
    "workorder": "WorkOrder",
    "activateonnetwork": "Activate on Network",
    "ceaseprepaidservice": "Cease Prepaid Service",
    "agreementstep": "Agreement Step",
    "rollbackprepaidmigration": "Rollback Prepaid Migration",
    "ceaseonnetwork": "Cease on Network",
    "autocoordinatecomposite": "Auto - Coordinate Composite",
    "ceaserepatriateprepaid": "Cease/Repatriate Prepaid",
    "takesecuritydeposit": "Take Security Deposit",
    "refundsecuritydepositgsm": "Refund Security Deposit (GSM)",
    "issuesimcardanddevice": "Issue SIM Card and Device",
    "calcapplycontracttermcharg": "Calc/Apply Contract Term Charg",
    "sigma_suborders": "Sigma_SubOrders",
    "sigma_orders": "Sigma_Orders",
    "mmlcommands": "mmlcommands",
    "dummystep":"Dummy Step"
}
var mnpModelWindowMapping = {
    "workorder": "WorkOrder",
    "activateonnetwork": "Activate on Network",
    "iccareinitiateportout": "ICCARE Initiate Port out",
    "agreementstep": "Agreement Step",
    "ceaseonnetwork": "Cease on Network",
    "processingportingdeactivate": "Processing Porting Deactivate",
    "processingportingrequest": "Processing Porting Request",
    "sendportingdeactivationresp": "Send Porting Deactivation Resp",
    "iccareconfirmrequestapprovl": "ICCARE confirm request approvl",
    "waiticcarenetworkactivation": "Wait-ICCARE Network Activation",
    "takesecuritydeposit": "Take Security Deposit",
    "refundsecuritydepositgsm": "Refund Security Deposit (GSM)",
    "issuesimcardanddevice": "Issue SIM Card and Device",
    "iccarecompleteportin": "ICCARE Complete Port In",
    "iccarecompleteportout": "ICCARE Complete Port out",
    "sigma_suborders": "Sigma_SubOrders",
    "sigma_orders": "Sigma_Orders",
    "mmlcommands": "mmlcommands"
}
var isSearchManagerInstance = true;
var isMnpSearchManagerInstance = true;
var curreentflow = "consolidated";
var flowMapping = {
    "postpaid_port_out_recover": "mnpsys1,mnpsys2,mnpsys4,mnpsys7,mnpsys12,mnpsys16",
    "postpaid_portin_provider": "mnpsys1,mnpsys2,mnpsys6,mnpsys10,mnpsys5,mnpsys8,mnpsys13,mnpsys16",
    "prepaid_portin_provider": "mnpsys1,mnpsys2,mnpsys5,mnpsys9,mnpsys14,mnpsys13,mnpsys16",
    "prepaid_port_out_recover": "mnpsys1,mnpsys2,mnpsys3,mnpsys7,mnpsys11,mnpsys16",
}
var linksAvailable = ["link_mnpsys1_mnpsys2", "link_mnpsys3_mnpsys7", "link_mnpsys2_mnpsys5", "link_mnpsys2_mnpsys3", "link_mnpsys2_mnpsys6", "link_mnpsys2_mnpsys4", "link_mnpsys4_mnpsys7", "link_mnpsys7_mnpsys11", "link_mnpsys7_mnpsys12", "link_mnpsys5_mnpsys9", "link_mnpsys5_mnpsys8", "link_mnpsys6_mnpsys10", "link_mnpsys10_mnpsys5", "link_mnpsys8_mnpsys13", "link_mnpsys13_mnpsys15", "link_mnpsys14_mnpsys13", "link_mnpsys9_mnpsys14",
    "link_mnpsys15_mnpsys16", "link_mnpsys5_mnpsys16", "link_mnpsys9_mnpsys16", "link_mnpsys11_mnpsys16", "link_mnpsys12_mnpsys16", "link_mnpsys15_mnpsys16",
    "link_mnpsys3_mnpsys16", "link_mnpsys13_mnpsys16"
];


var profileCodeMapping={
    "Cease_service":"197",
    "Provide_GSM": "GM01",
    "Recover_Order": "GM06",
    "Change_or_tariff_Recover": "G20R",
    "Change_or_tariff_Provide": "G20P",
    "Cease_Service_GSM_Mobile": "GM15",
    "Provide_BlackBerryDevice": "GM04",
    "Provide_HandSetDevice": "GM05",
    "Trasnfer_of_Libability_": "GM21",
    "Trasnfer_of_Libability_GSM_Provide": "G21P",
    "Provide_Additional": "GM02",
    "Change_of_address": "G22P",
    "change_of_number_Recover_prepaid": "G31R",
    "Change_of_number_GSM_Recover": "G31R",
    "Change_of_Number_GSM_Provide": "G31P",
    "Provide_Line_features": "GM03",
    "Change_of_SIM_Provide": "G32P",
    "Provide_LTE": "GM06",
    "GMPP": "GMPP",
    "allflow":"allflow",
    "postpaid_portout_recover":"PO04",
    "postpaid_portin_provider":"PO03",
    "prepaid_portin_provider":"PI01",
    "prepaid_portout_recover":"PO02"
};


var orderflow_queryMapping={
       
"all_ordertype":'"consolidate_order_flow","consolidate_sigma_order_flow"',
"completed":'"consolidate_completed_order_flow","consolidate_sigma_completed_order_flow"',
"open_orders":'"consolidate_open_order_flow","consolidate_sigma_open_order_flow"',
"todays_orders":'"consolidate_today_order_flow","consolidate_sigma_today_order_flow"',


};
var orderflow_profile_queryMapping={
       
"all_ordertype":'"consolidate_profile_order_flow","consolidate_profile_sigma_order_flow"',
"completed":'"consolidate_profile_completed_order_flow","consolidate_profile_sigma_completed_order_flow"',
"open_orders":'"consolidate_profile_open_order_flow","consolidate_profile_sigma_open_order_flow"',
"todays_orders":'"consolidate_profile_today_order_flow","consolidate_profile_sigma_today_order_flow"',


};
var mnp_orderflow_queryMapping={
       
    // "all_ordertype":'"consolidate_mnp_flow","consolidate_sigma_mnp_flow"',
    // "completed":'"consolidate_completed_mnp_flow","consolidate_sigma_completed_mnp_flow"',
    // "open_orders":'"consolidate_open_mnp_flow","consolidate_sigma_open_mnp_flow"',
    // "todays_orders":'"consolidate_today_mnp_flow","consolidate_sigma_today_mnp_flow"',

    "all_ordertype":'"consolidate_order_flow","consolidate_sigma_order_flow"',
"completed":'"consolidate_completed_order_flow","consolidate_sigma_completed_order_flow"',
"open_orders":'"consolidate_open_order_flow","consolidate_sigma_open_order_flow"',
"todays_orders":'"consolidate_today_order_flow","consolidate_sigma_today_order_flow"',

    
    
    };
var mnp_orderflow_profile_queryMapping={
           
    // "all_ordertype":'"consolidate_profile_mnp_flow","consolidate_profile_sigma_mnp_flow"',
    // "completed":'"consolidate_profile_completed_mnp_flow","consolidate_profile_sigma_completed_mnp_flow"',
    // "open_orders": '"consolidate_profile_open_mnp_flow","consolidate_profile_sigma_open_mnp_flow"',
    // "todays_orders":'"consolidate_profile_today_mnp_flow","consolidate_profile_sigma_today_mnp_flow"',
    "all_ordertype":'"consolidate_profile_order_flow","consolidate_profile_sigma_order_flow"',
"completed":'"consolidate_profile_completed_order_flow","consolidate_profile_sigma_completed_order_flow"',
"open_orders":'"consolidate_profile_open_order_flow","consolidate_profile_sigma_open_order_flow"',
"todays_orders":'"consolidate_profile_today_order_flow","consolidate_profile_sigma_today_order_flow"',
    
    };
var total_modals=["workorder","mmlcommands","sigma_suborders","sigma_orders","model_work_orders_steps",];
var modal_query_mapping={
    "workorder":"model_work_orders",
    "mmlcommands":"model_mml_commands",
    "sigma_orders":"model_sigma_orders",
    "sigma_suborders":"model_sigma_sub_orders",
    "model_work_orders_steps":"model_work_orders_steps",
  

}


