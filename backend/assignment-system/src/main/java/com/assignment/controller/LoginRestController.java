package com.assignment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.model.User;
import com.assignment.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(
    origins = "http://localhost:5173",
    allowCredentials = "true"
)
public class LoginRestController {

    private final UserService userService = new UserService();

    @PostMapping("/api/login")
    public User login(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            HttpSession session) {

        User user = userService.login(email, password);

        if (user != null) {
            session.setAttribute("loggedInUser", user);
            return user;
        }

        return null;
    }
}