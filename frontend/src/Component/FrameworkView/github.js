import React, { Component } from 'react'
import { BarView } from 'Component'
import { Color, FontSize } from 'Style'
import { Score, Device } from 'MyUtils'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'

export default class FrameworkViewGithub extends Component {
  getChangeScore = () => {
    const {framework} = this.props
    return Score.formatScoreChange(framework.monthDeltaGithub)
  }

  getMonthlyChangeTooltip = () => {
    const {framework} = this.props
    if (this.getChangeScore().includes("N/A")) {
      return "Have not got enough data to show this value"
    } else {
      return "Monthly change"
    }
  }

  getValueToolTip = () => {
    const {framework} = this.props
    return `Stars of Github Repo: ${framework.githubOwner}/${framework.githubName}`
  }

  getWidthOfBar = () => {
    return Device.isOnSmallScreen ? 100 : 200
  }

  render() {
    const {framework, percentage} = this.props
    const numberChangeColor = Score.getScoreColor(framework.monthDeltaGithub)
    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', height: 20 }}>
        <div style={{ width: this.getWidthOfBar() }}>
          <BarView
            percentage={percentage}
          />
        </div>
        <div 
          style={{ textAlign: 'right', fontSize: FontSize.md, marginLeft: 5, marginRight: 0, width: 80, whiteSpace: 'no-wrap' }}
          data-tip={this.getValueToolTip()}
        >
          {framework.githubScore}
        </div>
        <img style={{ width: 12, height: 12, marginRight: 2, backgroundColor: 'clear', objectFit: 'contain' }} src={require('Image/octicons-star.png')} />
        <ReactTooltip/>
        <div 
          style={{ textAlign: 'right', color: numberChangeColor, fontSize: FontSize.md, marginLeft: 0, marginRight: 2, width: 70, whiteSpace: 'no-wrap' }}
          data-tip={this.getMonthlyChangeTooltip()}
          >
          {this.getChangeScore()}
        </div>
        <div style={{ color: Color.primaryText, width: 200, textAlign: 'left', fontSize: FontSize.md, whiteSpace: 'no-wrap' }}>{_.startCase(_.toLower(framework.name))}</div>
      </div>
    );
  }
}