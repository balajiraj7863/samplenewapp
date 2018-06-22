var opsPostDashboard = {
    "incidentAgeing": {
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
            filename: 'Ageing incident view chart'
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
        // colors: ['#C0DFA1','#9FC490','#7A9E7E','#31493C','#82A3A1' ],
        // colors: ['#89BD9E','#F0C987','#EB9486','#F5B82E','#FE5F55'],
        colors: ['#ECDD7B', '#88AB75', '#f39c12', '#e67e22', '#D1462F'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        tooltip: {
            headerFormat: 'Incident by ageing<br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
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
    "incidentCountry": {
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
        },
        exporting: {
            filename: 'Countrywise incident view chart'
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
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        tooltip: {
            headerFormat: 'Incident by countrywise<br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
        },
        credits: {
            enabled: false
        },
        legend: {
            itemDistance: 10,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        series: [{
            type: 'pie',
            name: 'Incident Count',
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
            filename: 'LNP chart'
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
                rotation: 0,
                formatter: dateFormatter
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
    "orderAgeing": {
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
            filename: 'Ageing order view chart'
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
        colors: ['#A1CF6B', '#D6E681', '#E0C879', '#C4AD83', '#E87461'],
        // colors: ['#FDCA40','#F2CC8F','#81B29A','#E07A5F','#3D405B'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        tooltip: {
            headerFormat: 'Order by ageing<br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'pie',
            name: 'Orders Count',
            data: []
        }]
    },
    "orderCountry": {
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10
        },
        exporting: {
            filename: 'Countrywise order view chart'
        },
        title: {
            text: ''
        },
        credits: false,
        colors: ['#ff6666', '#f15c80', '#8085e9', '#f7a35c', '#8eb55c'],
        tooltip: {
            headerFormat: 'Order by countrywise<br/>',
            pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                showInLegend: true
            }
        },
        legend: {
            itemDistance: 10,
            padding: 0,
            itemMarginTop: 4,
            itemMarginBottom: 2
        },
        series: [{
            name: 'Orders Count',
            colorByPoint: true,
            data: []
        }]
    },
    "billingMediation": {
        chart: {
            type: 'column',
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10
        },
        exporting: {
            filename: 'Billing mediation reconciliation chart'
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
        subtitle: {
            text: ''
        },
        colors: ['#0087be', '#005082'],
        xAxis: {
            categories: [],
            crosshair: true,
            labels: {
                rotation: 0,
                formatter: dateFormatter
            },
            title: {
                text: 'Date',
                enabled: false
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'CDRs Count'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            shared: true,
            useHTML: true
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
            name: 'Rated CDRs',
            data: []

        }, {
            name: 'Mediated CDRs',
            data: []
        }]
    }
}
var bizOpsFixedEmpty = {
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
                enabled: false
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