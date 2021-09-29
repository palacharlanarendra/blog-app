import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import Articles from './Articles';
import TagCloud from './TagCloud';
import '../style.css';
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <HeroSection />
        <div>
          <Articles />
        </div>
      </div>
    );
  }
}

export default App;
