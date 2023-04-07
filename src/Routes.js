import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import Category from "./pages/Category";
import Info from "./pages/Info";
import Messages from "./pages/Messages";
import Products from "./pages/Products";
import Users from "./pages/Users";
import ProtectedRoute from "./utils/ProtectedRoute";

const RoutesWrapper = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/info"
          element={
            <ProtectedRoute>
              <Info />
            </ProtectedRoute>
          }
        />

        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default RoutesWrapper;
