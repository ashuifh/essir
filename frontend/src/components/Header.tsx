import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-900">JobTrack</h1>
          </div>
          <nav className="flex space-x-8">
            <a
              href="#"
              className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </a>
            <span className="text-gray-400 px-3 py-2 text-sm font-medium cursor-not-allowed">
              Saved Jobs
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;