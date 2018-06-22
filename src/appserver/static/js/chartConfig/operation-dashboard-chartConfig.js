var opsHomeDashboard ={
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
                text: 'Topup'
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
    "openincidentChart":{
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
        exporting: {
            filename: 'openincidentChart'
        },
        legend: {
            itemDistance: 10,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        title: {
            text: ''
        },
        tooltip: {
            headerFormat: 'Open Incidents<br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name} : <b>{point.percentage:.1f}%</b>'
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'pie',
            name: 'Incidents Count',
            data: []
        }]
    },
    "todaysorderChart": {
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
        exporting: {
            filename: "Today's Order Chart"
        },
        legend: {
            itemDistance: 10,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        title: {
            text: ''
        },
        colors: ['#7ac143', '#6a737b', '#ff9900'],
        tooltip: {
            headerFormat: 'Order Status<br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}:<br><b>{point.percentage:.1f}%</b>'
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'pie',
            name: 'Orders count',
            data: []
    
        }]
    },
    "incidentPriorityChart":{
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0
        },
        exporting: {
            filename: 'Prioritywise Incident View Chart'
        },
        title: {
            text: ''
        },
        legend: {
            itemDistance: 10,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        tooltip: {
            headerFormat: 'Incident Priority<br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
        },
        credits: {
            enabled: false
        },
    
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: 50,
                    style: {
                        fontWeight: 'bold'
                    },
                    enabled: true,
                    format: '{point.name} : <b>{point.percentage:.1f}%</b>'
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Incidents Count',
            innerSize: '40%',
            data: [{
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
            ]
        }]
    },
    "mnpChartConfig":{
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
            filename: 'MNP LNP Chart'
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
};
var opsHomeEmpty = {
    "emptyChartConfig": {
        "emptyChart": {
            chart: {
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#00bcd4', '#019BBA', '#fdb94e'],
            title: {
                text: ''
            },
            exporting: {
                enabled:false
            },
            credits: false,
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Category',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: '',
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) ||
                            'gray'
                    }
                }
            },
            legend: {
                itemDistance: 20,
                padding: 2,
                itemMarginTop: 4,
                itemMarginBottom: 2,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) ||
                    'white',
                shadow: false
            },
            legend: {
                enabled: false
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) ||
                            'white'
                    }
                }
            },
            series: [{
                name: 'No data to display',
                data: []
            }]
        },
    }
}