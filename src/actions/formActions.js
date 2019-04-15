import appConstants from "../constants/appConstants";

const updateOffset = (offset, type, index, form) => {
	return {
		type: appConstants.UPDATE_FORM,
		offset: offset,
		offsetType: type,
		index: index,
    form: form
	};
};

const updateOrder = (order, type, index, form) => {
  return {
    type: appConstants.UPDATE_ORDER,
    order: order,
    offsetType: type,
    index: index,
    form: form
  };
};

const addRow = (tableType, form) => {
  return {
    type: appConstants.ADD_ROW,
    tableType: tableType,
    form: form
  }
}

const addForm = () => {
  return {
    type: appConstants.ADD_FORM
  }
}

const setCurrentForm = (form) => {
  return {
    type: appConstants.SET_CURRENT_FORM,
    form: form
  }
}

export {
	updateOffset,
  updateOrder,
  addRow,
  addForm,
  setCurrentForm
}