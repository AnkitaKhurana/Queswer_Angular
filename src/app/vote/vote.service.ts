import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { IAnswer } from '../shared/models/IAnswer';
import { map } from 'rxjs/operators';
import { AnswerService } from '../answer/answer.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private apiService: ApiService, private answerService: AnswerService) { }

  /// **********************************************************************
  //          Function to upvote an answer
  /// **********************************************************************
  upvote(Id: string) {
    return this.apiService.get('/vote/upvote/' + Id);
  }

  /// **********************************************************************
  //          Function to downvote an answer
  /// **********************************************************************
  downvote(Id: string) {
    return this.apiService.get('/vote/downvote/' + Id);
  }


  /// **********************************************************************
  //          Function to unupvote an answer
  /// **********************************************************************
  unupvote(Id: string) {
    return this.apiService.delete('/vote/unupvote/' + Id);
  }

  /// **********************************************************************
  //          Function to undownvote an answer
  /// **********************************************************************
  undownvote(Id: string) {
    return this.apiService.delete('/vote/undownvote/' + Id);
  }

  /// **********************************************************************
  //          Function to delete an answer
  /// **********************************************************************
  delete(Id: string) {
    return this.apiService.delete('/answer/delete/' + Id);
  }

  /// **********************************************************************
  //          Function to edit an answer
  /// **********************************************************************
  edit(answer:IAnswer ) {
    return this.apiService.put('/answer/edit/' + answer.Id, answer).pipe(
      map(
      data => {
        this.answerService.getAnswers(data.json().QuestionId).subscribe();
        return data.json();
      }
    ))
  }
}
