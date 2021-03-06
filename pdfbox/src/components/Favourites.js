import React, { useContext } from "react";
import classes from "../styles/Favourites.module.css";
import Doc from "./Doc";
import clsx from "clsx";
import ThemeContext from "../Contexts/Context";
import ActiveContext from "../Contexts/ActiveContext";

const Favourites = ({ theDocs, toggleFav, showInfo, selectDoc }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const favs = theDocs.filter((doc) => doc.fav);
  const { activeId } = useContext(ActiveContext);

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
            modified={docs.modified}
            filetype={docs.filetype}
            fav={docs.fav}
            color={docs.color}
            cloudId={docs.cloudId}
            toggleFav={toggleFav}
            showInfo={showInfo}
            thumbA={docs.thumbA}
            thumbB={docs.thumbB}
            selectDoc={selectDoc}
            wasActive={activeId === docs._id}
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
