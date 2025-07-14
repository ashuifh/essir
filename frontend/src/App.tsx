import React, { useState } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  posted: string;
  type: string;
}

const App = () => {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

 const handleSearch = async () => {
  if (!query.trim()) return;

  setIsLoading(true);
  setHasSearched(true);

  try {
    const res = await fetch(`/api/jobs?query=${encodeURIComponent(query)}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const data = await res.json();
    console.log('Jobs received:', data);
    
    setJobs(data.jobs || []);
  } catch (error) {
    console.error('Search error:', error);
    alert(`Search failed: ${error.message}`);
    setJobs([]);
  } finally {
    setIsLoading(false);
  }
};


  const handleSubscribe = async () => {
    if (!email.trim()) return;

    setIsSubscribing(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Failed to subscribe');
      }

      const data = await res.json();
      console.log('Subscription result:', data);
      
      alert('Successfully subscribed to job alerts!');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      alert(`Subscription failed: ${error.message}`);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 text-gray-800 bg-gray-50">
      <div className="flex flex-col items-center justify-center">
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
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
            className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="px-6 py-3 text-white transition bg-red-500 rounded-r-md hover:bg-red-600 disabled:opacity-50"
          >
            {isSubscribing ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </div>

      {/* Job Results */}
      {hasSearched && (
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="mb-6 text-2xl font-semibold">
            {jobs.length > 0 ? `Found ${jobs.length} jobs` : 'No jobs found'}
            {query && ` for "${query}"`}
          </h2>
          
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-lg text-gray-700">{job.company}</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                    {job.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                  <span>📅 {job.posted}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{job.description}</p>
                
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;