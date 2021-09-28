import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import Articles from './Articles';
import TagCloud from './TagCloud';
import '../style.css';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tagName: null,
    };
  }
  handleTagName = (event) => {
    this.setState({
      tagName: event,
    });
  };
  render() {
    return (
      <div>
        <Header />
        <HeroSection />
        <div className='flex__articles'>
          <Articles {...this.state} />
          <TagCloud handleTagName={this.handleTagName} />
        </div>
      </div>
    );
  }
}

export default App;
