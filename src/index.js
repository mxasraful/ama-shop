import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './Components/StateProvider/StateProvider';
import { initialState, reducer } from './Components/StateProvider/reducer';
import axios from 'axios';

// Set axios default url
axios.defaults.baseURL = 'https://mxamazon.up.railway.app';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider initialState={initialState} reducer={reducer}>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
