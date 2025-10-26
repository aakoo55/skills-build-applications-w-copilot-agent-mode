import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Build API base using the Codespace name if provided. Falls back to localhost
const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE = codespace
  ? `https://${codespace}-8000.app.github.dev/api`
  : (window.REACT_APP_API_BASE || 'http://localhost:8000/api');

// Expose to window so existing components can read it (they use window.REACT_APP_API_BASE)
window.REACT_APP_API_BASE = API_BASE;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
