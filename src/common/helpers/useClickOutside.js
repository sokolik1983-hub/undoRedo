import { useEffect } from 'react';

function useClickOutside(ref, action) {
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

export default useClickOutside;
