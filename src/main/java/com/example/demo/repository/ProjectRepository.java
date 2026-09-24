package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Project;
import com.example.demo.entity.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUser(User user);

}