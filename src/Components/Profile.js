// import userEvent from '@testing-library/user-event';
import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { articlesURL, FEED_ARTICLES } from '../utils/constant';
import { withRouter } from 'react-router';
import Loader from './Loader';
import Pagination from './Pagination';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesList: [],
      tagName: null,
      feed: 'global',
      login: '',
      store: '',
      feedCount: '',
      // pagination
      articleCount: 0,
      articlesPerPage: 10,
      articleIndexPage: 1,
      error: '',
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

  handleFeed = (category) => {
    if (category === 'global') {
      this.setState(
        {
          feed: category,
          tagName: null,
          articlesList: [],
          articleIndexPage: 1,
        },
        this.componentDidMount
      );
    }
    if (category === 'personal') {
      this.setState(
        {
          feed: 'personal',
          tagName: null,
          articlesList: [],
          articleIndexPage: 1,
        },
        this.componentDidMount
      );
    }
  };
  handleFilterReset = () => {
    this.setState(
      {
        tagName: null,
        feed: 'personal',
        articlesList: [],
      },
      this.componentDidMount
    );
  };
  componentDidMount = async () => {
    let { articlesPerPage, articleIndexPage } = this.state;
    let offset = (articleIndexPage - 1) * 10;
    let storageKey = localStorage['app__user'];
    if (storageKey) {
      if (this.state.feed === 'global') {
        try {
          await fetch(
            `${FEED_ARTICLES}/?offset=${offset}&limit=${articlesPerPage}`,
            {
              method: 'GET',
              headers: {
                authorization: `Token ${storageKey}`,
              },
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error(res.statusText);
              } else {
                return res.json();
              }
            })
            .then((data) =>
              this.setState({
                articlesList: [data],
                feedCount: data.articles.length,
              })
            );
        } catch (error) {
          this.setState({
            error: 'Articles are not fetched',
          });
        }
      }
      if (this.state.feed === 'personal') {
        try {
          await fetch(
            'https://mighty-oasis-08080.herokuapp.com/api/articles?author=' +
              this.props.user.username
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error(res.statusText);
              } else {
                return res.json();
              }
            })
            .then((data) =>
              this.setState({
                articlesList: [data],
                articleCount: data.articlesCount,
                tagUpdate: this.props.tagName,
                articleIndexPage: 1,
              })
            );
        } catch (error) {
          this.setState({
            error: 'Articles are not fetched',
          });
        }
      }
    }
  };
  handleDelete = (slug) => {
    let storageKey = localStorage['app__user'];
    fetch(articlesURL + '/' + slug, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${storageKey}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          this.props.history.push(`/`);
        }
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  render() {
    let { error, tagName, articlesList, feed } = this.state;
    let { username, bio, image, email } = this.props.user;
    return (
      <>
        <section className='profile__section'>
          <div class='rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-white profile__card'>
            <img
              src='https://i.imgur.com/dYcYQ7E.png'
              class='w-full'
              alt='background'
            />
            <div class='flex justify-center -mt-8'>
              <img
                src={image}
                class='rounded-full border-solid border-white border-2 -mt-3 max-h-20'
                alt='profile'
              />
            </div>
            <div class='text-center px-3 pb-6 pt-2'>
              <h3 class='text-black text-sm bold font-sans'>{username}</h3>
              <h4 class='mt-2 font-sans font-light text-sm bold text-black'>
                {bio}
              </h4>
              <p class='mt-2 font-sans font-light text-black'>{email}</p>
            </div>
            <div class='flex justify-center pb-3 text-black'>
              <div class='text-center mr-3 border-r pr-3'>
                <h2>
                  {this.state?.articlesList
                    ? this.state?.articlesList.length
                    : 0}
                </h2>
                <span>Articles</span>
              </div>
              <div class='text-center mr-3  pr-3'>
                <h2>{this.state?.feedCount ? this.state?.feedCount : 0}</h2>
                <span>Feed Articles</span>
              </div>
            </div>
            <div className='outer__div'>
              <NavLink to='/settings'>
                <button className='text-indigo-500 inline-flex items-center edit__profile  mt-4'>
                  Edit Profile
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
        </section>

        <div className='flex__articles'>
          <section className='text-gray-600 body-font overflow-hidden articleSection'>
            <nav className='bg-white shadow dark:bg-gray-800'>
              <div className='container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300'>
                <button
                  className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
                    feed === 'personal' ? 'active' : ''
                  }`}
                  onClick={() => this.handleFeed('personal')}
                >
                  Your Articles
                </button>
                <button
                  className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
                    feed === 'global' ? 'active' : ''
                  }`}
                  onClick={() => this.handleFeed('global')}
                >
                  Your Feed
                </button>

                {tagName ? (
                  <button
                    className={`text-gray-800 dark:text-gray-200 border-blue-500 mx-1.5 sm:mx-6 ${
                      tagName ? 'active' : ''
                    }`}
                    onClick={() => this.handleFeed(tagName)}
                  >
                    {tagName}
                  </button>
                ) : (
                  ''
                )}
              </div>
            </nav>
            <div className='container px-5 py-24 mx-auto'>
              <div className='-my-8 divide-y-2 divide-gray-100'>
                {articlesList.length <= 0 ? <p>No Articles Found!</p> : ''}
                {error ? <p>{error}</p> : ''}
                {this.state.articlesList.length === 0 && !error ? (
                  <Loader />
                ) : (
                  ''
                )}
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
                      <NavLink to={`/articles/${eachArticle.slug}`}>
                        <h2 className='text-2xl font-medium text-gray-900 title-font mb-2'>
                          {eachArticle.title}
                        </h2>
                      </NavLink>
                      <p className='leading-relaxed'>
                        {eachArticle.description}
                      </p>
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
                      {feed === 'personal' ? (
                        <NavLink to={`/edit/articles/${eachArticle.slug}`}>
                          <button className='text-indigo-500 inline-flex items-center mt-4 px-3 py-1 m-2 border rounded-md'>
                            Edit
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
                      ) : (
                        ''
                      )}
                      {feed === 'personal' ? (
                        <button
                          className='text-indigo-500 inline-flex items-center mt-4 px-3 py-1 border rounded-md m-2'
                          onClick={() => this.handleDelete(eachArticle.slug)}
                        >
                          Delete
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
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                ))}
                <Pagination
                  {...this.state}
                  handlePage={this.handlePageUpdate}
                />
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default withRouter(Profile);
