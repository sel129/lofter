import React, { Component } from 'react';
import FormViewerContainer from './components/FormViewerContainer';
import OffsetGrid from './components/OffsetGrid';
import { createStore } from 'redux'
import {Provider} from "react-redux";
import reducers from './reducers/FormsReducer'

class App extends Component {
  render() {
    let store = createStore(reducers);
  	
    return (
    	<Provider store={store}>
        <div>
        		<FormViewerContainer width={300} height={300}/>
        		<OffsetGrid gridType={"waterlines"}/>
            <OffsetGrid gridType={"bottocks"}/>
        </div>
      </Provider>
    );
  }
}

export default App;
