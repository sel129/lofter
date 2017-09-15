import appConstants from "../constants/appConstants";
import update from 'immutability-helper';

const initialState = {
	offsets: []
}
export default function(state = initialState, action) {
	let newState;
	switch (action.type) {
		case appConstants.UPDATE_FORM:
			let point = action.offset !== "" ? {x: action.index * 20, y: Number(action.offset)} : undefined;
			newState = update(state, {
				offsets: {
					[action.index]: {$set: point}
				}
			});
			return newState;
		default:
			return state;
	}
}