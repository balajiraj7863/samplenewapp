var unbillRevchartConfig = {
	chart: {
		zoomType: 'xy'
	},
	title: {
		text: ''
	},
	exporting: {
		filename: "Unbilled Postpaid Revenue Chart"
	},
	credits: false,
	colors: ['#69c5e4', '#fdb94e'],
	xAxis: [{
		// categories: ['IVR','USSD','Kiosks','Self Care','Mobile Apps'],
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
			format: '',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		},
		title: {
			text: 'Unbilled Revenue ($)',
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
		formatter: eval("revenueChartTooltip"),
		shared: true
	},
	series: [{
		name: 'Current Week',
		type: 'column',

		data: [],
		tooltip: {
			valuePrefix: '$'
		}

	}, {
		name: 'Last Week',
		type: 'spline',
		data: [],
		tooltip: {
			valuePrefix: '$'
		}
	}]
};
var subchartConfig = {
	chart: {
		zoomType: 'xy'
	},
	title: {
		text: ''
	},
	exporting: {
		filename: "Subscriber Chart"
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
			format: '',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		},
		title: {
			text: 'Subscribers',
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
		formatter: eval("subscriberChartTooltip"),
		shared: true
	},
	series: [{
		name: 'Current Week',
		type: 'column',

		data: [],
		tooltip: {
			valueSuffix: ''
		}

	}, {
		name: 'Last Week',
		type: 'spline',
		data: [],
		tooltip: {
			valueSuffix: ''
		}
	}]
};
var adjchartConfig = {
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
		filename: "Adjustments(Last Bill Cycle) Chart"
	},
	colors: ['#039be5', '#3498db'],
	xAxis: {
		categories: [],
		crosshair: true,
		labels: {
			rotation: 0,
			formatter: dateFormatter
		},
		title: {
			text: 'Adjusted Subscribers Category',
			enabled: false
		}
	},
	yAxis: [{
		min: 0,
		title: {
			text: 'Adjusted Subscribers'
		}
	}, {
		min: 0,
		title: {
			text: 'Amount($)',
			y: 10
		},
		opposite: true
	}],
	legend: {
		itemDistance: 10,
		padding: 0,
		itemMarginTop: 4,
		itemMarginBottom: 2
	},
	tooltip: {
		shared: true,
		headerFormat: '<b>{point.x,.2f}</b><br/>'
	},
	plotOptions: {
		column: {
			grouping: false,
			shadow: false,
			borderWidth: 0
		}
	},
	credits: {
		enabled: false
	},
	series: [{
		name: 'Adjusted Subscribers',
		color: 'rgba(186,60,61,0.8)',
		data: [],
		pointPadding: 0.1,
	}, {
		name: 'Amount',
		color: 'rgba(248, 161, 63, 1)',
		data: [],
		tooltip: {
			valuePrefix: '$',
		},
		pointPadding: 0.3,
		yAxis: 1
	}]
};
var MNPchartConfig = {
	chart: {
		type: 'column',
		zoomType: 'x',
		spacingBottom: 10,
		spacingTop: 10,
		spacingLeft: 10,
		spacingRight: 10
	},
	title: {
		text: ''
	},
	credits: false,
	colors: ["#5f6c72", "#2980b9", "#fd7622", "#019b1b"],
	exporting: {
		filename: 'MNP chart'
	},
	legend: {
		itemDistance: 20,
		padding: 0,
		itemMarginTop: 4,
		itemMarginBottom: 2
	},
	tooltip: {
		useHTML: true,
		shared: true,
		headerFormat: '<b>{point.x}</b><br/>'
	},
	xAxis: {
		categories: [],
		crosshair: true,
		type: 'dateTime',
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
		allowDecimals: false,
		min: 0,
		title: {
			text: 'Subscribers'
		}
	},
	plotOptions: {
		column: {
			stacking: 'normal'
		}
	},
	series: [{
		name: 'Port In',
		data: [],
		cursor: 'pointer',
		stack:'male'
	}, {
		name: 'Port Out',
		data: [],
		cursor: 'pointer',
		stack:'female'
	}, {
		name: 'Lastweek Port In',
		data: [],
		type: 'line'
	}, {
		name: 'Lastweek Port Out',
		data: [],
		type: 'line'
	}]
};
var paymentchartConfig = {
	chart: {
		zoomType: 'xy',
		spacingBottom: 10,
		spacingTop: 10,
		spacingLeft: 10,
		spacingRight: 10
	},
	colors: ['#8ec06c', '#b3dcff', '#537b35', '#00a0f0'],
	title: {
		text: ''
	},
	exporting: {
		filename: "Postpaid_payments_Chart"
	},
	legend: {
		itemDistance: 30,
		padding: 0,
		itemMarginTop: 4,
		itemMarginBottom: 2
	},
	credits: false,
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
			format: '',
		},
		title: {
			text: 'Payment Amount($)',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		},
	}, { // Secondary yAxis
		title: {
			text: 'Payment Req.',
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
		headerFormat: '<b>{point.x}</b><br/>'
	},
	series: [{
		name: 'Liberate Count',
		colors: ['#039be5'],
		type: 'column',
		yAxis: 1,
		data: "",
		tooltip: {
			valueSuffix: ' '
		}
	}, {
		name: 'Cerillion Count',
		colors: ['#fdb94e'],
		type: 'column',
		yAxis: 1,
		data: [],
		tooltip: {
			valueSuffix: ' '
		}

	}, {
		name: 'Liberate Payments',
		type: 'spline',
		colors: ['#50bcb6'],
		data: "",
		tooltip: {
			valuePrefix: '$'
		}
	}, {
		name: 'Cerillion Payments',
		type: 'spline',
		colors: ['#50bcb6'],
		data: [],
		tooltip: {
			valuePrefix: '$'
		}
	}],
	navigation: {
		buttonOptions: {

			y: -10
		}
	}
};
var bizPostEmpty = {
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
				enabled:false
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