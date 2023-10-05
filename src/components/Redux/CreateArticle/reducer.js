const initialState = {
  tagsList: [],
  currentTag: "",
};
const createArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "input_tag":
      return { ...state, currentTag: action.payload };
    case "add_tag":
      if(!action.payload){
        return { ...state, tagsList: [...state.tagsList, state.currentTag], currentTag: ''};
      }
      else{
        return { ...state, tagsList: [...state.tagsList, action.payload]}
      }
    case "delete_tag":
      return { ...state, tagsList: state.tagsList.slice(0, action.payload)}
    case "delete_all":
      return {tagsList: [], currentTag:''}
    default:
      return state;
  }
};
export default createArticleReducer;
