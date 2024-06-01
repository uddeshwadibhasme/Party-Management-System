import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import {HeaderComponent } from '../../header/header.component'
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [FormsModule,HeaderComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  id!: number;
  post!: Post;
  data: any; 
  
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
        
    this.postService.find(this.id).subscribe((data: Post)=>{
      this.data = data;
    });
  }

}
