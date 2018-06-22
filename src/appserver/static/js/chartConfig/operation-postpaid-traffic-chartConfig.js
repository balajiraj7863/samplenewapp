var bizPostTrafficDrill = {
	"today" : {
		"volVoice" : {
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
			exporting : {
				filename : "volume Voice"
			},
			title : {
				text : ''
			},
			colors : [ '#8eb55c', '#f15c80', '#f7a35c' ],
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
						format : '<b>{point.name}</b>: {point.percentage:.1f} %',
						style : {
							color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
									|| 'black'
						}
					},
					showInLegend : true
				}
			},
			legend : {
				itemDistance : 10,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			series : [ {
				name : 'Voice Volume',
				colorByPoint : true,

				data : [ {
					name : 'OnNet',
					y : 0
				}, {
					name : 'OffNet',
					y : 0,
					sliced : true,
					selected : true
				}, {
					name : 'Roaming',
					y : 0
				} ]
			} ]
		},
		"volSms" : {
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
			exporting : {
				filename : "volume Sms"
			},
			title : {
				text : ''
			},
			colors : [ '#8eb55c', '#f15c80', '#f7a35c' ],
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
						format : '<b>{point.name}</b>: {point.percentage:.1f} %',
						style : {
							color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
									|| 'black'
						}
					},
					showInLegend : true
				}
			},
			legend : {
				itemDistance : 10,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			series : [ {
				name : 'SMS Volume',
				colorByPoint : true,
				data : [ {
					name : 'OnNet',
					y : 0
				}, {
					name : 'OffNet',
					y : 0,
					sliced : true,
					selected : true
				}, {
					name : 'Roaming',
					y : 0
				} ]
			} ]
		},
		"volData" : {
			chart : {
				type : 'pie',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10,
				options3d : {
					enabled : true,
					alpha : 45
				}
			},
			exporting : {
				filename : "volume Data"
			},
			title : {
				text : ''
			},
			credits : false,
			colors : [ '#8085e9', '#f7a35c', '#8eb55c' ],
			plotOptions : {
				pie : {
					innerSize : 100,
					depth : 45,
					showInLegend : false
				}
			},
			series : [ {
				name : 'Data Volume',
				data : [ {
					name : 'Home',
					y : 0
				}, {
					name : 'Roaming',
					y : 0
				} ],
				dataLabels : {
					enabled : true,
					format : '<b>{point.name}</b>: {point.percentage:.1f} %'
				}
			} ]
		},
		"commonConfig":{

			chart : {
				type : 'arearange',
				zoomType : 'x'
			},
			credits : {
				enabled : false
			},
			colors : [ '#EB9532' ],
			title : {
				text : ''
			},
			exporting : {
				filename : "Traffic Chart"
			},
			xAxis : {
				minTickInterval : "00:00",
				minorTickInterval : 2,
				dateTimeLabelFormats : {
					minute : '%I:%M %p'
				}
			},
			yAxis : {
				title : {
					text : 'TPH'
				}
			},
			tooltip : {
				crosshairs : true,
				shared : true
			},
			legend : {
				enabled : false
			},
		
		}
	},
	"prevDay" : {
		"volVoice" : {
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
			colors : [ '#8eb55c', '#f15c80', '#f7a35c' ],
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
						format : '<b>{point.name}</b>: {point.percentage:.1f} %',
						style : {
							color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
									|| 'black'
						}
					},
					showInLegend : true
				}
			},
			legend : {
				itemDistance : 10,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			series : [ {
				name : 'Voice Volume',
				colorByPoint : true,
				data : []
			} ]
		},
		"volSms" : {
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
			colors : [ '#8eb55c', '#f15c80', '#f7a35c' ],
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
						format : '<b>{point.name}</b>: {point.percentage:.1f} %',
						style : {
							color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
									|| 'black'
						}
					},
					showInLegend : true
				}
			},
			legend : {
				itemDistance : 10,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			series : [ {
				name : 'SMS Volume',
				colorByPoint : true,
				data : []
			} ]
		},
		"volData" : {
			chart : {
				type : 'pie',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10,
				options3d : {
					enabled : true,
					alpha : 45
				}
			},
			title : {
				text : ''
			},
			credits : false,
			colors : [ '#8085e9', '#f7a35c', '#8eb55c' ],
			plotOptions : {
				pie : {
					innerSize : 100,
					depth : 45,
					showInLegend : false
				}
			},
			series : [ {
				name : 'Data Volume',
				data : [],
				dataLabels : {
					enabled : true,
					format : '<b>{point.name}</b>: {point.percentage:.1f} %'
				}
			} ]
		}
	}
}

var bizPostTrafficEmpty = {
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
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
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