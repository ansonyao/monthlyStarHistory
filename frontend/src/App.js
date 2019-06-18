import React, { Component } from 'react';
import './App.css';
import { store } from './Redux'
import { Provider } from 'react-redux'
import Home from './Home'
import Chart from './Component/ChartView/Chart'
import AuthCallBack from './Page/AuthCallBackPage'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ReactGA from 'react-ga';
ReactGA.initialize('UA-27137827-4');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/chart/:category" component={Chart} />
            <Route path="/githubcallback" component={AuthCallBack} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
