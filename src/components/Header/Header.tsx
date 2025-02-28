import { getActivePage } from '../../utils/linkHelper';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
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
