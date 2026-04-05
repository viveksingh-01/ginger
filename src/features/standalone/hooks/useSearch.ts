import { useEffect, useState } from 'react';
import type IRestaurant from '../../restaurant/models/restaurant';

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

const useSearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    fetchResults(debouncedQuery, controller);
    return () => controller.abort();
  }, [debouncedQuery]);

  const fetchResults = async (query: string, { signal }: AbortController) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/restaurants/search?q=${query}`, { signal });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading };
};

export default useSearch;
