import React from 'react';
function FeedPagination(props) {
  let { FeedArticleCount, FeedArticlesPerPage, FeedArticleIndexPage } = props;

  console.log(FeedArticleCount, FeedArticlesPerPage, FeedArticleIndexPage);
  let totalPages = Math.ceil(FeedArticleCount / FeedArticlesPerPage);
  let pageNum = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
      <section className='flex'>
        <button
          onClick={() =>
            props.handlePage(
              FeedArticleIndexPage < 1
                ? FeedArticleIndexPage - 1
                : FeedArticleIndexPage
            )
          }
          className='flex items-center px-4 py-2 mx-1 text-gray-500 bg-blue-200 rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
        >
          previous
        </button>
        {pageNum.map((eachNum) => (
          <button
            onClick={() => props.handlePage(eachNum)}
            className={
              eachNum === FeedArticleIndexPage
                ? 'flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-indigo-500 hover:text-black dark:hover:text-gray-200 '
                : 'flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-indigo-500 hover:text-black dark:hover:text-gray-200'
            }
          >
            {eachNum}
          </button>
        ))}
        <button
          onClick={() => props.handlePage(FeedArticleIndexPage + 1)}
          className='flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-gray-200'
        >
          Next
        </button>
      </section>
    </>
  );
}

export default FeedPagination;
