var bizPreRevArpu = {
	"emptyconfig": {
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
		legend: {
			itemDistance: 20,
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
				text: 'Date',
				enabled: false
			}
		}],
		yAxis: [{ // Primary yAxis
			labels: {
				format: '',
			},
			title: {
				text: 'ARPU',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
		}, { // Secondary yAxis
			title: {
				text: 'Revenue ($) / Count (k)',
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
			name: 'ARPU',
			colors: ['#039be5'],
			type: 'column',
			data: [],
			tooltip: {
				valueSuffix: ' '
			}
		}, {
			name: 'Revenue',
			type: 'spline',
			yAxis: 1,
			colors: ['#50bcb6'],
			data: [],
			tooltip: {
				valuePrefix: '$'
			}
		}, {
			name: 'User Count',
			type: 'spline',
			yAxis: 1,
			colors: ['#50bcb6'],
			data: []
		}],
		navigation: {
			buttonOptions: {
				y: -10
			}
		}
	},
	"arpu": {
		chart: {
			zoomType: 'xy',
			spacingBottom: 10,
			spacingTop: 10,
			spacingLeft: 10,
			spacingRight: 10
		},
		colors:['#00bcd4', '#34495e', '#ED6A5A'],
		title: {
			text: ''
		},
		exporting: {
			filename: "ARPU Chart"
		},
		legend: {
			itemDistance: 20,
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
				text: 'ARPU',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
		}, { // Secondary yAxis
			title: {
				text: 'Revenue ($) / Count ',
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
			name: 'ARPU',
			colors: ['#039be5'],
			type: 'column',
			data: [],
			tooltip: {
				valueSuffix: ' '
			}
		}, {
			name: 'Revenue',
			type: 'spline',
			yAxis: 1,
			colors: ['#50bcb6'],
			data: [],
			tooltip: {
				valuePrefix: '$'
			}
		}, {
			name: 'User Count',
			type: 'spline',
			yAxis: 1,
			colors: ['#50bcb6'],
			data: []
		}],
		navigation: {
			buttonOptions: {
				y: -10
			}
		}
	}
}