import { useParams, Link } from 'react-router-dom';
import { getByTag, stripThumbPath } from '../utils/strips';

export default function TagDetail() {
  const { name } = useParams();
  const strips = getByTag(decodeURIComponent(name));

  return (
    <div className="tag-detail">
      <h2>Tag: {decodeURIComponent(name)}</h2>
      <p className="tag-detail-count">{strips.length} strip{strips.length !== 1 ? 's' : ''}</p>

      <Link to="/tags" className="back-link">&larr; All tags</Link>

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
