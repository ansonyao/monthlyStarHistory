import React, { Component } from 'react';

class FrameworkCardView extends Component {
    state = {
        isEditingOwner: false,
        isEditingName: false,
    }

    render() {
        const { cardContainer } = styles
        const { type, framework } = this.props
        if (type === "addCard") {
            return (
              <div style={cardContainer}>
                <img style={{width: 40, height: 40}} src={require('Image/addLibrary.svg')}/>
              </div>
            )
        } else {
            return (
                <div style={cardContainer} onClick={()=>{
                    this.setState({isEditingName: false, isEditingOwner: false})
                }}>
                  {this.renderName(framework.name)}
                  {this.renderOwner(framework.owner)}
                </div>
            )
        }
    }

    renderName = (name) => {
        const { isEditingName } = this.state
        if (isEditingName) {
            return (
                <input onClick={(event) => {
                    event.stopPropagation()
                }}/>
            )
        } else {
            return (
                <label onClick={(event)=>{
                    this.setState({isEditingName: true})
                    event.stopPropagation()
                }}>
                    {name}
                </label>
            )
        }
    }

    renderOwner = (owner) => {
        const { isEditingOwner } = this.state
        if (isEditingOwner) {
            return (
                <input onClick={(event) => {
                    event.stopPropagation()
                }}/>
            )
        } else {
            return (
                <label onClick={(event)=>{
                    this.setState({isEditingOwner: true})
                    event.stopPropagation()
                }}>
                    {owner}
                </label>
            )
        }
    }
}

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


export default FrameworkCardView

