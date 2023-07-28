import { useContext, createContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../firebase";

import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
