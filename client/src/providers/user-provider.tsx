import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserByIp } from '@/lib/api';

interface UserContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    loading: true,
});

interface Props {
    children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = await getUserByIp();

                if (data?.user) {
                    setUser(data.user);
                    console.log('User fetched:', data.user);
                } else {
                    console.warn('User not found');
                    setUser({ reviews: [] });
                }
            } catch (error: any) {
                console.error('Failed to fetch user:', error.message || error);
                setUser({ reviews: [] });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);