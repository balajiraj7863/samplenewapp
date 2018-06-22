var opsPreDashboard = {
    "topup": {
        chart: {
            zoomType: 'xy',
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10
        },
        title: {
            text: ''
        },
        exporting: {
            filename: 'Topup chart'
        },
        legend: {
            itemDistance: 10,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        credits: false,
        colors: ['#69c5e4', '#fdb94e'],
        xAxis: [{
            categories: [],
            crosshair: true,
            labels: {
                rotation: 0
            },
            title: {
                text: 'Channels',
                enabled: false
            }
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Revenue (US$)',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
        }, { // Secondary yAxis
            title: {
                text: 'Topup Count'
            },
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true,
            headerFormat: '<b>{point.x}</b><br/>'
        },
        series: [{
            name: 'Topup',
            type: 'column',
            yAxis: 1,
            data: [],
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: 'Revenue',
            type: 'spline',
            data: [],
            tooltip: {
                valuePrefix: '$'
            },
            marker: {
                lineWidth: 2,
                lineColor: '#f7a35c',
                fillColor: 'white'
            }
        }]
    },
    "autoRenewal": {
        chart: {
            type: 'pie',
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        credits: false,
        exporting: {
            filename: 'Auto renewal chart'
        },
        legend: {
            itemDistance: 20,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        tooltip: {
            headerFormat: '<b>Plans</b><br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
        },
        colors: ['#7ac143', '#6a737b', '#ff9900'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}:<br><b>  {point.percentage:.1f} %</b>'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Countries',
            data: []
        }]
    },
    "mobileResults": {
        chart: {
            type: 'pie',
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        credits: false,
        exporting: {
            filename: 'Mobile test results chart'
        },
        legend: {
            itemDistance: 20,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        tooltip: {
            headerFormat: '<b>Mobile Test Results</b><br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>: {point.y}'
        },
        colors: ['#f56040', '#436f8e', '#3197d6'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}:<br><b>{point.percentage:.1f} %</b>'
                }
            }
        },
        series: [{
            type: 'pie',
            cursor: 'pointer',
            name: 'Status Count',
            data: [],
            point: {
                events: {
                    click: function (event) {
                        // Pointing to Production URL 
                        window.open("http://10.255.215.121:7001/dashboard/testresults/index.html", "_blank");
                    }
                }
            }
        }]
    },
    "voucherStatus": {
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
        credits: false,
        exporting: {
            filename: 'Vouchers status chart'
        },
        legend: {
            itemDistance: 10,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        tooltip: {
            useHTML: true,
            shared: true,
            headerFormat: '<b>{point.x}</b><br/>'
        },
        colors: ['#8ec06c', '#e66760'],
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
                text: 'Success/Failure counts'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Success',
            data: []

        }, {
            name: 'Failure',
            data: []

        }]
    },
    "incident": {
        chart: {
            type: 'pie',
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        credits: false,
        exporting: {
            filename: 'Open Incident chart'
        },
        legend: {
            itemDistance: 20,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        tooltip: {
            headerFormat: '<b>Open Incidents</b><br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
        },
        colors: ['#fcaf45', '#f77737', '#f56040', '#e1306c', '#5851db', '#405de6'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name} : <b>{point.percentage:.1f} %</b>'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Countries',
            data: []
        }]
    },
    "mnp": {
        chart: {
            type: 'column',
            zoomType: 'x',
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10
        },
        title: {
            text: ''
        },
        credits: false,
        colors: ["#5f6c72", "#2980b9", "#fd7622", "#019b1b"],
        exporting: {
            filename: 'MNP chart'
        },
        legend: {
            itemDistance: 20,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        tooltip: {
            useHTML: true,
            shared: true,
            headerFormat: '<b>{point.x}</b><br/>'
        },
        xAxis: {
            categories: [],
            crosshair: true,
            type: 'dateTime',
            labels: {
                rotation: 0
            },
            title: {
                text: 'Date',
                enabled: false
            }
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Subscribers'
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Port In',
            data: [],
            cursor: 'pointer',
            stack:'male'
        }, {
            name: 'Port Out',
            data: [],
            cursor: 'pointer',
            stack:'female'
        }, {
            name: 'Lastweek Port In',
            data: [],
            type: 'line'
        }, {
            name: 'Lastweek Port Out',
            data: [],
            type: 'line'
        }]
    }
}