package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Project;
import com.example.demo.entity.User;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectController(ProjectRepository projectRepository,
                             UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // Save a new project
    @PostMapping("/save")
    public ResponseEntity<?> saveProject(@RequestBody Project project) {

        if (project.getUser() == null || project.getUser().getId() == null) {
            return ResponseEntity.badRequest()
                    .body("User ID is required");
        }

        Long userId = project.getUser().getId();

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("User not found");
        }

        project.setUser(user);

        Project savedProject = projectRepository.save(project);

        return ResponseEntity.ok(savedProject);
    }

    // Get all projects of a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Project>> getUserProjects(
            @PathVariable Long userId) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(projectRepository.findByUser(user));
    }

    // Get a project by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(@PathVariable Long id) {

        Project project = projectRepository.findById(id).orElse(null);

        if (project == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(project);
    }

    // Delete a project
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {

        if (!projectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projectRepository.deleteById(id);

        return ResponseEntity.ok("Project deleted successfully");
    }
}