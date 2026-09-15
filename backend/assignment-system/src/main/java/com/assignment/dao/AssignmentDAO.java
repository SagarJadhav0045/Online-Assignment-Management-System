package com.assignment.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.assignment.model.Assignment;

public class AssignmentDAO {

    // Get all assignments
    public List<Assignment> getAllAssignments() {

        List<Assignment> assignments = new ArrayList<>();

        String sql = "SELECT ID, TITLE, DESCRIPTION, SUBJECT, "
                   + "DUE_DATE, FACULTY_ID, CREATED_AT "
                   + "FROM ASSIGNMENTS "
                   + "ORDER BY DUE_DATE";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Assignment assignment = new Assignment();

                assignment.setId(rs.getInt("ID"));
                assignment.setTitle(rs.getString("TITLE"));
                assignment.setDescription(rs.getString("DESCRIPTION"));
                assignment.setSubject(rs.getString("SUBJECT"));

                if (rs.getDate("DUE_DATE") != null) {
                    assignment.setDueDate(
                        rs.getDate("DUE_DATE").toLocalDate()
                    );
                }

                assignment.setFacultyId(rs.getInt("FACULTY_ID"));

                if (rs.getTimestamp("CREATED_AT") != null) {
                    assignment.setCreatedAt(
                        rs.getTimestamp("CREATED_AT").toLocalDateTime()
                    );
                }

                assignments.add(assignment);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return assignments;
    }
    
    public boolean createAssignment(Assignment assignment) {

        String sql = "INSERT INTO ASSIGNMENTS "
                   + "(TITLE, DESCRIPTION, SUBJECT, DUE_DATE, FACULTY_ID) "
                   + "VALUES (?, ?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, assignment.getTitle());
            ps.setString(2, assignment.getDescription());
            ps.setString(3, assignment.getSubject());

            ps.setDate(4, java.sql.Date.valueOf(assignment.getDueDate()));

            ps.setInt(5, assignment.getFacultyId());

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
    public boolean assignmentExists(int assignmentId) {

        String sql = "SELECT COUNT(*) FROM ASSIGNMENTS WHERE ID = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, assignmentId);

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