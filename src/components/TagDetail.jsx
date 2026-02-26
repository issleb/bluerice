import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getByTag, stripImagePath } from '../utils/strips';

export default function TagDetail() {
  const { name } = useParams();
  const decoded = decodeURIComponent(name);
  const strips = getByTag(decoded);

  useEffect(() => {
    document.title = `${decoded} - Blue Rice`;
  }, [decoded]);

  return (
    <div className="tag-detail">
      <h2>Tag: {decoded}</h2>
      <p className="tag-detail-count">{strips.length} strip{strips.length !== 1 ? 's' : ''}</p>

      <Link to="/tags" className="back-link">&larr; All tags</Link>

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
