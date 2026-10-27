import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Register from "./pages/Register";


export default function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="container page-container">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/search" replace />}
          />

          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h2>Không tìm thấy trang</h2>
                <a href="/search">Về trang tìm kiếm</a>
              </div>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}