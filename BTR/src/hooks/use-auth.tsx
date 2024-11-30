import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserDetails {
    name: string;
    email: string;
    image?: string;
    role?: string;
}

interface AuthContextType {
    userDetails: UserDetails | null;
    isAdmin: boolean;
    addUserDetailsToRequest: (data: any) => any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedDetails = localStorage.getItem('userDetails');
        if (storedDetails) {
            const details = JSON.parse(storedDetails);
            setUserDetails(details);
            setIsAdmin(details.role === 'admin');
        }
    }, []);

    const addUserDetailsToRequest = (data: any) => {
        if (!userDetails?.email) return data;
        
        return {
            ...data,
            email: userDetails.email
        };
    };

    return (
        <AuthContext.Provider value={{ userDetails, isAdmin, addUserDetailsToRequest }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
