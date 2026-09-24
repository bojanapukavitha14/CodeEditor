package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);
        savedUser.setPassword(null);

        return savedUser;
    }
    @PostMapping("/login")
public User login(@RequestBody User loginUser) {

    User user = userRepository.findByEmail(loginUser.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

    if (!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid email or password");
    }

    user.setPassword(null);

    return user;
}
}
