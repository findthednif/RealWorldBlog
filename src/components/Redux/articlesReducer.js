const initialState = {
  articlesData: [],
  fullArticleData:null,
  currentPage: 1,
  totalPages: 0,
  loading: true,
};
const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetch_articles_start":
      return { ...state, articlesData: [], loading: true };
    case "fetch_articles_end":
      return { ...state, loading: false };
    case "fetch_articles_succes":
      return {
        ...state,
        articlesData: [...action.payload.articles],
        totalPages: Math.ceil(action.payload.articlesCount / 5),
      };
    case "fetch_full_article_succes":
      return {
        ...state,
        fullArticleData: action.payload.article
      };
    case "page_change":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
export default articlesReducer;
