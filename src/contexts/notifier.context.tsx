import Toast from '@layout/toast.component';
import { createContext, PropsWithChildren, useContext, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type Notification = {
    id: string;
    message: string;
    type: NotificationType;
};

export interface NotifierContext {
    success: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
}

const context = createContext<NotifierContext>({} as NotifierContext);

export default function NotifierProvider({ children }: PropsWithChildren) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const current = useRef<Notification>();

    if (notifications.length > 0 && current.current?.id !== notifications[0].id) {
        current.current = notifications[0];
    }

    const push = (message: string, type: NotificationType) => {
        const id = v4();

        setNotifications((prev) => {
            const newPrev = [...prev];
            newPrev.push({ id, message, type });
            return newPrev;
        });
    };

    const close = (id: string) => {
        setNotifications((prev) => {
            const newPrev = [...prev];
            return newPrev.filter((notification) => notification.id !== id);
        });
    };

    return (
        <context.Provider
            value={useMemo(
                () => ({
                    success: (message: string) => push(message, 'success'),
                    info: (message: string) => push(message, 'info'),
                    warning: (message: string) => push(message, 'warning'),
                    error: (message: string) => push(message, 'error'),
                }),
                [notifications],
            )}
        >
            {children}

            {notifications
                .filter((notification) => current.current?.id === notification.id)
                .map((notification) => (
                    <Toast
                        key={notification.id}
                        message={notification.message}
                        severity={notification.type}
                        counter={notifications.length}
                        onClose={() => close(notification.id)}
                    />
                ))}
        </context.Provider>
    );
}

export function useNotifierContext() {
    return useContext(context);
}
