var bizFixedOrder = {
	"today" : {
		"intakeTrend" : {
			chart : {
				zoomType : 'xy',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},exporting : {
				filename : "Order Intake Trend Chart"
			},
			legend : {
				itemDistance : 10,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			credits : false,
			colors : [ '#69c5e4', '#fdb94e' ],
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
					format : '',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
				title : {
					text : 'Orders',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title : {
					text : '',
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				labels : {
					enabled : false
				},
				opposite : true
			} ],
			tooltip : {
				// formatter:orderChartTooltip,
				shared : true
			},
			series : [ {
				name : 'Current Week',
				type : 'column',
				yAxis : 1,
				data : [],
				tooltip : {
					valueSuffix : ' '
				}

			}, {
				name : 'Last Week',
				type : 'spline',
				data : [],
				tooltip : {
					valuePrefix : ''
				},
				marker : {
					lineWidth : 2,
					lineColor : '#f7a35c',
					fillColor : 'white'
				}
			} ]
		},
		"planwise" : {
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
				filename : "Planwise Order Intake View Chart"
			},
			title : {
				text : ''
			},
			credits : false,
			colors : [ '#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#8eb55c',
					'#FBB02D' ],
			plotOptions : {
				pie : {
					innerSize : 100,
					depth : 45,
					showInLegend : false
				}
			},
			series : [ {
				name : 'Order Intake',
				data : [],
				dataLabels : {
					enabled : true,
					format : '<b>{point.name}</b>: {point.percentage:.1f} %'
				}
			} ]
		},
		"countrywise" : {
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
				filename : "Countrywise Order Intake View Chart"
			},
			title : {
				text : ''
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
				name : 'Order Intake',
				colorByPoint : true,
				data : []
			} ]
		},
		"statuswise" : {
			chart : {
				type : 'solidgauge',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			credits : false,
			title : {
				text : '',
				style : {
					fontSize : '24px'
				}
			},exporting : {
				filename : "Statuswise Order Intake View Chart"
			},
			tooltip : {
				borderWidth : 0,
				backgroundColor : 'none',
				shadow : false,
				style : {
					fontSize : '12px'
				},
				pointFormat : '<span style="font-size:1.5em; color: {point.color}; font-weight: bold">{series.name} - {point.z}</span><br><span style="font-size:1.5em; color: {point.color};">{point.y}%</span>',
				positioner : function(labelWidth) {
					return {
						x : 10,
						y : 0
					};
				}
			},
			pane : {
				startAngle : 0,
				endAngle : 360,
				background : [ {
					outerRadius : '92%',
					innerRadius : '77%',
					backgroundColor : "rgba(122, 193, 67, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '76%',
					innerRadius : '61%',
					backgroundColor : "rgba(251, 176, 52, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '60%',
					innerRadius : '45%',
					backgroundColor : "rgba(255, 133, 27, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '44%',
					innerRadius : '29%',
					backgroundColor : "rgba(73, 192, 182, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '28%',
					innerRadius : '13%',
					backgroundColor : "rgba(231, 76, 60, 0.3)",
					borderWidth : 0
				} ]
			},

			yAxis : {
				min : 0,
				max : 100,
				lineWidth : 0,
				tickPositions : []
			},

			plotOptions : {
				solidgauge : {
					dataLabels : {
						enabled : false
					},
					linecap : 'round',
					stickyTracking : false,
					rounded : true
				}
			},
			legend : {
				labelFormatter : function() {
					return '<span style="text-weight:bold;color:'
							+ this.userOptions.color + '">' + this.name
							+ '</span>';
				},
				symbolWidth : 0,
				layout : 'vertical',
				align : 'left',
				x : 0,
				verticalAlign : 'bottom',
				y : 0,
				floating : true,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				borderColor : '',
				borderWidth : 0,
				shadow : false
			},
			series : [ {
				name : 'Available',
				borderColor : '#7ac143',
				color : '#7ac143',
				data : [ {
					color : '#7ac143',
					radius : '92%',
					innerRadius : '77%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Current',
				borderColor : '#fbb034',
				color : '#fbb034',
				data : [ {
					color : '#fbb034',
					radius : '76%',
					innerRadius : '61%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Retrieved',
				borderColor : '#ff851b',
				color : '#ff851b',
				data : [ {
					color : '#ff851b',
					radius : '60%',
					innerRadius : '45%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Completed',
				borderColor : '#49C0B6',
				color : '#49C0B6',
				data : [ {
					color : '#49C0B6',
					radius : '44%',
					innerRadius : '29%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Cancelled',
				borderColor : '#e74c3c',
				color : '#e74c3c',
				data : [ {
					color : '#e74c3c',
					radius : '28%',
					innerRadius : '13%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			} ]
		}
	},
	"daily" : {
		"intakeTrend" : {
			chart : {
				zoomType : 'xy',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},exporting : {
				filename : "Order Intake Trend Chart"
			},
			legend : {
				itemDistance : 10,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			credits : false,
			colors : [ '#69c5e4', '#fdb94e' ],
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
					format : '',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
				title : {
					text : 'Orders',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title : {
					text : '',
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				labels : {
					enabled : false
				},
				opposite : true
			} ],
			tooltip : {
				formatter: eval("orderChartTooltip"),
				shared : true
			},
			series : [ {
				name : 'Current Week',
				type : 'column',
				data : [],
				tooltip : {
					valueSuffix : ' '
				}

			}, {
				name : 'Last Week',
				type : 'spline',
				data : [],
				tooltip : {
					valuePrefix : ''
				},
				marker : {
					lineWidth : 2,
					lineColor : '#f7a35c',
					fillColor : 'white'
				}
			} ]
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
				filename : "Order Intake Plan Wise Chart"
			},
			credits : false,
			colors : [ '#C3D2D5', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
					'#685369' ],
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
					text : 'Orders'
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
				enabled:false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter: planwiseStackTooltipFormatter
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
			},exporting : {
				filename : "Countrywise Order Intake View Chart"
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
					text : 'orders'
				}
			},
			series : []
		},
		"statuswise" : {
			chart : {
				type : 'solidgauge',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			credits : false,
			title : {
				text : '',
				style : {
					fontSize : '24px'
				}
			},exporting : {
				filename : "Statuswise Order Intake View Chart"
			},
			tooltip : {
				borderWidth : 0,
				backgroundColor : 'none',
				shadow : false,
				style : {
					fontSize : '12px'
				},
				pointFormat : '<span style="font-size:1.5em; color: {point.color}; font-weight: bold">{series.name} - {point.z}</span><br><span style="font-size:1.5em; color: {point.color};">{point.y}%</span>',
				positioner : function(labelWidth) {
					return {
						x : 10,
						y : 0
					};
				}
			},
			pane : {
				startAngle : 0,
				endAngle : 360,
				background : [ {
					outerRadius : '92%',
					innerRadius : '77%',
					backgroundColor : "rgba(122, 193, 67, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '76%',
					innerRadius : '61%',
					backgroundColor : "rgba(251, 176, 52, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '60%',
					innerRadius : '45%',
					backgroundColor : "rgba(255, 133, 27, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '44%',
					innerRadius : '29%',
					backgroundColor : "rgba(73, 192, 182, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '28%',
					innerRadius : '13%',
					backgroundColor : "rgba(231, 76, 60, 0.3)",
					borderWidth : 0
				} ]
			},

			yAxis : {
				min : 0,
				max : 100,
				lineWidth : 0,
				tickPositions : []
			},

			plotOptions : {
				solidgauge : {
					dataLabels : {
						enabled : false
					},
					linecap : 'round',
					stickyTracking : false,
					rounded : true
				}
			},
			legend : {
				labelFormatter : function() {
					return '<span style="text-weight:bold;color:'
							+ this.userOptions.color + '">' + this.name
							+ '</span>';
				},
				symbolWidth : 0,
				layout : 'vertical',
				align : 'left',
				x : 0,
				verticalAlign : 'bottom',
				y : 0,
				floating : true,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				borderColor : '',
				borderWidth : 0,
				shadow : false
			},
			series : [ {
				name : 'Available',
				borderColor : '#7ac143',
				color : '#7ac143',
				data : [ {
					color : '#7ac143',
					radius : '92%',
					innerRadius : '77%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Current',
				borderColor : '#fbb034',
				color : '#fbb034',
				data : [ {
					color : '#fbb034',
					radius : '76%',
					innerRadius : '61%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Retrieved',
				borderColor : '#ff851b',
				color : '#ff851b',
				data : [ {
					color : '#ff851b',
					radius : '60%',
					innerRadius : '45%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Completed',
				borderColor : '#49C0B6',
				color : '#49C0B6',
				data : [ {
					color : '#49C0B6',
					radius : '44%',
					innerRadius : '29%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Cancelled',
				borderColor : '#e74c3c',
				color : '#e74c3c',
				data : [ {
					color : '#e74c3c',
					radius : '28%',
					innerRadius : '13%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			} ]
		}
	},
	"weekly" : {
		"intakeTrend" : {
			chart : {
				zoomType : 'xy',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},exporting : {
				filename : "Order Intake Trend Chart"
			},
			legend : {
				itemDistance : 10,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			credits : false,
			colors : [ '#69c5e4', '#fdb94e' ],
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
					format : '',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
				title : {
					text : 'Orders',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title : {
					text : '',
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				labels : {
					enabled : false
				},
				opposite : true
			} ],
			tooltip : {
				// formatter:orderChartTooltip,
				shared : true
			},
			series : [ {
				name : 'Order Intake',
				type : 'column',
				yAxis : 1,
				data : [],
				tooltip : {
					valueSuffix : ' '
				}

			} ]
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
				filename : "Order Intake Plan Wise Chart"
			},
			credits : false,
			colors : [ '#C3D2D5', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
					'#685369' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Weekly',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Order'
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
				enabled:false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter: planwiseStackTooltipFormatter
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
			},	exporting : {
				filename : "Countrywise Order Intake View Chart"
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
					text : 'orders'
				}
			},
			series : []
		},
		"statuswise" : {
			chart : {
				type : 'solidgauge',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			credits : false,
			title : {
				text : '',
				style : {
					fontSize : '24px'
				}
			},exporting : {
				filename : "Statuswise Order Intake View Chart"
			},
			tooltip : {
				borderWidth : 0,
				backgroundColor : 'none',
				shadow : false,
				style : {
					fontSize : '12px'
				},
				pointFormat : '<span style="font-size:1.5em; color: {point.color}; font-weight: bold">{series.name} - {point.z}</span><br><span style="font-size:1.5em; color: {point.color};">{point.y}%</span>',
				positioner : function(labelWidth) {
					return {
						x : 10,
						y : 0
					};
				}
			},
			pane : {
				startAngle : 0,
				endAngle : 360,
				background : [ {
					outerRadius : '92%',
					innerRadius : '77%',
					backgroundColor : "rgba(122, 193, 67, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '76%',
					innerRadius : '61%',
					backgroundColor : "rgba(251, 176, 52, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '60%',
					innerRadius : '45%',
					backgroundColor : "rgba(255, 133, 27, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '44%',
					innerRadius : '29%',
					backgroundColor : "rgba(73, 192, 182, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '28%',
					innerRadius : '13%',
					backgroundColor : "rgba(231, 76, 60, 0.3)",
					borderWidth : 0
				} ]
			},

			yAxis : {
				min : 0,
				max : 100,
				lineWidth : 0,
				tickPositions : []
			},

			plotOptions : {
				solidgauge : {
					dataLabels : {
						enabled : false
					},
					linecap : 'round',
					stickyTracking : false,
					rounded : true
				}
			},
			legend : {
				labelFormatter : function() {
					return '<span style="text-weight:bold;color:'
							+ this.userOptions.color + '">' + this.name
							+ '</span>';
				},
				symbolWidth : 0,
				layout : 'vertical',
				align : 'left',
				x : 0,
				verticalAlign : 'bottom',
				y : 0,
				floating : true,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				borderColor : '',
				borderWidth : 0,
				shadow : false
			},
			series : [ {
				name : 'Available',
				borderColor : '#7ac143',
				color : '#7ac143',
				data : [ {
					color : '#7ac143',
					radius : '92%',
					innerRadius : '77%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Current',
				borderColor : '#fbb034',
				color : '#fbb034',
				data : [ {
					color : '#fbb034',
					radius : '76%',
					innerRadius : '61%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Retrieved',
				borderColor : '#ff851b',
				color : '#ff851b',
				data : [ {
					color : '#ff851b',
					radius : '60%',
					innerRadius : '45%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Completed',
				borderColor : '#49C0B6',
				color : '#49C0B6',
				data : [ {
					color : '#49C0B6',
					radius : '44%',
					innerRadius : '29%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Cancelled',
				borderColor : '#e74c3c',
				color : '#e74c3c',
				data : [ {
					color : '#e74c3c',
					radius : '28%',
					innerRadius : '13%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			} ]
		}
	},
	"monthly" : {
		"intakeTrend" : {
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
			colors : [ "#56c1ab" ],
			title : {
				text : ''
			},exporting : {
				filename : "Order Intake Trend Chart"
			},
			xAxis : {
				type : 'category',
				crosshair : true,
				labels : {
					rotation : 0
				}
			},
			yAxis : {
				title : {
					text : 'Orders'
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
				name : 'Order Intake',
				colorByPoint : true,
				data : []
			} ]
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
				filename : "Order Intake Plan Wise Chart"
			},
			credits : false,
			colors : [ '#C3D2D5', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
					'#685369' ],
			xAxis : {
				categories : [],
				crosshair : true,
				labels : {
					rotation : 0
				},
				title : {
					text : 'Monthly',
					enabled : false
				}
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Order'
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
				enabled:false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter: planwiseStackTooltipFormatter
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
			},	exporting : {
				filename : "Countrywise Order Intake View Chart"
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
					text : 'orders'
				}
			},
			series : []
		},
		"statuswise" : {
			chart : {
				type : 'solidgauge',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			credits : false,
			title : {
				text : '',
				style : {
					fontSize : '24px'
				}
			},exporting : {
				filename : "Statuswise Order Intake View Chart"
			},
			tooltip : {
				borderWidth : 0,
				backgroundColor : 'none',
				shadow : false,
				style : {
					fontSize : '12px'
				},
				pointFormat : '<span style="font-size:1.5em; color: {point.color}; font-weight: bold">{series.name} - {point.z}</span><br><span style="font-size:1.5em; color: {point.color};">{point.y}%</span>',
				positioner : function(labelWidth) {
					return {
						x : 10,
						y : 0
					};
				}
			},
			pane : {
				startAngle : 0,
				endAngle : 360,
				background : [ {
					outerRadius : '92%',
					innerRadius : '77%',
					backgroundColor : "rgba(122, 193, 67, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '76%',
					innerRadius : '61%',
					backgroundColor : "rgba(251, 176, 52, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '60%',
					innerRadius : '45%',
					backgroundColor : "rgba(255, 133, 27, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '44%',
					innerRadius : '29%',
					backgroundColor : "rgba(73, 192, 182, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '28%',
					innerRadius : '13%',
					backgroundColor : "rgba(231, 76, 60, 0.3)",
					borderWidth : 0
				} ]
			},

			yAxis : {
				min : 0,
				max : 100,
				lineWidth : 0,
				tickPositions : []
			},

			plotOptions : {
				solidgauge : {
					dataLabels : {
						enabled : false
					},
					linecap : 'round',
					stickyTracking : false,
					rounded : true
				}
			},
			legend : {
				labelFormatter : function() {
					return '<span style="text-weight:bold;color:'
							+ this.userOptions.color + '">' + this.name
							+ '</span>';
				},
				symbolWidth : 0,
				layout : 'vertical',
				align : 'left',
				x : 0,
				verticalAlign : 'bottom',
				y : 0,
				floating : true,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				borderColor : '',
				borderWidth : 0,
				shadow : false
			},
			series : [ {
				name : 'Available',
				borderColor : '#7ac143',
				color : '#7ac143',
				data : [ {
					color : '#7ac143',
					radius : '92%',
					innerRadius : '77%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Current',
				borderColor : '#fbb034',
				color : '#fbb034',
				data : [ {
					color : '#fbb034',
					radius : '76%',
					innerRadius : '61%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Retrieved',
				borderColor : '#ff851b',
				color : '#ff851b',
				data : [ {
					color : '#ff851b',
					radius : '60%',
					innerRadius : '45%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Completed',
				borderColor : '#49C0B6',
				color : '#49C0B6',
				data : [ {
					color : '#49C0B6',
					radius : '44%',
					innerRadius : '29%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Cancelled',
				borderColor : '#e74c3c',
				color : '#e74c3c',
				data : [ {
					color : '#e74c3c',
					radius : '28%',
					innerRadius : '13%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			} ]
		}
	},
	"customDate" : {
		"intakeTrend" : {
			chart : {
				zoomType : 'xy',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			title : {
				text : ''
			},exporting : {
				filename : "Order Intake Trend Chart"
			},
			legend : {
				itemDistance : 10,
				padding : 0,
				itemMarginTop : 4,
				itemMarginBottom : 2
			},
			credits : false,
			colors : [ '#69c5e4', '#fdb94e' ],
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
					format : '',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
				title : {
					text : 'Orders',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				},
			}, { // Secondary yAxis
				title : {
					text : '',
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				labels : {
					enabled : false
				},
				opposite : true
			} ],
			tooltip : {
				// formatter:orderChartTooltip,
				shared : true
			},
			series : [ {
				name : 'Orders',
				type : 'column',
				yAxis : 1,
				data : []
			} ]
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
				filename : "Planwise Order Intake View Chart"
			},
			credits : false,
			colors : [ '#C3D2D5', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
					'#685369' ],
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
					text : 'Orders'
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
				enabled:false
			},
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				formatter: planwiseStackTooltipFormatter
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
			},exporting : {
				filename : "Countrywise Order Intake View Chart"
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
					text : 'orders'
				}
			},
			series : []
		},
		"statuswise" : {
			chart : {
				type : 'solidgauge',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			credits : false,
			title : {
				text : '',
				style : {
					fontSize : '24px'
				}
			},exporting : {
				filename : "Statuswise Order Intake View Chart"
			},
			tooltip : {
				borderWidth : 0,
				backgroundColor : 'none',
				shadow : false,
				style : {
					fontSize : '12px'
				},
				pointFormat : '<span style="font-size:1.5em; color: {point.color}; font-weight: bold">{series.name} - {point.z}</span><br><span style="font-size:1.5em; color: {point.color};">{point.y}%</span>',
				positioner : function(labelWidth) {
					return {
						x : 10,
						y : 0
					};
				}
			},
			pane : {
				startAngle : 0,
				endAngle : 360,
				background : [ {
					outerRadius : '92%',
					innerRadius : '77%',
					backgroundColor : "rgba(122, 193, 67, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '76%',
					innerRadius : '61%',
					backgroundColor : "rgba(251, 176, 52, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '60%',
					innerRadius : '45%',
					backgroundColor : "rgba(255, 133, 27, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '44%',
					innerRadius : '29%',
					backgroundColor : "rgba(73, 192, 182, 0.3)",
					borderWidth : 0
				}, {
					outerRadius : '28%',
					innerRadius : '13%',
					backgroundColor : "rgba(231, 76, 60, 0.3)",
					borderWidth : 0
				} ]
			},

			yAxis : {
				min : 0,
				max : 100,
				lineWidth : 0,
				tickPositions : []
			},

			plotOptions : {
				solidgauge : {
					dataLabels : {
						enabled : false
					},
					linecap : 'round',
					stickyTracking : false,
					rounded : true
				}
			},
			legend : {
				labelFormatter : function() {
					return '<span style="text-weight:bold;color:'
							+ this.userOptions.color + '">' + this.name
							+ '</span>';
				},
				symbolWidth : 0,
				layout : 'vertical',
				align : 'left',
				x : 0,
				verticalAlign : 'bottom',
				y : 0,
				floating : true,
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2)
						|| 'white',
				borderColor : '',
				borderWidth : 0,
				shadow : false
			},
			series : [ {
				name : 'Available',
				borderColor : '#7ac143',
				color : '#7ac143',
				data : [ {
					color : '#7ac143',
					radius : '92%',
					innerRadius : '77%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Current',
				borderColor : '#fbb034',
				color : '#fbb034',
				data : [ {
					color : '#fbb034',
					radius : '76%',
					innerRadius : '61%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Retrieved',
				borderColor : '#ff851b',
				color : '#ff851b',
				data : [ {
					color : '#ff851b',
					radius : '60%',
					innerRadius : '45%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Completed',
				borderColor : '#49C0B6',
				color : '#49C0B6',
				data : [ {
					color : '#49C0B6',
					radius : '44%',
					innerRadius : '29%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			}, {
				name : 'Cancelled',
				borderColor : '#e74c3c',
				color : '#e74c3c',
				data : [ {
					color : '#e74c3c',
					radius : '28%',
					innerRadius : '13%',
					y : 0,
					z : 0
				} ],
				showInLegend : true
			} ]
		}
	}
}
var bizFixedOrderEmpty = {
	"emptyChartConfig" : {
		"emptyChart" : {
			chart : {
				type : 'column',
				spacingBottom : 10,
				spacingTop : 10,
				spacingLeft : 10,
				spacingRight : 10
			},
			colors : [ '#00bcd4', '#019BBA', '#fdb94e' ],
			title : {
				text : ''
			},
			exporting: {
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
					text : 'Date',
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
			tooltip : {
				useHTML : true,
				shared : true,
				headerFormat : '<b>{point.x}</b><br/>',
				pointFormat : '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.0f}</b> of total<br/>'
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
	}
}