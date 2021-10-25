import React from 'react';

import { USER_VERIFY_URL } from '../utils/constant';

import '../style.css';

import FullPageSpinner from './FullPageSpinner';
import HandleAuthenticate from './HandleAuthenticate';
class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  Signout = () => {
    this.setState({ isLoggedIn: false, user: null, isVerifying: true });
    localStorage.removeItem('app__user');
    this.componentDidMount();
  };
  componentDidMount = () => {
    let storageKey = localStorage['app__user'];
    if (storageKey) {
      fetch(USER_VERIFY_URL, {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updatedUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  };
  updatedUser = (user) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem('app__user', user.token);
  };
  render() {
    const { isLoggedIn, user, isVerifying } = this.state;
    const userData = { isLoggedIn, user, isVerifying };

    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <div>
        <HandleAuthenticate
          isLoggedIn={this.state.isLoggedIn}
          Signout={this.Signout}
          user={this.state.user}
          updatedUser={this.updatedUser}
        />
      </div>
    );
  }
}

export default App;
