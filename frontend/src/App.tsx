import React, { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/jobs?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobClick = async (jobId: string) => {
    try {
      const res = await fetch(`/job-details?job_id=${jobId}`);
      const data = await res.json();
      setSelectedJob(data.data?.[0] || null);
    } catch (error) {
      console.error('Job detail error:', error);
    }
  };

  const handleSubscribe = async () => {
    if (!email.trim() || !query.trim()) return;
    setIsSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, query }),
      });
      const data = await res.json();
      alert(data.message || 'Subscribed!');
    } catch (error) {
      alert('Subscription failed');
      console.error('Subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 text-gray-800 bg-gradient-to-br from-gray-50 to-blue-50">
      <h1 className="mb-10 text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
        Dream Job
      </h1>

      {/* Search Bar */}
      <div className="flex w-full max-w-xl overflow-hidden rounded-md shadow-md">
        <input
          type="text"
          placeholder="Search jobs e.g., frontend developer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full px-4 py-3 transition-all duration-200 border border-r-0 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-6 py-3 font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Job List */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {jobs.map((job) => (
          <div
            key={job.job_id || job.title}
            className="relative p-5 border rounded-lg shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-xl bg-white group cursor-pointer"
            onClick={() => {
              const link =
                job.job_apply_link ||
                (job.apply_options && job.apply_options[0]?.apply_link);
              if (link) {
                window.open(link, '_blank');
              } else {
                handleJobClick(job.job_id);
              }
            }}
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {job.job_title || job.title}
            </h2>
            <p className="text-gray-600">{job.employer_name || job.company}</p>
            <p className="text-sm text-gray-500">
              {job.job_city || job.location}, {job.job_country || ''}
            </p>
            <div className="absolute z-10 hidden px-2 py-1 text-xs text-white bg-black rounded top-2 right-2 group-hover:block">
              Click to Apply
            </div>
          </div>
        ))}
      </div>

      {/* Job Detail */}
      {selectedJob && (
        <div className="w-full max-w-2xl p-6 mt-4 mb-10 bg-white border border-gray-300 shadow-lg rounded-xl animate-fade-in">
          <button
            className="mb-3 text-sm text-blue-500 underline hover:text-blue-700"
            onClick={() => setSelectedJob(null)}
          >
            Close
          </button>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            {selectedJob.job_title || selectedJob.title}
          </h2>
          <p className="mb-1 font-semibold text-gray-700">
            {selectedJob.employer_name || selectedJob.company}
          </p>
          <p className="mb-3 text-sm text-gray-600">
            {selectedJob.job_city || selectedJob.location},{' '}
            {selectedJob.job_country || ''}
          </p>
          <p className="text-gray-700 whitespace-pre-line">
            {selectedJob.job_description}
          </p>
          {(selectedJob.job_apply_link ||
            (selectedJob.apply_options &&
              selectedJob.apply_options[0]?.apply_link)) && (
            <a
              href={
                selectedJob.job_apply_link ||
                selectedJob.apply_options[0].apply_link
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 mt-4 text-white transition-all rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            >
              Apply
            </a>
          )}
        </div>
      )}

      {/* Subscription */}
      <div className="flex w-full max-w-xl mt-auto mb-8 overflow-hidden rounded-md shadow-md">
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
          className="w-full px-4 py-3 transition-all duration-200 border border-r-0 border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
        />
        <button
          onClick={handleSubscribe}
          disabled={isSubscribing}
          className="px-6 py-3 font-medium text-white transition-all duration-200 bg-red-500 hover:bg-red-600 disabled:opacity-50"
        >
          {isSubscribing ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default App;
