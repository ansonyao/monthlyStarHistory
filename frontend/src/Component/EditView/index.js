import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import closeIcon from 'Image/closeIcon.svg'

export default class EditView extends Component {
    constructor(props) {
        super()
        const { framework } = props
        if (framework) {
            this.state = {
                name: framework.name,
                owner: framework.owner
            }
        } else {
            this.state = {
                name: "",
                owner: ""
            }
        }
    }

    handleChange = name => (event) => {
        if (name==='name') {
            this.setState({name: event.target.value})
        }
        if (name==='owner') {
            this.setState({owner: event.target.value})
        }
    }

    renderCloseIcon = () => {
        const {onCancelPressed} = this.props
        return (
            <button type="button" onClick={onCancelPressed}>
                <img src={closeIcon}/>
            </button>
        )
    }

  render() {
    const {name, owner} = this.state
    const {onSavePressed, framework} = this.props
      return (
          <div className="w-full h-full absolute top-0 left-0">
              <div className="flex items-center justify-around w-full h-full">
                  <div className="w-104 h-64 flex flex-col justify-around items-center bg-white rounded-sm shadow-lg">
                      <TextField
                          label="Repo owner"
                          value={owner}
                          onChange={this.handleChange('owner')}
                          margin="normal"
                      />
                      <TextField
                          label="Repo name"
                          value={name}
                          onChange={this.handleChange('name')}
                          margin="normal"
                      />
                      <div className="flex justify-between items-center">
                            <Button variant="contained" color="primary" onClick={() => onSavePressed(framework, owner, name)}>
                                Save
                            </Button>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
}