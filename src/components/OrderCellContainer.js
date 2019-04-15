import {connect} from "react-redux";
import {updateOrder} from "../actions/formActions";
import EditableCell from "./EditableCell";

const mapStateToProps = (state) => ({
  currentForm: state.currentForm
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (offset, type, index, form) => {
      dispatch(updateOrder(offset, type, index, form));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableCell);
