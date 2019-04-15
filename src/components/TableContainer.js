import {connect} from "react-redux";
import Table from "./Table";

const mapStateToProps = (state, props) => {
  if (props.type === 'waterline') {
    return {
      data: state.forms[state.currentForm].waterlines
    };
  } else {
    return {
      data: state.forms[state.currentForm].buttocks
    };
  }
},

mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
