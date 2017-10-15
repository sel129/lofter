import React from "react";

export default React.createClass({

	pointInput: function(event) {
        const tableType = this.props.rowData.Waterline ? "waterlines" : "buttocks",
            valueType = this.props.metadata.columnName === "Order" ? "order" : tableType;

        this.props.updateOffset(event.target.value, valueType, tableType, this.props.rowData.index);

	},

    render: function() {
    	let val = "";

        if(this.props.metadata.columnName === "Order") {
            val = this.props.rowData.Order;
        } else {
             if(this.props.rowData.Waterline) { //pass this in as a prop later when we need to handle buttocks
                val = this.props.waterlines[this.props.rowData.index] && this.props.waterlines[this.props.rowData.index].x !== undefined ? this.props.waterlines[this.props.rowData.index].x : "";
            } else {
                val = this.props.buttocks[this.props.rowData.index] && this.props.buttocks[this.props.rowData.index].y !== undefined ? this.props.buttocks[this.props.rowData.index].y : "";
            }
        }

        return (
            <input type="text" ref="offsetInput" value={val} onChange={this.pointInput}/>
        );
    }
});