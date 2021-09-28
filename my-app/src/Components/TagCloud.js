import React from 'react';
import Loader from './Loader';

class TagCloud extends React.Component {
  constructor() {
    super();
    this.state = {
      tagsList: [],
    };
  }
  componentDidMount = async () => {
    try {
      await fetch('https://mighty-oasis-08080.herokuapp.com/api/tags')
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            tagsList: [...this.state.tagsList, data],
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.state.tagsList);
    return (
      <>
        <section className='allTags'>
          {this.state.tagsList.length === 0 ? <Loader /> : ''}
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
