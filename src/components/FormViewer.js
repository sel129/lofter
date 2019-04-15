import React, { Component } from 'react';
import Axis from './Axis';
import Form from 'react-bootstrap/Form';

class FormViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controlPoints: [],
      showControlPoints: true,
      showPoints: true,
      showVectors: true
    };
  }

  componentWillReceiveProps(nextProps) {
    let controlPoints = this.generateInitialControlPoints(nextProps.points);
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

  mouseDown(key, evt) {
    this.setState({
      changeControlPoint: true,
      controlPointIndex: key,
      mouseDownPoint: {x: evt.pageX, y: evt.pageY},
      originalControlPoint: {x: this.state.controlPoints[key].x, y: this.state.controlPoints[key].y}
    });
  }

  mouseMove(evt) {

    if(this.state.changeControlPoint) {
      let controlPoints = this.state.controlPoints.slice();
      const originalX = this.state.originalControlPoint.x;
      const originalY = this.state.originalControlPoint.y;
      const diffX = evt.pageX - this.state.mouseDownPoint.x;
      const diffY = evt.pageY - this.state.mouseDownPoint.y;
      controlPoints[this.state.controlPointIndex].x = (originalX + diffX); //- this.props.width/2;
      controlPoints[this.state.controlPointIndex].y = originalY + diffY;

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

  mirrorPoints(points) {
    let mirror = [],
      i = 0;
    for(i = points.length - 1; i > -1; i--) {
      mirror.push({x: (0 - points[i].x), y: points[i].y});
    }

    return mirror;
  }

  placePointsOnGrid(points, halfWidth) {
    let newPoints = [];
    points.forEach((point) => {
      newPoints.push({x: halfWidth + point.x, y: point.y});
    });

    return newPoints;
  }

  convertPointsToPath(points) {
    // render points first
    let currentPoints = points.points,
      index = 0;
    if(currentPoints.length < 2) {
      return null;
    }
    let path = `M ${currentPoints[0].x} ${currentPoints[0].y} `;

    for(index = 0; index < points.points.length -1; index++) {
      let coords,
        controlPoint = points.controlPoints[index];
      coords = `${controlPoint.x} ${controlPoint.y} ${currentPoints[index + 1].x} ${currentPoints[index + 1].y}`


      path += (`Q ${coords} `);
    }

    // render mirrored points seconds
    currentPoints = points.mirrorPoints;
    if(currentPoints.length < 1) {
      return null;
    }

    // connect with mirror
    path +=(`M ${points.mirrorPoints[0].x} ${points.mirrorPoints[0].y} `);

    index = 0;
    for(index = 1; index < points.mirrorPoints.length; index++) {
      let coords,
        controlPoint = points.mirrorControlPoints[index - 1];
      coords = `${controlPoint.x} ${controlPoint.y} ${currentPoints[index].x} ${currentPoints[index].y}`


      path += (`Q ${coords} `);
    };

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
      points.points.concat(points.mirrorPoints).forEach((point, index) => {
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
          point1 = points.points[i],
          point2 = points.points[i+1];
        vectors.push(<line key={`${i}-vector1`} x1={point1.x} y1={point1.y} x2={controlPoint.x} y2={controlPoint.y} stroke="green"/>);
        vectors.push(<line key={`${i}-vector2`} x1={point2.x} y1={point2.y} x2={controlPoint.x} y2={controlPoint.y} stroke="green"/>);
      }
    }

    return vectors;
  }

  render() {
    let mirrorPoints = this.mirrorPoints(this.props.points);
    let mirrorControlPoints = this.mirrorPoints(this.state.controlPoints);
    let movedPoints = {
      points: this.placePointsOnGrid(this.props.points, this.props.width/2),
      mirrorPoints: this.placePointsOnGrid(mirrorPoints, this.props.width/2),
      controlPoints: this.placePointsOnGrid(this.state.controlPoints, this.props.width/2),
      mirrorControlPoints: this.placePointsOnGrid(mirrorControlPoints, this.props.width/2)
    };
    let path = this.convertPointsToPath(movedPoints);
    let points = this.renderPoints(movedPoints);
    let controlPoints = this.renderControlPoints(movedPoints.controlPoints);
    let vectors = this.renderVectors(movedPoints, movedPoints.controlPoints);
    return (
      <div>
        <svg width={this.props.width} height={this.props.height} onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseUp.bind(this)}>
          <Axis width={this.props.width} height={this.props.height}/>
          <path d={path} stroke="black" fill="none"/>
          {points}
          {controlPoints}
          {vectors}
        </svg>
        <Form.Check type="checkbox" checked={this.state.showControlPoints} onChange={this.showControlPointsClicked.bind(this)} label="Show Control Points" />
        <Form.Check checked={this.state.showPoints} onChange={this.showPointsClicked.bind(this)} label="Show points" />
        <Form.Check checked={this.state.showVectors} onChange={this.showVectorsClicked.bind(this)} label="Show Vectors" />
      </div>
    );
  }
}

export default FormViewer;
