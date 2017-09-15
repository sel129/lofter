import {
    connect
} from "react-redux";
import FormViewer from "./FormViewer";

const mapStateToProps = (state) => {
		const points = state.offsets.filter((offset) => {
			return offset !== undefined;
		});
        return {
            points: points
        };
    },
    mapDispatchToProps = (dispatch) => {
        return {};
    };

export default connect(mapStateToProps, mapDispatchToProps)(FormViewer);