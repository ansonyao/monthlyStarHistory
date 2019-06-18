import React, { Component } from 'react';
import {GithubView, SOFView} from 'Component'
import {FontSize, Color} from 'Style'
import {Device} from 'MyUtils'
import _ from 'lodash'

export default class CategoryView extends Component {

  getHorizontalPadding = () => {
    return Device.isOnSmallScreen() ? 0 : 20
  }
  getWidthOfContainer = () => {
    return Device.isOnSmallScreen() ? 300 : 450
  }

  render() {
    const {category} = this.props
    const {frameworks: originalFrameworks} = category
    let gitFrameworks = _.cloneDeep(originalFrameworks).filter((item) => {
        return item.githubScore
    })
    let stFrameworks = _.cloneDeep(originalFrameworks).filter((item) => {
        return item.stScore
    })
    gitFrameworks = gitFrameworks.sort((a, b) => {
        return (b.githubScore || 0) - (a.githubScore || 0)
    })
    stFrameworks = stFrameworks.sort((a, b) => {
        return (b.stScore || 0) - (a.stScore || 0) 
    })
    const padding = this.getHorizontalPadding()
    return (
      <div style={{marginLeft: 20, marginRight: padding, marginTop: 50, marginBottom: 50}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <div style={{display: 'flex', alignItems: 'left', flexDirection: 'column'}}>
                <div style={{fontSize: FontSize.xl, paddingLeft: 20, paddingBottom: 10, paddingTop: 10, flex: 1, textAlign: 'left', fontWeight: 'bold'}}>{_.startCase(_.toLower(category.name))}</div>
                <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <GithubView style={{ width: this.getWidthOfContainer(), marginLeft: 20, marginRight: padding }} frameworks={gitFrameworks} category={category.value} />
                    <SOFView style={{ width: this.getWidthOfContainer(), marginLeft: 20, marginRight: padding }} frameworks={stFrameworks} />
                </div>
                </div>
            </div>
      </div>
    );
  }
}