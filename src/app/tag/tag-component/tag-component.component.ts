import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { ITag } from 'src/app/shared/models/ITag';
import { QuestionService } from 'src/app/question/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-component',
  templateUrl: './tag-component.component.html',
  styleUrls: ['./tag-component.component.css']
})
export class TagComponent implements OnInit {

  tags: Array<ITag>;
  constructor(private tagService: TagService, private questionService: QuestionService, private router: Router) { }
  ngOnInit() {
    this.tagService.get().subscribe(data => { this.tags = data; });
  }
  search(Id: string) {
    this.router.navigateByUrl('/home').then(() => {
      this.questionService.tagSearch(Id).subscribe();
    });
  }

}
