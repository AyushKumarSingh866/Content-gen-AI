// TitleContext.js
import React, { createContext, useState, useContext } from "react";

// Create Context for the title
const CookieContext = createContext();
// Custom hook to use the title context
export const useCookie = () => useContext(CookieContext);

// Create a provider component
export const CookieProvider = ({ children }) => {
  const [cookie, setcookie] = useState("");

  return (
    <CookieContext.Provider value={{ cookie, setcookie }}>
      {children}
    </CookieContext.Provider>
  );
};
