import { useEffect, useState } from "react";
import axios from "axios";

function Assignments() {

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState("");

  useEffect(() => {

    axios.get(
      "http://localhost:8083/assignment-system/api/assignments"
    )
    .then(response => {
      setAssignments(response.data);
    })
    .catch(error => {
      console.error(
        "Error fetching assignments:",
        error
      );
    });

  }, []);

  const handleSubmit = (event) => {

    event.preventDefault();

    const formData = new URLSearchParams();

    formData.append(
      "assignmentId",
      selectedAssignment.id
    );

    formData.append(
      "submissionText",
      submissionText
    );

    axios.post(
      "http://localhost:8083/assignment-system/api/submissions",
      formData,
      {
        withCredentials: true
      }
    )
    .then(response => {

      alert(response.data);

      setSubmissionText("");
      setSelectedAssignment(null);

    })
    .catch(error => {

      console.error(
        "Submission failed:",
        error
      );

      alert("Submission failed.");

    });
  };

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    return `${date[2]}-${String(date[1]).padStart(2, "0")}-${String(date[0])}`;
  };

  return (

    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            Assignments
          </h1>

          <p style={styles.subtitle}>
            Online Assignment Management System
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


      {/* Assignment List */}
      <div style={styles.container}>

        <h2 style={styles.heading}>
          Available Assignments
        </h2>

        {assignments.length === 0 && (
          <p style={styles.empty}>
            No assignments available.
          </p>
        )}

        <div style={styles.grid}>

          {assignments.map(assignment => (

            <div
              key={assignment.id}
              style={styles.card}
            >

              <div style={styles.cardIcon}>
                📚
              </div>

              <h2>
                {assignment.title}
              </h2>

              <p>
                <strong>Subject:</strong>{" "}
                {assignment.subject}
              </p>

              <p style={styles.description}>
                {assignment.description}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {formatDate(assignment.dueDate)}
              </p>

              <button
                onClick={() =>
                  setSelectedAssignment(assignment)
                }
                style={styles.submitButton}
              >
                Submit Assignment
              </button>

            </div>

          ))}

        </div>

      </div>


      {/* Submission Form */}
      {selectedAssignment && (

        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h2>
              Submit Assignment
            </h2>

            <h3>
              {selectedAssignment.title}
            </h3>

            <p>
              <strong>Subject:</strong>{" "}
              {selectedAssignment.subject}
            </p>

            <form onSubmit={handleSubmit}>

              <textarea
                value={submissionText}
                onChange={(event) =>
                  setSubmissionText(
                    event.target.value
                  )
                }
                placeholder="Write your assignment answer here..."
                rows="10"
                style={styles.textarea}
                required
              />

              <div style={styles.modalButtons}>

                <button
                  type="submit"
                  style={styles.submitButton}
                >
                  Submit Assignment
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedAssignment(null)
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

  heading: {
    textAlign: "center",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px"
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
  },

  cardIcon: {
    fontSize: "35px"
  },

  description: {
    color: "#555",
    lineHeight: "1.5"
  },

  submitButton: {
    background: "#222",
    color: "white",
    border: "none",
    padding: "11px 18px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  empty: {
    textAlign: "center",
    color: "#777"
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

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    resize: "vertical",
    marginTop: "10px"
  },

  modalButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },

  cancelButton: {
    background: "#ddd",
    color: "#222",
    border: "none",
    padding: "11px 18px",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default Assignments;