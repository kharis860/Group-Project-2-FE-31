import { ADDID } from "../action/idAction";

const initialState = {
  id: [],
};

function idReducer(state = initialState, action) {
  switch (action.type) {
    case ADDID:
      return {
        ...state,
        id: action.idKonsul,
      };

    default:
      return state;
  }
}

export default idReducer;
