import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogService } from '../blog.service';
import { CreateBlogDto } from '../create-blog.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [BlogService],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css',
})
export class CreateBlogComponent {
  blogService = inject(BlogService);
  router = inject(Router);

  createBlogForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    content: new FormControl('', {
      validators: [Validators.required],
    }),
    image: new FormControl('', {}),
  });

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];

        this.createBlogForm.patchValue({
          image: base64,
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onCreateBlog() {
    if (this.createBlogForm.invalid) return;
    const { title, content, image } = this.createBlogForm.value;

    const createBlogDto: CreateBlogDto = {
      title: title!,
      image: image ? image : undefined,
      content: content!,
    };
    this.blogService.createBlog(createBlogDto).subscribe({
      next: () => {
        this.createBlogForm.reset();
        this.router.navigate(['home'])
        alert('blog created successfully!');
      },
      error: () => {
        alert('image too large');
      },
    });
    console.log(this.createBlogForm.controls.image);
  }
}
