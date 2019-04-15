import appConstants from "../constants/appConstants";
import update from 'immutability-helper';

const initialState = {
  forms: [
    {
      waterlines: [{x: undefined, y: undefined, order: 0}],
      buttocks: [{x: undefined, y: undefined, order: 0}]
    }
  ],
  currentForm: 0
}
export default function(state = initialState, action) {
	let newState;
  const emptyPoint = {x: undefined, y: undefined, order: 0};
	switch (action.type) {
		case appConstants.UPDATE_FORM:
			let point = {};
			if(action.offsetType === "waterline") {
        const order = state.forms[action.form].waterlines[action.index] && state.forms[action.form].waterlines[action.index].order;
				point = action.offset !== "" ? {x: Number(action.offset), y: action.index * 20, order: order || 0} : emptyPoint;
				newState = update(state, {forms: {[action.form]: {
					waterlines: {
						[action.index]: {$set: point}
					}
				}}});
			} else {
        const order = state.forms[action.form].buttocks[action.index] && state.forms[action.form].buttocks[action.index].order;
				point = action.offset !== "" ? {x: action.index * 20, y: Number(action.offset), order: order || 0} : emptyPoint;
				newState = update(state, {forms: {[action.form]: {
					buttocks: {
						[action.index]: {$set: point}
					}
				}}});
			}
			return newState;

    case appConstants.UPDATE_ORDER:
			if(action.offsetType === "waterline") {
        newState = update(state, {forms: {[action.form]: {
          waterlines: {[action.index]: {order: {$set: action.order}}}
        }}});
			} else {
        newState = update(state, {forms: {[action.form]: {
          buttocks: {[action.index]: {order: {$set: action.order}}}
        }}});
			}
			return newState;

    case appConstants.ADD_ROW:
      if(action.tableType === 'waterline') {
        newState = update(state, {forms: {[action.form]: {
          waterlines: {$push: [emptyPoint]}
        }}});
      } else {
        newState = update(state, {forms: {[action.form]: {
          buttocks: {$push: [emptyPoint]}
        }}});
      }
      return newState;

    case appConstants.ADD_FORM:
      const emptyForm = {
        waterlines: [emptyPoint],
        buttocks: [emptyPoint]
      }
      newState = update(state, {
        forms: {$push: [emptyForm]}
      });

      return newState;

    case appConstants.SET_CURRENT_FORM:
      newState = update(state, {currentForm: {$set: action.form}});
      return newState;

		default:
			return state;
	}
}
