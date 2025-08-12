import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TodoApp from './components/todoAPP';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <TodoApp />
  </>
);
reportWebVitals();
