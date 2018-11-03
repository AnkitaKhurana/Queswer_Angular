import { Component, OnInit, Input } from "@angular/core";
import { IAnswer } from "src/app/shared/models/IAnswer";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-answer",
  templateUrl: "./answer-component.component.html",
  styleUrls: ["./answer-component.component.css"]
})
export class AnswerComponent implements OnInit {
  constructor(private authService: AuthService) {
    this.isMyAnswer = false;
  }
  @Input() answer: IAnswer;
  @Input() Id: string;
  isMyAnswer: boolean;
  ngOnInit() {
    if (this.authService.user)
      if (this.answer.Author.Id == this.authService.user.Id) {
        this.isMyAnswer = true;
      }
  }
  ngOnChanges() {
    if (this.authService.user)
      if (this.answer.Author.Id == this.authService.user.Id) {
        this.isMyAnswer = true;
      }
  }


}
