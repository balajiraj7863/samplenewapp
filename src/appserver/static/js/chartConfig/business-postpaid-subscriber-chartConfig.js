var bizPostSub = {
	"tillDate" : {
		"statuswise" : {
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
                filename: 'Subscriber status chart'
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
		"planwise" : {
			colors : [ '#f79a3e', '#69c5e4', '#ffc168', '#9dbc7a', '#ff7243',
					'#FBB02D' ],
			chart : {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				type : 'pie',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Planwise Subscriber Chart"
			},
			credits : false,
			tooltip : {
				pointFormat : '{series.name}: <b>{point.y}</b>'
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : true,
						format : '{point.name} :  <b>{point.percentage:.1f}%</b>'
					},
					showInLegend : true
				}
			},
			series : [ {
				title : {
					text : 'Planwise',
					enabled : false
				},
				type : 'pie',
				name : 'Subscribers',
				data : []
			} ]
		},
		"exitReason" : {
			chart : {
				type : 'pie',
				options3d : {
					enabled : true,
					alpha : 45,
					beta : 0
				}
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber - Exit Reason'
			},
			tooltip : {
				headerFormat : '<b>{series.name}</b><br/><br/>',
				pointFormat : '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b><br/>'
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					depth : 35,
					dataLabels : {
						enabled : true,
						format : '{point.name} : {point.percentage:.1f}%'
					}
				}
			},
			credits : {
				enabled : false
			},
			series : [ {
				title : {
					text : 'country',
					enabled : false
				},
				type : 'pie',
				name : 'Subscribers',
				data : []
			} ]
		},
		"countrywise" : {
			chart : {
				type : 'pie',
				options3d : {
					enabled : true,
					alpha : 45,
					beta : 0
				}
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber Countrywise  Chart'
			},
			xAxis : {
				title : {
					text : 'Date',
					enabled : false
				}
			},
			tooltip : {
				headerFormat : '<b>{series.name}</b><br/><br/>',
				pointFormat : '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b><br/>'
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					depth : 35,
					dataLabels : {
						enabled : true,
						format : '{point.name} : {point.percentage:.1f}%'
					}
				}
			},
			credits : {
				enabled : false
			},
			series : [ {
				title : {
					text : 'country',
					enabled : false
				},
				type : 'pie',
				name : 'Subscribers',
				data : []
			} ]
		},
		"subClassification" : {
			chart : {
				type : 'pie',
				options3d : {
					enabled : true,
					alpha : 45,
					beta : 0
				}
			},
			title : {
				text : ''
			},
			colors : [ '#FF595E', '#FFCA3A', '#8AC926', '#1982C4' ],
			exporting : {
				filename : 'Subscriberwise Classification'
			},
			tooltip : {
				headerFormat : '<b>{series.name}</b><br/><br/>',
				pointFormat : '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b><br/>'
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					depth : 35,
					dataLabels : {
						enabled : true,
						format : '{point.name} : {point.percentage:.1f}%'
					}
				}
			},
			credits : {
				enabled : false
			},
			series : [ {
				title : {
					text : 'country',
					enabled : false
				},
				type : 'pie',
				name : 'Subscribers',
				data : []
			} ]
		},
		"loyalty" : {
			chart : {
				type : 'pie',
				options3d : {
					enabled : true,
					alpha : 45
				},
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber - Loyalty Chart'
			},
			credits : false,
			colors : [ '#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#8eb55c' ],
			plotOptions : {
				pie : {
					innerSize : 100,
					depth : 45
				}
			},
			series : [ {
				name : 'Subscribers',
				data : [],
				dataLabels : {
					format : '{point.name}: {point.percentage:.1f}%',
					enabled : true
				}
			} ]
		},
		"monthwise" : {
			chart : {
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Monthly Wise Chart"
			},
			credits : false,
			colors : [ '#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9',
					'#75B9BE' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				}
			},
			yAxis : {
				title : {
					text : 'Subscribers Count'
				}
			},
			series : [ {
				name : 'Subscribers',
				data : []
			} ]
		}
	},
	"daily" : {
		"statuswise" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			colors : [ '#56c1ab', '#fdb94e', '#f47721', '#e04646' ],
			title : {
				text : ''
			},
			credits : {
				enabled : false
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Subscriber',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				}
			},
			tooltip : {
				headerFormat : '<span style="font-size:12px"><b>{point.x}</b></span><br>',
				shared : true,
				useHTML : true
			},
			plotOptions : {
				column : {
					pointPadding : 0.2,
					borderWidth : 0
				},
				series : {
					borderWidth : 0,
					dataLabels : {
						enabled : false,
						format : '{point.y:.0f}'
					}
				}
			},
			exporting : {
				filename : "Statuswise Subscriber Chart"
			},
			series : []
		},
		"planwise" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Planwise Subscriber View Chart"
			},
			credits : false,
			colors : [ '#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
					'#685369' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter

				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false,
				enabled : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter : planwiseStackTooltipFormatter
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"exitReason" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber Exit Reason Chart'
			},
			credits : false,
			colors : [ '#F9C784', '#FCAF58', '#FF8C42', '#E16036', '#CD5832' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"countrywise" : {
			chart : {
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Country Subscriber View Chart"
			},
			credits : false,
			colors : [ '#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9',
					'#75B9BE' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>{point.y}</b><br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"subClassification" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			credits : false,
			colors : [ '#FF595E', '#FFCA3A', '#8AC926', '#1982C4' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			exporting : {
				filename : 'Subscriberwise Classification'
			},
			series : []
		},
		"subscriberTrend" : {
			chart : {
				zoomType : 'xy'
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Subscriber Chart"
			},
			credits : false,
			colors : [ '#7986CB', '#fdb94e' ],
			xAxis : [ {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Date',
					enabled : false
				}
			} ],
			yAxis : [ { // Primary yAxis
				labels : {
					format : '',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
				title : {
					text : 'Subscribers',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title : {
					enabled : false
				},
				labels : {
					enabled : false
				},
				opposite : true,
			} ],
			tooltip : {
				formatter : eval("subscriberChartTooltip"),
				shared : true
			},
			series : [ {
				name : 'Current Week',
				type : 'column',

				data : [],
				tooltip : {
					valueSuffix : ''
				}

			}, {
				name : 'Last Week',
				type : 'spline',
				data : [],
				tooltip : {
					valueSuffix : ''
				}
			} ]
		}
	},
	"weekly" : {
		"statuswise" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			colors : [ '#56c1ab', '#fdb94e', '#f47721', '#e04646' ],
			title : {
				text : ''
			},
			exporting : {
				filename : 'Statuswise Subscriber Chart'
			},
			credits : {
				enabled : false
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Subscriber',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				}
			},
			tooltip : {
				headerFormat : '<span style="font-size:12px"><b>{point.x}</b></span><br>',
				shared : true,
				useHTML : true
			},
			plotOptions : {
				column : {
					pointPadding : 0.2,
					borderWidth : 0
				},
				series : {
					borderWidth : 0,
					dataLabels : {
						enabled : false,
						format : '{point.y:.0f}'
					}
				}
			},
			series : []
		},
		"planwise" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Planwise Subscriber View Chart"
			},
			credits : false,
			colors : [ '#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
					'#685369' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter

				},
				title : {
					text : 'Weeks',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false,
				enabled : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter : planwiseStackTooltipFormatter
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"exitReason" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber Exit Reason Chart'
			},
			credits : false,
			colors : [ '#F9C784', '#FCAF58', '#FF8C42', '#E16036', '#CD5832' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"countrywise" : {
			chart : {
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber Countrywise  Chart'
			},
			credits : false,
			colors : [ '#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9',
					'#75B9BE' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				}
			},
			yAxis : {
				title : {
					text : 'Subscribers'
				}
			},
			series : []
		},
		"subClassification" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Subscriber Classification Chart"
			},
			credits : false,
			colors : [ '#FF595E', '#FFCA3A', '#8AC926', '#1982C4' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false,
				enabled : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter : planwiseStackTooltipFormatter
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"subscriberTrend" : {

			chart : {
				zoomType : 'xy',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Subscriber Chart"
			},
			legend : {
				itemDistance : 20,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			credits : false,
			colors : [ '#7986CB', '#fdb94e' ],
			xAxis : [ {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Date',
					enabled : false
				}
			} ],
			yAxis : [ { // Primary yAxis
				labels : {
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
				title : {
					text : 'Subscribers',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title : {
					enabled : false
				},
				labels : {
					enabled : false
				},
				opposite : true,
			} ],
			tooltip : {
				formatter : subscriberChartTooltip,
				shared : true
			},
			series : [ {
				name : 'Current Week',
				type : 'column',
				yAxis : 1,
				data : []
			}, {
				name : 'Last Week',
				type : 'spline',
				data : [],
				marker : {
					lineWidth : 2,
					lineColor : '#f7a35c',
					fillColor : 'white'
				}
			} ]
		}
	},
	"monthly" : {
		"statuswise" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			colors : [ '#56c1ab', '#fdb94e', '#f47721', '#e04646' ],
			title : {
				text : ''
			},
			exporting : {
				filename : 'Statuswise Subscriber Chart'
			},
			credits : {
				enabled : false
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Week',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				}
			},
			tooltip : {
				headerFormat : '<span style="font-size:12px"><b>{point.x}</b></span><br>',
				shared : true,
				useHTML : true
			},
			plotOptions : {
				column : {
					pointPadding : 0.2,
					borderWidth : 0
				},
				series : {
					borderWidth : 0,
					dataLabels : {
						enabled : false,
						format : '{point.y:.0f}'
					}
				}
			},
			series : []
		},
		"planwise" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Planwise Subscriber View Chart"
			},
			credits : false,
			colors : [ '#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
					'#685369' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0

				},
				title : {
					text : 'Months',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false,
				enabled : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter : planwiseStackTooltipFormatter
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"exitReason" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber Exit Reason Chart'
			},
			credits : false,
			colors : [ '#F9C784', '#FCAF58', '#FF8C42', '#E16036', '#CD5832' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"countrywise" : {
			chart : {
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber Countrywise  Chart'
			},
			credits : false,
			colors : [ '#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9',
					'#75B9BE' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				}
			},
			yAxis : {
				title : {
					text : 'Subscribers'
				}
			},
			series : []
		},
		"subClassification" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Subscriber Classification Chart"
			},
			credits : false,
			colors : [ '#FF595E', '#FFCA3A', '#8AC926', '#1982C4' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false,
				enabled : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter : planwiseStackTooltipFormatter
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"subscriberTrend" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			credits : {
				enabled : false
			},
			colors : [ "#7986CB" ],
			title : {
				text : ''
			},
			exporting : {
				filename : "Subscriber Chart"
			},
			xAxis : [ {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Date',
					enabled : false
				}
			} ],
			yAxis : {
				title : {
					text : 'Subscribers'
				}
			},
			legend : {
				enabled : false
			},
			plotOptions : {
				series : {
					borderWidth : 0,
					dataLabels : {
						enabled : true
					}
				}
			},
			tooltip : {
				headerFormat : '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat : '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
			},

			series : [ {
				name : 'Subscribers',
				colorByPoint : true,
				data : []
			} ]
		}
	},
	"customDate" : {
		"statuswise" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			colors : [ '#56c1ab', '#fdb94e', '#f47721', '#e04646' ],
			title : {
				text : ''
			},
			credits : {
				enabled : false
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Subscriber',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				}
			},
			tooltip : {
				headerFormat : '<span style="font-size:12px"><b>{point.x}</b></span><br>',
				shared : true,
				useHTML : true
			},
			plotOptions : {
				column : {
					pointPadding : 0.2,
					borderWidth : 0
				},
				series : {
					borderWidth : 0,
					dataLabels : {
						enabled : false,
						format : '{point.y:.0f}'
					}
				}
			},
			exporting : {
				filename : "Statuswise Subscriber Chart"
			},
			series : []
		},
		"planwise" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Planwise Subscriber View Chart"
			},
			credits : false,
			colors : [ '#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
					'#685369' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter

				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false,
				enabled : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter : planwiseStackTooltipFormatter
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"exitReason" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : 'Subscriber Exit Reason Chart'
			},
			credits : false,
			colors : [ '#F9C784', '#FCAF58', '#FF8C42', '#E16036', '#CD5832' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"countrywise" : {
			chart : {
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Country Subscriber View Chart"
			},
			credits : false,
			colors : [ '#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9',
					'#75B9BE' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>{point.y}</b><br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : []
		},
		"subClassification" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},
			credits : false,
			colors : [ '#FF595E', '#FFCA3A', '#8AC926', '#1982C4' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Date',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Subscribers'
				},
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			exporting : {
				filename : 'Subscriberwise Classification'
			},
			series : []
		},
		"subscriberTrend" : {
			chart : {
				zoomType : 'xy'
			},
			title : {
				text : ''
			},
			exporting : {
				filename : "Subscriber Chart"
			},
			credits : false,
			colors : [ '#7986CB', '#fdb94e' ],
			xAxis : [ {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0,
					formatter: dateFormatter
				},
				title : {
					text : 'Date',
					enabled : false
				}
			} ],
			yAxis : [ { // Primary yAxis
				labels : {
					format : '',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
				title : {
					text : 'Subscribers',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title : {
					enabled : false
				},
				labels : {
					enabled : false
				},
				opposite : true,
			} ],
			tooltip : {
				formatter : eval("subscriberChartTooltip"),
				shared : true
			},
			legend : {
				enabled : false
			},
			series : [ {
				type : 'column',

				data : [],
				tooltip : {
					valueSuffix : ''
				}

			}]
		}
	}

}

var bizPostSubEmpty = {
	"emptyChartConfig" : {
		"emptyChart" : {
			chart : {
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			colors : [ '#00bcd4', '#019BBA', '#fdb94e' ],
			title : {
				text : ''
			},
			exporting : {
				enabled:false
			},
			credits : false,
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Category',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : '',
				stackLabels : {
					enabled : true,
					style : {
						fontWeight : 'bold',
						color : (Highcharts.theme && Highcharts.theme.textColor)
								|| 'gray'
					}
				}
			},
			legend : {
				itemDistance : 20,
				padding : 2,
				itemMarginTop : 4,
				itemMarginBottom : 2,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				shadow : false
			},
			legend : {
				enabled : false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b> of total<br/>'
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					dataLabels : {
						enabled : false,
						color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
								|| 'white'
					}
				}
			},
			series : [ {
				name : 'No data to display',
				data : []
			} ]
		},
	}
}

