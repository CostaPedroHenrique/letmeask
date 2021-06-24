import { useContext, useState, createContext, ReactNode, useEffect } from 'react';

import { auth, firebase } from '../services/firebase';

interface AuthContextProps {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>,
}

interface User {
  id: string,
  name: string,
  avatar: string,
  email: string | null,
}

interface ChildrenProps {
  children: ReactNode;
}

const authContext = createContext({} as AuthContextProps);

export function AuthrProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user);
      if(user){
        const { displayName, photoURL, uid, email } = user;
  
        if(!displayName || !photoURL){
          throw new Error('Missing information from google account');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email: email,
        });
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if(result.user){
      const { displayName, photoURL, uid, email } = result.user;

      if(!displayName || !photoURL){
        throw new Error('Missing information from google account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email: email,
      });
    }
  }

  return (
  <authContext.Provider
    value={{
      user,
      signInWithGoogle,
    }}
  >
    { children }
  </authContext.Provider>
  )
}

export const AuthContext = () => {
  return useContext(authContext);
};
