import { useEffect, useState } from "react";
import axios from "axios";

function MySubmissions() {

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {

    axios.get(
      "http://localhost:8083/assignment-system/api/my-submissions",
      {
        withCredentials: true
      }
    )
    .then(response => {
      console.log("My submissions:", response.data);
      setSubmissions(response.data);
    })
    .catch(error => {
      console.error(
        "Error fetching submissions:",
        error
      );
    });

  }, []);

  return (

    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            My Submissions
          </h1>

          <p style={styles.subtitle}>
            Track your submitted assignments
          </p>
        </div>

        <button
          onClick={() =>
            window.location.href = "/student-dashboard"
          }
          style={styles.backButton}
        >
          Dashboard
        </button>

      </div>


      <div style={styles.container}>

        {submissions.length === 0 && (
          <div style={styles.emptyCard}>
            <h2>No submissions yet</h2>
            <p>
              You have not submitted any assignments.
            </p>
          </div>
        )}


        <div style={styles.grid}>

          {submissions.map(submission => (

            <div
              key={submission.id}
              style={styles.card}
            >

              <div style={styles.icon}>
                📝
              </div>

              <h2>
                {submission.assignmentTitle}
              </h2>

              <p>
                <strong>Assignment ID:</strong>{" "}
                {submission.assignmentId}
              </p>

              <div style={styles.answerBox}>

                <strong>Your Submission</strong>

                <p>
                  {submission.submissionText}
                </p>

              </div>


              <p>
                <strong>Status:</strong>{" "}

                <span
                  style={
                    submission.status === "EVALUATED"
                      ? styles.evaluated
                      : styles.submitted
                  }
                >
                  {submission.status}
                </span>

              </p>


              <p>
                <strong>Marks:</strong>{" "}
                {submission.status === "EVALUATED"
                  ? submission.marks
                  : "Not evaluated yet"}
              </p>


              <div style={styles.feedbackBox}>

                <strong>Faculty Feedback</strong>

                <p>
                  {submission.feedback ||
                    "No feedback yet"}
                </p>

              </div>

            </div>

          ))}

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

  backButton: {
    background: "white",
    color: "#222",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  container: {
    maxWidth: "1100px",
    margin: "35px auto",
    padding: "0 20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px"
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  },

  icon: {
    fontSize: "35px"
  },

  answerBox: {
    background: "#f7f7f7",
    padding: "15px",
    borderRadius: "6px",
    marginTop: "15px",
    marginBottom: "15px"
  },

  feedbackBox: {
    background: "#f7f7f7",
    padding: "15px",
    borderRadius: "6px",
    marginTop: "15px"
  },

  evaluated: {
    color: "green",
    fontWeight: "bold"
  },

  submitted: {
    color: "#d68910",
    fontWeight: "bold"
  },

  emptyCard: {
    background: "white",
    padding: "40px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  }

};

export default MySubmissions;