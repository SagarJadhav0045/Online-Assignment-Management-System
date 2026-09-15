import React from "react";

function StudentDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Student Dashboard
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

      {/* Welcome Card */}
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

      {/* Options */}
      <h2 style={styles.sectionTitle}>
        Student Options
      </h2>

      <div style={styles.grid}>

        <div
          style={styles.card}
          onClick={() =>
            window.location.href = "/assignments"
          }
        >
          <div style={styles.cardIcon}>📚</div>

          <h3>Assignments</h3>

          <p>
            View available assignments and submit your work.
          </p>

          <button style={styles.button}>
            View Assignments
          </button>
        </div>


        <div
          style={styles.card}
          onClick={() =>
            window.location.href = "/my-submissions"
          }
        >
          <div style={styles.cardIcon}>📝</div>

          <h3>My Submissions</h3>

          <p>
            View assignments you have submitted.
          </p>

          <button style={styles.button}>
            View Submissions
          </button>
        </div>


        <div
          style={styles.card}
          onClick={() =>
            window.location.href = "/my-results"
          }
        >
          <div style={styles.cardIcon}>📊</div>

          <h3>My Results</h3>

          <p>
            Check your marks and faculty feedback.
          </p>

          <button style={styles.button}>
            View Results
          </button>
        </div>

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
    margin: "35px auto",
    padding: "25px",
    maxWidth: "900px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  },

  sectionTitle: {
    textAlign: "center",
    marginBottom: "25px"
  },

  grid: {
    maxWidth: "1000px",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    padding: "0 20px"
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
    cursor: "pointer"
  },

  cardIcon: {
    fontSize: "40px"
  },

  button: {
    marginTop: "15px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    background: "#222",
    color: "white",
    cursor: "pointer"
  }

};

export default StudentDashboard;