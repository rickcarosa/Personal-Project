import React, { Component } from 'react';
import './App.css';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Shows from './components/shows/Shows';
import Cart from './components/cart/Cart';
import Order from './components/order/Order';


class App extends Component {
    constructor(){
      super()
      this.state = {
        baseUrl: 'http://api.tvmaze.com'
      }
    }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path = '/' component = {Login}/>
          <Route path = '/dashboard' render = {() => <Dashboard baseUrl = {this.state.baseUrl}/>}/>
          <Route path = '/shows' render = {() => <Shows baseUrl = {this.state.baseUrl}/>}/>
          <Route path = '/cart' component = {Cart}/>
          <Route path = '/order' component = {Order}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;


