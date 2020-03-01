import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IPost} from '../shared/interfaces';
import {PostService} from '../shared/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<IPost[]>;

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit() {
    this.posts$ = this.postService.getAll();
  }

}
