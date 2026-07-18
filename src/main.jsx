import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { WaypointProvider } from './context/WaypointContext';
import { FavoritesProvider } from './context/FavoritesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WaypointProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </WaypointProvider>
  </React.StrictMode>
);
