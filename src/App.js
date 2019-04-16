import React, { Component } from 'react';
import FormViewerContainer from './components/FormViewerContainer';
import DataPane from './components/DataPaneContainer';
import { createStore } from 'redux'
import {Provider} from "react-redux";
import reducers from './reducers/FormsReducer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.store = createStore(reducers);
  }

  render() {
    return (
    	<Provider store={this.store}>
        <Container fluid={true}>
          <Row noGutters={true}>
            <Col>
              <DataPane/>
            </Col>
            <Col xs={8}>
              <div style={{borderStyle: 'solid', borderWidth: '1px'}}>
                <FormViewerContainer width={400} height={400}/>
              </div>
            </Col>
          </Row>
        </Container>
      </Provider>
    );
  }
}

export default App;
