import { useState } from "react";
import axios from "axios";

function FacultyDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleViewSubmissions = () => {
    window.location.href = "/faculty-submissions";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleCreateAssignment = (event) => {

    event.preventDefault();

    const formData = new URLSearchParams();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("subject", subject);
    formData.append("dueDate", dueDate);

    axios.post(
      "http://localhost:8083/assignment-system/api/assignments",
      formData,
      {
        withCredentials: true
      }
    )
    .then(response => {

      alert(response.data);

      setTitle("");
      setDescription("");
      setSubject("");
      setDueDate("");

    })
    .catch(error => {

      console.error(
        "Assignment creation failed:",
        error
      );

      alert("Assignment creation failed.");

    });
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            Faculty Dashboard
          </h1>

          <p style={styles.subtitle}>
            Online Assignment Management System
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </button>

      </div>


      {/* Faculty Information */}
      <div style={styles.welcomeCard}>

        <h2>
          Welcome, {user?.name} 👋
        </h2>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Role:</strong> {user?.role}
        </p>

      </div>


      {/* Faculty Options */}
      <h2 style={styles.sectionTitle}>
        Faculty Options
      </h2>

      <div style={styles.optionContainer}>

        <div style={styles.optionCard}>

          <div style={styles.icon}>
            📝
          </div>

          <h3>
            Student Submissions
          </h3>

          <p>
            View and evaluate assignments submitted by students.
          </p>

          <button
            onClick={handleViewSubmissions}
            style={styles.button}
          >
            View Submissions
          </button>

        </div>

      </div>


      {/* Create Assignment */}
      <div style={styles.formCard}>

        <h2>
          Create New Assignment
        </h2>

        <p style={styles.formSubtitle}>
          Create an assignment for your students.
        </p>

        <form onSubmit={handleCreateAssignment}>

          <label style={styles.label}>
            Assignment Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Enter assignment title"
            style={styles.input}
            required
          />


          <label style={styles.label}>
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Enter assignment description"
            rows="5"
            style={styles.textarea}
            required
          />


          <label style={styles.label}>
            Subject
          </label>

          <input
            type="text"
            value={subject}
            onChange={(event) =>
              setSubject(event.target.value)
            }
            placeholder="Enter subject"
            style={styles.input}
            required
          />


          <label style={styles.label}>
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            style={styles.input}
            required
          />


          <button
            type="submit"
            style={styles.createButton}
          >
            Create Assignment
          </button>

        </form>

      </div>

    </div>
  );
}


const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "50px"
  },

  header: {
    background: "#222",
    color: "white",
    padding: "20px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    margin: 0
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#ccc"
  },

  logoutButton: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  },

  welcomeCard: {
    background: "white",
    margin: "35px auto 25px",
    padding: "25px",
    maxWidth: "900px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  },

  sectionTitle: {
    textAlign: "center",
    marginBottom: "20px"
  },

  optionContainer: {
    maxWidth: "500px",
    margin: "auto",
    padding: "0 20px"
  },

  optionCard: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  },

  icon: {
    fontSize: "40px"
  },

  button: {
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#222",
    color: "white",
    cursor: "pointer"
  },

  formCard: {
    background: "white",
    maxWidth: "700px",
    margin: "35px auto",
    padding: "35px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  },

  formSubtitle: {
    color: "#777",
    marginBottom: "25px"
  },

  label: {
    display: "block",
    marginTop: "18px",
    marginBottom: "7px",
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

  textarea: {
    width: "100%",
    padding: "12px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    resize: "vertical"
  },

  createButton: {
    width: "100%",
    marginTop: "25px",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#222",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }

};

export default FacultyDashboard;