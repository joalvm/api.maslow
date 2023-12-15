import { QueryClient } from 'react-query';

export const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            keepPreviousData: true,
            retry: false,
        },
    },
});
