import React from 'react';
import { Mail, Check } from 'lucide-react';
import { EmailState } from '../types';

interface EmailAlertProps {
  emailState: EmailState;
  onEmailChange: (email: string) => void;
  onSubscribe: () => void;
}

const EmailAlert: React.FC<EmailAlertProps> = ({
  emailState,
  onEmailChange,
  onSubscribe
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe();
  };

  return (
    <section className="py-8 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Get alerts for new jobs
          </h3>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={emailState.email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="Your email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                disabled={emailState.isSubscribed}
              />
            </div>
            <button
              type="submit"
              disabled={emailState.isSubscribed || !emailState.email.trim()}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {emailState.isSubscribed ? (
                <>
                  <Check className="-ml-1 mr-2 h-5 w-5" />
                  Subscribed!
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailAlert;