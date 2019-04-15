import React from "react";

class EditableCell extends React.Component {

  constructor(props) {
    super(props);
    this.pointInput = this.pointInput.bind(this);
  }

	pointInput(event) {
    this.props.onChange(event.target.value, this.props.type, this.props.rowIndex, this.props.currentForm);
	}

  render() {
      return (
          <input type="text" value={this.props.data || ""} onChange={this.pointInput}/>
      );
  }
};

export default EditableCell;
