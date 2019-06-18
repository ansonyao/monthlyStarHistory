import React, { Component } from 'react';
import { Color } from 'Style';
import { Link } from "react-router-dom";
export default class HeaderView extends Component {
  render() {
    const {containerStyle, imgStyle, signupButtonStyle} = styles
    return (
        <div style={containerStyle}>
        <Link to={`/`} style={imgStyle}>
            <img style={imgStyle} src={require('Image/logo.png')}/>
        </Link>

        {/* <a href={"https://github.com/login/oauth/authorize?client_id=ae8fa41ab49c93b0c796"} style={{textDecoration: 'none'}}>
          <div style={signupButtonStyle}>
            <h5 style={{fontSize: 12, color: 'white'}}>Signin/Signup For Your Own Panel</h5>
          </div>
        </a> */}
        </div>
    )
  }
}

const styles = {
  containerStyle: {
    height: 50, 
    width: '100%', 
    backgroundColor: Color.secondaryLight, 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'start', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 30,
  },

  imgStyle: {
    width: 50,
    height: 50
  },

  signupButtonStyle: {
    height: 36, 
    paddingLeft: 20, 
    paddingRight: 20, 
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: "#00BCD4",
    marginRight: 30,
  }
}