import React from "react";

export default React.createClass({

	pointInput: function(event) {
        // figure out which row from this.props.rowData;
        this.props.updateOffset(event.target.value, "waterline"/*type*/, this.props.rowData.index);

	},

    render: function() {
    	let val = "";
        if("waterline") { //pass this in as a prop later when we need to handle buttocks
            val = this.props.offsets[this.props.rowData.index] && this.props.offsets[this.props.rowData.index].x !== undefined ? this.props.offsets[this.props.rowData.index].x : "";
        } else {
            val = this.props.offsets[this.props.rowData.index] && this.props.offsets[this.props.rowData.index].y !== undefined ? this.props.offsets[this.props.rowData.index].y : "";
        }
        return (
            <input type="text" ref="offsetInput" value={val} onChange={this.pointInput}/>
        );
    }
});