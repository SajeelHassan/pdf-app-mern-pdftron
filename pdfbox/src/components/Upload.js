import clsx from "clsx";
import React, { useRef, useContext } from "react";
import classes from "../styles/Upload.module.css";
import ThemeContext from "../Contexts/Context";

const colors = [
  "#8089FF",
  "#4C7FFF",
  "#F77474",
  "#FF6E9C",
  "#ED9C37",
  "#FFC144",
  "#00893E",
  "#5558AF",
];
const Upload = ({ uploadFileHandler, setError }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const uploadBtn = useRef();
  const uploadDoc = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      setError("Error! Try uploading pdf format file.");
      console.log(typeof file.type);
      return;
    }
    formData.append(e.target.name, file);
    formData.append("name", file.name);
    formData.append("size", file.size);
    formData.append("type", file.type);
    formData.append("created", file.lastModifiedDate);
    formData.append("color", colors[Math.floor(Math.random() * colors.length)]);
    uploadFileHandler(formData);
  };
  return (
    <div
      className={clsx(
        classes.uploadSection,
        isDarkMode && classes.uploadSectionDark
      )}
    >
      <div className={classes.uploadWrapper}>
        <input
          type="file"
          id="upload"
          name="uploading"
          hidden
          onChange={uploadDoc}
        />
        <label
          htmlFor="upload"
          className={clsx(
            classes.uploadButton,
            isDarkMode && classes.uploadButtonDark
          )}
        >
          <span
            className={clsx(
              classes.uploadIcon,
              isDarkMode && classes.uploadIconDark
            )}
          ></span>
          <p>Upload new</p>
        </label>
      </div>
      <span
        className={clsx(classes.dots, isDarkMode && classes.dotsDark)}
      ></span>
    </div>
  );
};
export default Upload;
