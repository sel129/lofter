import {
    connect
} from "react-redux";
import {updateOffset} from "../actions/formActions";
import editableCell from "./EditableCell";

const mapStateToProps = (state) => ({
  currentForm: state.currentForm
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (offset, type, index, form) => {
      dispatch(updateOffset(offset, type, index, form));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(editableCell);
