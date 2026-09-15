import { useEffect, useState } from "react";
import axios from "axios";

function FacultySubmissions() {

  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {

    axios.get(
      "http://localhost:8083/assignment-system/api/faculty-submissions",
      {
        withCredentials: true
      }
    )
    .then(response => {
      console.log("Faculty submissions:", response.data);
      setSubmissions(response.data);
    })
    .catch(error => {
      console.error(
        "Error fetching submissions:",
        error
      );
    });

  }, []);


  const handleEvaluate = (event) => {

    event.preventDefault();

    const formData = new URLSearchParams();

    formData.append(
      "submissionId",
      selectedSubmission.id
    );

    formData.append("marks", marks);
    formData.append("feedback", feedback);

    axios.post(
      "http://localhost:8083/assignment-system/api/evaluate",
      formData,
      {
        withCredentials: true
      }
    )
    .then(response => {

      alert(response.data);

      setMarks("");
      setFeedback("");
      setSelectedSubmission(null);

      window.location.reload();

    })
    .catch(error => {

      console.error(
        "Evaluation failed:",
        error
      );

      alert("Evaluation failed.");

    });
  };


  return (

    <div style={styles.page}>

      {/* Header */}

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            Student Submissions
          </h1>

          <p style={styles.subtitle}>
            Review and evaluate student assignments
          </p>
        </div>

        <button
          onClick={() =>
            window.location.href = "/faculty-dashboard"
          }
          style={styles.backButton}
        >
          Dashboard
        </button>

      </div>


      <div style={styles.container}>

        {submissions.length === 0 && (

          <div style={styles.emptyCard}>

            <h2>
              No submissions available
            </h2>

            <p>
              Student submissions will appear here.
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
                <strong>
                  Submission ID:
                </strong>{" "}
                {submission.id}
              </p>

              <p>
                <strong>
                  Student ID:
                </strong>{" "}
                {submission.studentId}
              </p>


              <div style={styles.answerBox}>

                <strong>
                  Student Submission
                </strong>

                <p>
                  {submission.submissionText}
                </p>

              </div>


              <p>

                <strong>
                  Status:
                </strong>{" "}

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

                <strong>
                  Marks:
                </strong>{" "}

                {submission.status === "EVALUATED"
                  ? submission.marks
                  : "Not evaluated yet"}

              </p>


              <div style={styles.feedbackBox}>

                <strong>
                  Faculty Feedback
                </strong>

                <p>
                  {submission.feedback ||
                    "No feedback yet"}
                </p>

              </div>


              <button
                onClick={() =>
                  setSelectedSubmission(submission)
                }
                style={styles.evaluateButton}
              >
                {submission.status === "EVALUATED"
                  ? "Update Evaluation"
                  : "Evaluate Submission"}
              </button>

            </div>

          ))}

        </div>

      </div>


      {/* Evaluation Modal */}

      {selectedSubmission && (

        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h2>
              Evaluate Submission
            </h2>

            <h3>
              {selectedSubmission.assignmentTitle}
            </h3>


            <form onSubmit={handleEvaluate}>

              <label style={styles.label}>
                Marks
              </label>

              <input
                type="number"
                min="0"
                max="100"
                value={marks}
                onChange={(event) =>
                  setMarks(event.target.value)
                }
                placeholder="Enter marks out of 100"
                style={styles.input}
                required
              />


              <label style={styles.label}>
                Feedback
              </label>

              <textarea
                value={feedback}
                onChange={(event) =>
                  setFeedback(event.target.value)
                }
                rows="6"
                placeholder="Enter feedback for the student"
                style={styles.textarea}
                required
              />


              <div style={styles.modalButtons}>

                <button
                  type="submit"
                  style={styles.evaluateButton}
                >
                  Submit Evaluation
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedSubmission(null)
                  }
                  style={styles.cancelButton}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

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

  evaluateButton: {
    marginTop: "20px",
    background: "#222",
    color: "white",
    border: "none",
    padding: "11px 18px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  emptyCard: {
    background: "white",
    padding: "40px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  modal: {
    background: "white",
    width: "600px",
    maxWidth: "100%",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)"
  },

  label: {
    display: "block",
    marginTop: "20px",
    marginBottom: "7px",
    fontWeight: "bold"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px"
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    resize: "vertical"
  },

  modalButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },

  cancelButton: {
    marginTop: "20px",
    background: "#ddd",
    color: "#222",
    border: "none",
    padding: "11px 18px",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default FacultySubmissions;