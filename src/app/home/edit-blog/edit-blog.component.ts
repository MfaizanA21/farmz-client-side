import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css',
})
export class EditBlogComponent {
  onUpdateBlog() {
    throw new Error('Method not implemented.');
  }
  editBlogForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    content: new FormControl('', {
      validators: [Validators.required],
    }),
  });
}
