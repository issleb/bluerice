import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getOldStrips, getNewStrips, stripImagePath } from '../utils/strips';

export default function Archive() {
  const location = useLocation();
  const isNew = location.pathname === '/archive/new';
  const strips = isNew ? getNewStrips() : getOldStrips();
  const title = isNew ? 'New Strips' : 'Old Strips (1999–2002)';

  useEffect(() => {
    document.title = `${isNew ? 'New Strips' : 'Old Strips'} - Blue Rice`;
  }, [isNew]);

  return (
    <div className="archive">
      <h2>{title}</h2>

      <div className="strip-scroll">
        {strips.map(strip => {
          const label = strip.isNew ? `New #${strip.number.slice(1)}` : `#${strip.number}`;
          return (
            <div key={strip.number} className="scroll-strip">
              <Link to={`/strip/${strip.number}`}>
                <img
                  src={stripImagePath(strip.number)}
                  alt={`Strip ${strip.number}`}
                  className="scroll-strip-img"
                  loading="lazy"
                />
              </Link>
              <div className="scroll-strip-meta">
                <Link to={`/strip/${strip.number}`} className="scroll-strip-link">
                  {label}
                </Link>
                {strip.publishDate && (
                  <span className="scroll-strip-date">{strip.publishDate}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
