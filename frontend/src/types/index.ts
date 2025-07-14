export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  applyUrl: string;
}

export interface SearchState {
  query: string;
  isLoading: boolean;
  hasSearched: boolean;
}

export interface EmailState {
  email: string;
  isSubscribed: boolean;
}