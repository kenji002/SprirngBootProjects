import { Component, signal, ViewChild } from '@angular/core';
import { PollComponent } from './poll/poll.component';
import { CreatePollComponent } from './create-poll/create-poll.component';

@Component({
  selector: 'app-root',
  imports: [PollComponent, CreatePollComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('poll-app');

  @ViewChild(PollComponent) pollComponent!: PollComponent;

  onPollCreated() {
    if (this.pollComponent) {
      this.pollComponent.loadPolls();
    }
  }
}
