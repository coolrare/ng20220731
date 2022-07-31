import { Observable, map, switchMap } from 'rxjs';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // article?: Article;

  article$: Observable<Article> = this.route.paramMap.pipe(
    map(params => params.get('id') || ''),
    switchMap(id => this.postService.getArticle(id)),
    map(result => result.article)
  );

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {

    console.log('Post Component');

    console.log('snapshot: ' + this.route.snapshot.paramMap.get('id'));

    this.route.paramMap.subscribe(params => {
      console.log(params.get('id') || '');
      // const id = params.get('id') || '';
      // this.postService.getArticle(id).subscribe(result => {
      //   this.article = result.article;
      // });
    });
  }

}
