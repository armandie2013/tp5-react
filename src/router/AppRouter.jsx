import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MovieList from "../pages/MovieList";
import MovieDetail from "../pages/MovieDetail";
import MovieCreate from "../pages/MovieCreate";
import MovieEdit from "../pages/MovieEdit";
import Favorites from "../pages/Favorites";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<MovieList />} />
      <Route path="/items/create" element={<MovieCreate />} />
      <Route path="/items/:id" element={<MovieDetail />} />
      <Route path="/items/:id/edit" element={<MovieEdit />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}