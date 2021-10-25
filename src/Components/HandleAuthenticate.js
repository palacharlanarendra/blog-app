import React from 'react';

import { UserProvider } from './UserContext';
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
function HandleAuthenticate(props) {
  return (
    <div>
      <Router>
        <Header isLoggedIn={props.isLoggedIn} Signout={props.Signout} />
        {props.isLoggedIn ? (
          <AuthenticatedApp user={props.user} />
        ) : (
          <UnAuthenticatedApp updatedUser={props.updatedUser} />
        )}
      </Router>
    </div>
  );
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
export default HandleAuthenticate;
