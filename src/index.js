import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './Components/HandleAuthenticate';
import ErrorBoundary from './Components/ErrorBoundary';
ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);
