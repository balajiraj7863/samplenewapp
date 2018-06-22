// Make monochrome colors
var monochromeColors = (function () {
    var colors = [],
        base = '#091540',
        i;
    for (i = 0; i < 16; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 4) / 16).get());
    }
    return colors.reverse();
}());
// Chartconfig for the Operations Prepaid Topup
var opsPreTopupDrilldown = {
    "emptyDataConfig": {
        "topup": {
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
            title: {
                text: ''
            },
            exporting: {
                filename: 'Volume - Channel wise'
            },
            legend: {
                itemDistance: 20,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            colors: ['#F7C4A5', '#E7A977', '#9E7682', '#605770', '#4D4861', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Topup</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            legend: {
                itemDistance: 20,
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Topup',
                colorByPoint: true,
                data: []
            }]
        },
        "failureReason": {
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
            title: {
                text: ''
            },
            exporting: {
                filename: 'Failure Reason chart'
            },
            credits: false,
            colors: ['#e67e22', '#d35400', '#f39c12', '#e74c3c', '#34495e', '#c0392b', '#7f8c8d'],
            tooltip: {
                headerFormat: '<b>Failure Reasons</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            legend: {
                itemDistance: 20,
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Failure Reasons',
                colorByPoint: true,
                data: []
            }]
        },
        "autoRenewalStatus": {
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
            title: {
                text: ''
            },
            exporting: {
                filename: 'Auto renewal chart'
            },
            colors: ['#8ec06c', '#e66760'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Auto Renewal</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            legend: {
                itemDistance: 20,
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Auto renewal',
                colorByPoint: true,
                data: []
            }]
        },
        "planwise": {
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
                filename: 'Plan purchase chart'
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
                    text: 'Plans Purchased'
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
                headerFormat: '<span style="font-size:11px"><b>{series.name}</b></span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },
            series: [{
                name: 'Plan Purchase',
                colorByPoint: true,
                data: []
            }]
        },
        "topupCountrywise": {
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
            colors: ['#3197d6', '#436f8e', '#5cc3e8', '#79ceb8', '#e95f5c', '#33cc99', '#2facb2'],
            exporting: {
                filename: 'Volume - Country wise'
            },
            title: {
                text: ''
            },
            credits: false,
            tooltip: {
                headerFormat: '<b>Topup</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            legend: {
                itemDistance: 20,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },

            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}:<br><b>{point.percentage:.1f} %</b>'
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Topup',
                data: []
            }]
        }
    },
    "previousDay": {
        "topup": {
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
            title: {
                text: ''
            },
            exporting: {
                filename: 'Topup chart'
            },
            legend: {
                itemDistance: 20,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            colors: ['#F7C4A5', '#E7A977', '#9E7682', '#605770', '#4D4861', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Topup</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            legend: {
                itemDistance: 20,
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Topup',
                colorByPoint: true,
                data: []
            }]
        },
        "failureReason": {
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
            title: {
                text: ''
            },
            exporting: {
                filename: 'Failure Reason chart'
            },
            credits: false,
            colors: ['#e67e22', '#d35400', '#f39c12', '#e74c3c', '#34495e', '#c0392b', '#7f8c8d'],
            tooltip: {
                headerFormat: '<b>Failure Reasons</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            legend: {
                itemDistance: 20,
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Failure Reasons',
                colorByPoint: true,
                data: []
            }]
        },
        "autoRenewalStatus": {
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
            title: {
                text: ''
            },
            exporting: {
                filename: 'Auto renewal chart'
            },
            colors: ['#8ec06c', '#e66760'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Auto Renewal</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            legend: {
                itemDistance: 20,
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Auto renewal',
                colorByPoint: true,
                data: []
            }]
        },
        "planwise": {
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
                filename: 'Plan purchase chart'
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
                    text: 'Plans Purchased'
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
                headerFormat: '<span style="font-size:11px"><b>{series.name}</b></span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
            },
            series: [{
                name: 'Plan Purchase',
                colorByPoint: true,
                data: []
            }]
        },
        "topupCountrywise": {
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
            colors: ['#3197d6', '#436f8e', '#5cc3e8', '#79ceb8', '#e95f5c', '#33cc99', '#2facb2'],
            exporting: {
                filename: 'Topup countrywise chart'
            },
            title: {
                text: ''
            },
            credits: false,
            tooltip: {
                headerFormat: '<b>Topup</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            legend: {
                itemDistance: 20,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },

            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}:<br><b>{point.percentage:.1f} %</b>'
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Topup',
                data: []
            }]
        }
    },
    "daily": {
        "topup": {
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
                filename: 'Volume - Channel wise'
            },
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
        "failureReason": {
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
            colors: ['#e67e22', '#d35400', '#f39c12', '#e74c3c', '#34495e', '#c0392b', '#7f8c8d'],
            exporting: {
                filename: 'Failure reasons chart'
            },
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
                    text: 'Failure Counts'
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
        "autoRenewalStatus": {
            chart: {
                type: 'column',
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
            legend: {
                itemDistance: 4,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            colors: ['#8ec06c', '#e66760'],
            exporting: {
                filename: 'Auto renewal chart'
            },
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
                    text: 'Success / Failures'
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                shared: true
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
                filename: 'Plan purchase chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
                    text: 'Plan Purchased'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b> of total<br/>'
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
        "topupCountrywise": {
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
                filename: 'Volume - Country wise'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: monochromeColors,
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
                    text: 'Topup Count'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b> of total<br/>'
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
        "topup": {
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
                filename: 'Volume - Channel wise'
            },
            xAxis: {
                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
        "failureReason": {
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
            colors: ['#e67e22', '#d35400', '#f39c12', '#e74c3c', '#34495e', '#c0392b', '#7f8c8d'],
            exporting: {
                filename: 'Failure reasons chart'
            },
            xAxis: {
                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
                    text: 'Failure Counts'
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
        "autoRenewalStatus": {
            chart: {
                type: 'column',
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
            legend: {
                itemDistance: 4,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            colors: ['#8ec06c', '#e66760'],
            exporting: {
                filename: 'Auto renewal chart'
            },
            xAxis: {
                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
                    text: 'Success / Failures'
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                shared: true
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
                filename: 'Plan purchase chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            xAxis: {
                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
                    text: 'Plan Purchased'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b> of total<br/>'
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
        "topupCountrywise": {
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
                filename: 'Volume - Country wise'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: monochromeColors,
            xAxis: {
                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
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
                    text: 'Topup Count'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b> of total<br/>'
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
        "topup": {
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
                filename: 'Volume - Channel wise'
            },
            xAxis: {
                categories: ['Oct-2017', 'Nov-2017', 'Dec-2017', 'Jan-2018', 'Feb-2018', 'Mar-2018'],
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
        "failureReason": {
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
            colors: ['#e67e22', '#d35400', '#f39c12', '#e74c3c', '#34495e', '#c0392b', '#7f8c8d'],
            exporting: {
                filename: 'Failure reasons chart'
            },
            xAxis: {
                categories: ['Oct-2017', 'Nov-2017', 'Dec-2017', 'Jan-2018', 'Feb-2018', 'Mar-2018'],
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
                    text: 'Failure Counts'
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
        "autoRenewalStatus": {
            chart: {
                type: 'column',
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
            legend: {
                itemDistance: 4,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            colors: ['#8ec06c', '#e66760'],
            exporting: {
                filename: 'Auto renewal chart'
            },
            xAxis: {
                categories: ['Oct-2017', 'Nov-2017', 'Dec-2017', 'Jan-2018', 'Feb-2018', 'Mar-2018'],
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
                    text: 'Success / Failures'
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                shared: true
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
                filename: 'Plan purchase chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            xAxis: {
                categories: ['Oct-2017', 'Nov-2017', 'Dec-2017', 'Jan-2018', 'Feb-2018', 'Mar-2018'],
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
                    text: 'Plan Purchased'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b> of total<br/>'
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
        "topupCountrywise": {
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
                filename: 'Volume - Country wise'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: monochromeColors,
            xAxis: {
                categories: ['Oct-2017', 'Nov-2017', 'Dec-2017', 'Jan-2018', 'Feb-2018', 'Mar-2018'],
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
                    text: 'Topup Count'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b> of total<br/>'
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
        "topup": {
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
                filename: 'Volume - Channel wise'
            },
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
        "failureReason": {
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
            colors: ['#e67e22', '#d35400', '#f39c12', '#e74c3c', '#34495e', '#c0392b', '#7f8c8d'],
            exporting: {
                filename: 'Failure reasons chart'
            },
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
                    text: 'Failure Counts'
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
        "autoRenewalStatus": {
            chart: {
                type: 'column',
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
            legend: {
                itemDistance: 4,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            colors: ['#8ec06c', '#e66760'],
            exporting: {
                filename: 'Auto renewal chart'
            },
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
                    text: 'Success / Failures'
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                shared: true
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
                filename: 'Plan purchase chart'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
                    text: 'Plan Purchased'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b> of total<br/>'
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
        "topupCountrywise": {
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
                filename: 'Volume - Country wise'
            },
            legend: {
                itemDistance: 16,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0
            },
            credits: false,
            colors: monochromeColors,
            xAxis: {
                categories: ['04/02/2018', '04/03/2018', '04/04/2018', '04/05/2018', '04/06/2018', '04/07/2018', '04/08/2018'],
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
                    text: 'Topup Count'
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
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b> of total<br/>'
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