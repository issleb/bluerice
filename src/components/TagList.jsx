import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTags } from '../utils/strips';

const MIN_SIZE = 13;
const MAX_SIZE = 26;

function getTagSize(count, maxCount) {
  if (maxCount <= 1) return MIN_SIZE;
  const scale = Math.log(count) / Math.log(maxCount);
  return Math.round(MIN_SIZE + scale * (MAX_SIZE - MIN_SIZE));
}

export default function TagList() {
  const tags = getAllTags();
  const maxCount = tags.length > 0 ? tags[0].count : 1;

  useEffect(() => {
    document.title = 'Tags - Blue Rice';
  }, []);

  return (
    <div className="tag-list">
      <div className="tag-cloud">
        {tags.map(({ name, count }) => (
          <Link
            key={name}
            to={`/tag/${encodeURIComponent(name)}`}
            className="tag-pill"
            style={{ fontSize: `${getTagSize(count, maxCount)}px` }}
          >
            {name} <span className="tag-count">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
