import React from 'react';
import { articlesURL } from '../utils/constant';
import { withRouter } from 'react-router';
class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      errors: {
        body: '',
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
  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    switch (name) {
      case 'body':
        errors.body = this.validateField(value);
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { body } = this.state;
    // Default options are marked with *
    let storageKey = localStorage['app__user'];
    fetch(`${articlesURL}/${this.props.slug}/comments`, {
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
      body: JSON.stringify({
        comment: {
          body,
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
      .then(({ comment }) => {
        this.setState({
          body: '',
        });
        window.location.reload();
        // this.props.history.push(`/articles/${this.props.slug}`);
        console.log('new comment', comment);
      })
      .catch((errors) => {
        console.log(errors);
        this.setState({ errors });
      });
  };

  render() {
    console.log('arey user', this.props.slug);
    let { body } = this.state.errors;

    return (
      <>
        <div class='bg-grey-lighter min-h-screen flex flex-col'>
          <div class='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <div class='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
              <input
                value={this.state.body}
                onChange={this.handleInput}
                type='text'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                id='body'
                name='body'
                placeholder='body'
              />
              <span>{body}</span>

              <button
                type='submit'
                onClick={this.handleSubmit}
                class='w-full text-center py-3 rounded bg-blue-200 text-black hover:bg-blue-400 focus:outline-none my-1'
                disabled={body}
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(NewComment);
