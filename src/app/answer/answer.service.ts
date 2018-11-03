import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private apiService: ApiService) { }
  private answers = new BehaviorSubject<any>([]);
  answersObservable = this.answers.asObservable();

  /// **********************************************************************
  //          Function to get all comments 
  /// **********************************************************************
  getAnswers(Id: string) {
    this.answers.next([]);
    return this.apiService.get('/answer/all/' + Id ).pipe(
      map(
        data => {
          this.answers.next(data.json());
          return data.json();
        }
      )
    )
  }


  /// **********************************************************************
  //          Function to add new answer 
  /// **********************************************************************
  add(myAnswer: string, Id: string) {
    let answer = {
      "Body": myAnswer
    }
    return this.apiService.post('/answer/add/' + Id , answer).pipe(map(
      data => {
        this.getAnswers(Id).subscribe();
        return data.json();
      }
    ))
  }
}
