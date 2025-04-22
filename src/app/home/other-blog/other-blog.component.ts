import { Component, inject, input, OnInit, signal } from '@angular/core';
import { BlogService } from '../blog.service';
import { GetBlogModel } from '../../models/get-blogs.model';

@Component({
  selector: 'app-other-blog',
  standalone: true,
  imports: [],
  templateUrl: './other-blog.component.html',
  styleUrl: './other-blog.component.css'
})
export class OtherBlogComponent implements OnInit{
  ngOnInit() {
    this.getOtherBlogs()
  }
  private blogService = inject(BlogService);
  otherBlogs = signal<GetBlogModel[]>([]);

  userId = input<string>('');

  getOtherBlogs() {
    this.blogService.getOtherBlogs(this.userId()).subscribe({
      next: (response) => {
        this.otherBlogs.set(Array.isArray(response) ? response : []);
        console.log(this.otherBlogs());
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
