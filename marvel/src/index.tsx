import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './globals/index.css';
import App from './App';
import './config/i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);
