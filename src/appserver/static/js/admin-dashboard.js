require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc) {
 console.log('console India');
var tokens = mvc.Components.get('submitted');
/* --- Search Reference --- */

var taskCollectionSearch = mvc.Components.get('taskCollectionSearch');
    var createSearch = mvc.Components.get('createSearch');
    var updateSearch = mvc.Components.get('updateSearch');
    var deleteSearch = mvc.Components.get('deleteSearch');

    var taskCollectionTable = mvc.Components.get('taskCollectionTable');


    /* --- Define the form inputs --- */
    var userName_Input = $('[name="User_Name"]');
    var emailId_Input = $('[name="EmailId"]');
    var country_Input = $('[name="Country"]')
    var service_type_Input = $('[name="Service_Type"]')
    var user_type_Input = $('[name="User_Type"]')
    var _key_Input = $('[name="_key"]')


    /* --- Reference to the input values --- */
    var userName_val, emailId_val, country_val, service_type_val, user_type_val, _key_Val;



    taskCollectionTable.on('click', function (e) {


        e.preventDefault();
        if (e['field'] === 'Update') {

            /* --- Pull values from the current table row --- */
            userName_val = e.data['row.User_Name'];
            emailId_val = e.data['row.EmailId'];
            country_val = e.data['row.Country'];
            service_type_val = e.data['row.Service_Type'];
            user_type_val = e.data['row.User_Type'];


            _key_Val = e.data['row._key'];



            // Insert values from rows into input fields -
            userName_Input.val(userName_val);
            country_Input.val(country_val);
            emailId_Input.val(emailId_val);
            service_type_Input.val(service_type_val);
            user_type_Input.val(user_type_val);
            _key_Input.val(_key_Val);

        } else if (e['field'] === 'Delete') {
            tokens.set('delete_key_tok', e.data['row._key']);
        }


    });


    $(document).on('click', '#submitButton', function (e) {

        e.preventDefault();
        var keyvalue = _key_Input.val();
        if (keyvalue != '') {
            console.log("Click on Inside If");
            /* --- this is an update --- */
            tokens.set('update_key_tok', _key_Input.val());
            tokens.set('update_user_name_tok', userName_Input.val());
            tokens.set('update_emailId_tok', emailId_Input.val());
            tokens.set('update_country_tok', country_Input.val());
            tokens.set('update_service_type_tok', service_type_Input.val());
            tokens.set('update_user_type_tok', user_type_Input.val());
        } else {

            tokens.set('create_tok', 'true');
            tokens.set('create_user_name_tok', userName_Input.val());
            tokens.set('create_emailid_tok', emailId_Input.val());
            tokens.set('create_country_tok', country_Input.val());
            tokens.set('create_service_type_tok', service_type_Input.val());
            tokens.set('create_user_type_tok', user_type_Input.val());

        }


    });



    createSearch.on('search:done', function () {
        console.log("createSearch" + userName_Input.val());
        taskCollectionSearch.startSearch();
        $('form *').filter(':input').each(function () {
            $(this).val('');
        });
    });

    /* --- Search Jobs --- */
    updateSearch.on('search:done', function () {
        console.log("updatesearch" + userName_Input.val());
        taskCollectionSearch.startSearch();
        $('form *').filter(':input').each(function () {
            $(this).val('');
        });
    });

    deleteSearch.on('search:done', function () {
        taskCollectionSearch.startSearch();
        tokens.unset('delete_key_tok');
    });




 });
