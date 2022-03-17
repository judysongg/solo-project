import React, { Component } from 'react';
import {render} from 'react-dom';
import style from './style.css'; 
import MainContainer from './components/MainContainer.js'
import logo from '../images/food.png'



class App extends Component {
  render() {
    return (
        <div>
          <h1>Codesmith's Cookbook</h1>
          <div><img style={{
              resizeMode: "contain",
              height: 250,
              width: 250,
              marginLeft: 580, 
              
            }} src = {logo}  alt = 'Logo'></img></div>
          <h4>Please enter your recipes to share with the community!</h4>
          <MainContainer />
        </div>
    )
  }

}

render(<App/>, document.getElementById("contents"))