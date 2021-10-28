import spinner from "../images/loading2.gif";
import classes from "../styles/Progress.module.css";
const Progress = ({ text }) => {
  return (
    <div className={classes.spinner}>
      <img src={spinner} alt="loading" />
      <p>{text}</p>
    </div>
  );
};

export default Progress;
