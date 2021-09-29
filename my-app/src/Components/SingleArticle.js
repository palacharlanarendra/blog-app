import React from 'react';
import moment from 'moment';
import Loader from './Loader';
class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleArticle: [],
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
        .then((data) =>
          this.setState({
            singleArticle: [data],
          })
        );
    } catch (error) {
      this.setState({
        error: 'Article not fetched',
      });
    }
  };
  render() {
    console.log(this.state.singleArticle[0]?.article.author.image);
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
        </section>
      </>
    );
  }
}

export default SingleArticle;
