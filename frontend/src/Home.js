import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { thunks } from 'Redux/Reducers/Framework'

class Home extends Component {
  componentDidMount(){
    this.props.dispatch(thunks.fetchHistory({owner: "Twotalltotems", name: "react-native-otp-input"}))
  }

  render() {
    return (
      <div className="App">
        hello world
      </div>
    );
  }
}

const mapStateToProps = ({ framework }) => ({
  framework
})

export default connect(mapStateToProps)(Home)
