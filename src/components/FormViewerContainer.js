import {
    connect
} from "react-redux";
import FormViewer from "./FormViewer";

const mapStateToProps = (state) => {
		const waterlinePoints = state.forms[state.currentForm].waterlines.filter((offset) => {
			return offset !== undefined;
		});
    const buttockPoints = state.forms[state.currentForm].buttocks.filter((offset) => {
			return offset !== undefined;
		});

    const allPoints = waterlinePoints.concat(buttockPoints)
    const filteredPoints = allPoints.filter((point) => {
      return point.x !== undefined && point.y !== undefined && point.order !== undefined;
    })

    return {

        points: filteredPoints.sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          }
          if (a.order > b.order) {
            return 1;
          }
          // a must be equal to b
          return 0;
        })
    };
},
mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormViewer);
