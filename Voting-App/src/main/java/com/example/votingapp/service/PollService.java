package com.example.votingapp.service;

import org.springframework.stereotype.Service;

import com.example.votingapp.model.Poll;
import com.example.votingapp.repository.PollRepository;

@Service
public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public java.util.List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }
}
