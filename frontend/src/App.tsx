import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import EmailAlert from './components/EmailAlert';
import JobListings from './components/JobListings';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { SearchState, EmailState, Job } from './types';

function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    isLoading: false,
    hasSearched: false
  });

  const [emailState, setEmailState] = useState<EmailState>({
    email: '',
    isSubscribed: false
  });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  // Handle job search
  const handleSearchChange = (query: string) => {
    setSearchState(prev => ({ ...prev, query }));
  };

  const handleSearch = async () => {
    if (!searchState.query.trim()) return;

    setSearchState(prev => ({ ...prev, isLoading: true, hasSearched: false }));
    setJobs([]);

    try {
      const res = await fetch(`/api/jobs?query=${encodeURIComponent(searchState.query)}`);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        hasSearched: true
      }));
      setToastType('success');
      setToastMessage(`Found ${data.jobs?.length || 0} jobs for "${searchState.query}"`);
      setShowToast(true);
    } catch (err: any) {
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        hasSearched: true
      }));
      setToastType('error');
      setToastMessage(err.message || 'Error searching jobs');
      setShowToast(true);
    }
  };

  // Handle email subscription
  const handleEmailChange = (email: string) => {
    setEmailState(prev => ({ ...prev, email }));
  };

  const handleSubscribe = async () => {
    if (!emailState.email.trim()) return;

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailState.email }),
      });
      if (!res.ok) throw new Error('Subscription failed');
      setEmailState(prev => ({ ...prev, isSubscribed: true }));
      setToastType('success');
      setToastMessage(`Subscribed! You'll now receive alerts for "${searchState.query || 'all'}" jobs.`);
      setShowToast(true);
    } catch (err: any) {
      setToastType('error');
      setToastMessage(err.message || 'Subscription error');
      setShowToast(true);
    }
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-slate-50 to-blue-100">
      <Header />
      <Hero />
      <SearchBar
        searchState={searchState}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />
      <EmailAlert
        emailState={emailState}
        onEmailChange={handleEmailChange}
        onSubscribe={handleSubscribe}
      />
      <div className="transition-all duration-700">
        <JobListings
          jobs={jobs}
          isVisible={searchState.hasSearched && !searchState.isLoading}
        />
      </div>
      <Footer />
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={closeToast}
        type={toastType}
      />
    </div>
  );
}

export default App;