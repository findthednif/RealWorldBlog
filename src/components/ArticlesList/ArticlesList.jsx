import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';

import { fetchArticles, pageChange } from '../Redux/Articles/actions';
import Article from '../Article/Article';

function ArticleList() {
  const { articlesData, currentPage, totalPages, loading } = useSelector(
    (state) => state.articlesReducer,
  );
  const offset = 5 * (currentPage - 1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [dispatch, offset]);
  const articles = articlesData.map((articleInfo) => (
    <Article
      key={uuidv4()}
      title={articleInfo.title}
      description={articleInfo.description}
      author={articleInfo.author.username}
      imageUrl={articleInfo.author.image}
      tagList={articleInfo.tagList}
      createTime={articleInfo.createdAt}
      slug={articleInfo.slug}
      liked={articleInfo.favorited}
      likes={articleInfo.favoritesCount}
    />
  ));
  return (
    <>
      {loading && <ReactLoading type='spin' color='#1890ff' />}
      {articles}
      {!loading && (
        <Pagination
          defaultCurrent={currentPage}
          total={totalPages * 10}
          showSizeChanger={false}
          onChange={(page) => dispatch(pageChange(page))}
          hideOnSinglePage
        />
      )}
    </>
  );
}
export default ArticleList;
