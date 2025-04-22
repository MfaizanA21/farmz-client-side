import { AfterViewInit, Component, Input, input } from '@angular/core';
import { GetBlogModel } from '../../models/get-blogs.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './personal-blog.component.html',
  styleUrl: './personal-blog.component.css'
})
export class PersonalBlogComponent implements AfterViewInit{
  // @Input({ required: true }) userBlogs!: GetBlogModel[];
  userBlogs = input<GetBlogModel[]>([])
  showBlogMessage = input<boolean>(false);
  // blogsMessage = input<boolean>(false);
  ngAfterViewInit(): void {
    console.log("after view" + this.userBlogs().length)
    console.log(this.showBlogMessage())
  }

}
