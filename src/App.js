import React, { Component } from 'react';
import FormViewerContainer from './components/FormViewerContainer';
import OffsetGrid from './components/OffsetGrid';
import { createStore } from 'redux'
import {Provider} from "react-redux";
import reducers from './reducers/FormsReducer'

class App extends Component {
  render() {

  	let points = [
  		{
  			x: 0,
  			y: 0,
  		},
  		{
  			x: 10,
  			y: 50,
  		},
  		{
  			x: 60,
  			y: 150,
  		},
  		{
  			x: 100,
  			y: 200,
  		},
  		{
  			x: 200,
  			y: 225,
  		},
  	],
    store = createStore(reducers);
  console.log(points);
  	
    return (

    	<Provider store={store}>
        <div>
        		<FormViewerContainer width={300} height={300}/>
        		<OffsetGrid gridType={"waterline"}/>
            <OffsetGrid gridType={"bottock"}/>
        </div>
      </Provider>
    );
  }
}

export default App;
