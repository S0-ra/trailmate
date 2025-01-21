    import { useState, createContext, useContext } from "react";

    const ProductContext = createContext();

    // eslint-disable-next-line react/prop-types
    export const ProductProvider = ({ children }) => {
      const intialFilter = {
        maxPrice: 100000,
        location: null,
        rating: 0,
      };

      const [filter, setFilter] = useState(intialFilter);
      const [searchQuery, setSearchQuery] = useState("");

      const resetFilters = () => {
        setFilter(intialFilter);
      };

      const updateFilter = (key, value) => {
        setFilter((prevFilter) => ({ ...prevFilter, [key]: value }));
      };

      return (
        <ProductContext.Provider
          value={{
            filter,
            intialFilter,
            setFilter,
            searchQuery,
            setSearchQuery,
            updateFilter,
            resetFilters,
          }}>
          {children}
        </ProductContext.Provider>
      );
    };

    // eslint-disable-next-line react-refresh/only-export-components
    export const useProduct = () => useContext(ProductContext);
