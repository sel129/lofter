import React, { Component } from 'react';
import Griddle from "griddle-react";
import Form from 'react-bootstrap/Form';
//import FormControl from 'react-bootstrap/FormControl';
//import ControlLabel from 'react-bootstrap/ControlLabel';
import EditableGriddleContainer from './EditableGriddleContainer';
import OrderGriddleContainer from './OrderGriddleContainer';

class OffsetGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfRows: 5,
      ImplicitOffset: 0
    }
  }

  numberOfWaterlinesChange(evt) {
    this.setState({numberOfWaterLines: evt.target.value});
  }

  ImplicitOffsetChange(evt) {
    this.setState({ImplicitOffset: evt.target.value});
  }

  generateRows(numberOfRows) {
    const offsetColumnName = this.props.gridType === "waterline" ? "Waterline" : "Buttock";
    let rows = [];
    for(let i = 0; i < numberOfRows; i++) {
      let row={
        Offset: null,
        Order: null,
        index: i
      };
      row[offsetColumnName] = `${offsetColumnName} ${i}`;
      rows.push(row);
    }

    return rows;
  }

  generateColumnsMeta() {
    const offsetColumnName = this.props.gridType === "waterline" ? "Waterline" : "Buttock";
    return [
      {
        "columnName": offsetColumnName,
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
        "columnName": "Order",
        "order": 3,
        "locked": false,
        "visible": true,
        "customComponent": OrderGriddleContainer
      },
      {
        "columnName": "index",
        "order": 4,
        "locked": true,
        "visible": false
      }
    ]
  }

  getColumns() {
    const offsetColumnName = this.props.gridType === "waterline" ? "Waterline" : "Buttock";

    return [offsetColumnName, "Offset", "Order"];
  }

  render() {
    let rows = this.generateRows(this.state.numberOfRows),
      columnsMeta = this.generateColumnsMeta();
    return (
      <Form>
        <Form.Group>
          <Form.Label>Number of Waterlines</Form.Label>
          <Form.Control
            type="text"
            onChange={this.numberOfWaterlinesChange.bind(this)}
            value={this.state.numberOfWaterLines}/>

          <Form.Label>Implicit Offset</Form.Label>
          <Form.Control
            type="text"
            onChange={this.ImplicitOffsetChange.bind(this)}
            value={this.state.ImplicitOffset}/>
        </Form.Group>
        <Griddle results={rows} columnMetadata={columnsMeta} columns={this.getColumns}/>
      </Form>
    );
  }
}

export default OffsetGrid;
