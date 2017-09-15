import appConstants from "../constants/appConstants";
import update from 'immutability-helper';

const initialState = {
	offsets: [],
	waterlines: [],
	buttocks: []
}
export default function(state = initialState, action) {
	let newState;
	switch (action.type) {
		case appConstants.UPDATE_FORM:
			let point = {};
			if(action.offsetType === "waterline") {
				point = action.offset !== "" ? {x: Number(action.offset), y: action.index * 20} : undefined;
				newState = update(state, {
					waterlines: {
						[action.index]: {$set: point}
					}
				});
			} else {
				point = action.offset !== "" ? {x: action.index * 20, y: Number(action.offset)} : undefined;
				newState = update(state, {
					buttocks: {
						[action.index]: {$set: point}
					}
				});
			}
			return newState;
		default:
			return state;
	}
}