const initialState = {
  articlesData: [],
  fullArticleData: null,
  currentPage: 1,
  totalPages: 0,
  loading: true,
};
const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fetch_articles_start':
      return { ...state, articlesData: [], loading: true };
    case 'fetch_articles_end':
      return { ...state, loading: false };
    case 'fetch_articles_success':
      return {
        ...state,
        articlesData: [...action.payload.articles],
        totalPages: Math.ceil(action.payload.articlesCount / 5),
      };
    case 'fetch_full_article_success':
      return {
        ...state,
        fullArticleData: action.payload.article,
      };
    case 'page_change':
      return { ...state, currentPage: action.payload };
    case 'user_login':
      return { ...state, userData: action.payload };
    case 'user_logout':
      return {
        ...state,
        userData: null,
        authorized: false,
      };
    case 'user_login_error':
      return { ...state, inputError: true };
    default:
      return state;
  }
};
export default articlesReducer;
