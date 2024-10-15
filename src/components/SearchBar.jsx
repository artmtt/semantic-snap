import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative flex items-center">
      <input
        type="text"
        placeholder="Type to search..."
        className="w-full py-3 pl-4 pr-12 text-black border rounded-md outline-none bg-gray-50 focus:border-primary"
        value={query}
        onChange={handleQueryChange}
        maxLength={100000}
        required
      />
      <button
        type="submit"
        className="absolute right-4 focus:outline-none"
      >
        <MagnifyingGlassIcon className="h-6 text-secondary opacity-35" />
      </button>
    </form>
  );
};
