import { useState, useEffect } from 'react';

const CACHE = {};

export default function useCachedFetch(url, defaultValue = [], ttl = 120) {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const cacheID = url;
    if (CACHE[cacheID]?.data !== undefined) {
      setData(CACHE[cacheID]?.data);
      setLoading(false);
    } else {
      setLoading(true);
      setData(defaultValue);
    }
    // fetch new data only if ttl has passed or if no previous data
    if (!CACHE[cacheID] || (new Date().getTime() - CACHE[cacheID]?.ts) > ttl * 1000) {
      CACHE[cacheID] = {
        ts: new Date().getTime(),
      };
      (async () => {
        const res = await fetch(url);
        const resData = await res.json();
        CACHE[cacheID].data = resData;
        setData(resData);
        setLoading(false);
      })();
    }
  }, [url, defaultValue, ttl]);

  return [data, isLoading];
}
