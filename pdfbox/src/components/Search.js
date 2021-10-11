import clsx from "clsx";
import React, { useContext, useRef } from "react";
import classes from "../styles/Search.module.css";
import ThemeContext from "../Contexts/Context";

const Search = ({ searchedDocs, sortAllDocs }) => {
  const searchRef = useRef();
  const { isDarkMode } = useContext(ThemeContext);
  const showSearch = () => {
    searchedDocs(searchRef.current.value);
  };
  const sortDocs = () => {
    sortAllDocs();
  };
  return (
    <div className={classes.searchWrapper}>
      <div className={classes.searchInputDiv}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search"
          onChange={showSearch}
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
        onClick={sortDocs}
        className={clsx(classes.sorter, isDarkMode && classes.sorterDark)}
      />
    </div>
  );
};
export default Search;
