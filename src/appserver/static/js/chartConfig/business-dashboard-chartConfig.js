var revenueChartConfig = {
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
        filename: "Revenue Chart"
    },
    credits: false,
    colors: ['#50bcb6', '#fdb94e'],
    legend: {
        itemDistance: 20,
        padding: 0,
        itemMarginTop: 4,
        itemMarginBottom: 2
    },
    xAxis: [{
        categories: [],
        crosshair: true,
        labels: {
            rotation: 0
        },
        title: {
            text: 'Date',
            enabled: false
        }
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Revenue ($)',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
    }, { // Secondary yAxis
        title: {
            enabled: false
        },
        labels: {
            enabled: false
        },
        opposite: true,
    }],
    tooltip: {
        formatter: eval("revenueChartTooltip"),
        shared: true
    },
    series: [{
        name: 'Current Week',
        type: 'column',
        data: [],
        tooltip: {
            valuePrefix: '$'
        }
    }, {
        name: 'Last Week',
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
};
var SubscriberChartConfig = {
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
        filename: "Subscriber Chart"
    },
    legend: {
        itemDistance: 20,
        padding: 0,
        itemMarginTop: 4,
        itemMarginBottom: 2
    },
    credits: false,
    colors: ['#7986CB', '#fdb94e'],
    xAxis: [{
        // categories: ['IVR','USSD','Kiosks','Self Care','Mobile Apps'],
        categories: [],
        crosshair: true,
        labels: {
            rotation: 0
        },
        title: {
            text: 'Date',
            enabled: false
        }
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            style: {
                color: Highcharts.getOptions().colors[
                    1]
            }
        },
        title: {
            text: 'Subscribers',
            style: {
                color: Highcharts.getOptions().colors[
                    1]
            }
        },
    }, { // Secondary yAxis
        title: {
            enabled: false
        },
        labels: {
            enabled: false
        },
        opposite: true,
    }],
    tooltip: {
        formatter: subscriberChartTooltip,
        shared: true
    },
    series: [{
        name: 'Current Week',
        type: 'column',
        data: []
    }, {
        name: 'Last Week',
        type: 'spline',
        data: [],
        marker: {
            lineWidth: 2,
            lineColor: '#f7a35c',
            fillColor: 'white'
        }
    }]
};
var mnpChartConfig = {
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
};
var orderChartConfig = {
    chart: {
        type: 'solidgauge',
        spacingBottom: 10,
        spacingTop: 10,
        spacingLeft: 10,
        spacingRight: 10
    },
    credits: false,
    title: {
        text: '',
        style: {
            fontSize: '24px'
        }
    },
    exporting: {
        filename: "Order Chart"
    },
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
            fontSize: '12px'
        },
        pointFormat: '<span style="font-size:1.5em; color: {point.color}; font-weight: bold">{series.name} - {point.z}</span><br><span style="font-size:1.5em; color: {point.color};">{point.y}%</span>',
        positioner: function (labelWidth) {
            return {
                x: 20,
                y: 0
            };
        }
    },
    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: "rgba(233,95,92,0.3)",
            borderWidth: 0
        }, { // Track for Exercise
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: "rgba(157,188,122,0.3)",
            borderWidth: 0
        }, { // Track for Stand
            outerRadius: '62%',
            innerRadius: '38%',
            backgroundColor: "rgba(67,111,142,0.3)",
            borderWidth: 0
        }]
    },

    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
    },
    xAxis: {
        categories: ['Orders Percentage'],
        title: {
            text: 'Type',
            enabled: false
        }
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: false
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },
    legend: {
        labelFormatter: function () {
            return '<span style="text-weight:bold;color:' + this.userOptions.color + '">' + this.name + '</span>';
        },
        symbolWidth: 0,
        layout: 'vertical',
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '',
        borderWidth: 0,
        shadow: false
    },
    series: [{
        name: 'Prepaid',
        borderColor: '#e95f5c',
        color: '#e95f5c',
        data: [{
            color: '#e95f5c',
            radius: '112%',
            innerRadius: '88%',
            y: 0,
            z: 0
        }],
        showInLegend: true
    }, {
        name: 'Postpaid',
        borderColor: '#9dbc7a',
        color: '#9dbc7a',
        data: [{
            color: '#9dbc7a',
            radius: '87%',
            innerRadius: '63%',
            y: 0,
            z: 0
        }],
        showInLegend: true
    }, {
        name: 'Fixed',
        borderColor: '#436f8e',
        color: '#436f8e',
        data: [{
            color: '#436f8e',
            radius: '62%',
            innerRadius: '38%',
            y: 0,
            z: 0
        }],
        showInLegend: true
    }]
};
var bizHomeEmpty = {
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