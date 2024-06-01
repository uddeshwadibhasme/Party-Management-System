import { Injectable } from '@angular/core';
import { PostService } from '././post/post.service'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private postService: PostService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = this.postService.getHeaders();
    console.log('Headers:', headers.keys()); // Log the header keys
    const modifiedRequest = request.clone({ headers });
    return next.handle(modifiedRequest);
  }
}
