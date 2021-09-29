import React from 'react';
import Loader from './Loader';
import { TAG_URL } from '../utils/constant';

class TagCloud extends React.Component {
  constructor() {
    super();
    this.state = {
      tagsList: [],
      error: '',
    };
  }
  componentDidMount = async () => {
    try {
      await fetch(`${TAG_URL}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) =>
          this.setState({
            tagsList: [data],
          })
        );
    } catch (error) {
      this.setState({
        error: 'Tags are not fetched',
      });
    }
  };

  render() {
    let { error } = this.state;
    console.log(this.state.tagsList);
    return (
      <>
        <section className='allTags'>
          <div
            class=' text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-white-200 text-gray-500 rounded border-2 border-gray-500 '
            onClick={this.props.handleFilterReset}
          >
            RESET FILTERS
          </div>
          {error ? <p>{error}</p> : ''}
          {this.state.tagsList.length === 0 && !error ? <Loader /> : ''}
          {this.state.tagsList[0]?.tags.map((eachTag) =>
            eachTag !== '' ? (
              <div
                class=' text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-white-200 text-gray-500 rounded border-2 border-gray-500 '
                onClick={() => this.props.handleTagName(eachTag)}
              >
                {eachTag}
              </div>
            ) : (
              ''
            )
          )}
        </section>
      </>
    );
  }
}

export default TagCloud;
