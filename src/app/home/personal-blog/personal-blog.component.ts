import { AfterViewInit, Component, inject, Input, input } from '@angular/core';
import { GetBlogModel } from '../../models/get-blogs.model';
import { SlicePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './personal-blog.component.html',
  styleUrl: './personal-blog.component.css'
})
export class PersonalBlogComponent implements AfterViewInit{
  userBlogs = input<GetBlogModel[]>([])
  showBlogLoginMessage = input<boolean>(false);
  router = inject(Router)
  ngAfterViewInit(): void {
    console.log("after view" + this.userBlogs().length)
    console.log(this.showBlogLoginMessage())
  }
  onContainerClick(id: string) {
    console.log(`${id} blog clicked by user`)
    this.router.navigate([`view-blog/${id}`]);
  }
}
