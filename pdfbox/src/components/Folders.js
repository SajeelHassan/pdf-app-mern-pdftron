import React, { useContext } from "react";
import classes from "../styles/Folders.module.css";
import Folder from "./Folder";
import clsx from "clsx";
import ThemeContext from "../Contexts/Context";
import ActiveContext from "../Contexts/ActiveContext";

const Folders = ({ theFols, toggleFav, showInfo, selectDoc }) => {
  const { isDarkMode } = useContext(ThemeContext);
  //   const favs = theDocs.filter((doc) => doc.fav);
  const { activeId } = useContext(ActiveContext);

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.title, isDarkMode && classes.titleDark)}>
        <p>Folders</p>
      </div>
      <div className={clsx(isDarkMode ? classes.mainDark : classes.main)}>
        {theFols.map((fols, index) => (
          <Folder
            key={fols._id}
            id={fols._id}
            name={fols.name}
            created={fols.created}
            modified={fols.modified}
            type={fols.type}
            toggleFav={toggleFav}
            showInfo={showInfo}
            selectDoc={selectDoc}
            wasActive={activeId === fols._id}
          />
        ))}
        {theFols.length === 0 && (
          <div
            className={clsx(classes.nothing, isDarkMode && classes.nothingDark)}
          >
            Nothing to show here yet
          </div>
        )}
      </div>
    </div>
  );
};
export default Folders;
