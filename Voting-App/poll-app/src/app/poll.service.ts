import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from './poll.models';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private apiUrl = 'http://localhost:8080/api/polls';

  constructor(private http: HttpClient) { }

  createPoll(poll: Poll): Observable<Poll> {
    return this.http.post<Poll>(this.apiUrl, poll);
  }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.apiUrl);
  }

  vote(pollId: number, optionIndex: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/vote`, { pollId, optionIndex });
  }

}
