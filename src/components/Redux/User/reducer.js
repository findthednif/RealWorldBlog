const initialState = {
  userData: null,
  authorized: false,
  loading: false,
  deleteConfirm: false
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "user_data_fetch_start":
      return {...state, loading: true };
    case "user_data_fetch_end":
      return {...state, loading: false };
    case "user_login":
      return { ...state, userData: action.payload, authorized: true };
    case "user_logout":
      return {
        ...state,
        userData: null,
        authorized: false,
      };
    case "delete_confirm":
      return {...state, deleteConfirm: !state.deleteConfirm}
    default:
      return state;
  }
};
export default userReducer;
