import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  userId = signal('');
  userBlogs = signal<any[]>([]);
  showMessage = signal(false);
  private router = inject(Router);
  private blogService = inject(BlogService);

  constructor() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const decoded: any = jwtDecode(accessToken);
      this.userId.set(decoded.userId);
    }
  }
  ngOnInit(): void {
    this.getUserBlogs();
  }
  onCreateBlog() {
    if (!this.userId()) {
      this.showMessage.set(true);
      setTimeout(() => this.router.navigate(['']), 3000);
    } else {
      this.router.navigate(['create-blog']);
    }
  }
  getUserBlogs() {
   const res = this.blogService.getUserBlogs(this.userId()).subscribe({
      next: (response) => {
        console.log(response);
        this.userBlogs.set(Array.isArray(response) ? response : []);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
