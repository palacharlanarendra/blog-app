import React from 'react';
import { articlesURL } from '../utils/constant';
import { withRouter } from 'react-router';
import CommentList from './CommentList';
class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      commentsArray: [],
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
  fetchAllComments = () => {
    fetch(`${articlesURL}/${this.props.slug}/comments`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
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
          return res.json();
        }
      })
      .then((data) => {
        this.setState({
          commentsArray: data.comments,
        });
      })
      .catch((errors) => {
        console.log(errors);
        this.setState({ errors });
      });
  };

  handleDeleteComment = (id) => {
    console.log(id, this.props.slug);
    let storageKey = localStorage['app__user'];
    if (storageKey) {
      fetch(`${articlesURL}/${this.props.slug}/comments/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        'Access-Control-Allow-Headers':
          'Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin',
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
            this.fetchAllComments();
          }
        })
        .catch((errors) => {
          console.log(errors);
          this.setState({ errors });
        });
    }
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
        this.setState(
          {
            body: '',
          },
          this.fetchAllComments
        );
        // window.location.reload();
        // this.props.history.push(`/articles/${this.props.slug}`);
        console.log('new comment gggggggggggggggggggggggggg', comment);
      })
      .catch((errors) => {
        console.log(errors);
        this.setState({ errors });
      });
  };
  componentDidMount = () => {
    this.fetchAllComments();
  };
  render() {
    console.log('arey user', this.props);
    let { body } = this.state.errors;

    return (
      <>
        <div class='bg-white px-6 py-8 rounded shadow-md text-black comment__form'>
          <input
            value={this.state.body}
            onChange={this.handleInput}
            type='text'
            class='block border border-grey-light w-full p-3 rounded mb-4'
            id='body'
            name='body'
            placeholder=' Your comments here....'
          />
          <span>{body}</span>

          <button
            type='submit'
            onClick={this.handleSubmit}
            class=' text-center py-3 rounded w-full bg-blue-200 text-black hover:bg-blue-400  focus:outline-none my-1'
            disabled={body}
          >
            POST
          </button>
          <CommentList
            commentsArray={this.state.commentsArray}
            slug={this.props.slug}
            fetchAllComments={this.fetchAllComments}
            handleDeleteComment={(id) => this.handleDeleteComment(id)}
          />
        </div>
      </>
    );
  }
}
export default withRouter(NewComment);
