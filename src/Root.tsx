import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { App } from './App';
import { CartPage } from './pages/CartPage/CartPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { ErrorType } from './domain/models/ErrorType';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProductsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<ErrorPage error={ErrorType.NOT_FOUND} />} />
        </Route>
      </Routes>
    </Router>
  );
};
