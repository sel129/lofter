import React, { Component } from 'react';
import FormViewer from './components/FormViewer'

class App extends Component {
  render() {

  	let points = [
  		{
  			x: 0,
  			y: 0,
  		},
  		{
  			x: 20,
  			y: 50,
  		},
  		{
  			x: 30,
  			y: 150,
  		},
  		{
  			x: 40,
  			y: 200,
  		},
  		{
  			x: 50,
  			y: 225,
  		},
  	];
    return (
      <FormViewer width={300} height={300} points={points}/>
    );
  }
}

export default App;
