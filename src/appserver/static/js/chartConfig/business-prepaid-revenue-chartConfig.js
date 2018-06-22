var bizPostUnbillRev = {
	"previousDay": {
		"revService": {
			chart: {
				type: 'column',
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
				filename: "Rev Service Chart"
			},
			credits: false,
			xAxis: {
				categories: ['Voice', 'SMS', 'Data'],
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
					text: 'Revenue($)'
				},
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
				name: 'International',
				data: []
			}, {
				name: 'National',
				data: []
			}]
		},
		"volUsageService": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			colors: ['#D6D9A6', '#C7CB85', '#7EA172'],
			title: {
				text: ''
			},
			exporting: {
				filename: "Volume Usage Service Chart"
			},
			credits: false,
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
					text: 'Transaction'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y}</b> of total<br/>'
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
				name: 'International',
				data: []
			}, {
				name: 'National',
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
			exporting: {
				filename: 'Consolidated Revenue - Countrywise View chart'
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
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
			credits: {
				enabled: false
			},
			series: [{
				title: {
					text: 'country',
					enabled: false
				},
				type: 'pie',
				name: 'Revenue',
				data: []
			}]
		},
		"planwise": {
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
			exporting: {
				filename: "Plan wise Chart"
			},
			credits: false,
			colors: ['#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#8eb55c',
				'#FBB02D'
			],
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			tooltip: {
				valuePrefix: '$'
			},
			series: [{
				name: 'Revenue',
				data: [],
				dataLabels: {
					format: '{point.name}: {point.percentage:.1f}%',
					enabled: true
				}
			}]
		},
		"subClassification": {
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
			colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
			exporting: {
				filename: 'Subscriberwise Classification'
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
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
			credits: {
				enabled: false
			},
			series: [{
				title: {
					text: 'country',
					enabled: false
				},
				type: 'pie',
				name: 'Revenue',
				data: []
			}]
		},
		"revServiceData": {
			chart: {
				type: 'column',
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
				filename: "Rev Service Chart"
			},
			credits: false,
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
					text: 'Revenue($)'
				},
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
				name: 'International',
				data: []
			}, {
				name: 'National',
				data: []
			}]
		},
		"volUsageServiceVoice": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			credits: false,
			title: {
				text: ''
			},
			exporting: {
				filename: "Volume Usage Service Chart"
			},
			xAxis: {
				type: 'category',
				crosshair: true,
				labels: {
					rotation: 0
				},
			},
			yAxis: {
				title: {
					text: 'Transaction'
				}
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					dataLabels: {
						enabled: true
					}
				}
			},
			colors: ['#D6D9A6', '#C7CB85', '#7EA172'],
			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
			},

			series: [{
				name: 'Volume',
				colorByPoint: true,
				data: [{
					name: 'International',
					y: 0,
					drilldown: false
				}, {
					name: 'National',
					y: 0,
					drilldown: false
				}]
			}]
		},
		"volUsageServiceData": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			credits: false,
			title: {
				text: ''
			},
			exporting: {
				filename: "Volume Usage Service Chart"
			},
			xAxis: {
				type: 'category',
				crosshair: true,
				labels: {
					rotation: 0
				},
			},
			yAxis: {
				title: {
					text: 'Transaction'
				}
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					dataLabels: {
						enabled: true
					}
				}
			},
			colors: ['#D6D9A6', '#7EA172'],
			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
			},

			series: [{
				name: 'Volume',
				colorByPoint: true,
				data: [{
					name: 'International',
					y: 0,
					drilldown: false
				}, {
					name: 'National',
					y: 0,
					drilldown: false
				}]
			}]
		},
		"servicewiseVoice": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			credits: false,
			title: {
				text: ''
			},
			exporting: {
				filename: "Servicewise Revenue View Chart"
			},
			xAxis: {
				type: 'category',
				crosshair: true,
				labels: {
					rotation: 0
				},
			},
			yAxis: {
				title: {
					text: 'Revenue($)'
				}
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					dataLabels: {
						enabled: true
					}
				}
			},
			colors: ['#00bcd4', '#019BBA', '#fdb94e'],
			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
			},

			series: [{
				name: 'Revenue',
				colorByPoint: true,
				data: [{
					name: 'International',
					y: 0,
					drilldown: false
				}, {
					name: 'National',
					y: 0,
					drilldown: false
				}]
			}]
		},
		"servicewisedata": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			credits: false,
			title: {
				text: ''
			},
			exporting: {
				filename: "Servicewise Revenue View Chart"
			},
			xAxis: {
				type: 'category',
				crosshair: true,
				labels: {
					rotation: 0
				},
			},
			yAxis: {
				title: {
					text: 'Revenue($)'
				}
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					dataLabels: {
						enabled: true
					}
				}
			},
			colors: ['#00bcd4', '#019BBA', '#fdb94e'],
			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
			},

			series: [{
				name: 'Revenue',
				colorByPoint: true,
				data: [{
					name: 'International',
					y: 0,
					drilldown: false
				}, {
					name: 'National',
					y: 0,
					drilldown: false
				}]
			}]
		}
	},
	"daily": {
		"revService": {
			chart: {
				type: 'column',
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
				filename: "Rev Service Chart"
			},
			credits: false,
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
					text: 'Revenue($)'
				},
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
				name: 'International',
				data: []
			}, {
				name: 'National',
				data: []
			}]
		},
		"volUsageService": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			colors:['#00bcd4', '#019BBA', '#fdb94e'],
			title: {
				text: ''
			},
			exporting: {
				filename: "Volume Service Chart"
			},
			credits: false,
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
					text: 'Transaction'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.2f}</b> of total<br/>'
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
				name: 'International',
				data: []
			}, {
				name: 'National',
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
			exporting: {
				filename: "Country Wise Chart"
			},
			credits: false,
			// colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9','#75B9BE'],
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9','#75B9BE'],
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0
				}
			},
			yAxis: {
				title: {
					text: 'Revenue($)'
				}
			},
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
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
				filename: "Planwise Revenue View Chart"
			},
			credits: false,
			colors: ['#C3D2D5', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
				'#685369'
			],
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
					text: 'Revenue($)'
				},
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
				shadow: false,
				enabled: false
			},
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				formatter: planRevenueStackTooltipFormatter
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
			series: []
		},
		"subClassification": {
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
			colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
			exporting: {
				filename: 'Subscriberwise Classification'
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
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
			credits: {
				enabled: false
			},
			series: [{
				title: {
					text: 'country',
					enabled: false
				},
				type: 'pie',
				name: 'Revenue',
				data: []
			}]
		},
		"volUsageServiceData": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			colors: ['#D6D9A6', '#C7CB85', '#7EA172'],
			title: {
				text: ''
			},
			exporting: {
				filename: "Volume wise Chart"
			},
			credits: false,
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
					text: 'Transaction'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y}</b> of total<br/>'
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
				name: 'International',
				data: []
			}, {
				name: 'National',
				data: []
			}]
		}
	},
	"weekly": {
		"revService": {
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
			colors: ['#00bcd4', '#019BBA', '#fdb94e'],
			exporting: {
				filename: "Rev Service Chart"
			},
			credits: false,
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
					text: 'Revenue($)'
				},
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
				name: 'International',
				data: []
			}, {
				name: 'National',
				data: []
			}]
		},
		"volUsageService": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			colors: ['#D6D9A6', '#C7CB85', '#7EA172'],
			title: {
				text: ''
			},
			exporting: {
				filename: "Volume Usage Service Chart"
			},
			credits: false,
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
					text: 'Transaction'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y}</b> of total<br/>'
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
				name: 'International',
				data: []
			}, {
				name: 'National',
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
			exporting: {
				filename: "Country Wise Chart"
			},
			credits: false,
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9',
				'#75B9BE'
			],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
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
					text: 'Revenue($)'
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
				filename: "Plan Wise Chart"
			},
			credits: false,
			colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
				'#685369'
			],
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
					text: 'Revenue($)'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				formatter: planRevenueStackTooltipFormatter
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
			series: []
		},
		"subClassification": {
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
			colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
			exporting: {
				filename: 'Subscriberwise Classification'
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
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
			credits: {
				enabled: false
			},
			series: [{
				title: {
					text: 'country',
					enabled: false
				},
				type: 'pie',
				name: 'Revenue',
				data: []
			}]
		}
	},
	"monthly": {
		"revService": {
			chart: {
				type: 'column',
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
				filename: "Rev Service Chart"
			},
			credits: false,
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
					text: 'Revenue($)'
				},
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
				name: 'International',
				data: []
			}, {
				name: 'National',
				data: []
			}]
		},
		"volUsageService": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			colors: ['#D6D9A6', '#C7CB85', '#7EA172'],
			title: {
				text: ''
			},
			exporting: {
				filename: "Volume Usage Service Chart"
			},
			credits: false,
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
					text: 'Transaction'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.2f}</b> of total<br/>'
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
				name: 'International',
				data: []
			}, {
				name: 'National',
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
			exporting: {
				filename: "Country Wise Chart"
			},
			credits: false,
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9',
				'#75B9BE'
			],
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0
				}
			},
			yAxis: {
				title: {
					text: 'Revenue($)'
				}
			},
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
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
				filename: "Plan Wise Chart"
			},
			credits: false,
			colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
				'#685369'
			],
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
					text: 'Revenue($)'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				formatter: planRevenueStackTooltipFormatter
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
			series: []
		},
		"subClassification": {
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
			colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
			exporting: {
				filename: 'Subscriberwise Classification'
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
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
			credits: {
				enabled: false
			},
			series: [{
				title: {
					text: 'country',
					enabled: false
				},
				type: 'pie',
				name: 'Revenue',
				data: []
			}]
		}
	},
	"customDate": {
		"revService": {
			chart: {
				type: 'column',
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
				filename: "Rev Service Chart"
			},
			credits: false,
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
					text: 'Revenue($)'
				},
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
				name: 'International',
				data: []
			}, {
				name: 'National',
				data: []
			}]
		},
		"volUsageService": {
			chart: {
				type: 'column',
				spacingBottom: 10,
				spacingTop: 10,
				spacingLeft: 10,
				spacingRight: 10
			},
			colors: ['#D6D9A6', '#C7CB85', '#7EA172'],
			title: {
				text: ''
			},
			exporting: {
				filename: "Volume Usage Service Chart"
			},
			credits: false,
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
					text: 'Transaction'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.2f}</b> of total<br/>'
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
				name: 'International',
				data: []
			}, {
				name: 'National',
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
			exporting: {
				filename: "Country Wise Chart"
			},
			credits: false,
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9',
				'#75B9BE'
			],
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
			},
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0
				}
			},
			yAxis: {
				title: {
					text: 'Revenue($)'
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
				filename: "Plan Wise Chart"
			},
			credits: false,
			colors: ['#869D96', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
				'#685369'
			],
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
					text: 'Revenue($)'
				},
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
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/>',
				formatter: planRevenueStackTooltipFormatter
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
			series: []
		},
		"subClassification": {
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
			colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
			exporting: {
				filename: 'Subscriberwise Classification'
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
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
			credits: {
				enabled: false
			},
			series: [{
				title: {
					text: 'country',
					enabled: false
				},
				type: 'pie',
				name: 'Revenue',
				data: []
			}]
		}
	}
}
var bizPostUnbillRevEmpty = {
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
				filename: "Empty Chart"
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
var mtdChartConfig = {
	"voiceMtd": {
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
			filename: 'Voice cumulative revenue chart'
		},
		colors: ['#605770', '#f39c12', '#7f8c8d', '#27ae60', '#34495e'],
		xAxis: {
			// categories: ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21', '04/22', '04/23', '04/24', '04/25', '04/26', '04/27', '04/28'],
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
				text: 'Revenue ($)'
			}
		},
		tooltip: {
			useHTML: true,
			shared: true,
			headerFormat: '<b>Day {point.x}</b><br/>',
			pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b><br/>'
		},
		series: [{
			name: '',
			data: []
		}, {
			name: '',
			data: []
		}, {
			name: '',
			data: []
		}]
	},
	"smsMtd": {
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
			filename: 'Sms cumulative revenue chart'
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
				text: 'Revenue ($)'
			}
		},
		tooltip: {
			useHTML: true,
			shared: true,
			headerFormat: '<b>Day {point.x}</b><br/>',
			pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b><br/>'
		},
		series: [{
			name: '',
			data: []
		}, {
			name: '',
			data: []
		}, {
			name: '',
			data: []
		}]
	},
	"dataMtd": {
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
			filename: 'Data cumulative revenue chart'
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
				text: 'Revenue ($)'
			}
		},
		tooltip: {
			useHTML: true,
			shared: true,
			headerFormat: '<b>Day {point.x}</b><br/>',
			pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b><br/>'
		},
		series: [{
			name: '',
			data: []
		}, {
			name: '',
			data: []
		}, {
			name: '',
			data: []
		}]
	},
	"topupMtd": {
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
			filename: 'Topup cumulative revenue chart'
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
				text: 'Revenue ($)'
			}
		},
		tooltip: {
			useHTML: true,
			shared: true,
			headerFormat: '<b>Day {point.x}</b><br/>',
			pointFormat: '<span style="color:{point.color}"> ● </span> {series.name}: <b>$ {point.y:,.0f}</b><br/>'
		},
		series: [{
			name: '',
			data: []
		}, {
			name: '',
			data: []
		}, {
			name: '',
			data: []
		}]
	},
};