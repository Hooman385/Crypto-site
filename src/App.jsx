import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { data } from "./mockData";
import { AuthContextProvider } from "./context/AuthContext";
import NavbarAndFooter from "./components/NavbarAndFooter";

const App = () => {
  
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <NavbarAndFooter />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
