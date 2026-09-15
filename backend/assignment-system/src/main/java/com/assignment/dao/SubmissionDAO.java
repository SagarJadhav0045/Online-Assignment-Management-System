package com.assignment.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.assignment.model.Submission;

public class SubmissionDAO {

	public boolean saveSubmission(Submission submission) {

		String dueDateSql =
		        "SELECT DUE_DATE FROM ASSIGNMENTS WHERE ID = ?";

		try (Connection con = DBConnection.getConnection();
		     PreparedStatement dueDatePs = con.prepareStatement(dueDateSql)) {

		    dueDatePs.setInt(1, submission.getAssignmentId());

		    try (ResultSet rs = dueDatePs.executeQuery()) {

		        if (rs.next()) {

		            java.sql.Date dueDate = rs.getDate("DUE_DATE");

		            if (dueDate != null &&
		                dueDate.toLocalDate().isBefore(LocalDate.now())) {

		                return false;
		            }
		        }
		    }

		} catch (Exception e) {
		    e.printStackTrace();
		    return false;
		}
			
	    // First check whether this student already submitted this assignment
	    String checkSql = "SELECT COUNT(*) FROM SUBMISSIONS "
	                    + "WHERE ASSIGNMENT_ID = ? AND STUDENT_ID = ?";

	    try (Connection con = DBConnection.getConnection();
	         PreparedStatement checkPs = con.prepareStatement(checkSql)) {

	        checkPs.setInt(1, submission.getAssignmentId());
	        checkPs.setInt(2, submission.getStudentId());

	        try (ResultSet rs = checkPs.executeQuery()) {

	            if (rs.next() && rs.getInt(1) > 0) {
	                // Student has already submitted this assignment
	                return false;
	            }
	        }

	        // If no previous submission exists, insert the new submission
	        String sql = "INSERT INTO SUBMISSIONS "
	                   + "(ASSIGNMENT_ID, STUDENT_ID, SUBMISSION_TEXT, FILE_PATH) "
	                   + "VALUES (?, ?, ?, ?)";

	        try (PreparedStatement ps = con.prepareStatement(sql)) {

	            ps.setInt(1, submission.getAssignmentId());
	            ps.setInt(2, submission.getStudentId());
	            ps.setString(3, submission.getSubmissionText());
	            ps.setString(4, submission.getFilePath());

	            ps.executeUpdate();
	            return true;
	        }

	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return false;
	}

    public List<Submission> getAllSubmissions() {

        List<Submission> submissions = new ArrayList<>();

        String sql = "SELECT ID, ASSIGNMENT_ID, STUDENT_ID, "
                + "SUBMISSION_TEXT, FILE_PATH, SUBMITTED_AT, STATUS, "
                + "MARKS, FEEDBACK "
                + "FROM SUBMISSIONS "
                + "ORDER BY SUBMITTED_AT DESC";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Submission submission = new Submission();

                submission.setId(rs.getInt("ID"));
                submission.setAssignmentId(rs.getInt("ASSIGNMENT_ID"));
                submission.setStudentId(rs.getInt("STUDENT_ID"));
                submission.setSubmissionText(
                    rs.getString("SUBMISSION_TEXT")
                );
                submission.setFilePath(
                    rs.getString("FILE_PATH")
                );

                if (rs.getTimestamp("SUBMITTED_AT") != null) {
                    submission.setSubmittedAt(
                        rs.getTimestamp("SUBMITTED_AT").toLocalDateTime()
                    );
                }

                submission.setStatus(
                    rs.getString("STATUS")
                );
                
                submission.setMarks(rs.getInt("MARKS"));
                submission.setFeedback(rs.getString("FEEDBACK"));
                submissions.add(submission);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return submissions;
    }
    
    public List<Submission> getSubmissionsByStudent(int studentId) {

        List<Submission> submissions = new ArrayList<>();

        String sql = "SELECT S.ID, S.ASSIGNMENT_ID, S.STUDENT_ID, "
                + "S.SUBMISSION_TEXT, S.FILE_PATH, S.SUBMITTED_AT, "
                + "S.STATUS, S.MARKS, S.FEEDBACK, A.TITLE AS ASSIGNMENT_TITLE "
                + "FROM SUBMISSIONS S "
                + "JOIN ASSIGNMENTS A ON S.ASSIGNMENT_ID = A.ID "
                + "WHERE S.STUDENT_ID = ? "
                + "ORDER BY S.SUBMITTED_AT DESC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, studentId);

            try (ResultSet rs = ps.executeQuery()) {

                while (rs.next()) {

                    Submission submission = new Submission();

                    submission.setId(rs.getInt("ID"));
                    submission.setAssignmentId(rs.getInt("ASSIGNMENT_ID"));
                    submission.setStudentId(rs.getInt("STUDENT_ID"));

                    submission.setSubmissionText(
                        rs.getString("SUBMISSION_TEXT")
                    );

                    submission.setFilePath(
                        rs.getString("FILE_PATH")
                    );

                    if (rs.getTimestamp("SUBMITTED_AT") != null) {
                        submission.setSubmittedAt(
                            rs.getTimestamp("SUBMITTED_AT").toLocalDateTime()
                        );
                    }

                    submission.setStatus(
                        rs.getString("STATUS")
                    );

                    submission.setMarks(rs.getInt("MARKS"));

                    submission.setFeedback(
                        rs.getString("FEEDBACK")
                    );
                    submission.setAssignmentTitle(
                            rs.getString("ASSIGNMENT_TITLE"));

                    submissions.add(submission);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return submissions;
    }
    public boolean evaluateSubmission(int submissionId, int marks, String feedback) {

        String sql = "UPDATE SUBMISSIONS "
                   + "SET MARKS = ?, FEEDBACK = ?, STATUS = 'EVALUATED' "
                   + "WHERE ID = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, marks);
            ps.setString(2, feedback);
            ps.setInt(3, submissionId);

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
    public List<Submission> getSubmissionsByFaculty(int facultyId) {

        List<Submission> submissions = new ArrayList<>();

        String sql = "SELECT S.ID, S.ASSIGNMENT_ID, S.STUDENT_ID, "
                + "S.SUBMISSION_TEXT, S.FILE_PATH, S.SUBMITTED_AT, "
                + "S.STATUS, S.MARKS, S.FEEDBACK, "
                + "A.TITLE AS ASSIGNMENT_TITLE "
                + "FROM SUBMISSIONS S "
                + "JOIN ASSIGNMENTS A ON S.ASSIGNMENT_ID = A.ID "
                + "WHERE A.FACULTY_ID = ? "
                + "ORDER BY S.SUBMITTED_AT DESC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, facultyId);

            try (ResultSet rs = ps.executeQuery()) {

                while (rs.next()) {

                    Submission submission = new Submission();

                    submission.setId(rs.getInt("ID"));
                    submission.setAssignmentId(rs.getInt("ASSIGNMENT_ID"));
                    submission.setStudentId(rs.getInt("STUDENT_ID"));
                    submission.setSubmissionText(
                            rs.getString("SUBMISSION_TEXT"));
                    submission.setFilePath(
                            rs.getString("FILE_PATH"));

                    if (rs.getTimestamp("SUBMITTED_AT") != null) {
                        submission.setSubmittedAt(
                                rs.getTimestamp("SUBMITTED_AT")
                                  .toLocalDateTime());
                    }

                    submission.setStatus(rs.getString("STATUS"));
                    submission.setMarks(rs.getInt("MARKS"));
                    submission.setFeedback(rs.getString("FEEDBACK"));

                    submission.setAssignmentTitle(
                            rs.getString("ASSIGNMENT_TITLE"));

                    submissions.add(submission);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return submissions;
    }
    public boolean isSubmissionOwnedByFaculty(
            int submissionId,
            int facultyId) {

        String sql =
                "SELECT COUNT(*) "
              + "FROM SUBMISSIONS S "
              + "JOIN ASSIGNMENTS A "
              + "ON S.ASSIGNMENT_ID = A.ID "
              + "WHERE S.ID = ? "
              + "AND A.FACULTY_ID = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, submissionId);
            ps.setInt(2, facultyId);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {
                    return rs.getInt(1) > 0;
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}