import {
    connect
} from "react-redux";
import {updateOffset, addForm, addRow, setCurrentForm} from "../actions/formActions";
import dataPaneComponent from "./DataPane";

const mapStateToProps = (state) => ({
  forms: state.forms,
  currentForm: state.currentForm
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (offset, type, index) => {
      dispatch(updateOffset(offset, type, index));
    },
    addForm: () => {
      dispatch(addForm());
    },
    addRow: (tableType, form) => {
      dispatch(addRow(tableType, form));
    },
    switchForm: (form) => {
      dispatch(setCurrentForm(form));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dataPaneComponent);
