import { Link } from 'react-router-dom';
import { getAllTags } from '../utils/strips';

export default function TagList() {
  const tags = getAllTags();

  return (
    <div className="tag-list">
      <h2>Tags</h2>
      <div className="tag-cloud">
        {tags.map(({ name, count }) => (
          <Link
            key={name}
            to={`/tag/${encodeURIComponent(name)}`}
            className="tag-pill"
          >
            {name} <span className="tag-count">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
