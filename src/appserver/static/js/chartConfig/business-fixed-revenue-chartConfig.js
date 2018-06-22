var bizFixedRev = {
	"lastBillCycle": {
		"newOrderChrun": {
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
				filename: "New Orders Revenue Churn Chart"
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
			colors: ['#00978F', '#e66760'],
			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
			},

			series: [{
				name: 'Revenue',
				colorByPoint: true,
				data: [{
					name: 'New Orders',
					y: 0,
					drilldown: false
				}, {
					name: 'Revenue Churn',
					y: 0,
					drilldown: false
				}]
			}]
		},
		"servicewise": {
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
				filename: "Servicewise Revenue View Chart"
			},
			credits: false,
			xAxis: {
				categories: ['Telephone', 'Broadband', 'IPTV'],
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
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
					}
				}
			},
			series: [{
				name: 'Telephone',
				data: []
			}, {
				name: 'Broadband',
				data: []
			}, {
				name: 'IPTV',
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
				filename: 'Consolidated Revenue - Countrywise View Chart'
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
			exporting: {
				filename: "Planwise Revenue View Chart"
			},
			title: {
				text: ''
			},
			credits: false,
			colors: ['#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#8eb55c',
				'#FBB02D'],
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
			},
			series: [{
				name: 'Revenue',
				data: [],

				dataLabels: {
					format: '{point.name}: {point.percentage:.2f}%',
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
			exporting: {
				filename: 'Subscriberwise Classification'
			},
			title: {
				text: ''
			},
			colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4'],
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
			}, exporting: {
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
					name: 'Voice',
					y: 0,
					drilldown: false
				}, {
					name: 'Broadband',
					y: 0,
					drilldown: false
				}, {
					name: 'IPTV',
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
			}, exporting: {
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
					name: 'Home',
					y: 0,
					drilldown: false
				}, {
					name: 'Roaming',
					y: 0,
					drilldown: false
				}]
			}]
		}
	},
	"lastSixBillCycle": {
		"newOrderChrun": {
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
				filename: 'New Orders Revenue Churn Chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			credits: false,
			colors: ['#00978F', '#e66760'],
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0,
					formatter: dateFormatter
				},
				title: {
					text: 'Bill cycle dates',
					enabled: false
				}
			},
			yAxis: {
				allowDecimals: false,
				min: 0,
				title: {
					text: 'Revenue($)'
				}
			},
			tooltip: {
				shared: true,
				useHTML: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
			},
			plotOptions: {
				column: {
					stacking: 'normal'
				}
			},
			series: []
		},
		"servicewise": {
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
			colors: ['#00bcd4', '#7986CB', '#fdb94e'],
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
					text: 'Revenue($)'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
					}
				}
			},
			exporting: {
				filename: 'Revenue'
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
			exporting: {
				filename: "Consolidated Revenue - Countrywise View Chart"
			},
			credits: false,
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9', '#75B9BE'],
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
					text: 'Revenue($)'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
				shadow: false
			},
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: false,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
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
				filename: "Planwise Revenue View Chart"
			},
			credits: false,
			colors: ['#C3D2D5', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
				'#685369'],
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
					text: 'Revenue($)'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					},
					formatter: planwiseStackDatalabelFormatter
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
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
		"servicewisedata": {
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
				filename: "Servicewise Revenue View Chart"
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
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
					}
				}
			},
			series: [{
				name: 'Home',
				data: []
			}, {
				name: 'Roaming',
				data: []
			}]
		}
	},
	"lastSixMonths": {
		"newOrderChrun": {

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
				filename: 'New Orders Revenue Churn Chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			credits: false,
			colors: ['#00978F', '#e66760'],
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0
				},
				title: {
					text: 'Bill cycle dates',
					enabled: false
				}
			},
			yAxis: {
				allowDecimals: false,
				min: 0,
				title: {
					text: 'Revenue($)'
				}
			},
			tooltip: {
				shared: true,
				useHTML: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
			},
			plotOptions: {
				column: {
					stacking: 'normal'
				}
			},
			series: []
		},
		"servicewise": {

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
				filename: "Servicewise Revenue View Chart"
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
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
					}
				}
			},
			series: [{
				name: 'Telephone',
				data: []
			}, {
				name: 'Broadband',
				data: []
			}, {
				name: 'IPTV',
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
				filename: "Consolidated Revenue - Countrywise View Chart"
			},
			credits: false,
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9', '#75B9BE'],
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
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
				shadow: false
			},
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: false,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
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
				filename: "Planwise Revenue View Chart"
			},
			credits: false,
			colors: ['#C3D2D5', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
				'#685369'],
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
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					},
					formatter: planwiseStackDatalabelFormatter
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
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
		"newOrderChrun": {

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
				filename: 'New Orders Revenue Churn Chart'
			},
			legend: {
				itemDistance: 10,
				padding: 0,
				itemMarginTop: 4,
				itemMarginBottom: 2
			},
			credits: false,
			colors: ['#00978F', '#e66760'],
			xAxis: {
				categories: [],
				crosshair: true,
				labels: {
					rotation: 0
				},
				title: {
					text: 'Bill cycle dates',
					enabled: false
				}
			},
			yAxis: {
				allowDecimals: false,
				min: 0,
				title: {
					text: 'Revenue($)'
				}
			},
			tooltip: {
				shared: true,
				useHTML: true,
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> of total<br/>'
			},
			plotOptions: {
				column: {
					stacking: 'normal'
				}
			},
			series: []
		},
		"servicewise": {
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
				filename: "Servicewise Revenue View Chart"
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
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
					}
				}
			},
			series: [{
				name: 'Telephone',
				data: []
			}, {
				name: 'Broadband',
				data: []
			}, {
				name: 'IPTV',
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
				filename: "Consolidated Revenue - Countrywise View Chart"
			},
			credits: false,
			colors: ['#C7D66D', '#C6D8AF', '#DCEAB2', '#B3D6C6', '#A8CCC9', '#75B9BE'],
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
					text: 'Revenue($)'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
				shadow: false
			},
			tooltip: {
				useHTML: true,
				shared: true,
				headerFormat: '<b>{point.x}</b><br/><br/>',
				pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b><br/>'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: false,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
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
				filename: "Planwise Revenue View Chart"
			},
			credits: false,
			colors: ['#C3D2D5', '#C6D8AF', '#DBD8B3', '#FCC8B2', '#EFA48B',
				'#685369'],
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
					text: 'Revenue($)'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					},
					formatter: planwiseStackDatalabelFormatter
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
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

var bizFixedRevEmpty = {
	"emptyChartConfig": {
		"emptyChart": {
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
					text: 'Date',
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
						color: (Highcharts.theme && Highcharts.theme.textColor)
							|| 'gray'
					}
				}
			},
			legend: {
				itemDistance: 20,
				padding: 2,
				itemMarginTop: 4,
				itemMarginBottom: 2,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2)
					|| 'white',
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
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
							|| 'white'
					}
				}
			},
			series: []
		},
	}
}