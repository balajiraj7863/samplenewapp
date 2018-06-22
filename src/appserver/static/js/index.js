$(document).ready(function() {
    //Page load function
    $(window).on('load', function() {
        //Preloader
        $('#status').delay(500).fadeOut('slow');
        $('#preloader').delay(1000).fadeOut('slow');
        //Animate CSS
        $('.card').addClass('animated zoomIn');

    });

    $('[data-toggle="tooltip"]').tooltip();

    //Resizing chart
    function responsiveScreen() {
        var height = $(window).height();
        var chartHeight = ((height - 336) / 2);
        var serverTable = height - 400;
        // Margin-top for Mobile and web
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
        if (!isMobile) {
            $('.chart-area').css('height', chartHeight);
            $('.table-view').css('max-height', serverTable);
            $('#chartPreloader').css('height', chartHeight);
        } else {
            $('.chart-area').css('height', '250px');
            $('.server-table').css('height', '250px');
            $('#chartPreloader').css('height', '250px');
        }

        // Moving the Right Side bar
        var h = window.innerHeight;
        var rightSidebar = h - 110;
        $('.right-sidebar-container').height(rightSidebar);
        $('.icon-right, #change-country').click(function() {
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