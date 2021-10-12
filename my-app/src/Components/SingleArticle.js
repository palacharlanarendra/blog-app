import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import moment from 'moment';
import Loader from './Loader';
import NewComment from './NewComment';
import CommentList from './CommentList';
import { articlesURL } from '../utils/constant';
class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleArticle: [],
      favouritesList: '',
      error: '',
    };
  }

  componentDidMount = async () => {
    let slug = this.props.match.params.slug;
    try {
      await fetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then(
          (data) =>
            this.setState({
              singleArticle: [data],
            })
          // console.log(data)
        );
    } catch (error) {
      this.setState({
        error: 'Article not fetched',
      });
    }
    let storageKey = localStorage['app__user'];
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
        .then(
          (data) =>
            this.setState({
              favouritesList: data,
            })
          // console.log('wow', data)
        );
    } catch (error) {
      this.setState({
        error: 'Articles are not fetched',
      });
    }
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
    // console.log('fav', await this.state.singleArticle[0]);
    // // console.log('fav', result);
    // this.componentDidMount();
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
        console.log(errors);
        this.setState({ errors });
      });
  };
  render() {
    // console.log(this.state.singleArticle[0]?.article.author.image);
    console.log('props', this.props);

    console.log(
      'compare this both ',
      this.state?.favouritesList?.articles,
      this.state.singleArticle[0]?.article
    );
    console.log(
      'boolean',
      this.state?.favouritesList?.articles?.some(
        (elem) => elem.slug === this.state.singleArticle[0]?.article.slug
      )
    );
    let { error } = this.state;
    return (
      <>
        <section className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
          {this.state.singleArticle.length === 0 && !error ? <Loader /> : ''}
          <p className='mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-center'>
            {moment(this.state.singleArticle[0]?.article?.updatedAt).format(
              'MMM Do YY'
            )}
          </p>
          {this.state?.favouritesList?.articles?.some(
            (elem) => elem.slug === this.state.singleArticle[0]?.article.slug
          ) ? (
            <strong
              onClick={() =>
                this.handleUnFavorite(this.props.match.params.slug)
              }
              className='like__image'
            >
              <img src='/images/heart.svg' alt='like button' />
            </strong>
          ) : (
            <strong
              onClick={() => this.handleFavorite(this.props.match.params.slug)}
              className='like__image'
            >
              <img src='/images/heart2.png' alt='like button' />
            </strong>
          )}

          <div className='max-w-xl mb-5 md:mx-auto sm:text-center lg:max-w-2xl'>
            <div className='mb-4'>
              <a
                href='/'
                aria-label='Article'
                className='inline-block max-w-lg font-sans text-3xl font-extrabold leading-none tracking-tight text-black transition-colors duration-200 hover:text-deep-purple-accent-700 sm:text-4xl'
              >
                {this.state.singleArticle[0]?.article?.title}
              </a>
            </div>
            <p className='text-base text-gray-700 md:text-lg'>
              {this.state.singleArticle[0]?.article?.description}
            </p>
          </div>
          <div className='mb-10 sm:text-center'>
            <a href='/' aria-label='Author' className='inline-block mb-1'>
              <img
                alt='avatar'
                src={this.state.singleArticle[0]?.article.author.image}
                className='object-cover w-10 h-10 rounded-full shadow-sm'
              />
            </a>
            <div>
              <a
                href='/'
                aria-label='Author'
                className='font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700'
              >
                {this.state.singleArticle[0]?.article?.author?.username}
              </a>
              <p className='text-sm font-medium leading-4 text-gray-600'>
                Author
              </p>
            </div>
          </div>
          <div className='sm:text-center'>
            <a
              href='/'
              aria-label=''
              className='inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800'
            >
              {this.state.singleArticle[0]?.article?.body}
            </a>
          </div>

          {this.props?.user?.username ? (
            <NewComment slug={this.props.match.params.slug} />
          ) : (
            <div class='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
              <div class='px-4 py-2 -mx-3'>
                <div class='mx-3'>
                  <p class='text-sm text-gray-600 dark:text-gray-200 para'>
                    <NavLink to='/signin'>Sign-in</NavLink> or{' '}
                    <NavLink to='/signup'>Sign-up</NavLink> to comment on this
                    article
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  }
}

export default withRouter(SingleArticle);
