import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
})
export class PollComponent implements OnInit {
  polls: Poll[] = [];
  loading = true;
  error: string | null = null;
  initialized = false;

  constructor(private pollService: PollService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.loading = true;
    this.error = null;
    console.log("Starting to load polls from API...");
    this.pollService.getPolls().subscribe({
      next: (data) => {
        console.log("Successfully loaded polls:", data);
        this.polls = data;
        this.loading = false;
        this.initialized = true;
        this.cdr.detectChanges(); // 画面更新を強制
      },
      error: (error) => {
        console.error("Error loading polls:", error);
        this.error = "アンケートデータの取得に失敗しました。詳細についてはブラウザのコンソール（F12）を確認してください。";
        this.loading = false;
        this.initialized = true;
        this.cdr.detectChanges(); // 画面更新を強制
      }
    });
  }

  vote(pollId: number | undefined, optionIndex: number) {
    if (pollId === undefined) {
      console.warn("Cannot vote: pollId is undefined");
      return;
    }
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        this.loadPolls(); // 投票後に一覧を更新
      },
      error: (error) => {
        console.error("Error voting", error);
      }
    });
  }

  getPercentage(poll: Poll, voteCount: number): number {
    const totalVotes = poll.options.reduce((acc, opt) => acc + opt.voteCount, 0);
    if (totalVotes === 0) return 0;
    return (voteCount / totalVotes) * 100;
  }
}
