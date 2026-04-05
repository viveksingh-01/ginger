import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../../constants';
import useSearch from '../hooks/useSearch';

function SearchBoxPage() {
  const [query, setQuery] = useState('');
  const { results, isLoading } = useSearch(query);

  return (
    <main className="mx-auto w-full max-w-[720px] mt-24 p-3">
      <section className="relative w-full">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)" />
        <input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Search for restaurants"
          className="w-full border border-(--border-light) py-3 px-6 pl-12 focus:outline-none focus:ring-2 ring-ginger"
        />
      </section>
      <section className="mt-4 p-4 space-y-4">
        {query && !isLoading && results.length === 0 && (
          <p className="text-gray-500 text-center">No restaurants found.</p>
        )}
        {results?.map(({ id, name, cuisines, cloudinaryImageId }) => (
          <>
            <Link to={`/restaurant/${id}`}>
              <article key={id} className="flex items-center gap-4 transition">
                <img src={IMAGE_URL + cloudinaryImageId} alt={name} className="min-w-24 h-24 object-cover rounded-lg" />
                <div>
                  <h2 className="font-semibold">{name}</h2>
                  <p className="text-gray-500 text-sm">{cuisines.join(', ')}</p>
                </div>
              </article>
            </Link>
            <hr className="mt-4 text-gray-300" />
          </>
        ))}
      </section>
    </main>
  );
}

export default SearchBoxPage;
