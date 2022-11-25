import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';
import App from './App';

axios.defaults.baseURL = ' https://restcountries.com';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
