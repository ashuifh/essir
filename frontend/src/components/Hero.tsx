import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Search and get email alerts for new listings
        </p>
      </div>
    </section>
  );
};

export default Hero;