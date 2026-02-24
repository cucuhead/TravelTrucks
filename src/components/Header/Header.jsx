import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import css from './Header.module.css';

export default function Header() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link to="/" className={css.logo}>
          Travel<span className={css.logoTrucks}>Trucks</span>
        </Link>
        <div className={css.menu}>
          
          <NavLink to="/" className={buildLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/catalog" className={buildLinkClass} end>
            Catalog
          </NavLink>
        </div>
      </nav>
    </header>
  );
}