import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, ExternalLink, X, Mail, Sparkles, Star, Zap, TrendingUp } from 'lucide-react';

const BASE_URL = 'http://localhost:3000';

const App = () => {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        {/* Dynamic Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-40 right-1/3 w-88 h-88 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '3s'}} />
        
        {/* Mouse Follower Effect */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-bounce opacity-40`}
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i * 6)}%`,
              backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'][i % 6],
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/40 backdrop-blur-xl border-b border-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-2xl shadow-blue-500/50 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            </div>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-500">
              OpportuneX
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-7xl font-black text-white mb-6 leading-tight">
              Find your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-pulse">
                dream job
              </span>{' '}
              now
            </h1>
            <p className="text-2xl text-gray-300 mb-4 font-light">
                jobs for you to explore
            </p>
            <div className="flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                <span>Trending Opportunities</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                <span>Instant Matching</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-400" />
                <span>Top Companies</span>
              </div>
            </div>
          </div>

          {/* Advanced Search Bar */}
          <div className="relative max-w-4xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/20 p-3 shadow-2xl">
              <div className="flex items-center">
                <div className="flex-1 flex items-center px-6">
                  <div className="relative">
                    <Search className="w-6 h-6 text-blue-400 animate-pulse" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur animate-ping" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter skills"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full py-6 px-6 text-xl text-white placeholder-gray-400 bg-transparent border-none focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="relative px-10 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white text-lg font-bold rounded-2xl hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-500 disabled:opacity-50 shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/50 hover:scale-105 disabled:hover:scale-100 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-3 border-3 border-white rounded-full border-t-transparent animate-spin" />
                      Searching...
                    </div>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Results */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div
              key={job.job_id || job.title}
              className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-black/60 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
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
                animation: 'slideInUp 0.6s ease-out forwards'
              }}
            >
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glowing Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {job.job_title || job.title}
                  </h3>
                  <div className="flex items-center text-gray-300 mb-3">
                    <Building2 className="w-5 h-5 mr-3 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
                    <span className="font-semibold text-lg">{job.employer_name || job.company}</span>
                  </div>
                  <div className="flex items-center text-gray-400 mb-6">
                    <MapPin className="w-5 h-5 mr-3 text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
                    <span className="text-lg">{job.job_city || job.location}, {job.job_country || ''}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-4 py-2 rounded-full text-blue-300 text-sm font-medium">
                      Full Time
                    </span>
                    <span className="text-gray-500 text-sm">Posted 2 days ago</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-3 text-gray-400 hover:text-red-400 transition-colors duration-300 hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <ExternalLink className="w-6 h-6 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-black/80 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur opacity-60" />
            <div className="relative p-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-2xl shadow-blue-500/50">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedJob.job_title || selectedJob.title}
                    </h2>
                    <p className="text-xl text-gray-300 font-semibold">
                      {selectedJob.employer_name || selectedJob.company}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-3 text-gray-400 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-full"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <div className="flex items-center mb-10 text-gray-300">
                <MapPin className="w-6 h-6 mr-3 text-purple-400" />
                <span className="text-xl">
                  {selectedJob.job_city || selectedJob.location}, {selectedJob.job_country || ''}
                </span>
              </div>
              
              <div className="mb-10">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3 text-blue-400" />
                    Job Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
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
                    className="relative inline-flex items-center px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-500 shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/50 hover:scale-105 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    <ExternalLink className="w-6 h-6 mr-3" />
                    Apply Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative bg-black/60 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10">
              <div className="flex items-center justify-center mb-8">
                <Mail className="w-10 h-10 text-orange-400 mr-4 animate-pulse" />
                <h3 className="text-3xl font-bold text-white">Stay Updated</h3>
              </div>
              <p className="text-xl text-gray-300 mb-10 font-light">Get notified about new job opportunities matching your search</p>
              
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-30" />
                <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
                  <Mail className="w-6 h-6 text-orange-400 ml-6 mr-4" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    className="flex-1 py-5 px-4 text-lg text-white placeholder-gray-400 bg-transparent border-none focus:outline-none"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={isSubscribing}
                    className="relative px-8 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-500 disabled:opacity-50 shadow-2xl shadow-orange-500/50 hover:shadow-red-500/50 hover:scale-105 disabled:hover:scale-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    {isSubscribing ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
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
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
