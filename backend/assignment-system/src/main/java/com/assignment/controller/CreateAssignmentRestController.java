package com.assignment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.model.Assignment;
import com.assignment.model.User;
import com.assignment.service.AssignmentService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(
    origins = "http://localhost:5173",
    allowCredentials = "true"
)
@RestController
public class CreateAssignmentRestController {

    private final AssignmentService assignmentService =
            new AssignmentService();

    @PostMapping("/api/assignments")
    public String createAssignment(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("subject") String subject,
            @RequestParam("dueDate") String dueDate,
            HttpSession session) {

        Assignment assignment = new Assignment();

        assignment.setTitle(title);
        assignment.setDescription(description);
        assignment.setSubject(subject);
        assignment.setDueDate(
                java.time.LocalDate.parse(dueDate)
        );
        User user = (User) session.getAttribute("loggedInUser");

        if (user == null || !"FACULTY".equals(user.getRole())) {
            return "Unauthorized";
        }

        assignment.setFacultyId(user.getId());

        boolean created =
                assignmentService.createAssignment(assignment);

        if (created) {
            return "Assignment created successfully";
        }

        return "Assignment creation failed";
    }
}