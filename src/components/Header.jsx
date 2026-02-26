import { Link, useNavigate } from 'react-router-dom';
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
        <Link to="/archive">Old Strips</Link>
        <Link to="/archive/new">New Strips</Link>
        <a href="#" onClick={handleRandom}>Random</a>
        <Link to="/tags">Tags</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
