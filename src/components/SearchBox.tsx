import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import type IRestaurant from '../models/restaurant';

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IRestaurant[]>([]);
  console.log(results);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      const res = await fetch(`${BASE_URL}/restaurants/search?q=${query}`);
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
    </section>
  );
}

export default SearchBox;
