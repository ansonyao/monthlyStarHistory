import React, { Component } from 'react';
import { Color } from 'Style';
import moment from 'moment'

export default class HeaderView extends Component {
  render() {
    const {dateValue} = this.props
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', ...this.props.style }}>
            <p>Data is refreshed daily. The last refresh happened on<br/><br/><b style={{ color: Color.primary, marginLeft: 5, fontSize: 20 }}>{moment(dateValue).format('MMMM Do YYYY, h a')}</b></p>
            
        </div>
    )
  }
}