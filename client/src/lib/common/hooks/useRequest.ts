"use client";

import { useEffect, useState } from "react";
import { ApiResponse } from "../interfaces";

function useRequest<T>(callback) {
  const [requestData, setRequestData] = useState<ApiResponse<T>>({
    data: [],
    message: null,
    statusCode: null,
    loading: true,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await callback();
        setRequestData(res);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [callback]);

  return { requestData, error };
}

export default useRequest;
