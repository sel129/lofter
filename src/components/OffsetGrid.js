import React, { Component } from 'react';
import Griddle from "griddle-react";
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import EditableGriddleContainer from './EditableGriddleContainer';

class OffsetGrid extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      numberOfWaterLines: 5,
      ImplicitOffset: 0
    }
  }

  numberOfWaterlinesChange(evt) {
    this.setState({numberOfWaterLines: evt.target.value});
  }

  ImplicitOffsetChange(evt) {
    this.setState({ImplicitOffset: evt.target.value});
  }

  generateRows(numberOfWaterLines) {
    let rows = []
    for(let i = 0; i < numberOfWaterLines; i++) {
      rows.push({
        Waterline: `Waterline ${i}`,
        Offset: null,
        index: i
      })
    }

    return rows;
  }

  generateColumnsMeta() {
    return [
      {
        "columnName": "Waterline",
        "order": 1,
        "locked": false,
        "visible": true
      },
      {
        "columnName": "Offset",
        "order": 2,
        "locked": false,
        "visible": true,
        "customComponent": EditableGriddleContainer
      },
      {
        "columnName": "index",
        "order": 3,
        "locked": true,
        "visible": false
      }
    ]
  }

  render() {
    let rows = this.generateRows(this.state.numberOfWaterLines),
      columnsMeta = this.generateColumnsMeta();
    return (
      <div>
        <FormGroup>
          <ControlLabel>Number of Waterlines</ControlLabel>
          <FormControl 
            type="text" 
            onChange={this.numberOfWaterlinesChange.bind(this)}
            value={this.state.numberOfWaterLines}/>

          <ControlLabel>Implicit Offset</ControlLabel>
          <FormControl 
            type="text" 
            onChange={this.ImplicitOffsetChange.bind(this)}
            value={this.state.ImplicitOffset}/>
        </FormGroup>
        <Griddle results={rows} columnMetadata={columnsMeta} columns={['Waterline', 'Offset']}/>
      </div>
    );
  }
}

export default OffsetGrid;