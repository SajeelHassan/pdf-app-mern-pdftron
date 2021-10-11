import React, { useRef, useState, useContext } from "react";
import styles from "../styles/Login.module.css";
import Alert from "./Alert";
import AuthContext from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  // const { login } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { loginHandler } = useContext(AuthContext);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await login(emailRef.current.value, passwordRef.current.value).then(() =>
      //   history.push("/dashboard")
      // );
      const url =
        "https:identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXBwS8aJPH0L8fFZdqsOfcP5XGk679B4Y";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            setSuccess("Logging in ...");
            loginHandler();
            history.replace("/dashboard");
          } else {
            return res.json().then((data) => {
              let errorMessage = "Email or Password is incorrect";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }

              setError(errorMessage);
            });
          }
          setLoading(false);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          setError(err.message);
        });
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.logo}>PDFBOX</div>
        {error && <Alert message={error} danger={true} showAlert={setError} />}
        {success && (
          <Alert message={success} danger={false} showAlert={setSuccess} />
        )}
        <div className={styles.loginFormWrapper}>
          <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputDiv}>
                <label htmlFor="name">Username</label>
                <div className={styles.theInput}>
                  <i className={`${styles.icon} ${styles.iconUsr}`}></i>
                  <input
                    className={styles.username}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Username"
                    autoComplete="username"
                    ref={emailRef}
                    required
                  />
                </div>
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="pwd">Password</label>
                <div className={styles.theInput}>
                  <i className={`${styles.icon} ${styles.iconPwd}`}></i>
                  <input
                    className={styles.password}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Your Password"
                    autoComplete="password"
                    ref={passwordRef}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.button}>
                LOGIN
              </button>
            </form>
          </div>
          <p className={styles.forgotPassword}>Forgot password?</p>
          <div className={styles.formFooterWrapper}>
            <div className={styles.formFooter}>
              <p>Objective Corporation</p>
              <p>Terms of service</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
