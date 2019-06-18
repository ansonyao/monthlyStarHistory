import React, { Component } from 'react';
import { connect } from 'react-redux';
import {thunks} from 'Redux/Reducers/Category/index'
import {Line} from 'react-chartjs-2';
import { Month, Device } from 'MyUtils';
import { HeaderView } from 'Component'

var randomColor = require('randomcolor')
var colors = randomColor({count: 100})

class GithubChart extends Component {
	componentDidMount() {
		this.props.dispatch(thunks.fetchHistory(this.props.match.params.category))
	}

	getChartData = () => {
		if (!this.props.category) {
			 return [] 
		} else {
			const {history} = this.props.category
			if (!(history && history.length > 0)) {
				return []
			}
			const longest = history.reduce((x, y) => {
				if (x && x.history.length > y.history.length ) {
					return x
				} else {
					return y
				}
			})
			var result = {}
			result.labels = longest.history.map( x => `${Month.monthIndexToName(x.month)}, ${x.year}`)
			result.datasets = history.map((x, index) => {
				var fillZero = (array, length) => {
					var result = Array(length - array.length).fill('N/A')
					return result.concat(array)
				}
				const color = colors[index]
				return {
					label: x.name,
					fill: false,
					backgroundColor: color,
					borderColor: color,
					data: fillZero(x.history.map(x => x.value), longest.history.length)
				}
			})
			return result
		}
	}

	getChartOption = () => {
		return {
			responsive: true,
			maintainAspectRatio: Device.isOnSmallScreen() ? false : true,
			aspectRatio: 1,
			title: {
				display: true,
				text: 'Monthly Data'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: false
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					},
					ticks: {
						stepSize: 6,
						unitStepSize: 5
					},
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Github Star'
					}
				}]
			}
		}
	}

  render() {
    return (
			<div>
				<HeaderView />
				<div style={{ marginTop: 20, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
					<div style={{ width: '80%' }}>
						{this.renderChart()}
					</div>
				</div>
			</div>
    );
	}
	
	renderChart() {
		if (Device.isOnSmallScreen()) {
			return (
				<Line data={this.getChartData()} options={this.getChartOption()} height={400} />
			)
		} else {
			return ( 
				<Line data={this.getChartData()} options={this.getChartOption()} />
			)
		}
	}
}

const mapStateToProps = ({category}) => ({
    category
})

const mapDispatchToProps = dispatch => ({
	dispatch
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GithubChart)

