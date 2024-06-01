import { Component } from '@angular/core';
import { PostService } from '../post/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    public postService: PostService,
    private router: Router
  ) { }

  LogOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
