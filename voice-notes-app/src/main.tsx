import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerLicense } from '@syncfusion/ej2-base';
import App from './App';
import './styles/variables.css';
import './styles/syncfusion-overrides.css';
import './index.css';

// Register Syncfusion community license
// Replace with your license key from https://www.syncfusion.com/account/manage-teams/downloads
registerLicense('YOUR_SYNCFUSION_LICENSE_KEY');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
