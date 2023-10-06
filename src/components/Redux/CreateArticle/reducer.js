const initialState = {
  tagsList: [],
  currentTag: '',
};
const createArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'input_tag':
      return { ...state, currentTag: action.payload };
    case 'add_tag':
      if (!action.payload) {
        if (state.currentTag.trim() === '') {
          return { ...state, currentTag: '' };
        }
        return {
          ...state,
          tagsList: [...state.tagsList, state.currentTag],
          currentTag: '',
        };
      }
      return { ...state, tagsList: [...state.tagsList, action.payload] };

    case 'delete_tag':
      return {
        ...state,
        tagsList: [
          ...state.tagsList.slice(0, action.payload),
          ...state.tagsList.slice(action.payload + 1),
        ],
      };
    case 'delete_all':
      return { tagsList: [], currentTag: '' };
    default:
      return state;
  }
};
export default createArticleReducer;
