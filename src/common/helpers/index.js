import { useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useClickOutside(ref, action) {
  useEffect(() => {
    function handleClickOutside(event) {
      event.stopPropagation();
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
