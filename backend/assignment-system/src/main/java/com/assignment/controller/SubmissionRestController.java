package com.assignment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.model.Submission;
import com.assignment.model.User;
import com.assignment.service.SubmissionService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(
    origins = "http://localhost:5173",
    allowCredentials = "true"
)
@RestController
public class SubmissionRestController {

    private final SubmissionService submissionService =
            new SubmissionService();

    @PostMapping("/api/submissions")
    public String submitAssignment(
            @RequestParam("assignmentId") int assignmentId,
            @RequestParam("submissionText") String submissionText,
            HttpSession session) {

        User user =
                (User) session.getAttribute("loggedInUser");

        if (user == null || !"STUDENT".equals(user.getRole())) {
            return "Unauthorized";
        }

        Submission submission = new Submission();

        submission.setAssignmentId(assignmentId);
        submission.setStudentId(user.getId());
        submission.setSubmissionText(submissionText);

        boolean saved =
                submissionService.saveSubmission(submission);

        if (saved) {
            return "Assignment submitted successfully";
        }

        return "Assignment submission failed";
    }
}