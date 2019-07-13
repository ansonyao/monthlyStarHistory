import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions, { thunks } from 'Redux/Reducers/Framework'
import { FrameworkCardView, HeaderView, ChartView, EditView } from 'Component'
import _ from 'lodash'
import { createFramework } from 'MyUtils/Framework'

class Home extends Component {
  state = {
    showEditView: false,
    addingNewCard: false,
    editedFramework: null
  }

  render() {
    return (
      <div className="w-full h-full relative">
        <HeaderView />
        <div style={{'display': 'flex', 'flex-direction': 'row', marginLeft: '15%', marginRight: '15%', marginTop: 20, marginBottom: 20}}>
          {this.renderCards()}
        </div>
        <ChartView />
        {this.renderEditView()}
      </div>
    );
  }

  renderEditView = () => {
    const { showEditView, addingNewCard, editedFramework } = this.state
    const { dispatch } = this.props
    if (showEditView) {
      return (
        <EditView
          onSavePressed={(framework, owner, name) => {
            if (addingNewCard) {
              const frameworkRecrod = createFramework(owner, name)
              dispatch(actions.addFramework(frameworkRecrod))
              dispatch(thunks.fetchHistory(frameworkRecrod.framework))
            } else {
              dispatch(actions.updateFramework(framework, owner, name))
              let newFramework = _.cloneDeep(framework)
              newFramework.owner = owner
              newFramework.name = name
              dispatch(thunks.fetchHistory(newFramework))
            }
            this.setState({ showEditView: false, addingNewCard: false })
          }}
          onCancelPressed={() => {
            this.setState({ showEditView: false, addingNewCard: false })
          }}
          framework={editedFramework}
        />
      ) 
    } else {
      return null
    }
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
          loading={item.loading}
          dataError={item.dataError}
          onPressAdd={() => {
            this.setState({showEditView: true, addingNewCard: true})
          }}
          onPressEdit={() => {
            this.setState({showEditView: true, addingNewCard: false, editedFramework: item.framework})
          }}
          onPressRemove={(framework) => {
            dispatch(actions.removeFramework(framework))
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
