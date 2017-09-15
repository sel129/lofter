import appConstants from "../constants/appConstants";
import update from 'immutability-helper';

const initialState = {
	offsets: []
}
export default function(state = initialState, action) {
	let newState;
	switch (action.type) {
		case appConstants.UPDATE_FORM:
			let point = {x: action.index * 20, y: action.offset};
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