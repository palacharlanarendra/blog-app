import React from 'react';
import { articlesURL } from '../utils/constant';
import { withRouter } from 'react-router';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
class UpdateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: '',
      tagList: '',
      totalCount: 0,
      articleList: [],
      errors: {
        title: '',
        description: '',
        body: '',
        tagList: '',
      },
    };
  }
  validateField = (Field) => {
    let FieldError;
    if (Field.length < 1) {
      FieldError = "This field can't be empty";
    }
    return FieldError;
  };
  validateBody = (Body) => {
    let BodyError;
    if (Body.length < 50) {
      BodyError = "This field can't be less than 10 words";
    }

    return BodyError;
  };

  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    switch (name) {
      case 'title':
        errors.title = this.validateField(value);
        break;
      case 'description':
        errors.description = this.validateField(value);
        break;
      case 'body':
        errors.body = this.validateBody(value);
        break;
      case 'username':
        errors.tagList = this.validateField(value);
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    // Default options are marked with *
    let storageKey = localStorage['app__user'];
    fetch(articlesURL + '/' + this.props.match.params.slug, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${storageKey}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          return res.json();
        }
      })
      .then(({ article }) => {
        this.setState({ title: '', description: '', body: '', tagList: '' });
        this.props.history.push(`/articles/${article.slug}`);
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      body: text,
    });
  };
  clearEditor = ({ html, text }) => {
    return (html = '');
  };
  componentDidMount = async () => {
    try {
      await fetch(
        'https://mighty-oasis-08080.herokuapp.com/api/articles/' +
          this.props.match.params.slug
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            title: data.article.title,
            description: data.article.description,
            body: data.article.body,
            tagList: data.article.tagList,
          })
        );
    } catch (error) {}
  };
  render() {
    let { title, description, body, tagList } = this.state.errors;
    const mdParser = new MarkdownIt();
    return (
      <>
        <div class='bg-grey-lighter min-h-screen flex flex-col'>
          <div class='container  mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <form class='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
              <h1 class='mb-8 text-3xl text-center'>New Post</h1>
              <div className='flex'>
                <div className='w-4/12 m-3'>
                  <input
                    value={this.state.title}
                    onChange={this.handleInput}
                    type='text'
                    className='block border border-grey-light w-full  p-3 rounded mb-4'
                    id='title'
                    name='title'
                    placeholder='Title'
                  />
                  <span>{title}</span>
                </div>
                <div className='w-4/12 m-3'>
                  <input
                    value={this.state.description}
                    onChange={this.handleInput}
                    type='text'
                    id='description'
                    class='block border border-grey-light w-full p-3 rounded mb-4'
                    name='description'
                    placeholder='Description'
                  />
                  <span>{description}</span>
                </div>
              </div>
              <MdEditor
                className='markEditor '
                style={{ height: '500px', overflowY: 'scroll' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                onSubmit={this.clearEditor}
                id='body'
                name='body'
                value={this.state.body}
              />
              <span>{body}</span>
              <div className=''>
                <div className='w-4/12 m-3'>
                  <input
                    value={this.state.tagList}
                    onChange={this.handleInput}
                    type='text'
                    id='tagList'
                    name='tagList'
                    class='block border border-grey-light w-full p-3 rounded mb-4'
                    placeholder='Tag List'
                  />
                  <span>{tagList}</span>
                </div>
                <button
                  type='submit'
                  onClick={this.handleSubmit}
                  class='w-1/12 m-2 text-center py-3 h-12 block rounded bg-blue-200 text-white font-extrabold  hover:bg-blue-400 focus:outline-none '
                  disabled={title || description || body || tagList}
                >
                  Update Post
                </button>
              </div>
              <div class='text-center text-sm text-grey-dark mt-4'>
                By signing up, you agree to the
                <a
                  class='no-underline border-b border-grey-dark text-grey-dark'
                  href='hello'
                >
                  Terms of Service
                </a>
                and
                <a
                  class='no-underline border-b border-grey-dark text-grey-dark'
                  href='hello'
                >
                  Privacy Policy
                </a>
              </div>
            </form>

            <div class='text-grey-dark mt-6'>
              Already have an account?
              <a
                class='no-underline border-b border-blue text-blue'
                href='../login/'
              >
                Log in
              </a>
              .
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(UpdateArticle);
