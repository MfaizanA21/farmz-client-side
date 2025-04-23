import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BlogService } from '../blog.service';
import { GetBlogModel } from '../../models/get-blogs.model';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-other-blog',
  standalone: true,
  imports: [ConfirmationModalComponent],
  templateUrl: './blog-view.component.html',
  styleUrl: './blog-view.component.css',
})
export class BlogViewComponent implements OnInit, AfterViewInit {
  blog: GetBlogModel | null = null;
  private activateRoute = inject(ActivatedRoute);
  private blogsService = inject(BlogService);
  showEditButtons = signal(false);
  userId = signal('');
  showModal = signal(false);
  router = inject(Router);

  constructor() {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId.set(decoded.userId);
    }
  }
  ngAfterViewInit(): void {
    if (this.userId() && this.blog && this.blog.userId === this.userId()) {
      this.showEditButtons.set(true);
    }
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe({
      next: (paramMap) => {
        const blogId = paramMap.get('id');
        console.log('param id:' + blogId);
        if (blogId) {
          const blog$ = this.blogsService.getBlogById(blogId);
          blog$.subscribe({
            next: (blog) => {
              this.blog = blog;
              this.checkIfEditAllowed();
            },
          });
        }
      },
    });
  }

  onEditClick() {
    console.log('Edit button is clicked');
  }

  onDeleteClick() {
    console.log('Delete clicked!');
    this.showModal.set(true);
  }

  onDeleteConfirmed(confirm: boolean) {
    if (confirm && this.blog?.id) {
      console.log('Deleting blog with ID: ', this.blog.id);
      this.blogsService.deleteBlog(this.blog.id).subscribe({
        next: () => {
          console.log('Blog deleted successfully!');
          this.router.navigate(['home']);
          alert('Blog Deleted Successfully');
        },
        error: (err) => {
          console.error('Failed to delete the blog:', err);
        },
      });
    } else if (!confirm) {
      this.showModal.set(false);
    }
  }

  checkIfEditAllowed(): void {
    if (this.userId() && this.blog && this.blog.userId === this.userId()) {
      this.showEditButtons.set(true);
      // this.changeDetector.detectChanges();
    }
  }
}
