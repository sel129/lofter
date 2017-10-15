import {
    connect
} from "react-redux";
import {updateOffset} from "../actions/formActions";
import editableGriddleComponent from "./editableGriddleComponent";

const mapStateToProps = (state) => {
        return {
            waterlines: state.waterlines,
            buttocks: state.buttocks
        };
    },
    mapDispatchToProps = (dispatch) => {
        return {
            updateOffset: (value, valueType, tableType, index) => {
                dispatch(updateOffset(value, valueType, tableType, index));
            }
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(editableGriddleComponent);
