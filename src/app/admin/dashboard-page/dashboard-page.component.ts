import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {IPost} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchPosts = '';

  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe((post) => {
      this.posts = post;
    });
  }

  remove(id: string) {
    this.dSub = this.postService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.alertService.danger('Пост был удален!');
    });

  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }


}
