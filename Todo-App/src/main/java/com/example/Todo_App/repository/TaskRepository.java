package com.example.Todo_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Todo_App.models.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
