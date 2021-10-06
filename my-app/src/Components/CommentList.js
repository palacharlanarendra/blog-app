import React from 'react';
import { articlesURL } from '../utils/constant';
class CommentList extends React.Component {
  constructor() {
    super();
    this.state = {
      commentsArray: [],
    };
  }
  componentDidMount() {
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
        // this.props.history.push(`/articles/${this.props.slug}`);
        // console.log('comment list', data.comments);
      })
      .catch((errors) => {
        console.log(errors);
        this.setState({ errors });
      });
  }
  render() {
    // console.log(this.props.slug);
    console.log(this.state?.commentsArray);
    return (
      <>
        {this.state.commentsArray?.map((comment) => (
          <div class='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
            <div class='px-4 py-2 -mx-3'>
              <div class='mx-3'>
                <span class='font-semibold text-green-500 dark:text-green-400'>
                  {comment.author.username}
                </span>
                <p class='text-sm text-gray-600 dark:text-gray-200'>
                  {comment.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}
export default CommentList;
