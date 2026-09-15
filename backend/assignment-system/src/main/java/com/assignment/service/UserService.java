package com.assignment.service;

import java.util.List;

import com.assignment.config.PasswordConfig;
import com.assignment.dao.UserDAO;
import com.assignment.model.User;

public class UserService {

    private final UserDAO userDAO = new UserDAO();

    // Get all users
    public List<User> getAllUsers() {

        return userDAO.getAllUsers();
    }

    // Login user
    public User login(String email, String password) {

        return userDAO.login(email, password);
    }
    
    public boolean emailExists(String email) {

        return userDAO.emailExists(email);

    }
    public boolean registerUser(User user) {

        String encryptedPassword =
                PasswordConfig.passwordEncoder()
                             .encode(user.getPassword());

        user.setPassword(encryptedPassword);

        return userDAO.registerUser(user);
    }
}