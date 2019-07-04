import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import actions, { thunks } from 'Redux/Reducers/Framework'
import Chart from './Component/ChartView/Chart'
import { FrameworkCardView, HeaderView } from 'Component'
import _ from 'lodash'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <HeaderView />
        <div style={{'display': 'flex', 'flex-direction': 'row', marginLeft: '15%', marginRight: '15%', marginTop: 20, marginBottom: 20}}>
          {this.renderCards()}
        </div>
        <Chart/>
      </div>
    );
  }

  renderCards = () => {
    const { dispatch } = this.props
    const { data } = this.props.framework
    let source = _.cloneDeep(data)
    source.push( {type: "addCard"} )
    return source.map((item, index) => {
      return (
        <FrameworkCardView
          key={index}
          type={item.type} 
          framework={item.framework}
          isLoading={!(item.result && item.result.length > 0)}
          addFramework={() => {
            dispatch(actions.addFramework())
          }}
          removeFramework={(framework) => {
            dispatch(actions.removeFramework(framework))
          }}
          updateFramework={(framework, owner, name) => {
            dispatch(actions.updateFramework(framework, owner, name))
            let newFramework = _.cloneDeep(framework)
            newFramework.owner = owner
            newFramework.name = name
            if((owner !== "repo owner") && (name !== "name")) {
              console.log('dispatch fetch history action')
              dispatch(thunks.fetchHistory(newFramework))
            }
          }}
        />
      )
    })
  }
}

const mapStateToProps = ({ framework }) => ({
  framework
})



export default connect(mapStateToProps)(Home)
