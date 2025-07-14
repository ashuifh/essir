import React from 'react';
import { Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2024 JobTrack
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub Repo
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center transition-colors"
            >
              <Mail className="h-4 w-4 mr-1" />
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;