import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { fetchArticle } from '../Redux/Articles/actions';
import Article from '../Article/Article';

function ArticleFull() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { fullArticleData, loading } = useSelector(
    (state) => state.articlesReducer,
  );
  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);
  return (
    <>
      {loading && <ReactLoading type='spin' color='#1890ff' />}
      {!loading && fullArticleData && (
        <Article
          title={fullArticleData.title}
          description={fullArticleData.description}
          author={fullArticleData.author.username}
          imageUrl={fullArticleData.author.image}
          tagList={fullArticleData.tagList}
          createTime={fullArticleData.createdAt}
          body={fullArticleData.body}
          liked={fullArticleData.favorited}
          likes={fullArticleData.favoritesCount}
          slug={slug}
        />
      )}
    </>
  );
}
export default ArticleFull;
