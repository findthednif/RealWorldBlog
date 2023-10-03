import { getGlobalArticles, getArticle } from "../../../Services/apiRequests.js"
export const fetchArticlesStart = () => ({ type: "fetch_articles_start" });
export const fetchArticlesEnd = () => ({ type: "fetch_articles_end" });
export const fetchArticlesSuccess = (articles) => ({
  type: "fetch_articles_success",
  payload: articles,
});
export const fetchArticles = (offset) => async (dispatch) => {
  try {
    dispatch(fetchArticlesStart());
    const articlesData = await getGlobalArticles(offset);
    dispatch(fetchArticlesSuccess(articlesData));
    dispatch(fetchArticlesEnd());
  } catch (error) {
    console.error(error);
  }
};
export const pageChange = (page) => ({ type: "page_change", payload: page });
export const fetchFullArticleSuccess = (article) => ({
  type: "fetch_full_article_success",
  payload: article,
});
export const fetchArticle = (slug) => async (dispatch) => {
  try {
    dispatch(fetchArticlesStart());
    const articlesData = await getArticle(slug);
    dispatch(fetchFullArticleSuccess(articlesData));
    dispatch(fetchArticlesEnd());
  } catch (error) {
    console.error(error);
  }
};
