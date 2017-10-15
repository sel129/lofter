import {
    connect
} from "react-redux";
import FormViewer from "./FormViewer";

const mapStateToProps = (state) => {
		const points = state.waterlines.filter((offset) => {
			return offset && offset.x != undefined && offset.y != undefined;
		});

        points.push(...state.buttocks.filter((offset) => {
            return offset && offset.x !== undefined && offset.y != undefined;
        }));

        return {
            points: points
        };
    },
    mapDispatchToProps = (dispatch) => {
        return {};
    };

export default connect(mapStateToProps, mapDispatchToProps)(FormViewer);