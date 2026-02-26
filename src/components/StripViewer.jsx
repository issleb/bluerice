import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import { getStrip, getNext, getPrev, getLast, stripImagePath, isAtBoundary } from '../utils/strips';
import useKeyboardNav from '../hooks/useKeyboardNav';
import StripNav from './StripNav';

export default function StripViewer() {
  const { number } = useParams();
  const navigate = useNavigate();
  const strip = getStrip(number);
  const touchStart = useRef(null);

  useKeyboardNav(number);

  const handleTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        const next = getNext(number);
        if (next) navigate(`/strip/${next}`);
      } else {
        const prev = getPrev(number);
        if (prev) navigate(`/strip/${prev}`);
      }
    }
    touchStart.current = null;
  }, [number, navigate]);

  if (!strip) {
    return (
      <div className="strip-viewer">
        <h2>Strip not found</h2>
        <Link to="/">Go to latest strip</Link>
      </div>
    );
  }

  const boundary = isAtBoundary(number);
  const label = strip.isNew ? `New #${number.slice(1)}` : `#${number}`;
  const alt = strip.isNew ? `New Strip ${number.slice(1)}` : `Strip ${number}`;

  return (
    <div className="strip-viewer">
      {number === getLast() && (
        <div className="start-link">
          <Link to="/strip/1">Start from #1 &rarr;</Link>
        </div>
      )}

      <div className="strip-frame">
        <div
          className="strip-image-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={stripImagePath(number)}
            alt={alt}
            className="strip-image"
          />
        </div>

        {strip.description && (
          <div
            className="strip-caption"
            dangerouslySetInnerHTML={{ __html: strip.description }}
          />
        )}
      </div>

      <div className="strip-tags-line">
        <span className="strip-number">{label}</span>
        {strip.publishDate && (
          <>
            <span className="dongus">&bull;</span>
            <span className="strip-date">{strip.publishDate}</span>
          </>
        )}
        {strip.tags.length > 0 && strip.tags.map(tag => (
          <span key={tag}>
            <span className="dongus">&bull;</span>
            <Link to={`/tag/${encodeURIComponent(tag)}`} className="tag-pill">
              {tag}
            </Link>
          </span>
        ))}
      </div>

      {boundary?.type === 'end-old' && (
        <div className="boundary-link">
          <Link to="/strip/N1">Continue to new strips &rarr;</Link>
        </div>
      )}
      {boundary?.type === 'start-new' && (
        <div className="boundary-link">
          <Link to="/strip/294">&larr; Back to old strips</Link>
        </div>
      )}

      <StripNav number={number} />
    </div>
  );
}
