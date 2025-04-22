/* eslint-disable react/prop-types */
import  { useState } from "react";
import productContext from "./productContext";

const ProductProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <productContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
