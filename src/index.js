import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App/App';
import './index.css';
import store from './components/Redux/store';

const root = ReactDOM.createRoot(document.querySelector('.root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
