import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_CREDENCIAIS = 'https://api-node-tasktraker.onrender.com/api/auth';

  
  constructor(
    private http: HttpClient,
    private router:Router) { 
  
  }


  //Register Institution
  signUp(user: { email: string; password: string; }) {
    return this.http.post<any>(this.URL_CREDENCIAIS + '/signup', user);
  }

  //Register Teacher
  signUpTeacher(user: { email: string; password: string; }) {
    return this.http.post<any>(this.URL_CREDENCIAIS + '/signupTeacher', user);
  }

  //Register Student
  signUpStudent(user: { email: string; password: string; }) {
    return this.http.post<any>(this.URL_CREDENCIAIS + '/signupStudent', user);
  }
  
  signIn(user: { email: string; password: string; }) {
    return this.http.post<any>(this.URL_CREDENCIAIS + '/signin', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  
  getToken() {
    return localStorage.getItem('token');
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home', { skipLocationChange: true });
  }

}

