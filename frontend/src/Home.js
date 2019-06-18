import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {thunks} from 'Redux/Reducers/Category/index'
import { CategoryView, HeaderView, MessageView, ShareView, BottomView } from 'Component'

class Home extends Component {
  componentDidMount(){
    this.props.dispatch(thunks.fetchCategories())
  }

  render() {
    const { categories } = this.props.category
    categories.sort((a, b) => {
      return a.rank - b.rank 
    })
    let dateValue = 0
    categories.forEach((category) => {
      category.frameworks.forEach((framework) => {
        let date = parseInt(framework.date, 10)
        if (date > dateValue) {
          dateValue = date
        }
      })
    })
    return (
      <div className="App">
        <HeaderView/>
        <MessageView dateValue={dateValue} style={{marginTop: 50}}/>
        {categories.map(this.renderCategory)}
        <div style={{marginTop: 20, marginBottom: 20, width: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
          <ShareView/>
        </div>
        <BottomView/>
      </div>
    );
  }

  renderCategory = (category) => {
    return (
      <CategoryView category={category} key={category.name}/>
    )
  }
}

const mapStateToProps = ({category}) => ({
    category
})

const mapDispatchToProps = dispatch => ({
	dispatch
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
