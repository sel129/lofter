import React, { Component } from 'react';

class Axis extends Component {

  render() {
    let halfWidth = this.props.width/2;
    let halfHeight = this.props.height/2;
    return (
      <g>
        <line x1={halfWidth} y1="0" x2={halfWidth} y2={this.props.height} stroke="black"/>
        <line x1="0" y1={halfHeight} x2={this.props.width} y2={halfHeight} stroke="black"/>
      </g>
    );
  }
}

export default Axis;