var opsPostMnpDD = {
    "mnpDaily": {
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
    },
    "mnpWeekly": {
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
            filename: 'Mnp Chart'
        },
        legend: {
            itemDistance: 20,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        credits: false,
        colors: ['#56c1ab', '#fdb94e'],
        xAxis:[ {
            categories: [],
            //crosshair: true,
            labels: {
                rotation: 0
            },
            title: {
                text: 'Date',
                enabled: false
            }
        }],
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Subscribers'
            }
        },
        tooltip: {
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Port In',
            data: [],
            stack: 'male'
        }, {
            name: 'Port Out',
            data: [],
            stack: 'female'
        }]
    },
    "mnpMonthly": {
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
            filename: 'Mnp Chart'
        },
        legend: {
            itemDistance: 20,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        credits: false,
        colors: ['#56c1ab', '#fdb94e'],
        xAxis:[ {
            categories: [],
           // crosshair: true,
            labels: {
                rotation: 0
            },
            title: {
                text: 'Date',
                enabled: false
            }
        }],
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Subscribers'
            }
        },
        tooltip: {
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Port In',
            data: [],
            stack: 'male'
        }, {
            name: 'Port Out',
            data: [],
            stack: 'female'
        }]
    },
}
var OpsMnpEmpty = {
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