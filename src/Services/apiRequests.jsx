const url = 'https://blog.kata.academy/api/'
export const getGlobalArticles = async (offset) =>{
    const responce = await fetch(`${url}articles?limit=5&offset=${offset}`)
    if(responce.ok){
        const data = await responce.json();
        return data;
    }
    else{
        throw new Error(`getGlobalArticles fetch failed, ${responce.status}`);
    }
}
export const getArticle = async (slug) =>{
    const responce = await fetch(`${url}articles/${slug}`)
    if(responce.ok){
        const data = await responce.json();
        return data
    }
    else{
        throw new Error(`getArticle fetch failed, ${responce.status}`);
    }
}
export default getGlobalArticles;