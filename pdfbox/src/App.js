import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import Login from "./components/Login";
import Home from "./pages/dashboard";
import PdfTron from "./components/PdfTron";
import Header from "./components/Header";
import ThemeContext from "./Contexts/Context";
import AuthContext from "./Contexts/AuthContext";
import Cookies from "js-cookie";
import "./styles/globals.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const logoutHandler = () => {
    Cookies.remove("loginCookiePdfBox");
    setIsLogin(false);
  };
  const loginHandler = () => {
    Cookies.set("loginCookiePdfBox", "login", { expires: 365 });
    setIsLogin(true);
  };
  const toggleThemeHandler = () => {
    if (Cookies.get("themeCookiePdfBox")) {
      Cookies.remove("themeCookiePdfBox");
    } else {
      Cookies.set("themeCookiePdfBox", "dark", { expires: 365 });
    }
    setIsDarkMode((prevVal) => !prevVal);
  };
  useEffect(() => {
    if (Cookies.get("themeCookiePdfBox")) {
      setIsDarkMode(true);
    }
    if (Cookies.get("loginCookiePdfBox")) {
      setIsLogin(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isLogin, loginHandler, logoutHandler }}>
      <ThemeContext.Provider
        value={{ isDarkMode: isDarkMode, toggleTheme: toggleThemeHandler }}
      >
        <Route path="/" exact>
          {isLogin ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/dashboard" exact>
          {isLogin ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route path="/view/:id" exact>
          {isLogin ? (
            <>
              <Header />
              <PdfTron />
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
