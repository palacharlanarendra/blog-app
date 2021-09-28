import React from 'react';
import Loader from './Loader';
import moment from 'moment';
import '../style.css';
import Pagination from './Pagination';
import { NavLink } from 'react-router-dom';
class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesList: [],
      feed: 'global',
      tagUpdate: null,
      // pagination
      articleCount: 0,
      articlesPerPage: 10,
      articleIndexPage: 1,
    };
  }
  handlePageUpdate = (num) => {
    this.setState(
      {
        articleIndexPage: num,
      },
      this.componentDidMount
    );
  };
  // componentDidMount = async () => {
  //   try {
  //     await fetch(
  //       'https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10'
  //     )
  //       .then((res) => res.json())
  //       .then((data) =>
  //         this.setState({
  //           articlesList: [...this.state.articlesList, data],
  //         })
  //       );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  handleFeed = (category) => {
    this.setState(
      {
        feed: category,
      },
      this.componentDidMount
    );
  };
  componentDidMount = async () => {
    let { articlesPerPage, articleIndexPage } = this.state;
    let offset = (articleIndexPage - 1) * 10;
    if (this.state.feed === 'global') {
      try {
        await fetch(
          this.state.tagUpdate === null
            ? `https://mighty-oasis-08080.herokuapp.com/api/articles/?offset=${offset}&limit=${articlesPerPage}`
            : `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10?&tag=${this.state.tagUpdate}`
        )
          .then((res) => res.json())
          .then((data) =>
            this.setState({
              articlesList: [data],
              articleCount: data.articlesCount,
              tagUpdate: this.props.tagName,
            })
          );
        console.log(this.state.articleCount);
      } catch (error) {
        console.log(error);
      }
    }
    if (this.state.feed === 'personal') {
      this.setState({
        articlesList: [],
      });
    }
  };

  render() {
    console.log('hello', this.state.articlesList);
    return (
      <>
        <section className='text-gray-600 body-font overflow-hidden articleSection'>
          <nav className='bg-white shadow dark:bg-gray-800'>
            <div className='container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300'>
              <button
                className={`text-gray-800 dark:text-gray-200 border-blue-500 mx-1.5 sm:mx-6 ${
                  this.state.feed === 'personal' ? 'active' : ''
                }`}
                onClick={() => this.handleFeed('personal')}
              >
                Personal
              </button>

              <button
                className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
                  this.state.feed === 'global' ? 'active' : ''
                }`}
                onClick={() => this.handleFeed('global')}
              >
                Global
              </button>
            </div>
          </nav>
          <div className='container px-5 py-24 mx-auto'>
            <div className='-my-8 divide-y-2 divide-gray-100'>
              {this.state.articlesList.length === 0 ? <Loader /> : ''}
              {this.state.articlesList[0]?.articles?.map((eachArticle) => (
                <div className='py-8 flex flex-wrap md:flex-nowrap'>
                  <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
                    <span className='font-semibold title-font text-gray-700'>
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
                    <span className='mt-1 text-gray-500 text-sm'>
                      {moment(eachArticle?.updatedAt).format('MMM Do YY')}
                    </span>
                  </div>
                  <div className='md:flex-grow'>
                    <h2 className='text-2xl font-medium text-gray-900 title-font mb-2'>
                      {eachArticle.title}
                    </h2>
                    <p className='leading-relaxed'>{eachArticle.description}</p>
                    <strong className='like__image'>
                      <img src='./images/heart.svg' alt='like button' />
                    </strong>
                    <NavLink to={`/articles/${eachArticle.slug}`}>
                      <button className='text-indigo-500 inline-flex items-center mt-4'>
                        Read More
                        <svg
                          className='w-4 h-4 ml-2'
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
                      </button>
                    </NavLink>
                  </div>
                </div>
              ))}
              <Pagination {...this.state} handlePage={this.handlePageUpdate} />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Articles;
