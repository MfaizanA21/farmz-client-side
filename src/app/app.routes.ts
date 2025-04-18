import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home/home.component';
import { CreateBlogComponent } from './home/create-blog/create-blog.component';

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
        title: 'Create Blog'
    }
];
