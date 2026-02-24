import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IMAGE_URL } from '../constants';
import type IRestaurant from '../models/restaurant';

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

function SearchBox() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<IRestaurant[]>([]);

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
      const res = await fetch(`${BASE_URL}/restaurants/search?q=${query}`, { signal });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <section className="mx-auto w-6/12 mt-24 p-3">
      <div className="relative w-full">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for restaurants"
          className="w-full border border-(--border-light) py-3 px-6 pl-12 focus:outline-none focus:ring-2 ring-ginger"
        />
      </div>
      <div className="mt-4 p-4 space-y-4">
        {query && results.length === 0 && <p className="text-gray-500 text-center">No restaurants found.</p>}
        {results?.map(({ id, name, cuisines, cloudinaryImageId }) => (
          <>
            <div key={id} className="flex items-center gap-4 transition">
              <img src={IMAGE_URL + cloudinaryImageId} alt={name} className="min-w-24 h-24 object-cover" />
              <div>
                <h2 className="font-semibold">{name}</h2>
                <p className="text-gray-500 text-sm">{cuisines.join(', ')}</p>
              </div>
            </div>
            <hr className="mt-4 text-gray-300" />
          </>
        ))}
      </div>
    </section>
  );
}

export default SearchBox;
