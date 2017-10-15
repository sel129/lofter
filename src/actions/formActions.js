import appConstants from "../constants/appConstants";

const

	updateOffset = (value, valueType, tableType, index) => {
		return {
			type: appConstants.UPDATE_FORM,
			value: value,
			valueType: valueType,
			tableType: tableType,
			index: index
		};
	}

export {
	updateOffset
}