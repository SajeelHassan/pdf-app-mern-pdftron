import clsx from "clsx";
import React, { useContext } from "react";
import classes from "../styles/Search.module.css";
import ThemeContext from "../Contexts/Context";

const Search = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className={classes.searchWrapper}>
      <div className={classes.searchInputDiv}>
        <input
          type="text"
          placeholder="Search"
          className={clsx(
            classes.searchInput,
            isDarkMode && classes.searchInputDark
          )}
        />
        <span
          className={clsx(
            classes.searchIcon,
            isDarkMode && classes.searchIconDark
          )}
        />
      </div>
      <span
        className={clsx(classes.sorter, isDarkMode && classes.sorterDark)}
      />
    </div>
  );
};
export default Search;
