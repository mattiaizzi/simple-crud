import React from 'react';
import { Users } from './pages/Users/Users';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Users />
      </div>
    </QueryClientProvider>
  );
}

export default App;
