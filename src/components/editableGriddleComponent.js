import React from "react";

export default React.createClass({

	pointInput: function(event) {
        // figure out which row from this.props.rowData;
        this.props.updateOffset(event.target.value, this.props.rowData.index);

	},

    render: function() {
    	let val = this.props.offsets[this.props.rowData.index] && this.props.offsets[this.props.rowData.index].y ? this.props.offsets[this.props.rowData.index].y : "";
        return (
            <input type="text" ref="offsetInput" value={val} onChange={this.pointInput}/>
        );
    }
});