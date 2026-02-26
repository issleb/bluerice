import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNext, getPrev } from '../utils/strips';

export default function useKeyboardNav(currentNumber) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        const next = getNext(currentNumber);
        if (next) navigate(`/strip/${next}`);
      } else if (e.key === 'ArrowLeft') {
        const prev = getPrev(currentNumber);
        if (prev) navigate(`/strip/${prev}`);
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentNumber, navigate]);
}
