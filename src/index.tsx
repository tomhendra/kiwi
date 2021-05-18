import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { QueryClient, QueryClientProvider } from 'react-query';
import reportWebVitals from './reportWebVitals';
import { Global } from 'components/global';
import './core/theme/remedy.css';
import './core/theme/colors.css';
import './core/theme/fonts.css';

import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // if (error.status === 404) return false;
        if (error) console.log('error from queryClient config: ', error);
        if (failureCount < 2) return true;
        return false;
      },
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Global />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
