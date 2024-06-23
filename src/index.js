import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import { Provider } from 'react-redux';
import configureStore from './store';

const accessToken = storage.get('accessToken');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([{ path: '*', element: <App /> }]);
const store = configureStore({ auth: !!accessToken }, { router });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
