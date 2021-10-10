import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import classes from "../styles/Main.module.css";
import Search from "./Search";
import Upload from "./Upload";
import Favourites from "./Favourites";
import AllDocs from "./AllDocs";
import Alert from "./Alert";
import ThemeContext from "../Contexts/Context";
import axios from "axios";

const Main = ({ showInfo, theDocs }) => {
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState("");
  const [docs, setDocs] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  const history = useHistory();
  useEffect(() => {
    fetch("/doc")
      .then((res) => res.json())
      .then((docs) => setDocs(docs.data));
  }, []);

  const toggleFav = (id) => {
    let updatedDocs = [...docs];
    const docIndex = docs.findIndex((d) => d._id === id);
    updatedDocs[docIndex].fav = !updatedDocs[docIndex].fav;
    setDocs(updatedDocs);
  };

  async function uploadFileHandler(formData) {
    setProgress(true);
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    const response = await axios.post(
      "http://localhost:5000/doc/uploadfile",
      formData,
      config
    );
    if (response.status === 200) {
      setProgress(false);
      window.location.reload();
    }
  }
  return (
    <div className={classes.MainWrapper}>
      {/* Docs Title */}
      <div
        className={clsx(
          classes.userAndTitle,
          isDarkMode && classes.userAndTitleDark
        )}
      >
        <div
          className={clsx(classes.userIcon, isDarkMode && classes.userIconDark)}
        >
          AM
        </div>
        <div className={clsx(classes.title, isDarkMode && classes.titleDark)}>
          My Documents
        </div>
      </div>
      {/* Upload Section */}
      <Upload uploadFileHandler={uploadFileHandler} setError={setError} />
      {/* Main Docs */}

      <div
        className={clsx(
          classes.mainSectionWrapper,
          isDarkMode && classes.mainSectionWrapperDark
        )}
      >
        <div
          className={clsx(
            classes.mainSection,
            isDarkMode && classes.mainSectionDark
          )}
        >
          {error && (
            <Alert danger={true} message={error} showAlert={setError} />
          )}
          {/* Search */}
          <Search />
          {/* Favourites */}
          <Favourites
            theDocs={docs}
            toggleFav={toggleFav}
            showInfo={showInfo}
          />
          <AllDocs theDocs={docs} toggleFav={toggleFav} showInfo={showInfo} />
        </div>
      </div>
    </div>
  );
};
export default Main;
