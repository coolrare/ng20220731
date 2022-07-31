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

  article?: Article;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      this.postService.getArticle(id).subscribe(result => {
        this.article = result.article;
      });
    });
  }

}
