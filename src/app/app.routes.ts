import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home/home.component';
import { CreateBlogComponent } from './home/create-blog/create-blog.component';
import { authGuard } from './auth.guard';
import { BlogViewComponent } from './home/blog-view/blog-view.component';
import { EditBlogComponent } from './home/edit-blog/edit-blog.component';

export const routes: Routes = [
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Signup'
    },
    {
        path: '',
        component: SigninComponent,
        title: 'Signin'
    }, 
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'create-blog',
        component: CreateBlogComponent,
        title: 'Create Blog',
        canActivate: [authGuard]
    },
    {
        path:'view-blog/:id',
        component: BlogViewComponent,
        title: 'Blog View'
    },
    {
        path:'edit-blog/:id',
        component: EditBlogComponent,
        title: 'Edit Blog'
    }

];
