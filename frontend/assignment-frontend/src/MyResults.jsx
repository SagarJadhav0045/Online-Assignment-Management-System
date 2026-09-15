import { useEffect, useState } from "react";
import axios from "axios";

function MyResults() {

  const [results, setResults] = useState([]);

  useEffect(() => {

    axios.get(
      "http://localhost:8083/assignment-system/api/my-submissions",
      {
        withCredentials: true
      }
    )
    .then(response => {
      console.log("My results:", response.data);
      setResults(response.data);
    })
    .catch(error => {
      console.error(
        "Error fetching results:",
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
            My Results
          </h1>

          <p style={styles.subtitle}>
            View your marks and faculty feedback
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

        {results.length === 0 && (
          <div style={styles.emptyCard}>
            <h2>No results available</h2>
            <p>
              Your evaluated assignments will appear here.
            </p>
          </div>
        )}


        <div style={styles.grid}>

          {results.map(result => (

            <div
              key={result.id}
              style={styles.card}
            >

              <div style={styles.icon}>
                📊
              </div>

              <h2>
                {result.assignmentTitle}
              </h2>

              <p>
                <strong>Assignment ID:</strong>{" "}
                {result.assignmentId}
              </p>


              {result.status === "EVALUATED" ? (

                <>

                  <div style={styles.marksBox}>

                    <span style={styles.marksLabel}>
                      Marks
                    </span>

                    <span style={styles.marks}>
                      {result.marks}
                    </span>

                    <span style={styles.outOf}>
                      / 100
                    </span>

                  </div>


                  <div style={styles.feedbackBox}>

                    <strong>
                      Faculty Feedback
                    </strong>

                    <p>
                      {result.feedback ||
                        "No feedback provided."}
                    </p>

                  </div>

                </>

              ) : (

                <div style={styles.pendingBox}>

                  <div style={styles.pendingIcon}>
                    ⏳
                  </div>

                  <strong>
                    Not Evaluated Yet
                  </strong>

                  <p>
                    Your faculty has not evaluated
                    this submission yet.
                  </p>

                </div>

              )}

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

  marksBox: {
    marginTop: "20px",
    padding: "20px",
    background: "#f7f7f7",
    borderRadius: "8px",
    textAlign: "center"
  },

  marksLabel: {
    display: "block",
    fontSize: "14px",
    color: "#777"
  },

  marks: {
    fontSize: "40px",
    fontWeight: "bold"
  },

  outOf: {
    fontSize: "18px",
    color: "#777"
  },

  feedbackBox: {
    marginTop: "15px",
    padding: "15px",
    background: "#f7f7f7",
    borderRadius: "6px"
  },

  pendingBox: {
    marginTop: "20px",
    padding: "20px",
    background: "#fff8e1",
    borderRadius: "8px",
    textAlign: "center"
  },

  pendingIcon: {
    fontSize: "30px",
    marginBottom: "8px"
  },

  emptyCard: {
    background: "white",
    padding: "40px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  }

};

export default MyResults;