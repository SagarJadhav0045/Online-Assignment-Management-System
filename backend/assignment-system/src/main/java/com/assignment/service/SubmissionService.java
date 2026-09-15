package com.assignment.service;

import java.util.List;

import com.assignment.dao.SubmissionDAO;
import com.assignment.model.Submission;

public class SubmissionService {

    private final SubmissionDAO submissionDAO = new SubmissionDAO();

    public boolean saveSubmission(Submission submission) {
        return submissionDAO.saveSubmission(submission);
    }

    public List<Submission> getAllSubmissions() {
        return submissionDAO.getAllSubmissions();
    }
    
    public List<Submission> getSubmissionsByFaculty(int facultyId) {
        return submissionDAO.getSubmissionsByFaculty(facultyId);
    }
    
    public boolean isSubmissionOwnedByFaculty(
            int submissionId,
            int facultyId) {

        return submissionDAO.isSubmissionOwnedByFaculty(
                submissionId,
                facultyId);
    }
    public boolean evaluateSubmission(
            int submissionId,
            int marks,
            String feedback) {

        return submissionDAO.evaluateSubmission(
                submissionId,
                marks,
                feedback
        );
    }

    public List<Submission> getSubmissionsByStudent(int studentId) {

        return submissionDAO.getSubmissionsByStudent(studentId);
    }
}