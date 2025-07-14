import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import EmailAlert from './components/EmailAlert';
import JobListings from './components/JobListings';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { mockJobs } from './data/mockJobs';
import { SearchState, EmailState } from './types';

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

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchState(prev => ({ ...prev, query }));
  };

  const handleSearch = () => {
    if (!searchState.query.trim()) return;

    setSearchState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call with 2 second delay
    setTimeout(() => {
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        hasSearched: true
      }));
    }, 2000);
  };

  const handleEmailChange = (email: string) => {
    setEmailState(prev => ({ ...prev, email }));
  };

  const handleSubscribe = () => {
    if (!emailState.email.trim()) return;

    setEmailState(prev => ({ ...prev, isSubscribed: true }));
    setToastMessage(`You'll now receive alerts for '${searchState.query || 'all'}' jobs!`);
    setShowToast(true);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
      <JobListings
        jobs={mockJobs}
        isVisible={searchState.hasSearched && !searchState.isLoading}
      />
      <Footer />
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={closeToast}
      />
    </div>
  );
}

export default App;