import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Global } from 'components/global';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Children } from 'core/models';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (failureCount < 2) return true;
        return false;
      },
    },
    mutations: {
      onError: (err, variables, recover) =>
        typeof recover === 'function' ? recover() : null,
    },
  },
});

function AppProviders({ children }: { children: Children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Global />
      <Router>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export { AppProviders };
