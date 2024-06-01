import { Component } from '@angular/core';
import { PostService } from '../post/post.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = {
    email: '',
    password: ''
  }


  constructor(private PostService: PostService, private router: Router) { }

  onSubmit() {
    this.PostService.login(this.form.email, this.form.password)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            alert('User not found. Please check your credentials.');
          } else {
            alert('An unexpected error occurred. Please try again later.');
          }
          return throwError(error); 
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res.user === true) {
          alert('Welcome To Party Management System');
          this.router.navigate(['post/index']);
        } else if (res.user === false) {
          alert(res.msg);
        }
        const token = res.token || '';
        window.sessionStorage.setItem('Token', token);
        
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + res.token);
        this.PostService.setHeaders(headers);
      });
  }

}
