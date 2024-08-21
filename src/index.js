import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>
);