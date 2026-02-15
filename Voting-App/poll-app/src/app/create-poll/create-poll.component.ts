import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';

@Component({
    selector: 'app-create-poll',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-poll.component.html',
    styleUrl: './create-poll.component.css'
})
export class CreatePollComponent {
    question: string = '';
    options: string[] = ['', '']; // 初期状態で2つの入力欄

    @Output() pollCreated = new EventEmitter<void>();

    constructor(private pollService: PollService) { }

    addOption() {
        this.options.push('');
    }

    removeOption(index: number) {
        if (this.options.length > 2) {
            this.options.splice(index, 1);
        }
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    createPoll() {
        if (!this.question.trim() || this.options.some(opt => !opt.trim())) {
            alert('質問とすべての選択肢を入力してください。');
            return;
        }

        const newPoll: Poll = {
            question: this.question,
            options: this.options.map(opt => ({ voteOption: opt, voteCount: 0 }))
        };

        this.pollService.createPoll(newPoll).subscribe({
            next: () => {
                this.resetForm();
                this.pollCreated.emit(); // 親コンポーネントに通知
            },
            error: (err) => {
                console.error('Error creating poll details:', err);
                const statusMessage = err.status ? ` (Status: ${err.status})` : '';
                alert(`アンケートの作成に失敗しました。${statusMessage}\n詳細はブラウザのコンソール（F12）を確認してください。`);
            }
        });
    }

    resetForm() {
        this.question = '';
        this.options = ['', ''];
    }
}
