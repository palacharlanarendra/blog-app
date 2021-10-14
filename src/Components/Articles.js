import React from 'react';
import Loader from './Loader';
import moment from 'moment';
import '../style.css';
import Pagination from './Pagination';
import { NavLink } from 'react-router-dom';
import TagCloud from './TagCloud';
import { articlesURL, FEED_ARTICLES } from '../utils/constant';
import FeedPagination from './FeedPagination';
class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesList: [],
      feed: 'global',
      tagName: null,
      login: '',
      store: '',
      // pagination
      articleCount: 0,
      articlesPerPage: 10,
      articleIndexPage: 1,
      error: '',
      favouritesList: '',
      FeedArticlesList: '',
      FeedArticleCount: 0,
      FeedArticlesPerPage: 10,
      FeedArticleIndexPage: 1,
    };
  }

  handleTagName = (event) => {
    this.setState(
      {
        tagName: event,
        feed: '',
      },
      this.componentDidMount
    );
  };
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
    } else {
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
  handleFavorite = async (slug) => {
    let storageKey = localStorage['app__user'];
    await fetch(articlesURL + `/${slug}/favorite`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${storageKey}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      if (!res.ok) {
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      } else {
        this.setState({}, this.componentDidMount);
      }
    });
  };
  handleUnFavorite = async (slug) => {
    let storageKey = localStorage['app__user'];
    await fetch(articlesURL + `/${slug}/favorite`, {
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
          this.setState({}, this.componentDidMount);
        }
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  componentDidMount = async () => {
    let storageKey = localStorage['app__user'];
    let { articlesPerPage, articleIndexPage, tagName } = this.state;
    let offset = (articleIndexPage - 1) * 10;
    if (this.state.feed === 'global') {
      try {
        await fetch(
          tagName === null
            ? `${articlesURL}/?offset=${offset}&limit=${articlesPerPage}`
            : `${articlesURL}/?offset=${offset}&limit=${articlesPerPage}&tag=${tagName}`,
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
              articleCount: data.articlesCount,
              tagUpdate: this.props.tagName,
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
          tagName === null
            ? `${FEED_ARTICLES}/?offset=${offset}&limit=${articlesPerPage}`
            : `${FEED_ARTICLES}/?offset=${offset}&limit=${articlesPerPage}&tag=${tagName}`,
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
              FeedArticlesList: [data],
              articleCount: data.articlesCount,
              tagUpdate: this.props.tagName,
              FeedArticleCount: data.articlesCount,
              FeedArticleIndexPage: 1,
            })
          );
      } catch (error) {
        this.setState({
          error: 'Articles are not fetched',
        });
      }
    }
    // let storageKey = localStorage['app__user'];
    try {
      await fetch(`${articlesURL}/?favorited=${this.props.user.username}`, {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) =>
          this.setState({
            favouritesList: data,
          })
        );
    } catch (error) {
      this.setState({
        error: 'Articles are not fetched',
      });
    }
    try {
      await fetch(
        tagName === null
          ? `${articlesURL}/?offset=${offset}&limit=${articlesPerPage}`
          : `${articlesURL}/?offset=${offset}&limit=${articlesPerPage}&tag=${tagName}`,
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
  };

  render() {
    let { error, tagName, articlesList, feed } = this.state;
    return (
      <>
        <div className='flex__articles'>
          <section className='text-gray-600 body-font overflow-hidden articleSection'>
            <nav className='bg-white shadow dark:bg-gray-800'>
              <div className='container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300'>
                <button
                  className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200  mx-1.5 sm:mx-6 ${
                    feed === 'personal' ? 'active' : ''
                  }`}
                  onClick={() => this.handleFeed('personal')}
                >
                  Your Feed
                </button>
                <button
                  className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200  mx-1.5 sm:mx-6 ${
                    feed === 'global' ? 'active' : ''
                  }`}
                  onClick={() => this.handleFeed('global')}
                >
                  Global Feed
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
                {articlesList.length ? <p>{error}</p> : ''}
                {/* {(this.state.articlesList.length === 0 && !error) ||
                (this.state.favouritesList[0].length === 0 && !error) ? (
                  <Loader />
                ) : (
                  ''
                )} */}
                {this.state.articlesList[0]?.articles?.map((eachArticle) => (
                  <div className='py-8 flex flex-wrap md:flex-nowrap'>
                    <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
                      <span className='font-semibold title-font text-gray-700'>
                        <img
                          className='author__image'
                          src={eachArticle.author.image}
                          alt='profile pic'
                        />
                        <NavLink
                          to={`/profiles/${eachArticle.author.username}`}
                        >
                          <p>
                            {eachArticle.author.username} in
                            <span> {eachArticle.tagList[0]}</span>
                          </p>
                        </NavLink>
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
                      <div className='flex__heart'>
                        {this.state?.favouritesList?.articles?.some(
                          (elem) => elem.slug === eachArticle.slug
                        ) ? (
                          <strong
                            onClick={() =>
                              this.handleUnFavorite(eachArticle.slug)
                            }
                            className='like__image'
                          >
                            <img
                              className='heart'
                              src='/images/heart.svg'
                              alt='like button'
                            />
                          </strong>
                        ) : (
                          <strong
                            onClick={() =>
                              this.handleFavorite(eachArticle.slug)
                            }
                            className='like__image'
                          >
                            <img
                              className='heart'
                              src='/images/heart2.png'
                              alt='like button'
                            />
                          </strong>
                        )}
                        <p className='paragraph'>
                          {eachArticle.favoritesCount}
                        </p>
                      </div>

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
                {this.state.feed === 'global' ? (
                  <Pagination
                    {...this.state}
                    handlePage={this.handlePageUpdate}
                  />
                ) : (
                  <FeedPagination
                    {...this.state}
                    handlePage={this.handlePageUpdate}
                  />
                )}
              </div>
            </div>
          </section>
          <TagCloud
            handleTagName={(event) => this.handleTagName(event)}
            handleFilterReset={this.handleFilterReset}
          />
        </div>
      </>
    );
  }
}

export default Articles;
