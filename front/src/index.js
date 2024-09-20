import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Tailwind CSS
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'; // Redux store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
