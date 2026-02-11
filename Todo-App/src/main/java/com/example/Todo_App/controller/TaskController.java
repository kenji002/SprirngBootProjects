package com.example.Todo_App.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.Todo_App.Service.TaskService;
import com.example.Todo_App.models.Task;

@Controller
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public String getTasks(Model model) {
        List<Task> tasks = taskService.getAllTasks();
        model.addAttribute("tasks", tasks);
        return "index";
    }

    @PostMapping
    public String createTask(@RequestParam("title") String title) {
        taskService.createTask(title);
        return "redirect:/tasks";
    }

    @GetMapping("/{id}")
    public String getTask(@PathVariable Long id, Model model) {
        Task task = taskService.getTaskById(id);
        model.addAttribute("task", task);
        return "index";
    }

    @GetMapping("{id}/delete")
    public String deleteTask(@PathVariable("id") Long id) {
        taskService.deleteTask(id);
        return "redirect:/tasks";
    }

    @GetMapping("/{id}/update")
    public String updateTask(@PathVariable("id") Long id, @RequestParam("title") String title) {
        taskService.updateTask(id, title);
        return "redirect:/tasks";
    }

    @GetMapping("{id}/toggle")
    public String toggleTask(@PathVariable("id") Long id) {
        taskService.toggleTask(id);
        return "redirect:/tasks";
    }

}
