import clsx from "clsx";
import React, { useContext } from "react";
import classes from "../styles/Upload.module.css";
import ThemeContext from "../Contexts/Context";
import ActiveContext from "../Contexts/ActiveContext";

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
const Upload = ({
  uploadFileHandler,
  setError,
  deleteFile,
  showCreateDoc,
  showCreateFol,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { activeId } = useContext(ActiveContext);
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
  const deleteDoc = () => {
    if (activeId) {
      deleteFile(activeId);
    }
  };
  return (
    <div
      className={clsx(
        classes.uploadSection,
        isDarkMode && classes.uploadSectionDark
      )}
    >
      <div className={classes.createDocumentWrapper} onClick={showCreateDoc}>
        <button
          className={clsx(
            classes.createBtn,
            isDarkMode && classes.createBtnDark
          )}
        >
          <span
            className={clsx(
              classes.createBtnIcon,
              isDarkMode && classes.createBtnIconDark
            )}
          />
          <p>Create document</p>
        </button>
      </div>
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
      <div className={classes.createFolderWrapper}>
        <button
          onClick={showCreateFol}
          className={clsx(
            classes.createFolder,
            isDarkMode && classes.createFolderDark
          )}
        >
          <span
            className={clsx(
              classes.createFolderIcon,
              isDarkMode && classes.createFolderIconDark
            )}
          />
          <p>Create Folder</p>
        </button>
      </div>
      <div className={classes.deleteBtnWrapper}>
        <button
          onClick={deleteDoc}
          className={clsx(
            classes.deleteBtn,
            isDarkMode && classes.deleteBtnDark
          )}
        >
          <span
            className={clsx(
              classes.deleteBtnIcon,
              isDarkMode && classes.deleteBtnIconDark
            )}
          />
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};
export default Upload;
