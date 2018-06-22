var bizPreSub = {
	"tillDate": {
		"statuswiseSDP1": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP1 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    ''
                ],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Subscriber',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<b>Subscriber Count</b><br/>',
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.0f}'
                    }
                }
            },
            series: []
        },
        "statuswiseSDP2": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP2 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    ''
                ],
                crosshair: true,
                labels: {
                    rotation: 0
                },
                title: {
                    text: 'Subscriber',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<b>Subscriber Count</b><br/>',
                pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.0f}'
                    }
                }
            },
            series: []
        },
		"planwise": {
			colors: ['#f79a3e', '#69c5e4', '#ffc168', '#9dbc7a', '#ff7243', '#FBB02D'],
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
			credits: false,
			exporting: {
				filename: 'Subscriber plan chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {point.name}: <b>{point.y:,.0f}</b><br/>'
			},
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
			series: []
		},
		"subLifecycle": {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: ''
            },
            credits:false,
            colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
            exporting: {
                filename: 'Subscriber lifecycle Chart'
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br/><br/>',
                pointFormat: '<span style="color:{point.color}"> ● </span> {point.name}: <b>{point.y:,.0f}</b><br/>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name} : {point.percentage:.1f}%'
                    }
                }
            },
            series: [{
                title: {
                    text: 'country',
                    enabled: false
                },
                type: 'pie',
                name: 'Subscribers',
                data: []
            }]
        },
		"countrywise": {
			chart: {
				type: 'pie',
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
				filename: 'Country wise chart'
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {point.name}: <b>{point.y:,.0f}</b><br/>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					depth: 35,
					dataLabels: {
						enabled: true,
						format: '{point.name} : {point.percentage:.1f}%'
					}
				}
			},
			series: [{
				title: {
					text: 'Country',
					enabled: false
				},
				type: 'pie',
				name: 'Subscriber Countrywise Split',
				data: []
			}]
		},
		"loyalty": {
			chart: {
				type: 'pie',
				options3d: {
					enabled: true,
					alpha: 45
				},
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
				filename: 'Subscriber loyality chart'
			},
			colors: ['#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#8eb55c'],
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {point.name}: <b>{point.y:,.0f}</b><br/>'
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			series: [{
				name: 'Subscribers Loyality',
				data: [],
				dataLabels: {
					format: '{point.name}: {point.percentage:.1f}%',
					enabled: true
				}
			}]
		},
		"exitReason": {
			chart: {
				type: 'pie',
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
				filename: 'Subscriber exit reason chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {point.name}: <b>{point.y:,.0f}</b><br/>'
			},
			colors: ['#FF8066', '#FF9966', '#FFB366', '#996A7C', '#FFCC80', '#5A5353'],
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					depth: 35,
					dataLabels: {
						enabled: true,
						format: '{point.name} : {point.percentage:.1f}%'
					},
					showInLegend: true
				}
			},
			series: [{
				title: {
					text: 'country',
					enabled: false
				},
				type: 'pie',
				name: 'Subscribers',
				data: []
			}]
		},
		"subscriberTrend": {
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
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			exporting: {
				filename: 'Subscriber Trend chart'
			},
			credits: false,
			colors: ['#7986CB', '#fdb94e'],
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
					format:'',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'Active Subscribers',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title: {
					text: 'Usage Subscribers'
				},
				labels: {
					format: '',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				opposite: true,
			}],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			series: [{
				name: 'Usage Subscribers',
				type: 'column',
				yAxis: 1,
				data: []
			}, {
				name: 'Active Subscribers',
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
	"daily": {
		"statuswiseSDP1": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP1 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0,
					formatter: dateFormatter
                },
                title: {
                    text: 'Subscriber',
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking:'normal',
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.0f}'
                    }
                }
            },
            series: []
        },
        "statuswiseSDP2": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP2 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0,
					formatter: dateFormatter
                },
                title: {
                    text: 'Subscriber',
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking:'normal',
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.0f}'
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
			credits: false,
			exporting: {
				filename: 'Subscriber plan chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
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
					text: 'Subscribers'
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
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b> of total<br/>'
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
		"subLifecycle": {
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
                filename: 'Subscriber lifecycle Chart'
            },
            colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
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
                    text: 'Subscribers'
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
                itemDistance: 10,
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
            series: [{
                name: '30 Days',
                data: []
            }, {
                name: '60 Days',
                data: []
            }, {
                name: '90 Days',
                data: []
            }]
        },
		"countrywise": {
			chart: {
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
				filename: 'Country wise chart'
			},
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9', '#75B9BE'],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0,
					formatter: dateFormatter
				}
			},
			yAxis: {
				title: {
					text: 'Subscribers'
				}
			},
			series: []
		},
		"subscriberTrend": {
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
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			exporting: {
				filename: 'Subscriber Trend chart'
			},
			credits: false,
			colors: ['#7986CB', '#fdb94e'],
			xAxis: [{
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
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					format:'',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'Active Subscribers',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title: {
					text: 'Usage Subscribers'
				},
				labels: {
					format: '',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				opposite: true,
			}],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			series: [{
				name: 'Usage Subscribers',
				type: 'column',
				yAxis: 1,
				data: []
			}, {
				name: 'Active Subscribers',
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
		"statuswiseSDP1": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP1 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0,
					formatter: dateFormatter
                },
                title: {
                    text: 'Subscriber',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking:'normal',
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.0f}'
                    }
                }
            },
            series: []
        },
        "statuswiseSDP2": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP2 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0,
					formatter: dateFormatter
                },
                title: {
                    text: 'Subscriber',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking:'normal',
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.0f}'
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
			credits: false,
			exporting: {
				filename: 'Subscriber plan chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
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
					text: 'Subscribers'
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
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b> of total<br/>'
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
		"subLifecycle": {
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
                filename: 'Subscriber lifecycle Chart'
            },
            colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
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
                    text: 'Subscribers'
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
                itemDistance: 10,
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
            series: [{
                name: '30 Days',
                data: []
            }, {
                name: '60 Days',
                data: []
            }, {
                name: '90 Days',
                data: []
            }]
        },
		"countrywise": {
			chart: {
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
				filename: 'Country wise chart'
			},
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9', '#75B9BE'],
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0,
					formatter: dateFormatter
				}
			},
			yAxis: {
				title: {
					text: 'Subscribers'
				}
			},
			series: []
		},
		"subscriberTrend": {
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
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			exporting: {
				filename: 'Subscriber Trend chart'
			},
			credits: false,
			colors: ['#7986CB', '#fdb94e'],
			xAxis: [{
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0,
					formatter: dateFormatter
				},
				title: {
					text: 'Weeks',
					enabled: false
				}
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					format:'',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'Active Subscribers',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title: {
					text: 'Usage Subscribers'
				},
				labels: {
					format: '',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				opposite: true,
			}],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			series: [{
				name: 'Usage Subscribers',
				type: 'column',
				yAxis: 1,
				data: []
			}, {
				name: 'Active Subscribers',
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
	"monthly": {
		"statuswiseSDP1": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP1 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
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
                min: 0,
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking:'normal',
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.0f}'
                    }
                }
            },
            series: []
        },
        "statuswiseSDP2": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP2 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
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
                min: 0,
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking:'normal',
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.0f}'
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
			credits: false,
			exporting: {
				filename: 'Subscriber plan chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
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
					text: 'Subscribers'
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
				itemDistance: 10,
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
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b> of total<br/>'
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
		"subLifecycle": {
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
                filename: 'Subscriber lifecycle Chart'
            },
            colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
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
                    text: 'Subscribers'
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
                itemDistance: 10,
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
		"countrywise": {
			chart: {
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
				filename: 'Country wise chart'
			},
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9', '#75B9BE'],
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0
				}
			},
			yAxis: {
				title: {
					text: 'Subscribers'
				}
			},
			series: []
		},
		"subscriberTrend": {
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
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			exporting: {
				filename: 'Subscriber Trend chart'
			},
			credits: false,
			colors: ['#7986CB', '#fdb94e'],
			xAxis: [{
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0
				},
				title: {
					text: 'Months',
					enabled: false
				}
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					format:'',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'Active Subscribers',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title: {
					text: 'Usage Subscribers'
				},
				labels: {
					format: '',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				opposite: true,
			}],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			series: [{
				name: 'Usage Subscribers',
				type: 'column',
				yAxis: 1,
				data: []
			}, {
				name: 'Active Subscribers',
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
	"customDate": {
		"statuswiseSDP1": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP1 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0,
					formatter: dateFormatter
                },
                title: {
                    text: 'Subscriber',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking:'normal',
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.0f}'
                    }
                }
            },
            series: []
        },
        "statuswiseSDP2": {
            chart: {
                type: 'column',
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10
            },
            colors: ['#56c1ab', '#fdb94e', '#f47721', '#e04646'],
            title: {
                text: ''
            },
            credits: false,
            exporting: {
                filename: 'Subscriber SDP2 status chart'
            },
            legend: {
              itemDistance: 10,
              padding: 0,
              itemMarginTop: 4,
              itemMarginBottom: 2
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                crosshair: true,
                labels: {
                    rotation: 0,
					formatter: dateFormatter
                },
                title: {
                    text: 'Subscriber',
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Subscribers'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking:'normal',
                    borderWidth: 0
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.0f}'
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
			credits: false,
			exporting: {
				filename: 'Subscriber plan chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B', '#685369'],
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
					text: 'Subscribers'
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
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b> of total<br/>'
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
			series: [{
				name: 'Large World Plan',
				data: [180000, 185000, 186000, 170000, 200000, 195000, 185000]
			}, {
				name: 'Large Local 1000Mins',
				data: [320000, 105000, 340000, 310000, 315000, 260000, 310000]
			}, {
				name: 'Large 1GB Data',
				data: [268000, 162000, 282000, 240000, 290000, 210000, 240000]
			}, {
				name: 'Large 5GB Data',
				data: [160000, 150000, 160000, 147000, 126000, 170000, 180000]
			}, {
				name: 'Large Local 500Mins',
				data: [108000, 150000, 101000, 124000, 165000, 165000, 125000]
			}, {
				name: 'Others',
				data: [108000, 150000, 101000, 124000, 165000, 120000, 140000]
			}]
		},
		"subLifecycle": {
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
                filename: 'Subscriber lifecycle Chart'
            },
            colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
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
                    text: 'Subscribers'
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
                itemDistance: 10,
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
		"countrywise": {
			chart: {
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
				filename: 'Country wise chart'
			},
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9', '#75B9BE'],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0,
					formatter: dateFormatter
				}
			},
			yAxis: {
				title: {
					text: 'Subscribers'
				}
			},
			series: []
		},
		"subscriberTrend": {
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
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			exporting: {
				filename: 'Subscriber Trend chart'
			},
			credits: false,
			colors: ['#7986CB', '#fdb94e'],
			xAxis: [{
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
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					format:'',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'Active Subscribers',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title: {
					text: 'Usage Subscribers'
				},
				labels: {
					format: '',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				opposite: true,
			}],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			series: [{
				name: 'Usage Subscribers',
				type: 'column',
				yAxis: 1,
				data: []
			}, {
				name: 'Active Subscribers',
				type: 'spline',
				data: [],
				marker: {
					lineWidth: 2,
					lineColor: '#f7a35c',
					fillColor: 'white'
				}
			}]
		}
	}
}