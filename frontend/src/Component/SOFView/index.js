import React, { Component } from 'react';
import { FrameworkViewSOF } from 'Component';
import { FontSize, Color } from 'Style';

export default class StackView extends Component {
  render() {
    const {frameworks} = this.props
    if (frameworks.length > 0) {
      return (
        <div 
          style={this.props.style}
        >
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          <div style={{fontSize: FontSize.md, marginRight: 5}}>StackOverflow</div>
          <img  style={{width: 20, height: 20}} src={require('Image/soficon.png')}/>
          <a target="_blank" href={this.generateURL()} style={{marginLeft: 95, color: "#00BCD4", fontWeight: 'bold', fontSize: FontSize.md}}>Monthly Change</a>
        </div>
          {frameworks.map((item) => <FrameworkViewSOF key={item.name} framework={item} percentage={item.stScore/frameworks[0].stScore}/>)}
        </div>
      );
    } else {
      return null
    }
  }

  generateURL = () => {
    let baseURL = "https://insights.stackoverflow.com/trends?tags="
    const { frameworks } = this.props
    for( let framework of frameworks) {
      baseURL += framework.stTag
      baseURL += ","
    }
    return baseURL.slice(0, -1)
  }
}