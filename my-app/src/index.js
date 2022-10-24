import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { FitbitSync } from './pages';

ReactDOM.render(
    <ContextProvider>
      <App />
    </ContextProvider>, 
    document.getElementById('root'),
);





