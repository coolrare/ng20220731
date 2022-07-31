import { BehaviorSubject, map, Observable, shareReplay, switchMap } from 'rxjs';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  displayArticles = false;
  articles: Article[] = [];

  refresh$ = new BehaviorSubject(null);

  mutipleRequests$ = this.refresh$.pipe(
    switchMap((data) =>
      this.postService
        .getArticles()
        .pipe(
          map(result => ({
            api1: data,
            api2: result
          }))
    ))
  );

  articles$: Observable<Article[]> = this.refresh$.pipe(
    switchMap(() => this.postService.getArticles()),
    map(result => result.articles),
    shareReplay(1)
  );


  constructor(private postService: PostService) { }

  ngOnInit(): void {

    // this.postService.getArticles().subscribe(result => {
    //   this.articles = result.articles;
    //   console.log(this.articles);
    // })

  }

  refresh(){
    this.refresh$.next(null);
  }

}
