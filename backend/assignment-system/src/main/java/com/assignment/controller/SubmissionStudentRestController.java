package com.assignment.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.model.Submission;
import com.assignment.model.User;
import com.assignment.service.SubmissionService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(
	    origins = {
	        "http://localhost:5173",
	        "http://localhost:5174"
	    },
	    allowCredentials = "true"
	)
@RestController
public class SubmissionStudentRestController {

    private final SubmissionService submissionService =
            new SubmissionService();

    @GetMapping("/api/my-submissions")
    public List<Submission> getMySubmissions(
            HttpSession session) {

        User user =
                (User) session.getAttribute("loggedInUser");
        
       

        if (user == null || !"STUDENT".equals(user.getRole())) {
            return List.of();
        }

        return submissionService.getSubmissionsByStudent(
                user.getId()
        );
    }
}