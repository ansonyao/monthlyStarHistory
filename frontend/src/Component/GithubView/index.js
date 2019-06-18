import React, { Component } from 'react';
import { FrameworkViewGithub } from 'Component';
import { FontSize } from 'Style';
import { Link } from "react-router-dom";

export default class GithubView extends Component {

  render() {
    const {frameworks, category} = this.props
    if (frameworks.length > 0) {
      return (
        <div style={this.props.style}>
          <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
            <div style={{fontSize: FontSize.md, marginRight: 5}}>Github</div>
            <img  style={{width: 20, height: 20}} src={require('Image/githubIcon.png')}/>
            <Link to={`/chart/${category}`} style={{marginLeft: 145, color: "#00BCD4", fontWeight: 'bold', fontSize: FontSize.md}}>Monthly Change</Link>
          </div>
          {frameworks.map((item) => <FrameworkViewGithub framework={item} key={item.name} percentage={item.githubScore/frameworks[0].githubScore}/>)}
        </div>
      );
    } else {
      return null
    }
  }

  generateURL = () => {
    return `/chart/`
  }
}