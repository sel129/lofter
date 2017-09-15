import {
    connect
} from "react-redux";
import {updateOffset} from "../actions/formActions";
import editableGriddleComponent from "./editableGriddleComponent";

const mapStateToProps = (state) => {
        return {
            offsets: state.offsets
        };
    },
    mapDispatchToProps = (dispatch) => {
        return {
            updateOffset: (offset, type, index) => {
                dispatch(updateOffset(offset, type, index));
            }
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(editableGriddleComponent);
