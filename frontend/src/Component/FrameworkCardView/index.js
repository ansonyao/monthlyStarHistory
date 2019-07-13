import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line, Circle } from 'rc-progress';
import errorIcon from 'Image/error-icon.png';

class FrameworkCardView extends Component {
    static propTypes = {
        onPressAdd: PropTypes.func,
        onPressRemove: PropTypes.func,
        type: PropTypes.string,
        framework: PropTypes.object,
    }

    constructor() {
        super()
        this.state = {
            showRemoveButton: false,
        }
    }

    render() {
        const { cardContainer } = styles
        const { type, framework, onPressAdd, onPressEdit } = this.props
        if (type === "addCard") {
            return (
                <div style={cardContainer} onClick={() => {
                    onPressAdd()
                }}>
                    <img style={{ width: 40, height: 40 }} src={require('Image/addLibrary.svg')} />
                </div>
            )
        } else {
            return (
                <div style={cardContainer} 
                    onMouseEnter={() => {
                        this.setState({showRemoveButton: true})
                    }}
                    onMouseLeave={() => {
                        this.setState({showRemoveButton: false})
                    }}
                    onClick={onPressEdit}
                >
                  {this.renderOwner(framework.owner)}
                  {this.renderName(framework.name)}
                  {this.renderLoadingIndicator()}
                  {this.renderDeleteButton()}
                </div>
            )
        }
    }

    renderDeleteButton = () => {
        const { showRemoveButton } = this.state;
        const { onPressRemove, framework } = this.props;
        if (showRemoveButton) {
            return (
                <img 
                    style={{width: 30, height: 50, marginLeft: 100, bottom: 0, right: 10}} 
                    src={require('Image/delete.svg')}
                    onClick={(event) => {
                        event.stopPropagation()
                        onPressRemove(framework)
                    }}
                />
            )
        } else {
            return (<div style={{width: 30, height: 50}}></div>)
        }
    }

    renderName = () => {
        const { framework: { name } } = this.props
        return (
            <div className="w-full text-center" >
                {name}
            </div>
        )
    }

    renderOwner = () => {
        const { framework: { owner } } = this.props
        return (
            <div className="w-full text-center" >
                {owner}
            </div>
        )
    }

    renderLoadingIndicator = () => {
        const { loading, dataError, total, worked } = this.props
        let percentage = 0
        if (total) {
            percentage = Math.round((worked / total) * 100)
        }
        if (loading) {
            return (
                <div className="w-8 h-8">
                    <Circle percent={`${percentage}`} strokeWidth="4" strokeColor="#D3D3D3" />
                </div>
            )
        } else if (dataError) {
            return <img src={errorIcon} className="w-8"/>
        } else {
            return null
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

