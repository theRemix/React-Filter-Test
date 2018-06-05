import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App numUsers={1000} limit={50} />, 
  document.getElementById('root')
);
registerServiceWorker();
