import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  const MAX_RESULTS = 10;

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

//   const updateSearchedProducts = (products) => {
//     setSearchedProducts(products);
//     // Save the search results in local storage
//     const recentSearches =
//       JSON.parse(localStorage.getItem("recentSearches")) || [];
//     recentSearches.unshift(products);
//     if (recentSearches.length > MAX_RESULTS) {
//       recentSearches.pop();
//     }
//     localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
//   };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        updateSearchTerm,
        searchedProducts,
        // updateSearchedProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
