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
var opsIncPostDrilldown = {
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
                filename: 'Incident status chart'
            },
            colors: ['#3498db', '#f1c40f', '#e67e22', '#d35400', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
            credits: false,
            tooltip: {
                headerFormat: 'Incident Status<br/>',
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
            series: [{
                name: 'Incident Status',
                colorByPoint: true,
                data: []
            }]
        },
        "prioritywise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident prioritywise chart'
            },
            tooltip: {
                headerFormat: 'Incident Status<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
            },
            credits: {
                enabled: false
            },
            colors: ['#ff0000', '#ef5956', '#f69653', '#fdb94e'],
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: 50,
                        style: {
                            fontWeight: 'bold'
                        },
                        enabled: true,
                        format: '{point.name} : <b>{point.y}<b>'
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Incident Priority',
                innerSize: '40%',
                data: [],
                point: {
                    events: {
                        click: function (event) {
                            $('#incidentTableModal').modal('show');
                        }
                    }
                }
            }]
        },
        "systemwise": {
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
                filename: 'Incident systemwise chart'
            },
            credits: false,
            tooltip: {
                headerFormat: 'Incident Systemwise<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: monochromeColors,
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
                name: 'Incidents',
                colorByPoint: true,
                data: []
            }]
        },
        "queuewise": {
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
                filename: 'Incident queuewise chart'
            },
            colors: ['#5688C7', '#436f8e', '#2980b9'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Incident Queuewise</b><br/>',
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
            series: [{
                name: 'Incident queuewise',
                colorByPoint: true,
                data: []
            }]
        },
        "avgResolution": {
            chart: {
                zoomType: 'xy',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#8491A3', '#E16036'],
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident average resolution chart'
            },
            legend: {
                itemDistance: 10,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            xAxis: [{
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Source Systems',
                    enabled: false
                }
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '',
                },
                title: {
                    text: 'Incidents Resolved',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
            }, { // Secondary yAxis
                title: {
                    text: 'Time Taken(Days)',
                    y: 10
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                formatter: avgResTimeTooltipFormatter
            },
            series: [{
                name: 'No of Tickets Resolved',
                // colors: ['#039be5'],                
                type: 'column',
                data: []
            }, {
                name: 'Avg. resolution time(in days)',
                type: 'spline',
                yAxis: 1,
                // colors: ['#b3dcff'],        
                data: []
            }],
            navigation: {
                buttonOptions: {
                    verticalAlign: top,
                    y: -10
                }
            }
        },
        "incidentTrend": {
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
                filename: 'Incident intake chart'
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
                    text: 'Incidents'
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
                name: 'Incident Intake',
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
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident status chart'
            },
            colors: ['#3498db', '#f1c40f', '#e67e22', '#d35400', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Incident Status</b><br/>',
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
            series: [{
                name: 'Incidents',
                colorByPoint: true,
                data: []
            }]
        },
        "prioritywise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident prioritywise chart'
            },
            tooltip: {
                headerFormat: '<b>Incidents Priority</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
            },
            credits: {
                enabled: false
            },
            colors: ['#ff0000', '#ef5956', '#f69653', '#fdb94e'],
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        distance: 50,
                        style: {
                            fontWeight: 'bold'
                        },
                        enabled: true,
                        format: '{point.name} : <b>{point.percentage:.1f} %<b>'
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Incident Priority',
                innerSize: '40%',
                data: [
                    ['P1', 0],
                    ['P2', 0],
                    ['P3', 0],
                    ['P4', 0]
                ],
                point: {
                    events: {
                        click: function (event) {
                            if (this.y > 0) {
                                IncidentOnclickPriority(this.name);
                            }
                        }
                    }
                }
            }]
        },
        "systemwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident systemwise chart'
            },
            credits: false,
            tooltip: {
                headerFormat: '<b>Incident Systemwise</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: monochromeColors,
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
                name: 'Incidents',
                colorByPoint: true,
                data: [],
                point: {
                    events: {
                        click: function (event) {
                            if (this.y > 0) {
                                IncidentOnclick(this.name);
                            }
                        }
                    }
                }
            }]
        },
        "queuewise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident queuewise chart'
            },
            colors: ['#5688C7', '#436f8e', '#2980b9'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Incident Queuewise</b><br/>',
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
            series: [{
                name: 'Incidents',
                colorByPoint: true,
                data: []
            }]
        },
        "avgResolution": {
            chart: {
                zoomType: 'xy',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#8491A3', '#E16036'],
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident average resolution chart'
            },
            legend: {
                itemDistance: 10,
                padding: 0,
                itemMarginTop: 4,
                itemMarginBottom: 2
            },
            credits: false,
            xAxis: [{
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Source Systems',
                    enabled: false
                }
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '',
                },
                title: {
                    text: 'Incidents Resolved',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
            }, { // Secondary yAxis
                title: {
                    text: 'Time Taken(Days)',
                    y: 10
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                formatter: avgResTimeTooltipFormatter
            },
            series: [{
                name: 'No of Tickets Resolved',
                // colors: ['#039be5'],                
                type: 'column',
                data: []
            }, {
                name: 'Avg. resolution time(in days)',
                type: 'spline',
                yAxis: 1,
                // colors: ['#b3dcff'],        
                data: []
            }],
            navigation: {
                buttonOptions: {
                    verticalAlign: top,
                    y: -10
                }
            }
        }
    },
    "today": {
        "statuswise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident status chart'
            },
            colors: ['#3498db', '#f1c40f', '#e67e22', '#d35400', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
            credits: false,
            tooltip: {
                headerFormat: '<b>Incident Status</b><br/>',
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
            series: [{
                name: 'Incidents',
                colorByPoint: true,
                data: []
            }]
        },
        "prioritywise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident prioritywise chart'
            },
            tooltip: {
                headerFormat: 'Incident Priority<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
            },
            credits: {
                enabled: false
            },
            colors: ['#ff0000', '#ef5956', '#f69653', '#fdb94e'],
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        distance: 50,
                        style: {
                            fontWeight: 'bold'
                        },
                        enabled: true,
                        format: '{point.name} : <b>{point.percentage:.1f} %<b>'
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Incident Priority',
                innerSize: '40%',
                data: [
                    ['P1', 0],
                    ['P2', 0],
                    ['P3', 0],
                    ['P4', 0]
                ],
                point: {
                    events: {
                        click: function (event) {
                            $('#incidentTableModal').modal('show');
                        }
                    }
                }
            }]
        },
        "systemwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident systemwise chart'
            },
            credits: false,
            tooltip: {
                headerFormat: 'Incident Systemwise<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: monochromeColors,
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
                name: 'Incidents',
                colorByPoint: true,
                data: [],
                point: {
                    events: {
                        click: function (event) {
                            if (this.y > 0) {
                                IncidentOnclick(this.name);
                            }
                        }
                    }
                }
            }]
        },
        "queuewise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident queuewise chart'
            },
            colors: ['#5688C7', '#436f8e', '#2980b9'],
            credits: false,
            tooltip: {
                headerFormat: '<b>{point.name}</b><br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.help}</span></b>: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y}',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: false
                }
            },
            series: [{
                name: 'Incidents',
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
                filename: 'Incident status chart'
            },
            credits: false,
            colors: ['#3498db', '#f1c40f', '#e67e22', '#d35400', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
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
                    text: 'Incidents'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                itemDistance: 20,
                padding: 2,
                itemMarginTop: 4,
                itemMarginBottom: 2,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                shadow: false
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
        "prioritywise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident prioritywise chart'
            },
            tooltip: {
                headerFormat: 'Incident Status<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
            },
            credits: {
                enabled: false
            },
            colors: ['#ff0000', '#ef5956', '#f69653', '#fdb94e'],
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        distance: 50,
                        style: {
                            fontWeight: 'bold'
                        },
                        enabled: true,
                        format: '{point.name} : <b>{point.percentage:.1f} %<b>'
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Incident Priority',
                innerSize: '40%',
                data: [
                    ['P1', 0],
                    ['P2', 0],
                    ['P3', 0],
                    ['P4', 0]
                ],
                point: {
                    events: {
                        click: function (event) {
                            $('#incidentTableModal').modal('show');
                        }
                    }
                }
            }]
        },
        "systemwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident systemwise chart'
            },
            credits: false,
            tooltip: {
                headerFormat: 'Incident Systemwise<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: monochromeColors,
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
                name: 'Incidents',
                colorByPoint: true,
                data: [],
                point: {
                    events: {
                        click: function (event) {
                            if (this.y > 0) {
                                IncidentOnclick(this.name);
                            }
                        }
                    }
                }
            }]
        },
        "queuewise": {
            chart: {
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident queuewise chart'
            },
            credits: false,
            colors: ['#5688C7', '#436f8e', '#2980b9'],
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                }
            },
            yAxis: {
                title: {
                    text: 'Incidents'
                }
            },
            tooltip: {
                useHTML: true,
                shared: true
            },
            series: []
        },
        "incidentTrend": {
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
                filename: 'Incident intake chart'
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
                    text: 'Incident',
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
                formatter: eval("incidentChartTooltip"),
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
                filename: 'Incident status chart'
            },
            credits: false,
            colors: ['#3498db', '#f1c40f', '#e67e22', '#d35400', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
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
                    text: 'Incidents'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                itemDistance: 20,
                padding: 2,
                itemMarginTop: 4,
                itemMarginBottom: 2,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                shadow: false
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
        "prioritywise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident prioritywise chart'
            },
            tooltip: {
                headerFormat: 'Incident Status<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
            },
            credits: {
                enabled: false
            },
            colors: ['#ff0000', '#ef5956', '#f69653', '#fdb94e'],
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        distance: 50,
                        style: {
                            fontWeight: 'bold'
                        },
                        enabled: true,
                        format: '{point.name} : <b>{point.percentage:.1f} %<b>'
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Incident Priority',
                innerSize: '40%',
                data: [
                    ['P1', 0],
                    ['P2', 0],
                    ['P3', 0],
                    ['P4', 0]
                ],
                point: {
                    events: {
                        click: function (event) {
                            $('#incidentTableModal').modal('show');
                        }
                    }
                }
            }]
        },
        "systemwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident systemwise chart'
            },
            credits: false,
            tooltip: {
                headerFormat: 'Incident Systemwise<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: monochromeColors,
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
                name: 'Incidents',
                colorByPoint: true,
                data: [],
                point: {
                    events: {
                        click: function (event) {
                            if (this.y > 0) {
                                IncidentOnclick(this.name);
                            }
                        }
                    }
                }
            }]
        },
        "queuewise": {
            chart: {
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident queuewise chart'
            },
            credits: false,
            colors: ['#3498db', '#f1c40f', '#e67e22'],
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                }
            },
            yAxis: {
                title: {
                    text: 'Incidents'
                }
            },
            tooltip: {
                useHTML: true,
                shared: true
            },
            series: []
        },
        "incidentTrend": {
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
                filename: 'Incident intake chart'
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
                }
            }],
            yAxis: {
                title: {
                    text: 'Incidents'
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
                name: 'Incident Intake',
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
                filename: 'Incident status chart'
            },
            credits: false,
            colors: ['#3498db', '#f1c40f', '#e67e22', '#d35400', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
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
                    text: 'Incidents'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                itemDistance: 20,
                padding: 2,
                itemMarginTop: 4,
                itemMarginBottom: 2,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                shadow: false
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
        "prioritywise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident prioritywise chart'
            },
            tooltip: {
                headerFormat: 'Incident Status<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
            },
            credits: {
                enabled: false
            },
            colors: ['#ff0000', '#ef5956', '#f69653', '#fdb94e'],
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        distance: 50,
                        style: {
                            fontWeight: 'bold'
                        },
                        enabled: true,
                        format: '{point.name} : <b>{point.percentage:.1f} %<b>'
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Incident Priority',
                innerSize: '40%',
                data: [
                    ['P1', 0],
                    ['P2', 0],
                    ['P3', 0],
                    ['P4', 0]
                ],
                point: {
                    events: {
                        click: function (event) {
                            $('#incidentTableModal').modal('show');
                        }
                    }
                }
            }]
        },
        "systemwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident systemwise chart'
            },
            credits: false,
            tooltip: {
                headerFormat: 'Incident Systemwise<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: monochromeColors,
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
                name: 'Incidents',
                colorByPoint: true,
                data: [],
                point: {
                    events: {
                        click: function (event) {
                            if (this.y > 0) {
                                IncidentOnclick(this.name);
                            }
                        }
                    }
                }
            }]
        },
        "queuewise": {
            chart: {
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident queuewise chart'
            },
            credits: false,
            colors: ['#5688C7', '#436f8e', '#2980b9'],
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                }
            },
            yAxis: {
                title: {
                    text: 'Incidents'
                }
            },
            tooltip: {
                useHTML: true,
                shared: true
            },
            series: []
        },
        "incidentTrend": {
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
                filename: 'Incident intake chart'
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
                    text: 'Incidents'
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
                name: 'Incident Intake',
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
                filename: 'Incident status chart'
            },
            credits: false,
            colors: ['#3498db', '#f1c40f', '#e67e22', '#d35400', '#e74c3c', '#f39c12', '#7f8c8d', '#c0392b', '#1abc9c', '#27ae60', '#34495e'],
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
                    text: 'Incidents'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                itemDistance: 20,
                padding: 2,
                itemMarginTop: 4,
                itemMarginBottom: 2,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                shadow: false
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
        "prioritywise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident prioritywise chart'
            },
            tooltip: {
                headerFormat: 'Incident Status<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
            },
            credits: {
                enabled: false
            },
            colors: ['#ff0000', '#ef5956', '#f69653', '#fdb94e'],
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        distance: 50,
                        style: {
                            fontWeight: 'bold'
                        },
                        enabled: true,
                        format: '{point.name} : <b>{point.percentage:.1f} %<b>'
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Incident Priority',
                innerSize: '40%',
                data: [
                    ['P1', 0],
                    ['P2', 0],
                    ['P3', 0],
                    ['P4', 0]
                ],
                point: {
                    events: {
                        click: function (event) {
                            $('#incidentTableModal').modal('show');
                        }
                    }
                }
            }]
        },
        "systemwise": {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                spacingBottom: 0,
                spacingTop: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident systemwise chart'
            },
            credits: false,
            tooltip: {
                headerFormat: 'Incident Systemwise<br/>',
                pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b>:{point.y}'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: monochromeColors,
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
                name: 'Incidents',
                colorByPoint: true,
                data: [],
                point: {
                    events: {
                        click: function (event) {
                            if (this.y > 0) {
                                IncidentOnclick(this.name);
                            }
                        }
                    }
                }
            }]
        },
        "queuewise": {
            chart: {
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            title: {
                text: ''
            },
            exporting: {
                filename: 'Incident queuewise chart'
            },
            credits: false,
            colors: ['#5688C7', '#436f8e', '#2980b9'],
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0
                }
            },
            yAxis: {
                title: {
                    text: 'Incidents'
                }
            },
            tooltip: {
                useHTML: true,
                shared: true
            },
            series: []
        },
        "incidentTrend": {
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
                filename: 'Incident intake chart'
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
                    text: 'Incidents'
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
                name: 'Incident Intake',
                colorByPoint: true,
                data: []
            }]
        }
    }
}

function avgResTimeTooltipFormatter() {
    var s = '<span><b>' + this.x + '</b></span><br/>';
    var isNoData = true;
    for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].point.y > 0) {

            if (this.points[i].point.series.name == "No of Tickets Resolved") {
                s += '<span style="color:' + this.points[i].point.color + '">' +
                    this.points[i].point.series.name + '</span>: <b>' +
                    this.points[i].point.y + '</b><br/>';
                isNoData = false;
            } else {
                s += '<span style="color:' + this.points[i].point.color + '">' +
                    this.points[i].point.series.name + '</span>: <b>' +
                    this.points[i].point.y.toFixed(2) + '</b><br/>';
                isNoData = false;
            }
        }
    }
    if (isNoData) {
        s += '<span><b>$ 0.0</b></span>';
    }
    return s;
}