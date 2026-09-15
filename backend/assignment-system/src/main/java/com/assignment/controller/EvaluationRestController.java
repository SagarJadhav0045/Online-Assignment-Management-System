package com.assignment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.model.User;
import com.assignment.service.SubmissionService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(
	    origins = "http://localhost:5173",
	    allowCredentials = "true"
	)
@RestController
public class EvaluationRestController {

    private final SubmissionService submissionService =
            new SubmissionService();

    @PostMapping("/api/evaluate")
    public String evaluateSubmission(
            @RequestParam("submissionId") int submissionId,
            @RequestParam("marks") int marks,
            @RequestParam("feedback") String feedback,
            HttpSession session) {

        if (marks < 0 || marks > 100) {
            return "Marks must be between 0 and 100";
        }
        User user = (User) session.getAttribute("loggedInUser");

        if (user == null || !"FACULTY".equals(user.getRole())) {
            return "Unauthorized";
        }
        if (!submissionService.isSubmissionOwnedByFaculty(
                submissionId, user.getId())) {
            return "Unauthorized";
        }
        
        boolean evaluated =
                submissionService.evaluateSubmission(
                        submissionId,
                        marks,
                        feedback);

        if (evaluated) {
            return "Submission evaluated successfully";
        }

        return "Evaluation failed";
    }
}