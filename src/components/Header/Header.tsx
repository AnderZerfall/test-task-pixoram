import { getActivePage } from '../../utils/linkHelper';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { CartCounter } from '../CartCounter/CartCounter';
import {
  CART_UPDATE_EVENT,
  getFromCart,
} from '../../utils/sessionStorageHelper';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const cart = getFromCart();

    setCounter(cart.length);
    addEventListener(CART_UPDATE_EVENT, () => setCounter(getFromCart().length));

    return () =>
      removeEventListener(CART_UPDATE_EVENT, () =>
        setCounter(getFromCart().length)
      );
  }, []);

  return (
    <header className="header">
      <div className="header__container container">
        <h4 className="header__logo">GoodyGod</h4>
        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/products" className={getActivePage}>
                Products
              </NavLink>
            </li>
            <li className="nav__item">
              {counter !== 0 && (<CartCounter counter={counter} />)}

              <NavLink to="/cart" className={getActivePage}>
                Cart
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
