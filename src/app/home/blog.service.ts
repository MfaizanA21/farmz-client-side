import { HttpClient } from '@angular/common/http';
import { contentChild, inject, Injectable } from '@angular/core';
import { CreateBlogDto } from './create-blog.dto';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  httptClient = inject(HttpClient);

  createBlog(createBlogDto: CreateBlogDto ) {
    const dateToday = new Date(Date.now());
    const formattedDate = dateToday.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return this.httptClient.post('http://localhost:3000/blog/create-blog', {
        title: createBlogDto.title,
        content: createBlogDto.content,
        image: createBlogDto.image,
        datePosted: formattedDate
    }).pipe (catchError((error) => {
        return throwError(() => new Error(error))
    }))
  }
}
