import React, { useContext, useRef } from "react";
import classes from "../styles/AllDocs.module.css";
import Doc from "./Doc";
import ThemeContext from "../Contexts/Context";
import clsx from "clsx";
import ActiveContext from "../Contexts/ActiveContext";

const AllDocs = ({ theDocs, toggleFav, showInfo }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { activeId } = useContext(ActiveContext);

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.title, isDarkMode && classes.titleDark)}>
        <p>All Documents</p>
      </div>
      <div className={clsx(isDarkMode ? classes.mainDark : classes.main)}>
        {theDocs.map((docs) => {
          return (
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
              wasActive={activeId === docs._id}
            />
          );
        })}

        {theDocs.length === 0 && (
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
export default AllDocs;
