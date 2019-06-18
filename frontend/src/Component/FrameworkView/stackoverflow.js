import React, { Component } from 'react';
import { BarView } from 'Component'
import { Color, FontSize } from 'Style'
import { Score, Device } from 'MyUtils'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'

export default class FrameworkViewSOF extends Component {
  getChangeScore = () => {
    const {framework} = this.props
    return Score.formatScoreChange(framework.monthDeltaStScore)
  }

  getMonthlyChangeTooltip = () => {
    const {framework} = this.props
    if (this.getChangeScore().includes("N/A")) {
      return "Have not got enough data to show this value"
    } else {
      return "Monthly change"
    }
  }

  getWidthOfBar = () => {
    return Device.isOnSmallScreen ? 100 : 200
  }

  render() {
    const {framework, percentage} = this.props
    const numberChangeColor = Score.getScoreColor(framework.monthDeltaStScore)
    const ptsToolTipMessage = `Points of stackoverflow tag \"${framework.stTag}\"`
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', height: 20}}>
        <div style={{ width: this.getWidthOfBar() }}>
          <BarView
            percentage={percentage}
          />
        </div>
        <div 
          style={{textAlign: 'right',  width: 80, fontSize: FontSize.md, marginLeft: 5, whiteSpace: 'no-wrap' }}
          data-tip={ptsToolTipMessage}
        >
          {framework.stScore}
        </div>
        <div 
          style={{fontSize: FontSize.sm, marginLeft: 2, marginRight: 5}}
        >
        pts
        </div>
        <ReactTooltip/>
        <div 
          style={{ textAlign: 'right', color: numberChangeColor, fontSize: FontSize.md, marginLeft: 0, marginRight: 2, width: 70, whiteSpace: 'no-wrap' }}
          data-tip={this.getMonthlyChangeTooltip()}
        >
          {this.getChangeScore()}
        </div>
        <div style={{width: 200, display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center'}}>
            <div style={{color: Color.primaryText, textAlign: 'left', fontSize: FontSize.md, whiteSpace: 'no-wrap', paddingTop: 0, paddingBottom: 0, paddingLeft: 2, paddingRight:2, borderRadius: 4 }}>{_.startCase(_.toLower(framework.name))}</div>
        </div>
      </div>
    );
  }
}