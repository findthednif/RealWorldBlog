import getGlobalArticles from "../../Services/apiRequests";
import { getArticle } from "../../Services/apiRequests";
export const fetchArticlesStart = () => ({type: 'fetch_articles_start'})
export const fetchArticlesEnd = () => ({type: 'fetch_articles_end'})
export const fetchArticlesSucces = (articles) => ({
    type: 'fetch_articles_succes',
    payload: articles
})
export const fetchArticles = (offset) => async (dispatch) => {
    try{
        dispatch(fetchArticlesStart());
        const articlesData = await getGlobalArticles(offset);
        dispatch(fetchArticlesSucces(articlesData))
        dispatch(fetchArticlesEnd())
    }
    catch(error){
        console.error(error)
    }
}
export const pageChange = (page) =>({type:'page_change', payload: page})
export const fetchFullArticleSucces = (article) => ({
    type: 'fetch_full_article_succes',
    payload: article
});
export const fetchArticle = (slug) => async(dispatch) =>{
    try{
        dispatch(fetchArticlesStart());
        const articlesData = await getArticle(slug);
        dispatch(fetchFullArticleSucces(articlesData))
        dispatch(fetchArticlesEnd());
    }
    catch(error){
        console.error(error)
    }
}