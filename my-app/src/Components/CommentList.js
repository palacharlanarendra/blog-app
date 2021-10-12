import React from 'react';
import { articlesURL } from '../utils/constant';
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsArray: [],
    };
  }

  render() {
    console.log('properties', this.props);
    // console.log('comment list', this.state?.commentsArray);
    return (
      <>
        {this.props.commentsArray?.map((comment) => (
          <div class='flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800  comment__List'>
            <div class='px-4 py-2 -mx-3 flex__comment'>
              <div class='mx-3'>
                <span class='font-semibold text-green-500 dark:text-green-400'>
                  {comment.author.username}
                </span>
                <p class='text-sm text-gray-600 dark:text-gray-200'>
                  {comment.body}
                </p>
              </div>
              <div onClick={() => this.props.handleDeleteComment(comment.id)}>
                <i class='fas fa-trash'></i>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}
export default CommentList;
