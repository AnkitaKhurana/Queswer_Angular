import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { URLSearchParams } from "@angular/http";
import { map } from "rxjs/operators";
import { IQuestion } from "../shared/models/IQuestion";
import { Observable, BehaviorSubject } from "rxjs";
import { AuthService } from "../shared/services/auth.service";

const params: URLSearchParams = new URLSearchParams();

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  private questions = new BehaviorSubject<any>([]);
  questionsObservable = this.questions.asObservable();
  private totalQuestions = new BehaviorSubject<number>(1);
  totalQuestionsObservable = this.totalQuestions.asObservable();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  /// **********************************************************************
  //          Function to fetch all questions
  /// **********************************************************************
  getAll(pageNumber: number, searchString: string) {
    params.set("page", pageNumber.toString());
    params.set("searchString", searchString);
    return this.apiService.get("/question/all", params).pipe(
      map(data => {
        this.questions.next(data.json().questions);
        this.totalQuestions.next(data.json().totalQuestions);
      })
    );
  }

  /// **********************************************************************
  //          Function to add question
  /// **********************************************************************
  add(question: IQuestion): Observable<IQuestion> {
    let body = {
      Title: question.Title,
      Description: question.Description,
      Tags: question.Tags
    };
    return this.apiService.post("/question/add", body).pipe(
      map(data => {
        return data.json();
      })
    );
  }

  /// **********************************************************************
  //          Function to get specific Question
  /// **********************************************************************
  getQuestion(Id: string) {
    return this.apiService.get("/question/find/" + Id).pipe(
      map(data => {
        return data.json().question;
      })
    );
  }

  /// **********************************************************************
  //          Function to delete question
  /// **********************************************************************
  delete(Id: string): Observable<any> {
    return this.apiService.delete("/question/delete/" + Id).pipe(
      map(data => {
        return data.json();
      })
    );
  }

  /// **********************************************************************
  //          Function to edit question
  /// **********************************************************************
  edit(question: IQuestion, Id: string): Observable<IQuestion> {
    let body = {
      Title: question.Title.toString(),
      Description: question.Description.toString(),
      Tags: question.Tags
    };
    return this.apiService.put("/question/edit/" + Id, body).pipe(
      map(data => {
        return data.json().question;
      })
    );
  }

  /// **********************************************************************
  //          Function to fetch questions for Tag
  /// **********************************************************************
  tagSearch(Id: string) {
    return this.apiService.get("/tag/find/" + Id).pipe(
      map(data => {
        this.questions.next(data.json().Questions);
        this.totalQuestions.next(data.json().Questions.length);
      })
    );
  }

  /// **********************************************************************
  //          Function to fetch feed
  /// **********************************************************************
  getFeed() {
    return this.apiService.get("/follow/questions/").pipe(
      map(data => {
        this.questions.next(data.json());
      })
    );
  }
}
