package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already registered"));
        }

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("message", "Registration successful")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userRepository.findByEmail(email)
                .orElse(null);
        System.out.println("LOGIN EMAIL: [" + email + "]");
System.out.println("ENTERED PASSWORD: [" + password + "]");

if (user != null) {
    System.out.println("DB PASSWORD: [" + user.getPassword() + "]");
}

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "User not found"));
        }

        if (!user.getPassword().equals(password)) {
    return ResponseEntity.badRequest()
            .body(Map.of("message", "Invalid password"));
}

        return ResponseEntity.ok(
                Map.of(
                        "message", "Login successful",
                        "name", user.getName(),
                        "email", user.getEmail()
                )
        );
    }
}