import { Search } from 'lucide-react';

function SearchBox() {
  return (
    <section className="mx-auto w-6/12 mt-24 p-3">
      <div className="relative w-full">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)" />
        <input
          type="text"
          placeholder="Search for restaurants"
          className="w-full border border-(--border-light) py-3 px-6 pl-12 focus:outline-none focus:ring-2 ring-ginger"
        />
      </div>
    </section>
  );
}

export default SearchBox;
