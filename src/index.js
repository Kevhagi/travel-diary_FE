import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContextProvider } from './context/userContext'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />  
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
