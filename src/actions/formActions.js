import appConstants from "../constants/appConstants";

const

	updateOffset = (offset, index) => {
		return {
			type: appConstants.UPDATE_FORM,
			offset: offset,
			index: index
		};
	};

export {
	updateOffset
}