import React, { Component } from 'react';
import Axis from './Axis';

class FormViewer extends Component {
  constructor(props) {
    super(props);
    
    let controlPoints = this.generateInitialControlPoints(this.props.points);
    this.state = {control: {x:100, y:5}, controlPoints: controlPoints};
  }

  generateInitialControlPoints(points) {
    let controlPoints = [];
    for(let i = 1; i < points.length; i+=2) {
      // control points are initially set to the midpoint between the start and end point of the curve
      let controlPoint = {
        x: ((points[i].x - points[i - 1].x) / 2) + points[i - 1].x,
        y: ((points[i].y - points[i - 1].y) / 2) + points[i - 1].y
      };

      controlPoints.push(controlPoint);
    }

    return controlPoints;
  }

  mouseDown(key) {
    this.setState({changeControlPoint: true, controlPointIndex: key});
  }

  mouseMove(evt) {

    if(this.state.changeControlPoint) {
      let controlPoints = this.state.controlPoints.slice();

      controlPoints[this.state.controlPointIndex].x = evt.pageX;
      controlPoints[this.state.controlPointIndex].y = evt.pageY;

      this.setState({controlPoints: controlPoints});
    }
  }

  mouseUp(evt) {
    if(this.state.changeControlPoint) {
      this.setState({changeControlPoint: false, controlPointIndex: undefined});
    }
  }

  convertPointsToPath(points) {
    let path = `M ${points[0].x} ${points[0].y} `,
      controlPointIndex = 0;
    
    for(let i = 1; i < points.length; i++) {
      let bezierType = i%2 === 0 ? "T" : "Q",
        coords;
      if(bezierType === "Q") {
        
        let controlPoint = this.state.controlPoints[controlPointIndex++];
        coords = `${controlPoint.x} ${controlPoint.y} ${points[i].x} ${points[i].y}`

      } else {
        coords = `${points[i].x} ${points[i].y}`;
      }

      path += (`${bezierType} ${coords} `);
    }
    return path;
  }

  renderControlPoints(points) {
    let circles = [];
    points.forEach((point, index) => {
      circles.push((<circle key={index} cx={point.x} cy={point.y} r="4" stroke="black" onMouseDown={this.mouseDown.bind(this, index)}/>));
    });

    return circles;
  }

  renderPoints(points) {
    let circles = [];
    points.forEach((point, index) => {
      circles.push((<circle key={index} cx={point.x} cy={point.y} r="2" stroke="red"/>));
    });

    return circles;
  }

  render() {
    let path = this.convertPointsToPath(this.props.points);
    let points = this.renderPoints(this.props.points);
    let controlPoints = this.renderControlPoints(this.state.controlPoints);
    return (
      <svg width={this.props.width} height={this.props.height} onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseUp.bind(this)}>
        <Axis width={this.props.width} height={this.props.height}/>
        <path d={path} stroke="black" fill="none"/>
        <line x1="15" y1="15" x2={this.state.control.x} y2={this.state.control.y} stroke="green"/>
        <line x1="100" y1="100" x2={this.state.control.x} y2={this.state.control.y} stroke="green"/>
        {points}
        {controlPoints}
      </svg>
    );
  }
}

export default FormViewer;