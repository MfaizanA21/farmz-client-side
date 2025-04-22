import { Component, inject, OnInit, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BlogService } from '../blog.service';
import { GetBlogModel } from '../../models/get-blogs.model';
import { PersonalBlogComponent } from '../personal-blog/personal-blog.component';
import { OtherBlogComponent } from '../other-blog/other-blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PersonalBlogComponent, OtherBlogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private blogService = inject(BlogService);

  userId = signal('');
  userBlogs = signal<GetBlogModel[]>([]);
  otherBlogs = signal<GetBlogModel[]>([]);
  showMessage = signal(false);
  showLoginButton = signal(false);
  showBlogsMessage = signal<boolean>(false);

  constructor() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const decoded: any = jwtDecode(accessToken);
      this.userId.set(decoded.userId);
    } else {
      this.showLoginButton.set(true);
      this.showBlogsMessage.set(true);
    }
  }

  ngOnInit(): void {
    if (!this.showLoginButton()) {
      this.getUserBlogs();
    }
  }
  
  onCreateBlog() {
    if (!this.userId()) {
      this.showMessage.set(true);
      setTimeout(() => this.showMessage.set(false), 3000);
    } else {
      this.router.navigate(['create-blog']);
    }
  }

  onLogout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']);
  }

  onLoginClicked() {
    this.router.navigate(['']);
  }

  getOtherBlogs() {
    this.blogService.getOtherBlogs(this.userId()).subscribe({
      next: (response) => {
        this.otherBlogs.set(Array.isArray(response) ? response : []);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserBlogs() {
    const res = this.blogService.getUserBlogs(this.userId()).subscribe({
      next: (response) => {
        console.log(response.length);
        this.userBlogs.set(Array.isArray(response) ? response : []);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
