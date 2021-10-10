import React from "react";
import classes from "../styles/Alert.module.css";
import clsx from "clsx";
const Alert = ({ message, danger, showAlert }) => {
  const removeAlert = () => {
    showAlert("");
  };
  return (
    <div
      className={clsx(
        danger ? classes.danger : classes.success,
        classes.container
      )}
    >
      <div className={classes.content}>{message}</div>
      <span className={classes.icon} onClick={removeAlert} />
    </div>
  );
};

export default Alert;
