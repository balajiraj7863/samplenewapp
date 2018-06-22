// Make monochrome colors
var monochromeColors = (function () {
    var colors = [],
        base = '#2980b9',
        i;
    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 4) / 10).get());
    }
    return colors;
}());
var opsIncOrderDrilldown = {
    "emptyDataConfig": {
        "statuswise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                enabled:false
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            // colors:['#27ae60','#e74c3c','#e67e22','#3498db','#f1c40f'],
            colors: ['#27ae60', '#e67e22', '#f1c40f'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Order Status</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>: {point.y}'
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
            series: [{
                name: 'Order Count',
                colorByPoint: true,
                data: []
            }]
        },
        "typewise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                enabled:false
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            colors: ['#EE7674', '#F9B5AC', '#D0D6B5', '#9DBF9E', '#987284', '#E84855'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Order Status</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>: {point.y}'
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
            series: [{
                name: 'Order Type',
                colorByPoint: true,
                data: []
            }]
        },
        "planwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                enabled:false
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            tooltip: {
                headerFormat: '<b>Orders</b><br/>',
                pointFormat: '{point.name}: <b>{point.y}</b>'
            },
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name} :  <b>{point.percentage:.1f}%</b>'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Orders',
                colorByPoint: true,
                data: []
            }]
        },
        "orderComplete": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled:false
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                enabled: false
            },
            colors: ["#1abc9c"],
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
                crosshair: true,
                labels: {
                    rotation: 0
                }
            },
            yAxis: {
                title: {
                    text: 'Orders'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },

            series: [{
                name: 'Order completed',
                colorByPoint: true,
                data: []
            }]
        },
        "orderIntake": {
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
                enabled:false
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                enabled: false
            },
            credits: {
                enabled: false
            },
            colors: ["#00bcd4"],

            xAxis: {
                type: 'category',
                crosshair: true,
                labels: {
                    rotation: 0
                }
            },
            yAxis: {
                title: {
                    text: 'Orders'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },

            series: [{
                name: 'Order Intake',
                colorByPoint: true,
                data: []
            }]
        }
    },
    "tillDate": {
        "statuswise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Order status chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            colors: ['#75B09C', '#E87461', '#e67e22', '#27ae60', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Order Status</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>: {point.y}'
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
            series: [{
                name: 'Order Count',
                colorByPoint: true,
                data: []
            }]
        },
        "typewise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Order type chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            colors: ['#EE7674', '#F9B5AC', '#D0D6B5', '#9DBF9E', '#987284', '#E84855'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Order Type</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>: {point.y}'
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
                },
                title: {
                    text: 'Order Type',
                    enabled: false
                }
            },
            series: [{
                name: 'Order Count',
                colorByPoint: true,
                data: []
            }]
        },
        "planwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Order plan chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            tooltip: {
                headerFormat: '<b>Plans</b><br/>',
                pointFormat: '{point.name}: <b>{point.y}</b>'
            },
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name} :  <b>{point.percentage:.1f}%</b>'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Order Count',
                colorByPoint: true,
                data: []
            }]
        }
    },
    "today": {
        "statuswise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Order status chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            colors: ['#75B09C', '#E87461', '#e67e22', '#27ae60', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Order Status</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>: {point.y}'
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
            series: [{
                name: 'Order Count',
                colorByPoint: true,
                data: []
            }]
        },
        "typewise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Order type chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            colors: ['#EE7674', '#F9B5AC', '#D0D6B5', '#9DBF9E', '#987284', '#E84855'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Order Type</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>: {point.y}'
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
            series: [{
                name: 'Order Count',
                colorByPoint: true,
                data: []
            }]
        },
        "planwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Order plan chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            tooltip: {
                headerFormat: '<b>Plans</b><br/>',
                pointFormat: '{point.name}: <b>{point.y}</b>'
            },
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name} :  <b>{point.percentage:.1f}%</b>'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Orders',
                colorByPoint: true,
                data: []
            }]
        }
    },
    "daily": {
        "statuswise": {
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
                filename: 'Order status chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#75B09C', '#E87461', '#e67e22', '#27ae60', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b'],
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
                    text: 'Orders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: []
        },
        "planwise": {
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
                filename: 'Order plan chart'
            },
            legend: {
                enabled: false,
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#685369', '#8A4F7D', '#EFA48B'],
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
                    text: 'Orders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                formatter: planwiseStackTooltipFormatter
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: []
        },
        "orderComplete": {
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
                filename: 'Order completion trend chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#1abc9c', '#fdb94e'],
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
                    text: 'Orders',
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
        },
        "orderIntake": {
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
                filename: 'Order intake trend chart'
            },
            credits: false,
            colors: ['#00bcd4', '#fdb94e'],
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
                    text: 'Orders',
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
        }
    },
    "weekly": {
        "statuswise": {
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
                filename: 'Order status chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#75B09C', '#E87461', '#e67e22', '#27ae60', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b'],
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
                    text: 'Orders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: []
        },
        "planwise": {
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
                filename: 'Order plan chart'
            },
            legend: {
                enabled: false,
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#685369', '#8A4F7D', '#EFA48B'],
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
                    text: 'Orders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                formatter: planwiseStackTooltipFormatter
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: []
        },
        "orderComplete": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            credits: {
                enabled: false
            },
            exporting: {
                filename: 'Order completion chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                enabled: false
            },
            colors: ["#1abc9c"],
            title: {
                text: ''
            },
            xAxis: [{
                type: 'category',
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Week',
                    enabled: false
                }
            }],
            yAxis: {
                title: {
                    text: 'Orders'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true
            },

            series: [{
                name: 'Order Completed',
                colorByPoint: true,
                data: []
            }]
        },
        "orderIntake": {
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
                filename: 'Order intake chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                enabled: false
            },
            credits: {
                enabled: false
            },
            colors: ["#00bcd4"],

            xAxis: [{
                type: 'category',
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Week',
                    enabled: false
                }
            }],
            yAxis: {
                title: {
                    text: 'Orders'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true
            },

            series: [{
                name: 'Order Intake',
                colorByPoint: true,
                data: []
            }]
        }
    },
    "monthly": {
        "statuswise": {
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
                filename: 'Order status chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#75B09C', '#E87461', '#e67e22', '#27ae60', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b'],
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
                    text: 'Orders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: []
        },
        "planwise": {
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
                filename: 'Order plan chart'
            },
            legend: {
                enabled: false,
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#685369', '#8A4F7D', '#EFA48B'],
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
                    text: 'Orders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                formatter: planwiseStackTooltipFormatter
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: []
        },
        "orderComplete": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            exporting: {
                filename: 'Order completion chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                enabled: false
            },
            credits: {
                enabled: false
            },
            colors: ["#1abc9c"],
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Months',
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Orders'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },

            series: [{
                name: 'Order completed',
                colorByPoint: true,
                data: []
            }]
        },
        "orderIntake": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            exporting: {
                filename: 'Order intake chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                enabled: false
            },
            credits: {
                enabled: false
            },
            colors: ["#00bcd4"],
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Months',
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Orders'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },

            series: [{
                name: 'Order Intake',
                colorByPoint: true,
                data: []
            }]
        }
    },
    "customDate": {
        "statuswise": {
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
                filename: 'Order status chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#75B09C', '#E87461', '#e67e22', '#27ae60', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b'],
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
                    text: 'Orders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: []
        },
        "planwise": {
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
                filename: 'Order plan chart'
            },
            legend: {
                enabled: false,
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#685369', '#8A4F7D', '#EFA48B'],
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
                    text: 'Orders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                formatter: planwiseStackTooltipFormatter
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: []
        },
        "orderComplete": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            exporting: {
                filename: 'Order completion chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                enabled: false
            },
            credits: {
                enabled: false
            },
            colors: ["#1abc9c"],
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
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
                title: {
                    text: 'Orders'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },

            series: [{
                name: 'Order completed',
                colorByPoint: true,
                data: []
            }]
        },
        "orderIntake": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            exporting: {
                filename: 'Order intake chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                enabled: false
            },
            credits: {
                enabled: false
            },
            colors: ["#00bcd4"],
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
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
                title: {
                    text: 'Orders'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },

            series: [{
                name: 'Order Intake',
                colorByPoint: true,
                data: []
            }]
        }
    }
}