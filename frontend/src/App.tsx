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

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setIsSubscribing(true);
    setTimeout(() => setIsSubscribing(false), 1000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 text-gray-800 bg-gray-50">
      <h1 className="mt-8 mb-6 text-6xl font-bold">Dream Job</h1>

      {/* Search Bar */}
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          placeholder="Search jobs e.g., frontend developer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-6 py-3 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

     
<div className="w-full max-w-2xl mt-8">
  {jobs.map((job) => (
    <div
      key={job.job_id || job.title}
      className="p-4 mb-4 border rounded-lg cursor-pointer hover:bg-gray-100"
      onClick={() => handleJobClick(job.job_id)}
    >
      <h2 className="text-xl font-semibold">{job.job_title || job.title}</h2>
      <p className="text-gray-600">{job.employer_name || job.company}</p>
      <p className="text-sm text-gray-500">{job.job_city || job.location}, {job.job_country || ''}</p>
    </div>
  ))}
</div>

      {/* Job Detail */}
      {selectedJob && (
  <div className="w-full max-w-2xl p-6 mt-4 mb-10 bg-white border border-gray-300 rounded-lg shadow">
    <button
      className="mb-2 text-sm text-blue-500 underline"
      onClick={() => setSelectedJob(null)}
    >
      Close
    </button>
    <h2 className="mb-2 text-2xl font-bold">{selectedJob.job_title || selectedJob.title}</h2>
    <p className="mb-1 font-semibold text-gray-700">{selectedJob.employer_name || selectedJob.company}</p>
    <p className="mb-3 text-sm text-gray-600">{selectedJob.job_city || selectedJob.location}, {selectedJob.job_country || ''}</p>
    <p className="text-gray-800 whitespace-pre-line">{selectedJob.job_description}</p>
    {/* Use job_apply_link or apply_options[0].apply_link */}
    {(selectedJob.job_apply_link || (selectedJob.apply_options && selectedJob.apply_options[0]?.apply_link)) && (
      <a
        href={selectedJob.job_apply_link || selectedJob.apply_options[0].apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Apply
      </a>
    )}
  </div>
)}
 

      {/* Email Subscription */}
      <div className="flex w-full max-w-xl mt-auto mb-8">
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
          className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleSubscribe}
          disabled={isSubscribing}
          className="px-6 py-3 text-white bg-red-500 rounded-r-md hover:bg-red-600 disabled:opacity-50"
        >
          {isSubscribing ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default App;
