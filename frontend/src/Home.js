import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { thunks } from 'Redux/Reducers/Framework'
import Chart from './Component/ChartView/Chart'

class Home extends Component {
  componentDidMount(){
    this.props.dispatch(thunks.fetchHistory({owner: "Twotalltotems", name: "react-native-otp-input"}))
  }

  render() {
    return (
      <div className="App">
        <Chart/>
      </div>
    );
  }
}

const mapStateToProps = ({ framework }) => ({
  framework
})

export default connect(mapStateToProps)(Home)
