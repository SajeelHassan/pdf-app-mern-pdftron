import clsx from "clsx";
import React, { useContext, useState, useEffect } from "react";

import classes from "../styles/DocInfo.module.css";
import ThemeContext from "../Contexts/Context";

const DocInfo = ({ info }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { any, content } = info;
  useEffect(() => {
    // const getThumbnails = async () => {
    //   // const CoreControls = window.CoreControls;
    //   // CoreControls.setWorkerPath("/lib/core");
    //   const doc = await CoreControls.createDocument(info.content.pdfFile, {
    //     extension: "pdf",
    //   });
    //   doc.loadCanvasAsync({
    //     pageNumber: 1,
    //     drawComplete: (thumbnail) => {
    //       setThumb(thumbnail);
    //     },
    //   });
    // };
    // getThumbnails();
  }, []);
  function dateAndTime(date) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let numDate = date.getDate();
    let month = months[date.getMonth()].substring(0, 3);
    let fullYear = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = `${numDate} ${month} ${fullYear}, ${hours}:${minutes} ${ampm}`;
    return strTime;
  }
  return (
    <div className={classes.wrapper}>
      {any && (
        <>
          <div className={classes.header}>
            <span
              style={{ backgroundColor: content.color }}
              className={clsx(classes.icon, isDarkMode && classes.iconDark)}
            >
              {content.filetype === "pdf" ? (
                content.acronym
              ) : (
                <span
                  style={{
                    backgroundColor: "rgba(255, 193, 68, 1)",
                    padding: "0.625rem",
                    borderRadius: "0.5rem",
                  }}
                  className={classes.folderInfoIcon}
                />
              )}
            </span>
            <span
              className={clsx(classes.title, isDarkMode && classes.titleDark)}
            >
              {content.filetype === "pdf"
                ? content.name.substring(0, content.name.length - 4)
                : content.name}
            </span>
          </div>
          <div className={clsx(classes.tabs, isDarkMode && classes.tabsDark)}>
            <p>Details</p>
            <span
              className={clsx(classes.marker, isDarkMode && classes.markerDark)}
            />
          </div>
          <div className={classes.thumbnails}>
            {content.thumbA && (
              <>
                <span>
                  <img
                    className={classes.thumbnailImage}
                    src={content.thumbA}
                  />
                </span>
                <span>
                  <img
                    className={classes.thumbnailImage}
                    src={content.thumbB}
                  />
                </span>
              </>
            )}
          </div>
          <div className={classes.infos}>
            <div className={classes.info}>
              <p className={clsx(classes.key, isDarkMode && classes.keyDark)}>
                Owner
              </p>
              <p
                className={clsx(classes.value, isDarkMode && classes.valueDark)}
              >
                Andrew Miralles
              </p>
            </div>
            <div className={classes.info}>
              <p className={clsx(classes.key, isDarkMode && classes.keyDark)}>
                Created
              </p>
              <p
                className={clsx(classes.value, isDarkMode && classes.valueDark)}
              >
                {dateAndTime(new Date(content.created))}
              </p>
            </div>
            <div className={classes.info}>
              <p className={clsx(classes.key, isDarkMode && classes.keyDark)}>
                Modified
              </p>
              <p
                className={clsx(classes.value, isDarkMode && classes.valueDark)}
              >
                {dateAndTime(new Date(content.modified))}
              </p>
            </div>
            <div className={classes.info}>
              <p className={clsx(classes.key, isDarkMode && classes.keyDark)}>
                Type
              </p>
              <p
                className={clsx(classes.value, isDarkMode && classes.valueDark)}
              >
                {content.filetype}
              </p>
            </div>
            {content.filetype === "pdf" && (
              <div className={classes.info}>
                <p className={clsx(classes.key, isDarkMode && classes.keyDark)}>
                  Size
                </p>
                <p
                  className={clsx(
                    classes.value,
                    isDarkMode && classes.valueDark
                  )}
                >
                  {(content.size / 1000000).toFixed(2)}Mb
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default DocInfo;
