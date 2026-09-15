package com.assignment.service;

import java.util.List;

import com.assignment.dao.AssignmentDAO;
import com.assignment.model.Assignment;

public class AssignmentService {

    private final AssignmentDAO assignmentDAO = new AssignmentDAO();

    public List<Assignment> getAllAssignments() {
        return assignmentDAO.getAllAssignments();
    }

    public boolean createAssignment(Assignment assignment) {
        return assignmentDAO.createAssignment(assignment);
    }
    public boolean assignmentExists(int assignmentId) {
        return assignmentDAO.assignmentExists(assignmentId);
    }
}