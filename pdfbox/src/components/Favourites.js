import React, { useContext } from "react";
import classes from "../styles/Favourites.module.css";
import Doc from "./Doc";
import clsx from "clsx";
import ThemeContext from "../Contexts/Context";

const Favourites = ({ theDocs, toggleFav, showInfo }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const favs = theDocs.filter((doc) => doc.fav);
  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.title, isDarkMode && classes.titleDark)}>
        <p>Favourites</p>
      </div>
      <div className={clsx(isDarkMode ? classes.mainDark : classes.main)}>
        {favs.map((docs, index) => (
          <Doc
            key={docs._id}
            id={docs._id}
            name={docs.name}
            size={docs.size}
            created={docs.created}
            filetype={docs.filetype}
            fav={docs.fav}
            color={docs.color}
            cloudId={docs.cloudId}
            toggleFav={toggleFav}
            showInfo={showInfo}
          />
        ))}
        {favs.length === 0 && (
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
export default Favourites;
