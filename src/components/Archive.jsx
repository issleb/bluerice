import { Link, useLocation } from 'react-router-dom';
import { getOldStrips, getNewStrips, stripThumbPath } from '../utils/strips';

export default function Archive() {
  const location = useLocation();
  const isNew = location.pathname === '/archive/new';
  const strips = isNew ? getNewStrips() : getOldStrips();
  const title = isNew ? 'New Strips' : 'Old Strips (1999–2002)';

  return (
    <div className="archive">
      <h2>{title}</h2>

      <div className="archive-toggle">
        <Link to="/archive" className={!isNew ? 'active' : ''}>Old Strips</Link>
        <Link to="/archive/new" className={isNew ? 'active' : ''}>New Strips</Link>
      </div>

      <div className="thumbnail-grid">
        {strips.map(strip => (
          <Link
            key={strip.number}
            to={`/strip/${strip.number}`}
            className="thumbnail-link"
          >
            <img
              src={stripThumbPath(strip.number)}
              alt={`Strip ${strip.number}`}
              className="thumbnail"
              loading="lazy"
            />
            <span className="thumb-label">
              {strip.isNew ? `N${strip.number.slice(1)}` : `#${strip.number}`}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
