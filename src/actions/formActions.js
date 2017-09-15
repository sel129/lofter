import appConstants from "../constants/appConstants";

const

	updateOffset = (offset, type, index) => {
		return {
			type: appConstants.UPDATE_FORM,
			offset: offset,
			offsetType: type,
			index: index
		};
	};

export {
	updateOffset
}