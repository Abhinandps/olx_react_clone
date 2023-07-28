import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        updateSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
