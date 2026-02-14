package com.example.votingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.votingapp.model.Poll;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {

}
