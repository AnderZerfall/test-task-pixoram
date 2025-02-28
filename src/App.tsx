import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles/App.scss';
import { CategoryContextProvider } from './context/CategoryContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <CategoryContextProvider>
        <main className="main">
          <div className="main__container container">
            <Outlet />
          </div>
        </main>
      </CategoryContextProvider>
      <Footer />
    </div>
  );
};
