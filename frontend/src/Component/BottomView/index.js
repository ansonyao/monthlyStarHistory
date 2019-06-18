import React, { Component } from 'react';
export default class BottomView extends Component {
  render() {
    const {containerStyle} = styles
    return (
        <div style={containerStyle}>
            <h5>Crafted by <a href="https://github.com/ansonyao" style={{color: "#00BCD4"}}>Anson Yao</a>, 2019.</h5>
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