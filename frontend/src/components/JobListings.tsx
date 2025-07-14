import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Job } from '../types';

interface JobListingsProps {
  jobs: Job[];
  isVisible: boolean;
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-200 group"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {job.company} • {job.location}
              </p>
              <a
                href={job.applyUrl}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Apply Now
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;