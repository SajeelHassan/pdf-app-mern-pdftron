import React, { useContext, useState } from "react";
import classes from "../styles/Dashboard.module.css";
import Header from "./Header";
import Main from "./Main";
import DocInfo from "./DocInfo";
import ThemeContext from "../Contexts/Context";
import ActiveContext from "../Contexts/ActiveContext";
import clsx from "clsx";

const Dashboard = () => {
  const [activeId, setActiveId] = useState("");
  const { isDarkMode } = useContext(ThemeContext);
  const [info, setInfo] = useState({ any: false, content: {} });
  const showInfo = (data) => {
    setInfo({ any: true, content: data });
  };
  const selectActiveDoc = (id) => {
    setActiveId(id);
  };
  return (
    <div>
      <Header />
      <div
        className={clsx(
          classes.docAndInfo,
          isDarkMode && classes.docAndInfoDark
        )}
      >
        <ActiveContext.Provider
          value={{ activeId: activeId, selectActiveDoc: selectActiveDoc }}
        >
          <Main showInfo={showInfo} />
        </ActiveContext.Provider>
        <DocInfo info={info} />
      </div>
    </div>
  );
};
export default Dashboard;
