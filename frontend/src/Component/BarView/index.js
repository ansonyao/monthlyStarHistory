import React, { Component } from 'react';
import { Color } from 'Style'

export default class BarView extends Component {

  render() {
    const {percentage, color} = this.props
    const percentageString = `${Math.round(percentage * 100)}%`
    return (
      <div style={{height: 5, width: percentageString, backgroundColor: color || Color.secondaryLight, borderRadius: 2}}>
      </div>
    );
  }
}