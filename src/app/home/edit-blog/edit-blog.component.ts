import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBlogModel } from '../../models/get-blogs.model';
import { EditBlogDto } from '../../models/edit-blog.model';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css',
})
export class EditBlogComponent {
  blog = signal<GetBlogModel | null>(null);
  private blogService = inject(BlogService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  editBlogForm: FormGroup | null = null;
  editBlogDto: EditBlogDto = { title: '', content: ''}

  constructor() {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const blogId = paramMap.get('id');
        console.log('param id:' + blogId);
        if (blogId) {
          const blog$ = this.blogService.getBlogById(blogId);
          blog$.subscribe({
            next: (blog) => {
              this.blog.set(blog);
              this.editBlogForm = new FormGroup({
                title: new FormControl(blog.title, {
                  validators: [Validators.required],
                }),
                content: new FormControl(blog.content, {
                  validators: [Validators.required],
                }),
              });
            },
            error: (error) => {
              console.error('Error fetching blog:', error);
            },
          });
        }
      },
    });
  }

  onUpdateBlog() {
    if (this.editBlogForm?.valid) {
      console.log('update button is clicked', this.editBlogForm.value);
      if ((this.editBlogForm.value.title === this.blog()?.title && this.editBlogForm.value.content === this.blog()?.content) || !this.blog()?.id) {
        console.log("values are the same!");
      } else {
        this.editBlogDto.title = this.editBlogForm.value.title;
        this.editBlogDto.content = this.editBlogForm.value.content;
          this.blogService.editBlog(this.blog()!.id, this.editBlogDto).subscribe({
            next: () => {
              alert('blog edited successfully!')
              this.router.navigate([`view-blog/${this.blog()?.id}`])
            },
            // error: () => {
            //   alert('asfbkjabf sdak;fsd');
            // }
          })
        console.log("values are different")
      }
    }
  }
}