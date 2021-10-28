import React, { useContext, useState } from "react";
import clsx from "clsx";
import classes from "../styles/Folder.module.css";
import { useHistory } from "react-router";
import ThemeContext from "../Contexts/Context";
import ActiveContext from "../Contexts/ActiveContext";

const Folder = ({
  id,
  name,
  created,
  modified,
  type,
  fav,
  toggleFav,
  showInfo,
  selectDoc,
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
    // toggleFav(id, fav);
  };
  const showContent = (docId) => {
    selectActiveDoc(docId);
    setIsActive(true);
    showInfo({
      id,
      name,
      fav,
      created,
      modified,
      filetype: type,
    });
  };
  //   const showPdf = () => {
  //     history.push(`/view/${id}`);
  //   };

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
          style={{ backgroundColor: "rgba(255, 193, 68, 1)" }}
        >
          <span className={classes.folderIcon} />
        </div>
        <div className={classes.docDetails}>
          <p
            className={clsx(
              classes.docTitle,
              isDarkMode && classes.docTitleDark
            )}
            // onClick={showPdf}
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
          className={clsx(classes.unStar)}
          //   onClick={toggleFavourite}
        />
        <span className={classes.dots} />
      </div>
    </div>
  );
};
export default Folder;
