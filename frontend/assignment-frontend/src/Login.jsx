import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {

    event.preventDefault();

    const formData = new URLSearchParams();

    formData.append("email", email);
    formData.append("password", password);

    axios.post(
      "http://localhost:8083/assignment-system/api/login",
      formData,
      {
        withCredentials: true
      }
    )
    .then(response => {

      console.log("Login successful:", response.data);

      const user = response.data;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (user.role === "STUDENT") {
        window.location.href = "/student-dashboard";
      }
      else if (user.role === "FACULTY") {
        window.location.href = "/faculty-dashboard";
      }

    })
    .catch(error => {

      console.error("Login failed:", error);

      alert("Invalid email or password.");

    });
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.icon}>
          🎓
        </div>

        <h1 style={styles.title}>
          Online Assignment
        </h1>

        <p style={styles.subtitle}>
          Management System
        </p>

        <h2 style={styles.loginTitle}>
          Login
        </h2>

        <form onSubmit={handleLogin}>

          <label style={styles.label}>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
            style={styles.input}
            required
          />

          <label style={styles.label}>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "380px",
    padding: "40px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)"
  },

  icon: {
    textAlign: "center",
    fontSize: "45px"
  },

  title: {
    textAlign: "center",
    marginBottom: "5px",
    color: "#222"
  },

  subtitle: {
    textAlign: "center",
    marginTop: "0",
    color: "#777"
  },

  loginTitle: {
    textAlign: "center",
    marginTop: "30px",
    marginBottom: "25px"
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "15px",
    fontWeight: "bold"
  },

  input: {
    width: "100%",
    padding: "12px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px"
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "25px",
    border: "none",
    borderRadius: "6px",
    background: "#222",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }

};

export default Login;