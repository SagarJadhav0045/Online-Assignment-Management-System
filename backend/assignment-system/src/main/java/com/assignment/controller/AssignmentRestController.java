package com.assignment.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.model.Assignment;
import com.assignment.service.AssignmentService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class AssignmentRestController {
    private final AssignmentService assignmentService =
            new AssignmentService();

    @GetMapping("/assignments")
    public List<Assignment> getAssignments() {
        return assignmentService.getAllAssignments();
    }
}