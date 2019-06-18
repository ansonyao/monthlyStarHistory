import React, { Component } from 'react';
import axios from 'axios'
import queryString from 'query-string';
import API from 'Service'

export default class AuthCallBackPage extends Component {
  componentDidMount() {
    let params = queryString.parse(this.props.location.search)
    const code = params.code
    console.log(code)
    API.getGithubAccessToken(code).then(response => {
      console.log(response)
    }).catch((e) => {
      console.log(e)
    })
  }

  render() {
    const {containerStyle} = styles
    return (
        <div style={containerStyle}>
            <h5>Loading</h5>
        </div>
    )
  }
}

const styles = {
  containerStyle: {
    height: 50, 
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
  },
}