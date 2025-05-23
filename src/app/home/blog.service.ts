import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CreateBlogDto } from './create-blog.dto'; // Adjust path as needed
import { GetBlogModel } from '../models/get-blogs.model';
import { EditBlogDto } from '../models/edit-blog.model';

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
      .get<GetBlogModel[]>(`${this.apiUrl}/get-blogs-for-user`, {
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

  getBlogById(id: string) {
    return this.httpClient
      .get<GetBlogModel>(`${this.apiUrl}/get-blog`, {
        params: { id },
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching blogs:', error);
          return throwError(
            () => new Error('Failed to fetch details: ' + error.message)
          );
        })
      );
  }

  getOtherBlogs(userId: string) {
    return this.httpClient
      .get<GetBlogModel[]>(`${this.apiUrl}/get-all-blogs`, {
        // headers: this.getAuthHeaders(),
        params: { userId },
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching blogs: ', error);
          return throwError(
            () => new Error('Failed to fetch blogs: ' + error.message)
          );
        })
      );
  }

  deleteBlog(id: string) {
    return this.httpClient
      .delete<string>(`${this.apiUrl}/delete-blog/${id}`, {
        headers: this.getAuthHeaders(),
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

  editBlog(id: string, editBlogDto: EditBlogDto) {
    return this.httpClient
      .patch<string>(
        `${this.apiUrl}/edit-blog/${id}`, // Correctly sending id in the URL path
        { title: editBlogDto.title, content: editBlogDto.content },
        {
          headers: this.getAuthHeaders(),
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status !== 200) {
            return throwError(() => new Error('Failed to update blog: ' + error.message));
          } else {
            // If response is 200 but you want to handle it in a specific way, you can throw an error here manually if needed
            return throwError(() => new Error('Unexpected error occurred.'));
          }}
      ))
  }
}
