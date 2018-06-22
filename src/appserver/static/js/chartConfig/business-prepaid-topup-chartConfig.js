// Chartconfig for the Operations Prepaid Topup
var bizPreTopupDrilldown = {
    "daily": {
        "topupVSRevenue": {
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
            legend: {
                itemDistance: 20,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            exporting: {
                filename: 'Revenue Vs Volume'
            },
            colors: ['#50bcb6', '#fdb94e'],
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
                    enabled: true,
                    text: 'Topup Count',
                },
                labels: {
                    enabled: true
                },
                opposite: true,
            }],
            tooltip: {
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>'
            },
            series: [{
                name: 'Revenue',
                type: 'column',
                data: [],
                tooltip: {
                    valuePrefix: '$'
                },
                marker: {
                    lineWidth: 2,
                    lineColor: '#f7a35c',
                    fillColor: 'white'
                }
            }, {
                name: 'Topups',
                type: 'spline',
                yAxis: 1,
                data: [],
                tooltip: {
                    valueSuffix: ' '
                }

            }]
        },
        "topupChannel": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
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
                filename: 'Volume by Channel'
            },
            colors: ['#605770', '#f39c12', '#7f8c8d', '#27ae60', '#34495e'],
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
                title: {
                    text: 'Topup Count'
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            series: []
        },
        "topupRevByChannel": {
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
                filename: 'Revenue by Channel'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
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
                    text: 'Revenue ($)'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>${point.y:,.0f}</b> of total<br/>'
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
        }
    },
    "weekly": {
        "topupVSRevenue": {
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
            legend: {
                itemDistance: 20,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            exporting: {
                filename: 'Revenue Vs Volume'
            },
            colors: ['#50bcb6', '#fdb94e'],
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
                    enabled: true,
                    text: 'Topup Count',
                },
                labels: {
                    enabled: true
                },
                opposite: true,
            }],
            tooltip: {
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>'
            },
            series: [{
                name: 'Revenue',
                type: 'column',
                data: [],
                tooltip: {
                    valuePrefix: '$'
                },
                marker: {
                    lineWidth: 2,
                    lineColor: '#f7a35c',
                    fillColor: 'white'
                }
            }, {
                name: 'Topups',
                type: 'spline',
                yAxis: 1,
                data: [],
                tooltip: {
                    valueSuffix: ' '
                }

            }]
        },
        "topupChannel": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            credits: false,
            colors: ['#605770', '#f39c12', '#7f8c8d', '#27ae60', '#34495e'],
            exporting: {
                filename: 'Volume by Channel'
            },
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Week',
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Topup Count'
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            series: []
        },
        "topupRevByChannel": {
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
                filename: 'Revenue by Channel'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Week',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Revenue ($)'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>${point.y:,.0f}</b> of total<br/>'
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
        }
    },
    "monthly": {
        "topupVSRevenue": {
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
            legend: {
                itemDistance: 20,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            exporting: {
                filename: 'Revenue Vs Volume'
            },
            colors: ['#50bcb6', '#fdb94e'],
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
                    enabled: true,
                    text: 'Topup Count',
                },
                labels: {
                    enabled: true
                },
                opposite: true,
            }],
            tooltip: {
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>'
            },
            series: [{
                name: 'Revenue',
                type: 'column',
                data: [],
                tooltip: {
                    valuePrefix: '$'
                },
                marker: {
                    lineWidth: 2,
                    lineColor: '#f7a35c',
                    fillColor: 'white'
                }
            }, {
                name: 'Topups',
                type: 'spline',
                yAxis: 1,
                data: [],
                tooltip: {
                    valueSuffix: ' '
                }

            }]
        },
        "topupChannel": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            credits: false,
            colors: ['#605770', '#f39c12', '#7f8c8d', '#27ae60', '#34495e'],
            exporting: {
                filename: 'Volume by Channel'
            },
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Month',
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Topup Count'
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            series: []
        },
        "topupRevByChannel": {
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
                filename: 'Revenue by Channel'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Month',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Revenue ($)'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>${point.y:,.0f}</b> of total<br/>'
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
        }
    },
    "customDate": {
        "topupVSRevenue": {
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
            legend: {
                itemDistance: 20,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            exporting: {
                filename: 'Revenue Vs Volume'
            },
            colors: ['#50bcb6', '#fdb94e'],
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
                    enabled: true,
                    text: 'Topup Count',
                },
                labels: {
                    enabled: true
                },
                opposite: true,
            }],
            tooltip: {
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>'
            },
            series: [{
                name: 'Revenue',
                type: 'column',
                data: [],
                tooltip: {
                    valuePrefix: '$'
                },
                marker: {
                    lineWidth: 2,
                    lineColor: '#f7a35c',
                    fillColor: 'white'
                }
            }, {
                name: 'Topups',
                type: 'spline',
                yAxis: 1,
                data: [],
                tooltip: {
                    valueSuffix: ' '
                }

            }]
        },
        "topupChannel": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            credits: false,
            colors: ['#605770', '#f39c12', '#7f8c8d', '#27ae60', '#34495e'],
            exporting: {
                filename: 'Volume by Channel'
            },
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
                title: {
                    text: 'Topup Count'
                }
            },
            tooltip: {
                useHTML: true,
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            series: []
        },
        "topupRevByChannel": {
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
                filename: 'Revenue by Channel'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
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
                    text: 'Revenue ($)'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>${point.y:,.0f}</b> of total<br/>'
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
        }
    }
}