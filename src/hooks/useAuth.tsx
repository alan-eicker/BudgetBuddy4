import { useEffect, useState } from 'react';

import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export interface UseAuthReturnType {
  user: User | null | undefined;
  initializing: boolean;
}

const useAuth = (): UseAuthReturnType => {
  const [user, setUser] = useState<User | null | undefined>();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth.authStateReady?.().then(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setInitializing(false);
      });

      return unsubscribe;
    });
  }, []);

  return { user, initializing };
};

export default useAuth;
