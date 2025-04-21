import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CreateBlogDto } from './create-blog.dto'; // Adjust path as needed

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blog';

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  createBlog(createBlogDto: CreateBlogDto, userId: string) {
    const dateToday = new Date();
    const formattedDate = dateToday.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return this.httpClient
      .post(
        `${this.apiUrl}/create-blog`,
        {
          title: createBlogDto.title,
          content: createBlogDto.content,
          image: createBlogDto.image,
          datePosted: formattedDate,
          userId: userId,
        },
        { headers: this.getAuthHeaders() }
      )
      .pipe(
        catchError((error) => {
          console.error('Error creating blog:', error);
          return throwError(
            () => new Error('Failed to create blog: ' + error.message)
          );
        })
      );
  }

  getUserBlogs(userId: string) {
    return this.httpClient
      .get(
        `${this.apiUrl}/get-blogs-for-user`, {
          headers: this.getAuthHeaders(),
          params: { userId },
        })
      .pipe(
        catchError((error) => {
          console.error('Error fetching blogs:', error);
          return throwError(
            () => new Error('Failed to fetch blogs: ' + error.message)
          );
        })
      );
  }
}
