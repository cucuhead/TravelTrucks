import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage.jsx';
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';
import DetailsPage from './pages/DetailsPage/DetailsPage.jsx';

function App() {
  return (
    <div className="app-container">
      {/* Header her zaman en üstte görünecek */}
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
          {/* Tanımlanmamış tüm yolları Ana Sayfaya yönlendiriyoruz */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;