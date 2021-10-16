import React, { useContext } from "react";
import ThemeContext from "../Contexts/Context";
import clsx from "clsx";
import classes from "../styles/Header.module.css";
import { useHistory } from "react-router";
import AuthContext from "../Contexts/AuthContext";
import logo from "../images/logo.svg";
const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { logoutHandler } = useContext(AuthContext);
  const history = useHistory();
  const toggleThemeHandler = () => {
    toggleTheme();
  };
  const logout = () => {
    logoutHandler();
  };
  return (
    <div
      className={clsx(
        classes.headerWrapper,
        isDarkMode ? classes.headerWrapperDark : classes.headerWrapperLight
      )}
    >
      <div
        className={clsx(
          classes.logo,
          isDarkMode ? classes.logoDark : classes.logoLight
        )}
        onClick={() => window.open("/dashboard", "_self")}
      >
        <img src={logo} alt="QUASAR" />
      </div>
      <div className={classes.navOptions}>
        <div
          className={clsx(
            classes.themeToggler,
            isDarkMode ? classes.themeTogglerDark : classes.themeTogglerLight
          )}
          onClick={toggleThemeHandler}
        >
          <span
            className={clsx(
              classes.toggleIcon,
              isDarkMode ? classes.toggleIconDark : classes.toggleIconLight
            )}
          ></span>
        </div>
        <div
          className={clsx(
            classes.userIcon,
            isDarkMode ? classes.userIconDark : classes.userIconLight
          )}
          onClick={logout}
        >
          <p>AM</p>
        </div>
      </div>
    </div>
  );
};
export default Header;
