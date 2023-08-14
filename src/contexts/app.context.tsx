import Cache from '@utils/cache.util';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

export interface AppContext {
    cache: Cache;
}

const context = createContext<AppContext>({} as AppContext);

export default function AppProvider({ children }: PropsWithChildren) {
    const cache = useMemo(() => new Cache(), []);

    const value = useMemo(() => ({ cache }), []);

    return <context.Provider value={value}>{children}</context.Provider>;
}

export function useAppContext() {
    return useContext(context);
}
