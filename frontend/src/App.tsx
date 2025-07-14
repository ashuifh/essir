import React, { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    setIsLoading(true);
    console.log('Searching for:', query);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSubscribe = () => {
    if (!email.trim()) return;

    setIsSubscribing(true);
    console.log('Subscribing with email:', email);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-gray-800 bg-gray-50">
      <h1 className="mb-8 text-6xl font-bold">Dream job</h1>

      {/* Search Bar */}
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          placeholder="Search jobs e.g., frontend developer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-6 py-3 text-white transition bg-blue-500 rounded-r-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Email Subscription */}
      <div className="flex w-full max-w-xl mt-8">
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
          className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubscribe}
          disabled={isSubscribing}
          className="px-6 py-3 text-white transition bg-blue-500 rounded-r-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubscribing ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default App;
