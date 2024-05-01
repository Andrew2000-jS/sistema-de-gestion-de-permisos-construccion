"use client";

import { useEffect, useState } from "react";

function useActions(callback) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        callback()
          .then((res) => setData(res))
          .catch((err) => setError(err));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    })();
  }, [callback]);

  return { data, error, loading };
}

export default useActions;
