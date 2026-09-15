package com.assignment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.model.User;
import com.assignment.service.UserService;

@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://localhost:5174"
    }
)
@RestController
public class RegistrationRestController {

    private final UserService userService =
            new UserService();

    @PostMapping("/api/register")
    public String registerUser(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("role") String role) {
    		
    	String passwordPattern =
    	        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&*!]).{8,}$";

    	if (!password.matches(passwordPattern)) {
    	    return "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character";
    	}
    	
        if (userService.emailExists(email)) {
            return "Email already registered";
        }

        if (!"STUDENT".equals(role) &&
            !"FACULTY".equals(role)) {
            return "Invalid role";
        }

        User user = new User();

        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);

        boolean registered =
                userService.registerUser(user);

        if (registered) {
            return "Account created successfully";
        }

        return "Account creation failed";
    }
}