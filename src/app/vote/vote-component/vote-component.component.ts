import { Component, OnInit, Input } from "@angular/core";
import { IAnswer } from "src/app/shared/models/IAnswer";
import { VoteService } from "../vote.service";
import { IUser } from "src/app/shared/models/IUser";
import { AuthService } from "src/app/shared/services/auth.service";
import { AnswerService } from "src/app/answer/answer.service";

@Component({
  selector: "app-vote-component",
  templateUrl: "./vote-component.component.html",
  styleUrls: ["./vote-component.component.css"]
})
export class VoteComponent implements OnInit {

  constructor(private voteService: VoteService, private authService: AuthService, private answerSerice: AnswerService) {
    this.isMyAnswer = false;
    this.user = this.authService.user;
  }

  @Input() answer: IAnswer;
  @Input() Id: string;
  user: IUser;
  isMyAnswer: boolean;

  ngOnInit() { }

  ngOnChanges() {
    if (this.user)
      if (this.user.Id == this.answer.AuthorId) {
        this.isMyAnswer = true;
      }
  }

  upvote() {
    this.voteService.upvote(this.answer.Id).subscribe(data => {
      if (this.answer.Downvoted == false) {
      } else {
        this.answer.DownvoteCount--;
        this.answer.Downvoted = false;
      }
      this.answer.UpvoteCount++;
      this.answer.Upvoted = true;
    });
  }

  downvote() {
    this.voteService.downvote(this.answer.Id).subscribe(data => {
      if (this.answer.Upvoted == false) {
      } else {
        this.answer.UpvoteCount--;
        this.answer.Upvoted = false;
      }
      this.answer.DownvoteCount++;
      this.answer.Downvoted = true;
    });
  }

  unupvote() {
    this.voteService.unupvote(this.answer.Id).subscribe(data => {
      this.answer.UpvoteCount--;
      this.answer.Upvoted = false;
    });
  }

  undownvote() {
    this.voteService.undownvote(this.answer.Id).subscribe(data => {
      this.answer.DownvoteCount--;
      this.answer.Downvoted = false;
    });
  }

  deleteAnswer() {
    this.voteService.delete(this.answer.Id).subscribe(data => {
      this.answerSerice.getAnswers(this.Id).subscribe();
    });
  }

  editAnswer() {
    let voteService = this.voteService;
    let answerService = this.answerSerice;
    let answer = this.answer;
    let id = this.Id;
    document.getElementById('answerBody').style.display = 'none';
    let inputBox = document.createElement('input');
    inputBox.value = this.answer.Body;
    let editButton = document.createElement('button');
    var t = document.createTextNode("Edit");
    editButton.appendChild(t);
    editButton.onclick = function () {
      answer.Body = inputBox.value;
      voteService.edit(answer).subscribe();
    };
    document.getElementById('answerBodyBox').appendChild(inputBox);
    document.getElementById('answerBodyBox').appendChild(editButton);
  }
}
