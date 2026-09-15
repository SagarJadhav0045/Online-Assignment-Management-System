package com.assignment.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.assignment.config.PasswordConfig;
import com.assignment.model.User;

public class UserDAO {
	
	private final BCryptPasswordEncoder passwordEncoder =
	        PasswordConfig.passwordEncoder();
	
    // Get all users
    public List<User> getAllUsers() {

        List<User> users = new ArrayList<>();

        String sql = "SELECT ID, NAME, EMAIL, PASSWORD, ROLE, CREATED_AT FROM USERS";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                User user = new User();

                user.setId(rs.getInt("ID"));
                user.setName(rs.getString("NAME"));
                user.setEmail(rs.getString("EMAIL"));
                user.setPassword(rs.getString("PASSWORD"));
                user.setRole(rs.getString("ROLE"));

                if (rs.getTimestamp("CREATED_AT") != null) {
                    user.setCreatedAt(
                        rs.getTimestamp("CREATED_AT").toLocalDateTime()
                    );
                }

                users.add(user);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return users;
    }

    // Login user
    public User login(String email, String password) {

        User user = null;

        String sql = "SELECT ID, NAME, EMAIL, PASSWORD, ROLE, CREATED_AT "
                   + "FROM USERS "
                   + "WHERE EMAIL = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, email);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {

                    String storedPassword = rs.getString("PASSWORD");

                    boolean passwordMatches =
                            passwordEncoder.matches(password, storedPassword);

                    if (passwordMatches) {

                        user = new User();

                        user.setId(rs.getInt("ID"));
                        user.setName(rs.getString("NAME"));
                        user.setEmail(rs.getString("EMAIL"));
                        user.setPassword(storedPassword);
                        user.setRole(rs.getString("ROLE"));

                        if (rs.getTimestamp("CREATED_AT") != null) {
                            user.setCreatedAt(
                                rs.getTimestamp("CREATED_AT")
                                  .toLocalDateTime()
                            );
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return user;
    }
    public boolean registerUser(User user) {

        String sql = "INSERT INTO USERS "
                   + "(NAME, EMAIL, PASSWORD, ROLE, CREATED_AT) "
                   + "VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            ps.setString(4, user.getRole());

            int rows = ps.executeUpdate();

            return rows > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public boolean emailExists(String email) {

        String sql = "SELECT COUNT(*) FROM USERS WHERE EMAIL = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, email);

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