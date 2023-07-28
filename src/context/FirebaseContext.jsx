import { createContext, useContext } from "react";

import { storage } from "../firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const uploadPhotos = async (user, photoFiles) => {
    try {
      const downloadUrls = [];

      for (const photoFile of photoFiles) {
        const fileName = `${photoFile.name}`;

        const photoRef = ref(storage, `/images/${fileName}`);

        await uploadBytes(photoRef, photoFile);

        const downloadURL = await getDownloadURL(photoRef);
        downloadUrls.push(downloadURL);
      }

      return downloadUrls;
    } catch (error) {
      console.error("Error uploading photos:", error);
      return [];
    }
  };

  const firebaseContextValue = {
    uploadPhotos,
  };

  return (
    <FirebaseContext.Provider value={firebaseContextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase() {
  return useContext(FirebaseContext);
}

export default FirebaseContext;
