import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { thunks } from 'Redux/Reducers/Framework'
import Chart from './Component/ChartView/Chart'
import { FrameworkCardView } from 'Component'
import _ from 'lodash'

class Home extends Component {
  componentDidMount(){
    this.props.dispatch(thunks.fetchHistory({owner: "Twotalltotems", name: "react-native-otp-input"}))
  }

  render() {
    return (
      <div className="App">
        <div style={{'display': 'flex', 'flex-direction': 'row', marginLeft: '15%', marginRight: '15%', marginTop: 20, marginBottom: 20}}>
          {this.renderCards()}
        </div>
        <Chart/>
      </div>
    );
  }

  renderCards = () => {
    const { data } = this.props.framework
    let source = _.cloneDeep(data)
    source.push( {type: "addCard"} )
    return source.map((item) => {
      return (
        <FrameworkCardView type={item.type} framework={item.framework}/>
      )
    })
  }
}

const mapStateToProps = ({ framework }) => ({
  framework
})



export default connect(mapStateToProps)(Home)
