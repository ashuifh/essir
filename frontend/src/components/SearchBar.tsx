import React from 'react';
import { Search, Loader } from 'lucide-react';
import { SearchState } from '../types';

interface SearchBarProps {
  searchState: SearchState;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchState,
  onSearchChange,
  onSearch
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchState.query}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="e.g., 'react developer', 'remote python'"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            />
          </div>
          <button
            type="submit"
            disabled={searchState.isLoading || !searchState.query.trim()}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {searchState.isLoading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Searching...
              </>
            ) : (
              'Search Jobs'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;