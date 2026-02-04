import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
// PersistGate ve persistor import edildi
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; 
import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      {/* PersistGate uygulamayı sarmalayarak veriler yüklenene kadar bekletir */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);