import React, { Component } from 'react';

class Axis extends Component {

  render() {
    return (
      <g>
        <line x1="0" y1="0" x2="0" y2="200" stroke="black"/>
        <line x1="-100" y1="100" x2="100" y2="100" stroke="black"/>
      </g>
    );
  }
}

export default Axis;
