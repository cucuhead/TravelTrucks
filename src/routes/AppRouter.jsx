import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import DetailsPage from "../pages/DetailsPage/DetailsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
   
      <Route path="/catalog/:id" element={<DetailsPage />} />
   
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;