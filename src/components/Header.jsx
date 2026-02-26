import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getRandom } from '../utils/strips';

export default function Header() {
  const navigate = useNavigate();

  function handleRandom(e) {
    e.preventDefault();
    navigate(`/strip/${getRandom()}`);
  }

  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <img
          src={`${import.meta.env.BASE_URL}images/legacy/top.gif`}
          alt="Blue Rice"
          className="logo-img"
        />
      </Link>
      <nav className="main-nav">
        <NavLink to="/archive" end className={({ isActive }) => isActive ? 'active' : ''}>Old</NavLink>
        <NavLink to="/archive/new" className={({ isActive }) => isActive ? 'active' : ''}>New</NavLink>
        <a href="#" onClick={handleRandom}>Random</a>
        <NavLink to="/tags" className={({ isActive }) => isActive ? 'active' : ''}>Tags</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
      </nav>
    </header>
  );
}
