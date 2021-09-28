import React from 'react';

function Pagination(props) {
  let { articleCount, articlesPerPage, articleIndexPage } = props;

  console.log(articleCount);
  let totalPages = Math.ceil(articleCount / articlesPerPage);
  let pageNum = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
      <section className='flex'>
        {pageNum.map((eachNum) => (
          <button
            onClick={() => props.handlePage(eachNum)}
            className='flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-indigo-500 hover:text-black dark:hover:text-gray-200'
          >
            {eachNum}
          </button>
        ))}
      </section>
    </>
  );
}

export default Pagination;
