import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private router = inject(Router)
  onCreateBlog() {
    console.log("Create Blog Button Clicked")
    this.router.navigate(['create-blog'])
  } 
}
