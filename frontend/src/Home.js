import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { thunks } from 'Redux/Reducers/Framework'
import Chart from './Component/ChartView/Chart'
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
    const { cardContainer } = styles
    let source = _.cloneDeep(data)
    source.push( {type: "addCard"} )
    return source.map((item) => {
      if (item.type === "addCard") {
        return (
          <div style={cardContainer}>
            <img style={{width: 40, height: 40}} src={require('Image/addLibrary.svg')}/>
          </div>
        )
      } else {
        return (
          <div style={cardContainer}>
            <label>
              {item.framework.name}
            </label>
            <label>
              {item.framework.owner}
            </label>
          </div>
        )
      }
    })
  }
}

const mapStateToProps = ({ framework }) => ({
  framework
})

const styles = {
  cardContainer: {
    'width': 150,
    'height': 150,
    'border': '2px solid #a1887f',
    'border-radius': '5px',
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'space-around',
    'margin-left': '10px',
    'margin-right': '10px',
  }
}

export default connect(mapStateToProps)(Home)
