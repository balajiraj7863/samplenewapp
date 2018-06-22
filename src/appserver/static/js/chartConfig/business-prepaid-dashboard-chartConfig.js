var revchartConfig = {
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
		filename: "Revenue Chart"
	},
	credits: false,
	legend: {
		itemDistance: 20,
		padding: 0,
		itemMarginTop: 4,
		itemMarginBottom: 2
	},
	colors: ['#69c5e4', '#fdb94e'],
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
			text: 'Revenue ($)',
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
var incidentPriorityChart = {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: 0,
		plotShadow: false,
		spacingBottom: 0,
		spacingTop: 0,
		spacingLeft: 0,
		spacingRight: 0
	},
	exporting: {
		filename: 'Incident priority chart'
	},
	title: {
		text: ''
	},
	legend: {
		itemDistance: 20,
		padding: 0,
		itemMarginTop: 4,
		itemMarginBottom: 2
	},
	tooltip: {
		headerFormat: '<b>Incident Priority</b><br/>',
		pointFormat: '<b><span style="color:{point.color}">{point.name}</span></b> : {point.y}'
	},
	credits: {
		enabled: false
	},
	plotOptions: {
		pie: {
			dataLabels: {
				enabled: true,
				distance: 50,
				style: {
					fontWeight: 'bold'
				},
				enabled: true,
				format: '{point.name} : <b>{point.percentage:.1f}%</b>'
			},
			startAngle: -90,
			endAngle: 90,
			center: ['50%', '75%']
		}
	},
	series: [{
		type: 'pie',
		name: 'Incidents Count',
		innerSize: '40%',
		data: [{
				name: 'P1',
				y: 0,
				color: '#ff0000'
			},
			{
				name: 'P2',
				y: 0,
				color: '#ef5956'
			},
			{
				name: 'P3',
				y: 0,
				color: '#f69653',
			},
			{
				name: 'P4',
				y: 0,
				color: '#fdb94e'
			}
		]
	}]
};
var topupByChannelConfig =  {
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
		filename: 'Topup by channel chart'
	},
	legend: {
		itemDistance: 10,
		padding: 0,
		itemMarginTop: 4,
		itemMarginBottom: 2
	},
	credits: false,
	colors: ['#69c5e4', '#fdb94e'],
	xAxis: [{
		categories: [],
		crosshair: true,
		labels: {
			rotation: 0
		},
		title: {
			text: 'Channels',
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
			text: 'Revenue ($)',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		},
	}, { // Secondary yAxis
		title: {
			text: 'Topup Count'
		},
		labels: {
			format: '',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		},
		opposite: true
	}],
	tooltip: {
		shared: true,
		headerFormat: '<b>{point.x}</b><br/>'
	},
	series: [{
		name: 'Topup',
		type: 'column',
		yAxis: 1,
		data: [],
		tooltip: {
			valueSuffix: ' '
		}

	}, {
		name: 'Revenue',
		type: 'spline',
		data: [],
		tooltip: {
			valuePrefix: '$'
		},
		marker: {
			lineWidth: 2,
			lineColor: '#f7a35c',
			fillColor: 'white'
		}
	}]
};
var subchartConfig = {
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
		filename: "Subscriber trend Chart"
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
var topupTrendConfig = {
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
		filename: "Topup trend Chart"
	},
	credits: false,
	legend: {
		itemDistance: 20,
		padding: 0,
		itemMarginTop: 4,
		itemMarginBottom: 2
	},
	colors: ['#00bcd4', '#fdb94e'],
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
			text: 'Topup Count',
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
		formatter: eval("topupChartTooltip"),
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
