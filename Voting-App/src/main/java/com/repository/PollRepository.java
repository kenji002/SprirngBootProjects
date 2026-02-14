package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Poll;

public interface PollRepository extends JpaRepository<Poll, Long> {

}
