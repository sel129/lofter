import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap/Table';
import EditableCellContainer from './EditableCellContainer';
import OrderCellContainer from './OrderCellContainer';

class Table extends Component {
  columns = [
    {
      id: 1,
      label: '#'
    },
    {
      id: 2,
      label: 'Offset',
      component: EditableCellContainer
    },
    {
      id: 3,
      label: 'Order',
      component: OrderCellContainer
    }
  ]

  renderHeaderRow(columns) {
    return columns.map((column) => {
      return (
        <th key={column.id}>
          {column.label}
        </th>
      )
    });
  }

  renderBodyRows(columns, data) {
    return data.map((rowData, index) => {
      const bodyRows = columns.map((column) => {
        let component;

        let data;
        if (column.label === 'Order') {
          data = rowData.order;
        } else if (column.label === '#') {
          data = index;
        }else {
          data = this.props.type === 'waterline' ? rowData.x : rowData.y;
        }

        if(column.component) {
          component = (
            <column.component data={data} type={this.props.type} rowIndex={index}/>
          )
        } else {
          component = data;
        }

        return (
          <td key={column.id}>
            {component}
          </td>
        )
      });

      return (
        <tr key={index}>
          {bodyRows}
        </tr>
      )
    });
  }

  render() {
    const headerRow = this.renderHeaderRow(this.columns);
    const bodyRows = this.renderBodyRows(this.columns, this.props.data);
    return (
      <BootstrapTable striped bordered hover size="sm">
        <thead>
          <tr>
            {headerRow}
          </tr>
        </thead>
        <tbody>
          {bodyRows}
        </tbody>
      </BootstrapTable>
    );
  }
}

export default Table;
