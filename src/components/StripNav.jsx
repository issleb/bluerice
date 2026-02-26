import { Link } from 'react-router-dom';
import { getNext, getPrev } from '../utils/strips';

export default function StripNav({ number }) {
  const prev = getPrev(number);
  const next = getNext(number);

  return (
    <nav className="strip-nav">
      <Link
        to={prev ? `/strip/${prev}` : '#'}
        className={`nav-btn ${!prev ? 'disabled' : ''}`}
        aria-label="Previous strip"
      >
        &lsaquo; Prev
      </Link>
      <Link
        to={next ? `/strip/${next}` : '#'}
        className={`nav-btn ${!next ? 'disabled' : ''}`}
        aria-label="Next strip"
      >
        Next &rsaquo;
      </Link>
    </nav>
  );
}
