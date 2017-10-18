import {
    connect
} from "react-redux";
import FormViewer from "./FormViewer";

const mapStateToProps = (state) => {
		const points = state.waterlines.filter((offset) => {
			return offset && offset.x !== undefined && offset.y !== undefined;
		});

        points.push(...state.buttocks.filter((offset) => {
            return offset && offset.x !== undefined && offset.y !== undefined;
        }));

        points.sort((a, b) => {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            // a must be equal to b
            return 0;
        });

        return {
            points: points
        };
    },
    mapDispatchToProps = (dispatch) => {
        return {};
    };

export default connect(mapStateToProps, mapDispatchToProps)(FormViewer);