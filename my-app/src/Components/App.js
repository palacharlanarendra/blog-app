import React from 'react';
import Signin from './Signin';
import Signup from './Signup';
import SingleArticle from './SingleArticle';
import { USER_VERIFY_URL } from '../utils/constant';
import Home from './Home';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../style.css';
import Header from './Header';
import FullPageSpinner from './FullPageSpinner';
import Settings from './Settings';
import NewPost from './NewPost';
import Profile from './Profile';
import UpdateArticle from './UpdateArticle';
import UserProfile from './UserProfile';
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
    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <div>
        <Router>
          <Header isLoggedIn={this.state.isLoggedIn} Signout={this.Signout} />
          {this.state.isLoggedIn ? (
            <AuthenticatedApp user={this.state.user} />
          ) : (
            <UnAuthenticatedApp updatedUser={this.updatedUser} />
          )}
        </Router>
      </div>
    );
  }
}

function UnAuthenticatedApp(props) {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/signin' exact>
        <Signin updatedUser={props.updatedUser} />
      </Route>
      <Route path='/signup' exact>
        <Signup updatedUser={props.updatedUser} />
      </Route>
      <Route exact path='/profiles/:username' component={UserProfile} />
      <Route path='/articles/:slug'>
        <SingleArticle />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}
function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route path='/' exact>
        <Home user={props.user} />
      </Route>
      <Route path='/articles/:slug'>
        <SingleArticle user={props.user} />
      </Route>
      <Route path='/newpost' exact>
        <NewPost user={props.user} />
      </Route>
      <Route path='/settings' exact>
        <Settings user={props.user} />
      </Route>
      <Route path='/updateArticles' exact>
        <UpdateArticle user={props.user} />
      </Route>
      <Route path='/profile' exact>
        <Profile user={props.user} />
      </Route>
      <Route path='/profiles/:username' exact>
        <UserProfile user={props.user} />
      </Route>
      <Route path='/edit/articles/:slug' exact>
        <UpdateArticle user={props.user} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}
export default App;
