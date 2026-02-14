package com.example.votingapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.votingapp.model.OptionVote;
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

    public Optional<Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionIndex) {
        // データベースから投票を取得
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll not found"));
        // 全てのオプションを取得
        List<OptionVote> options = poll.getOptions();
        // インデックスが範囲内かチェック
        if (optionIndex < 0 || optionIndex >= options.size()) {
            throw new RuntimeException("Invalid option index");
        }
        // 投票オプションを選択
        OptionVote selectedOption = options.get(optionIndex);
        // 投票オプションの投票数をインクリメント
        selectedOption.setVoteCount(selectedOption.getVoteCount() + 1);
        // データベースに投票を保存
        pollRepository.save(poll);
    }
}
