import React, { Component } from 'react';
import Axis from './Axis';
import Checkbox from 'react-bootstrap/lib/Checkbox';

class FormViewer extends Component {
  constructor(props) {
    super(props);
    
    //let controlPoints = this.generateInitialControlPoints(this.props.points);
    this.state = {
      controlPoints: [],
      showControlPoints: true,
      showPoints: true,
      showVectors: true
    };
  }

  componentWillReceiveProps(nextProps) {
    let controlPoints = this.generateInitialControlPoints(this.removeGaps(nextProps.points));
    this.setState({controlPoints: controlPoints});
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

  removeGaps(points) {
    return points.filter(n => true);
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

  showControlPointsClicked(evt) {
    this.setState({showControlPoints: evt.target.checked});
  }

  showPointsClicked(evt) {
    this.setState({showPoints: evt.target.checked});
  }

  showVectorsClicked(evt) {
    this.setState({showVectors: evt.target.checked});
  }

  convertPointsToPath(points) {
    if(points.length < 1) {
      return null;
    }
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
    if(this.state.showControlPoints) {
      points.forEach((point, index) => {
        circles.push((<circle key={index} cx={point.x} cy={point.y} r="4" stroke="black" onMouseDown={this.mouseDown.bind(this, index)}/>));
      });
    }
    return circles;
  }

  renderPoints(points) {
    let circles = [];
    if(this.state.showPoints) {
      points.forEach((point, index) => {
        circles.push((<circle key={index} cx={point.x} cy={point.y} r="2" stroke="red"/>));
      });
    }

    return circles;
  }

  renderVectors(points, controlPoints) {
    let vectors = [];
    if(this.state.showVectors) {
      for(let i = 0; i < controlPoints.length; i++) {
        let controlPoint = controlPoints[i],
          point1 = points[i],
          point2 = points[i+1];
        vectors.push(<line key={`${i}-vector1`} x1={point1.x} y1={point1.y} x2={controlPoint.x} y2={controlPoint.y} stroke="green"/>);
        vectors.push(<line key={`${i}-vector2`} x1={point2.x} y1={point2.y} x2={controlPoint.x} y2={controlPoint.y} stroke="green"/>);
      }
    }

    return vectors;
  }

  render() {
    let noGaps = this.removeGaps(this.props.points);
    let path = this.convertPointsToPath(noGaps);
    let points = this.renderPoints(noGaps);
    let controlPoints = this.renderControlPoints(this.state.controlPoints);
    let vectors = this.renderVectors(noGaps, this.state.controlPoints);
    return (
      <div>
        <svg width={this.props.width} height={this.props.height} onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseUp.bind(this)}>
          <Axis width={this.props.width} height={this.props.height}/>
          <path d={path} stroke="black" fill="none"/>
          {points}
          {controlPoints}
          {vectors}
        </svg>
        <Checkbox checked={this.state.showControlPoints} onChange={this.showControlPointsClicked.bind(this)}>Show Control Points</Checkbox>
        <Checkbox checked={this.state.showPoints} onChange={this.showPointsClicked.bind(this)}>Show points</Checkbox>
        <Checkbox checked={this.state.showVectors} onChange={this.showVectorsClicked.bind(this)}>Show Vectors</Checkbox>
      </div>
    );
  }
}

export default FormViewer;