// UserContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface UserContextProps {
  user: {
    id: number;
    username: string;
    // Add other user-related fields as needed
  } | null;
  setUser: React.Dispatch<React.SetStateAction<{
    id: number;
    username: string;
    // Add other user-related fields as needed
  } | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<UserContextProps['user']>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
