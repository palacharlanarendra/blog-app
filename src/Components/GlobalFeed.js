import React from 'react';
import moment from 'moment';
function GlobalFeed() {
  return (
    <div>
      <section class='text-gray-600 body-font overflow-hidden'>
        <nav class='bg-white shadow dark:bg-gray-800'></nav>
        <div class='container px-5 py-24 mx-auto'>
          <div class='-my-8 divide-y-2 divide-gray-100'>
            {this.state.articlesList[0]?.articles?.map((eachArticle) => (
              <div class='py-8 flex flex-wrap md:flex-nowrap'>
                <div class='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
                  <span class='font-semibold title-font text-gray-700'>
                    <img
                      className='author__image'
                      src={eachArticle.author.image}
                      alt='profile pic'
                    />
                    <p>
                      {eachArticle.author.username} in
                      <span> {eachArticle.tagList[0]}</span>
                    </p>
                  </span>
                  <span class='mt-1 text-gray-500 text-sm'>
                    {moment(eachArticle.createdAt).format('MMM Do YY')}
                  </span>
                </div>
                <div class='md:flex-grow'>
                  <h2 class='text-2xl font-medium text-gray-900 title-font mb-2'>
                    {eachArticle.title}
                  </h2>
                  <p class='leading-relaxed'>{eachArticle.description}</p>
                  <a class='text-indigo-500 inline-flex items-center mt-4'>
                    Read More
                    <svg
                      class='w-4 h-4 ml-2'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                      fill='none'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    >
                      <path d='M5 12h14'></path>
                      <path d='M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GlobalFeed;
