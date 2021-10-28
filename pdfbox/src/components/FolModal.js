import React, { useRef } from "react";
import ReactDOM from "react-dom";
import classes from "../styles/Modal.module.css";
const ModalOverlay = ({ hideModal, createFolderHandler }) => {
  const inputRef = useRef("");

  const confirmFolder = () => {
    if (inputRef.current.value) {
      createFolderHandler(inputRef.current.value);
      hideModal(false);
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.titleAndClose}>
          <span className={classes.title}>New Folder</span>
          <span
            className={classes.closeIcon}
            onClick={() => hideModal(false)}
          />
        </div>
        <div className={classes.inputForm}>
          <label for="newDocName" className={classes.label}>
            Name
          </label>
          <input ref={inputRef} type="text" className={classes.input}></input>
          <div className={classes.formControls}>
            <button
              className={classes.cancelBtn}
              onClick={() => hideModal(false)}
            >
              Cancel
            </button>
            <button className={classes.confirmBtn} onClick={confirmFolder}>
              <span className={classes.tickIcon} />
              <p>Confirm</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FolModal = ({ hideModal, confirmDoc, createFolderHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay
          hideModal={hideModal}
          confirmDoc={confirmDoc}
          createFolderHandler={createFolderHandler}
        />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default FolModal;
