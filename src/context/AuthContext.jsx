import { useContext, createContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../firebase";

import { setDoc, doc, collection } from "firebase/firestore";

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

      const userData = {
        id: `${currentUser?.uid}`,
        name: `${currentUser?.displayName}`,
        url: `${currentUser?.photoURL}`,
      };

      const userDocRef = doc(collection(db, "users"), currentUser.uid);
      setDoc(userDocRef, userData)
        .then(() => {
          console.log("User document created successfully!");
        })
        .catch((error) => {
          console.error("Error creating user document:", error);
        });
    });

    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  return (
    <AuthContext.Provider value={{ googleSignIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
