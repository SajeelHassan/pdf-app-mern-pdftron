import React, { useContext, useState } from "react";
import clsx from "clsx";
import classes from "../styles/Doc.module.css";
import { useHistory } from "react-router";
import ThemeContext from "../Contexts/Context";
import ActiveContext from "../Contexts/ActiveContext";

const Doc = ({
  name,
  size,
  created,
  modified,
  filetype,
  cloudId,
  id,
  fav,
  color,
  toggleFav,
  showInfo,
  wasActive,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isActive, setIsActive] = useState(false);
  const { selectActiveDoc } = useContext(ActiveContext);
  const history = useHistory();

  // const router = useRouter();
  let acronym = name.match(/\b(\w)/g);
  acronym = acronym.slice(0, 2).join("");
  acronym = acronym.toUpperCase();
  const toggleFavourite = () => {
    toggleFav(id, fav);
  };
  const showContent = (docId) => {
    selectActiveDoc(docId);
    // setIsActive(true);

    showInfo({
      id,
      name,
      color,
      fav,
      size,
      filetype,
      created,
      modified,
      acronym,
    });
  };
  const showPdf = () => {
    history.push(`/view/${id}`);
  };

  return (
    <div
      className={clsx(
        classes.doc,
        isDarkMode && classes.docDark,
        wasActive && classes.active
      )}
      onClick={() => showContent(id)}
    >
      <div className={classes.docInfo}>
        <div className={classes.marker} />
        <div
          className={clsx(classes.docIcon, isDarkMode && classes.docIconDark)}
          style={{ backgroundColor: color }}
        >
          {acronym}
        </div>
        <div className={classes.docDetails}>
          <p
            className={clsx(
              classes.docTitle,
              isDarkMode && classes.docTitleDark
            )}
            onClick={showPdf}
          >
            {name.substring(0, name.length - 4)}
          </p>
          <p
            className={clsx(
              classes.docOwner,
              isDarkMode && classes.docOwnerDark
            )}
          >
            Owner Andrew Miralles
          </p>
        </div>
      </div>
      <div
        className={clsx(
          classes.docOptions,
          isDarkMode && classes.docOptionsDark
        )}
      >
        <span
          className={clsx(fav && classes.star, fav || classes.unStar)}
          onClick={toggleFavourite}
        />
        <span className={classes.dots} />
      </div>
    </div>
  );
};
export default Doc;
