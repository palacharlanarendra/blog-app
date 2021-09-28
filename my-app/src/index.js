import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './Components/App';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import SingleArticle from './Components/SingleArticle';
import NotFound from './Components/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact>
        <App />
      </Route>
      <Route path='/signin' exact>
        <Signin />
      </Route>
      <Route path='/signup' exact>
        <Signup />
      </Route>
      <Route path='/articles/:slug' component={SingleArticle} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
