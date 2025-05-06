/* eslint-disable react/prop-types */
import { useState } from "react";
import productContext from "./productContext";

const ProductProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <productContext.Provider
      value={{ searchQuery, setSearchQuery, loading, setLoading }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
