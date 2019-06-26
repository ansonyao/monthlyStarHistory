import React, { Component } from 'react';

class FrameworkCardView extends Component {
    componentWillReceiveProps(nextProps) {
        const { framework } = nextProps
        let owner = ""
        let name = ""
        if (framework) {
            owner = framework.owner
            name = framework.name
        }
        this.setState({
            owner, name
        })
    }

    render() {
        const { cardContainer } = styles
        const { type, framework, addFramework } = this.props
        if (type === "addCard") {
            return (
                <div style={cardContainer} onClick={() => {
                    addFramework()
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
                >
                  {this.renderName(framework.name)}
                  {this.renderOwner(framework.owner)}
                  {this.renderDeleteButton()}
                </div>
            )
        }
    }

    renderDeleteButton = () => {
        const { showRemoveButton } = this.state;
        const { removeFramework, framework } = this.props;
        if (showRemoveButton) {
            return (
                <img 
                    style={{width: 30, height: 50, marginLeft: 100, bottom: 0, right: 10}} 
                    src={require('Image/delete.svg')}
                    onClick={() => {
                        removeFramework(framework)
                    }}
                />
            )
        } else {
            return (<div style={{width: 30, height: 50}}></div>)
        }
    }

    renderName = () => {
        const { isEditingName, owner, name } = this.state
        const { framework, updateFramework } = this.props
        if (isEditingName) {
            return (
                <input 
                    autoFocus
                    onBlur={() => {
                        this.setState({isEditingName: false})
                        updateFramework(framework, owner, name)
                    }}
                    onChange={(event) => {
                        this.setState({name: event.target.value})
                    }}
                    value={name}
                />
            )
        } else {
            return (
                <label onClick={() => {
                    this.setState({isEditingName: true})
                }}>
                    {name}
                </label>
            )
        }
    }

    renderOwner = () => {
        const { isEditingOwner, owner, name } = this.state
        const { framework, updateFramework } = this.props
        if (isEditingOwner) {
            return (
                <input 
                    autoFocus
                    onBlur={() => {
                        this.setState({isEditingOwner: false})
                        updateFramework(framework, owner, name)
                    }}
                    onChange={(event) => {
                        this.setState({owner: event.target.value})
                    }}
                    value={owner}
                />
            )
        } else {
            return (
                <label onClick={()=>{
                    this.setState({isEditingOwner: true})
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

