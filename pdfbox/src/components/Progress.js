import spinner from "../images/loading2.gif";
import classes from "../styles/Progress.module.css";
const Progress = () => {
  return (
    <div className={classes.spinner}>
      <img src={spinner} alt="loading" />
    </div>
  );
};

export default Progress;
