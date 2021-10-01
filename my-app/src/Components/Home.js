import React from 'react';
import HeroSection from './HeroSection';
import Articles from './Articles';

import '../style.css';
class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <HeroSection />
        <div>
          <Articles />
        </div>
      </div>
    );
  }
}

export default Home;
