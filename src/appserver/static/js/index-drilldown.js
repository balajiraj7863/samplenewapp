$(document).ready(function () {
    //Page load function
    $(window).on('load', function () {
        //Preloader
        $('#status').delay(500).fadeOut('slow');
        $('#preloader').delay(1000).fadeOut('slow');
        //Animate CSS
        $('.card').addClass('animated zoomIn');
    });
    
    function responsiveScreen(){
        //Resizing chart
        var height = $(window).height();
        var chartHeight = ((height - 240) / 2);
        // Margin-top for Mobile and web
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
        if (!isMobile) {
            $('.chart-area').css('height', chartHeight);
            $('.chartPreloader').css('height', chartHeight);
            // $('.chartPreloader .fa-spinner').css('margin-top',chartHeight/3);
        } else {
            $('.chart-area').css('height', '250px');
            $('.chartPreloader').css('height', '250px');
            // $('.chartPreloader .fa-spinner').css('margin-top','250px');
        }

        // Moving the Right Side bar
        var h = window.innerHeight;
        var rightSidebar = h - 110;
        $('.right-sidebar-container').height(rightSidebar);
        $('.icon-right, #change-country').click(function () {
            $("#wrapper").toggleClass("toggled");
            $('body').toggleClass('overflow-hidden');
        });
    }

    // calling the funtion for the page responsive on page load
    responsiveScreen();

    // Resizing window
    $(window).resize(function () {
        responsiveScreen();
    });

    // Last Refresh time
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();

    var output =
        (('' + month).length < 2 ? '0' : '') + month + '-' +
        (('' + day).length < 2 ? '0' : '') + day + '-' +
        d.getFullYear() + ' ' +
        (('' + hour).length < 2 ? '0' : '') + hour + ':' +
        (('' + minute).length < 2 ? '0' : '') + minute + ':' +
        (('' + second).length < 2 ? '0' : '') + second;

    $('.currentDateTime').html(output);
    $('[data-toggle="tooltip"]').tooltip();

    resetDatePicker();
   
    //Datepicker for the highcharts - this code should be moved to commonutil.js

    //Highcharts Chart Menu Option
    var options = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    let displayOptions = ["printChart", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadCSV"];
    var finaloptions = options.filter(item => displayOptions.includes(item));
    Highcharts.getOptions().exporting.buttons.contextButton.menuItems = finaloptions;
    Highcharts.setOptions({
        lang: {
            contextButtonTitle: 'Chart Menu',
            thousandsSep: ','
        }
    });

});

function resetDatePicker() {
    
    if ($('.date #fromDate').length) {
        $('.date #fromDate').datepicker({
            startDate: '-180d',
            endDate: "-1d",            
            autoclose: true,
            todayHighlight: false,
            leftArrow: '<i class="fa fa-long-arrow-left"></i>',
            rightArrow: '<i class="fa fa-long-arrow-right"></i>'
        }).on('changeDate', function (selected) {
            if (undefined !== selected.date) {
                resetDatePickerStyle($(this));
                var minDate = new Date(selected.date.valueOf());
                var toMaxDate = new Date(minDate);
                var tempMaxDate = new Date(toMaxDate);
                tempMaxDate = tempMaxDate.setDate(tempMaxDate.getDate() + 6)
                if (new Date(tempMaxDate).getTime() < new Date().getTime()) {
                    toMaxDate = new Date(toMaxDate.setDate(toMaxDate.getDate() + 6));
                } else {
                    toMaxDate = new Date();
                }
                $("#toDate").attr("disabled", false);
                $("#toDate").css('background', '#fff');
                $('#toDate').val("");
                $('#toDate').datepicker('setStartDate', minDate);
                $('#toDate').datepicker('setEndDate', toMaxDate);
            }
        });
    } else if ($('.date #fromTrafficDate').length) {
        $('.date #fromTrafficDate').datepicker({
            startDate: '-180d',
            endDate: "-1d",            
            autoclose: true,
            todayHighlight: false,
            leftArrow: '<i class="fa fa-long-arrow-left"></i>',
            rightArrow: '<i class="fa fa-long-arrow-right"></i>'
        }).on('changeDate', function (selected) {
            if (undefined !== selected.date) {
                resetDatePickerStyle($(this));
                $("#toTrafficDate").attr("disabled", false);
                $("#toTrafficDate").css('background', '#fff');
                $('#toTrafficDate').val("");
            }
        });
    } else if ($('.date #fromMonth').length) {
        $('.date #fromMonth').datepicker({
            format: "MM-yyyy",
            startView: "months",
            minViewMode: "months",
            startDate: '-180d',
            endDate: "today",            
            autoclose: true,
            todayHighlight: false,
        }).on('changeDate', function (selected) {
            if (undefined !== selected.date) {
                resetDatePickerStyle($(this));
                var minDate = new Date(selected.date.valueOf());
                $("#toMonth").attr("disabled", false);
                $("#toMonth").css('background', '#fff');
                $('#toMonth').val("");
                $('#toMonth').datepicker('setStartDate', minDate);
            }
        });
    }

    if ($('.date #toDate').length) {
        $("#toDate").datepicker({
            startDate: '-180d',
            endDate: "-1d",            
            autoclose: true,
            defaultDate: new Date(),
            todayHighlight: false,
            leftArrow: '<i class="fa fa-long-arrow-left"></i>',
            rightArrow: '<i class="fa fa-long-arrow-right"></i>'
        }).on('changeDate', function (selected) {
            if (undefined !== selected.date) {
                resetDatePickerStyle($(this));
                var maxDate = new Date(selected.date.valueOf());
                var fromMaxDate = new Date(maxDate);
                fromMaxDate = new Date(fromMaxDate.setDate(fromMaxDate.getDate() - 6));
                $('#fromDate').datepicker('setStartDate', fromMaxDate);
                $('#fromDate').datepicker('setEndDate', maxDate);
            }
        });
    } else if ($('.date #toTrafficDate').length) {
        $("#toTrafficDate").datepicker({
            startDate: '-180d',
            endDate: "-1d",            
            autoclose: true,
            defaultDate: new Date(),
            todayHighlight: false,
            leftArrow: '<i class="fa fa-long-arrow-left"></i>',
            rightArrow: '<i class="fa fa-long-arrow-right"></i>'
        }).on('changeDate', function (selected) {
            if (undefined !== selected.date) {
                resetDatePickerStyle($(this));
            }
        });
    } else if ($('.date #toMonth').length) {
        $("#toMonth").datepicker({
            format: "MM-yyyy",
            startView: "months",
            minViewMode: "months",
            defaultDate: new Date(),
            startDate: '-180d',
            endDate: "today",            
            autoclose: true,
            todayHighlight: false,
        }).on('changeDate', function (selected) {
            if (undefined !== selected.date) {
                resetDatePickerStyle($(this));
                var maxDate = new Date(selected.date.valueOf());
                $('#fromMonth').datepicker('setEndDate', maxDate);
            }
        });
    }



    $(".datePicker").attr('readonly', 'readonly');
}

function resetDatePickerStyle(thisEle) {
    thisEle.css('border', '1px solid #ccc');
    thisEle.css('background', '#fff');
}

function disableCustomDatePicker(flagVal, fromDate, toDate, isNotApply) {
    $("#"+fromDate).attr("disabled", flagVal);
    $("#"+toDate).attr("disabled", true);
    $("#searchBtn").attr("disabled", flagVal);
    if(isNotApply) {
        $("input[type='text']").val("");
    }
    if(false === flagVal) {
        $('.custom-date').css('display','inline-block'); 
    } else if(true === flagVal) {
        $('.custom-date').hide();
    }
}

$('#downloadExportData').click(function() {
    $(".datePicker").css('border', '1px solid #ccc');
});

function formatExcelInputDate(dateObj) {
    return (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
}

function parseJSONToCSVStr(jsonData) {
    if (jsonData.length == 0) {
        return '';
    }

    let keys = Object.keys(jsonData[0]);

    let columnDelimiter = ',';
    let lineDelimiter = '\n';

    let csvColumnHeader = keys.join(columnDelimiter);
    let csvStr = csvColumnHeader + lineDelimiter;

    jsonData.forEach(item => {
        keys.forEach((key, index) => {
            if ((index > 0) && (index < keys.length - 1)) {
                csvStr += columnDelimiter;
            }
            csvStr += item[key];
        });
        csvStr += lineDelimiter;
    });

    return encodeURIComponent(csvStr);;
}

function exportResultToCsv(JSONData, JSONHeader, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var arrDataHeader = typeof JSONHeader != 'object' ? JSON.parse(JSONHeader) : JSONHeader;
    var CSV = '';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        for (var indx in arrDataHeader) {
            if ( !isNaN(parseInt(indx)) ) {
                //Now convert each value to string and comma-seprated
                row += arrDataHeader[indx] + ',';
            }
        }
        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + '\r\n';
    }

    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            if ( !isNaN(parseInt(index)) ) {
                row += '"' + arrData[i][index] + '",';
            }
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    var fileName = "";
    fileName += ReportTitle.replace(/ /g, "_");

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    var alink = document.createElement("a");
    alink.href = uri;

    alink.style = "visibility:hidden";
    alink.download = fileName + ".csv";

    document.body.appendChild(alink);
    alink.click();
    document.body.removeChild(alink);
}

function showPreloader(showFlag) {
    if(!showFlag) {
        $("#downloadExportData").addClass('showBgImage');
        $("#downloadPreloader").css('display', 'none');    
    } else {
        $("#downloadExportData").removeClass('showBgImage');
        $("#downloadPreloader").css('display', 'block');    
    }
}