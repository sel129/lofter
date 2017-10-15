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
			const oldPoint = state[action.tableType][action.index];
			let point = {};
			if(action.valueType === "waterlines") {
				point = action.value !== "" ? {x: Number(action.value), y: action.index * 20, order: oldPoint && oldPoint.order} : undefined;
				newState = update(state, {
					waterlines: {
						[action.index]: {$set: point}
					}
				});
			} else if(action.valueType === "buttocks") {
				point = action.value !== "" ? {x: action.index * 20, y: Number(action.value), order: oldPoint && oldPoint.order} : undefined;
				newState = update(state, {
					buttocks: {
						[action.index]: {$set: point}
					}
				});
			} else if(action.valueType === "order") {
				let updateAction;
				if(oldPoint) {
					point = {x: oldPoint.x, y: oldPoint.y, order: Number(action.value) }
				} else {
					point = {order: Number(action.value)}
				}

				if(action.tableType === "waterlines") {
					updateAction = {
						waterlines: {
							[action.index]: {$set: point}
						}
					}
				} else {
					updateAction = {
						buttocks: {
							[action.index]: {$set: point}
						}
					}
				}
				newState = update(state, updateAction)
			}
			return newState;
		default:
			return state;
	}
}