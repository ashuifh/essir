
import { useState, useEffect } from 'react';
import { Search, MapPin, Building2, ExternalLink, X, Mail, Sparkles, Star, Zap, TrendingUp } from 'lucide-react';

interface Job {
  job_id?: string;
  title?: string;
  job_title?: string;
  employer_name?: string;
  company?: string;
  job_city?: string;
  location?: string;
  job_country?: string;
  job_description?: string;
  job_apply_link?: string;
  apply_options?: { apply_link: string }[];
}

const BASE_URL = 'https://essir-13.onrender.com';

const App = () => {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Check if mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Search jobs
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

  // Get job details
  const handleJobClick = async (jobId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/job-details?job_id=${jobId}`);
      const data = await res.json();
      setSelectedJob(data.data?.[0] || null);
    } catch (error) {
      console.error('Job detail error:', error);
    }
  };

  // Subscribe for job alerts
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
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid - Desktop only */}
        {!isMobile && (
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        )}
        
        {/* Gradient Orbs */}
        <div className={`absolute ${isMobile ? 'top-10 left-4 w-40 h-40' : 'top-20 left-10 w-96 h-96'} bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-xl md:blur-3xl animate-pulse opacity-60`} />
        <div className={`absolute ${isMobile ? 'top-20 right-8 w-32 h-32' : 'top-40 right-20 w-80 h-80'} bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-full blur-xl md:blur-3xl animate-pulse opacity-60`} style={{animationDelay: '1s'}} />
        <div className={`absolute ${isMobile ? 'bottom-10 left-1/4 w-28 h-28' : 'bottom-20 left-1/4 w-72 h-72'} bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-green-500/20 rounded-full blur-xl md:blur-3xl animate-pulse opacity-60`} style={{animationDelay: '2s'}} />
        <div className={`absolute ${isMobile ? 'bottom-20 right-1/4 w-36 h-36' : 'bottom-40 right-1/3 w-88 h-88'} bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-amber-500/20 rounded-full blur-xl md:blur-3xl animate-pulse opacity-60`} style={{animationDelay: '3s'}} />
        
        {/* Mouse Follower */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(isMobile ? 6 : 12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-bounce opacity-40`}
            style={{
              left: `${isMobile ? 5 + (i * 15) : 10 + (i * 8)}%`,
              top: `${isMobile ? 15 + (i * 10) : 20 + (i * 6)}%`,
              backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'][i % 6],
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/40 backdrop-blur-xl border-b border-white/10 px-4 md:px-6 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center group">
            <div className="relative">
              <div className={`${isMobile ? 'w-10 h-10 rounded-lg' : 'w-12 h-12 rounded-2xl'} bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center ${isMobile ? 'mr-3' : 'mr-4'} shadow-lg md:shadow-2xl shadow-blue-500/50 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110`}>
                <Sparkles className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white animate-pulse`} />
              </div>
              {!isMobile && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              )}
            </div>
            <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-500`}>
              OpportuneX
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="mb-6 md:mb-8">
            <h1 className={`${isMobile ? 'text-4xl' : 'text-7xl'} font-black text-white mb-4 md:mb-6 leading-tight`}>
              Find your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-pulse">
                dream job
              </span>{' '}
              now
            </h1>
            <p className={`${isMobile ? 'text-lg' : 'text-2xl'} text-gray-300 mb-4 font-light`}>
              {isMobile ? 'Explore top jobs' : 'Discover the best opportunities for your career'}
            </p>
            {!isMobile && (
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
            )}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-4xl mx-auto group">
            {!isMobile && (
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            )}
            <div className={`relative bg-black/60 backdrop-blur-2xl ${isMobile ? 'rounded-xl' : 'rounded-3xl'} border border-white/20 ${isMobile ? 'p-2 shadow-lg' : 'p-3 shadow-2xl'}`}>
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 flex items-center w-full px-3 md:px-6">
                  <div className="relative">
                    <Search className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-blue-400 animate-pulse`} />
                    {!isMobile && (
                      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur animate-ping" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder={isMobile ? "Job title or skills" : "Enter your desired job title, skills, or company"}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className={`w-full ${isMobile ? 'py-3 px-3 text-base' : 'py-6 px-6 text-xl'} text-white placeholder-gray-400 bg-transparent border-none focus:outline-none`}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className={`relative w-full md:w-auto mt-2 md:mt-0 ${isMobile ? 'px-6 py-3 text-base rounded-lg' : 'px-10 py-6 text-lg rounded-2xl'} bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white font-bold hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-500 disabled:opacity-50 ${isMobile ? 'shadow-lg' : 'shadow-2xl'} shadow-blue-500/50 hover:shadow-purple-500/50 hover:scale-105 disabled:hover:scale-100 overflow-hidden group`}
                  aria-label="Search jobs"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className={`${isMobile ? 'w-4 h-4 mr-2 border-2' : 'w-6 h-6 mr-3 border-3'} border-white rounded-full border-t-transparent animate-spin`} />
                      {isMobile ? 'Searching...' : 'Searching...'}
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="space-y-4 md:space-y-6">
          {jobs.map((job, index) => (
            <div
              key={job.job_id || index}
              className={`group relative bg-black/40 backdrop-blur-xl border border-white/10 ${isMobile ? 'rounded-xl p-4' : 'rounded-2xl p-8'} hover:bg-black/60 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden`}
              onClick={() => {
                const link = job.job_apply_link || job.apply_options?.[0]?.apply_link;
                if (link) {
                  window.open(link, '_blank');
                } else if (job.job_id) {
                  handleJobClick(job.job_id);
                }
              }}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInUp 0.6s ease-out forwards'
              }}
            >
              {/* Hover Effects - Desktop only */}
              {!isMobile && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                </>
              )}
              
              <div className="relative flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white mb-2 md:mb-3 ${!isMobile ? 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400' : ''} transition-all duration-300`}>
                    {job.job_title || job.title}
                  </h3>
                  <div className="flex items-center text-gray-300 mb-2 md:mb-3">
                    <Building2 className={`${isMobile ? 'w-4 h-4 mr-2' : 'w-5 h-5 mr-3'} text-blue-400 ${!isMobile ? 'group-hover:text-cyan-400' : ''} transition-colors duration-300`} />
                    <span className={`${isMobile ? 'text-sm font-medium' : 'text-lg font-semibold'}`}>{job.employer_name || job.company}</span>
                  </div>
                  <div className="flex items-center text-gray-400 mb-3 md:mb-6">
                    <MapPin className={`${isMobile ? 'w-4 h-4 mr-2' : 'w-5 h-5 mr-3'} text-purple-400 ${!isMobile ? 'group-hover:text-pink-400' : ''} transition-colors duration-300`} />
                    <span className={`${isMobile ? 'text-sm' : 'text-lg'}`}>{job.job_city || job.location}, {job.job_country || ''}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <span className={`${isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'} bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 font-medium`}>
                      Full Time
                    </span>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>Posted 2 days ago</span>
                  </div>
                </div>
                <div className={`flex items-center ${isMobile ? 'justify-end mt-3 space-x-2' : 'space-x-4'}`}>
                  <button 
                    className={`${isMobile ? 'p-2' : 'p-3'} text-gray-400 hover:text-red-400 transition-colors duration-300 hover:scale-110`}
                    aria-label="Save job"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add save job functionality here
                    }}
                  >
                    <svg className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  {!isMobile && (
                    <ExternalLink className="w-6 h-6 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm">
          <div className={`relative bg-black/80 backdrop-blur-2xl border border-white/20 ${isMobile ? 'rounded-xl shadow-lg' : 'rounded-3xl shadow-2xl'} max-w-5xl w-full max-h-[90vh] overflow-y-auto`}>
            {!isMobile && (
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur opacity-60" />
            )}
            <div className={`relative ${isMobile ? 'p-4' : 'p-10'}`}>
              <div className={`flex ${isMobile ? 'flex-col' : 'items-center justify-between'} mb-4 md:mb-8`}>
                <div className={`flex ${isMobile ? 'items-start mb-4' : 'items-center'}`}>
                  <div className={`${isMobile ? 'w-12 h-12 rounded-xl mr-4' : 'w-16 h-16 rounded-2xl mr-6'} bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg md:shadow-2xl shadow-blue-500/50`}>
                    <Building2 className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
                  </div>
                  <div>
                    <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white mb-1 md:mb-2`}>
                      {selectedJob.job_title || selectedJob.title}
                    </h2>
                    <p className={`${isMobile ? 'text-sm' : 'text-xl'} text-gray-300 font-semibold`}>
                      {selectedJob.employer_name || selectedJob.company}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className={`${isMobile ? 'p-2 self-end' : 'p-3'} text-gray-400 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-full`}
                  aria-label="Close modal"
                >
                  <X className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'}`} />
                </button>
              </div>
              
              <div className="flex items-center mb-4 md:mb-10 text-gray-300">
                <MapPin className={`${isMobile ? 'w-4 h-4 mr-2' : 'w-6 h-6 mr-3'} text-purple-400`} />
                <span className={`${isMobile ? 'text-sm' : 'text-xl'}`}>
                  {selectedJob.job_city || selectedJob.location}, {selectedJob.job_country || ''}
                </span>
              </div>
              
              <div className="mb-4 md:mb-10">
                <div className={`bg-white/5 backdrop-blur-sm border border-white/10 ${isMobile ? 'p-4 rounded-lg' : 'p-8 rounded-2xl'}`}>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white mb-3 md:mb-6 flex items-center`}>
                    <Sparkles className={`${isMobile ? 'w-4 h-4 mr-2' : 'w-6 h-6 mr-3'} text-blue-400`} />
                    Job Description
                  </h3>
                  <p className={`text-gray-300 leading-relaxed ${isMobile ? 'text-sm' : 'text-lg'} whitespace-pre-line`}>
                    {selectedJob.job_description}
                  </p>
                </div>
              </div>
              
              {(selectedJob.job_apply_link || selectedJob.apply_options?.[0]?.apply_link) && (
                <div className="text-center">
                  <a
                    href={selectedJob.job_apply_link || selectedJob.apply_options?.[0]?.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative inline-flex items-center ${isMobile ? 'px-6 py-2 text-base rounded-lg' : 'px-12 py-4 text-xl rounded-2xl'} font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-500 ${isMobile ? 'shadow-lg' : 'shadow-2xl'} shadow-blue-500/50 hover:shadow-purple-500/50 hover:scale-105 overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    <ExternalLink className={`${isMobile ? 'w-4 h-4 mr-2' : 'w-6 h-6 mr-3'}`} />
                    Apply Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="relative z-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="relative group">
            {!isMobile && (
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            )}
            <div className={`relative bg-black/60 backdrop-blur-2xl border border-white/20 ${isMobile ? 'rounded-xl p-6 shadow-lg' : 'rounded-3xl p-10 shadow-2xl'}`}>
              <div className="flex items-center justify-center mb-4 md:mb-8">
                <Mail className={`${isMobile ? 'w-6 h-6 mr-2' : 'w-10 h-10 mr-4'} text-orange-400 animate-pulse`} />
                <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white`}>Stay Updated</h3>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-xl'} text-gray-300 mb-6 md:mb-10 font-light`}>
                Get notified about new job opportunities matching your search
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                {!isMobile && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-30" />
                )}
                <div className={`relative flex ${isMobile ? 'flex-col' : 'items-center'} bg-black/40 backdrop-blur-xl border border-white/20 ${isMobile ? 'rounded-lg p-1' : 'rounded-2xl p-2'}`}>
                  <div className={`flex items-center ${isMobile ? 'w-full px-2 py-1' : 'w-full px-3'}`}>
                    <Mail className={`${isMobile ? 'w-4 h-4 ml-2 mr-2' : 'w-6 h-6 ml-6 mr-4'} text-orange-400`} />
                    <input
                      type="email"
                      placeholder={isMobile ? "Your email" : "Enter your email address"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                      className={`flex-1 ${isMobile ? 'py-2 px-1 text-sm' : 'py-5 px-4 text-lg'} text-white placeholder-gray-400 bg-transparent border-none focus:outline-none w-full`}
                    />
                  </div>
                  <button
                    onClick={handleSubscribe}
                    disabled={isSubscribing}
                    className={`relative ${isMobile ? 'w-full mt-2 px-4 py-2 text-sm rounded-md' : 'px-8 py-5 text-base rounded-xl'} font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-pink-500 transition-all duration-500 disabled:opacity-50 ${isMobile ? 'shadow-md' : 'shadow-2xl'} shadow-orange-500/50 hover:shadow-red-500/50 hover:scale-105 disabled:hover:scale-100 overflow-hidden group`}
                    aria-label="Subscribe for job alerts"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    {isSubscribing ? (
                      <div className="flex items-center justify-center">
                        <div className={`${isMobile ? 'w-3 h-3 mr-1 border-2' : 'w-5 h-5 mr-2 border-2'} border-white rounded-full border-t-transparent animate-spin`} />
                        {isMobile ? 'Subscribing...' : 'Subscribing...'}
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
