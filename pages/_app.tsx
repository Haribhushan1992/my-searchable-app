import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // Updated import
import { FavoritesProvider } from '../context/FavoritesContext';

// Create a new QueryClient instance for React Query
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Component {...pageProps} />
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
