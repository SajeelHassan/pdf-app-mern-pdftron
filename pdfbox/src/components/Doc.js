import React, { useContext } from "react";
import clsx from "clsx";
import classes from "../styles/Doc.module.css";
import { useHistory } from "react-router";
import ThemeContext from "../Contexts/Context";

const Doc = ({
  name,
  size,
  created,
  filetype,
  cloudId,
  id,
  fav,
  color,
  toggleFav,
  showInfo,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const history = useHistory();

  // const router = useRouter();
  let acronym = name.match(/\b(\w)/g);
  acronym = acronym.slice(0, 2).join("");
  acronym = acronym.toUpperCase();
  const toggleFavourite = () => {
    toggleFav(id);
  };
  const showContent = () => {
    showInfo({
      id,
      name,
      color,
      fav,
      size,
      filetype,
      created,
    });
  };
  const showPdf = () => {
    history.push(`/view/${id}`);
  };
  return (
    <div
      className={clsx(classes.doc, isDarkMode && classes.docDark)}
      onClick={showContent}
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
            {name}
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
