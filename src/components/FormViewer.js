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
    for(let i = 1; i < points.length; i++) {
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
    let path = `M ${points[0].x} ${points[0].y} `;
    
    for(let i = 1; i < points.length; i++) {
      let coords,
        controlPoint = this.state.controlPoints[i - 1];
        
      coords = `${controlPoint.x} ${controlPoint.y} ${points[i].x} ${points[i].y}`

      path += (`Q ${coords} `);
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

  renderVectors(points, controlPoints) {
    let vectors = [];
    for(let i = 0; i < controlPoints.length; i++) {
      let controlPoint = controlPoints[i],
        point1 = points[i],
        point2 = points[i+1];
      vectors.push(<line key={`${i}-vector1`} x1={point1.x} y1={point1.y} x2={controlPoint.x} y2={controlPoint.y} stroke="green"/>);
      vectors.push(<line key={`${i}-vector2`} x1={point2.x} y1={point2.y} x2={controlPoint.x} y2={controlPoint.y} stroke="green"/>);
    }

    return vectors;
  }

  render() {
    let path = this.convertPointsToPath(this.props.points);
    let points = this.renderPoints(this.props.points);
    let controlPoints = this.renderControlPoints(this.state.controlPoints);
    let vectors = this.renderVectors(this.props.points, this.state.controlPoints);
    return (
      <svg width={this.props.width} height={this.props.height} onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseUp.bind(this)}>
        <Axis width={this.props.width} height={this.props.height}/>
        <path d={path} stroke="black" fill="none"/>
        {points}
        {controlPoints}
        {vectors}
      </svg>
    );
  }
}

export default FormViewer;