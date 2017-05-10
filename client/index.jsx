import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './components/App';

const root = document.getElementById('app');

const store = configureStore({});

const renderApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(renderApp(), root);
