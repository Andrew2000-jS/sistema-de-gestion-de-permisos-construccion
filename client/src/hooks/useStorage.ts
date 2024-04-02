import { useEffect, useState } from 'react';

function useStorage(key) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      setItem(JSON.parse(storedItem));
    }
  }, [key]);

  return { item }
}

export default useStorage;
