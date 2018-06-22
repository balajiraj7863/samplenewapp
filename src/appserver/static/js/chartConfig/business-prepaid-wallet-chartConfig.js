var bizPreRevWallet = {
	"walletReportVoice": {
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
		colors: ['#1982C4', '#8AC926'],
		exporting: {
			filename: 'Voice Revenue-Wallet Wise Report'
		},
		credits: false,
		xAxis: {
			categories: [],
			crosshair: true,
			labels: {
				rotation: -25,
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
			pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.0f}</b> of total<br/>'
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
			name: 'MA Purchases',
			data: []
		}, {
			name: 'DA Purchases',
			data: []
		}]
	},
	"walletReportSms": {
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
		colors: ['#1982C4', '#8AC926'],
		exporting: {
			filename: 'SMS Revenue-Wallet Wise Report'
		},
		credits: false,
		xAxis: {
			categories: [],
			crosshair: true,
			labels: {
				rotation: -25,
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
			pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.0f}</b> of total<br/>'
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
			name: 'MA Purchases',
			data: []
		}, {
			name: 'DA Purchases',
			data: []
		}]
	},
	"walletReportData": {
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
		colors: ['#1982C4', '#8AC926'],
		exporting: {
			filename: 'Data Revenue-Wallet Wise Report'
		},
		credits: false,
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
			pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>$ {point.y:,.0f}</b> of total<br/>'
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
			name: 'MA Purchases',
			data: []
		}, {
			name: 'DA Purchases',
			data: []
		}]
	},
}
var bizPreRevWalletEmpty = {
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
			filename : "Empty Chart"
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