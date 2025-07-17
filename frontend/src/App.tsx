import React, { useState } from 'react';
import { Search, MapPin, Building2, ExternalLink, X, Mail, Sparkles } from 'lucide-react';

const BASE_URL = 'https://essir-7.onrender.com'; // 👈 Your backend URL

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
      const res = await fetch(`${BASE_URL}/api/jobs?query=${encodeURIComponent(query)}`);
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
      const res = await fetch(`${BASE_URL}/job-details?job_id=${jobId}`);
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
      const res = await fetch(`${BASE_URL}/api/subscribe`, {
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-2 text-blue-500" />
            <h1 className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500">
              OpportuneX
            </h1>
            <Sparkles className="w-8 h-8 ml-2 text-purple-500" />
          </div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Discover your perfect career opportunity with our advanced job search platform
          </p>
        </div>

        <div className="relative w-full max-w-2xl mb-12">
          <div className="relative flex items-center overflow-hidden bg-white border shadow-2xl rounded-2xl border-gray-200/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
            <div className="relative flex items-center w-full">
              <Search className="w-5 h-5 ml-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for your dream job..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-6 text-lg placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-8 py-4 m-2 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 rounded-xl hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Searching...
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl space-y-6">
          {jobs.map((job, index) => (
            <div
              key={job.job_id || job.title}
              className="relative overflow-hidden transition-all duration-500 transform border shadow-xl cursor-pointer group bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-2xl hover:shadow-2xl hover:-translate-y-2"
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
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 group-hover:opacity-100"></div>
              
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                      {job.job_title || job.title}
                    </h2>
                    <div className="flex items-center mb-2 text-gray-600">
                      <Building2 className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-semibold">{job.employer_name || job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{job.job_city || job.location}, {job.job_country || ''}</span>
                    </div>
                  </div>
                  
                  <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <ExternalLink className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                
                <div className="absolute transition-opacity duration-300 opacity-0 top-6 right-6 group-hover:opacity-100">
                  <div className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-lg">
                    Click to Apply
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {selectedJob.job_title || selectedJob.title}
                      </h2>
                      <p className="text-lg font-semibold text-gray-600">
                        {selectedJob.employer_name || selectedJob.company}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                
                <div className="flex items-center mb-8 text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                  <span className="text-lg">
                    {selectedJob.job_city || selectedJob.location}, {selectedJob.job_country || ''}
                  </span>
                </div>
                
                <div className="mb-8 prose prose-lg max-w-none">
                  <div className="p-6 border border-gray-200 bg-gray-50 rounded-2xl">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">Job Description</h3>
                    <p className="leading-relaxed text-gray-700 whitespace-pre-line">
                      {selectedJob.job_description}
                    </p>
                  </div>
                </div>
                
                {(selectedJob.job_apply_link ||
                  (selectedJob.apply_options &&
                    selectedJob.apply_options[0]?.apply_link)) && (
                  <div className="text-center">
                    <a
                      href={
                        selectedJob.job_apply_link ||
                        selectedJob.apply_options[0].apply_link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl hover:shadow-xl hover:scale-105"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Apply Now
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-2xl mt-16 mb-8">
          <div className="p-8 border shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl border-gray-200/50">
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 mr-2 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-900">Stay Updated</h3>
              </div>
              <p className="text-gray-600">Get notified about new job opportunities matching your search</p>
            </div>
            
            <div className="relative flex items-center overflow-hidden border border-gray-200 bg-gray-50 rounded-2xl">
              <Mail className="w-5 h-5 ml-6 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className="w-full px-4 py-6 text-lg placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
              />
              <button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="px-8 py-4 m-2 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:opacity-50 rounded-xl hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
              >
                {isSubscribing ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Subscribing...
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-in {
          animation: animate-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
