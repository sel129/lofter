import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from './TableContainer';

class DataPane extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addForm = this.addForm.bind(this);
    this.state = {activeKey: '1'};
  }

  handleSelect(key) {
    this.setState({activeKey: key});
  }

  handleFormChange(key) {
    this.props.switchForm(Number(key));
  }

  addRow(key) {
    this.props.addRow(this.state.activeKey === '1' ? 'waterline' : 'buttock', this.props.currentForm);
  }

  addForm() {
    this.props.addForm();
  }

  renderDropdownItems(forms) {
    return forms.map((form, index) => <Dropdown.Item key={index} eventKey={`${index}`} onSelect={this.handleFormChange}>{`Form ${index + 1}`}</Dropdown.Item>)
  }

  render() {
    const dropdownItems = this.renderDropdownItems(this.props.forms);
    return (
      <div style={{height: '100vh', borderStyle: 'solid', borderWidth: '1px'}}>
        <DropdownButton id="dropdown-basic-button" title="Select Form">
          {dropdownItems}
        </DropdownButton>
        <Button variant="primary" size="sm" onClick={this.addForm}>Add Form</Button>
        <Nav variant="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <Nav.Item>
            <Nav.Link eventKey='1'>Waterlines</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='2'>Buttocks</Nav.Link>
          </Nav.Item>
        </Nav>
        <Table type={this.state.activeKey === '1' ? 'waterline' : 'buttock'}/>
        <Button variant="primary" size="sm" onClick={this.addRow}>Add Row</Button>
      </div>
    );
  }
}

export default DataPane;
