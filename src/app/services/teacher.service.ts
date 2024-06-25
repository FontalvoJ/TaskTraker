import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private URL = 'https://api-node-tasktraker.onrender.com/api';

  constructor( 
    private http: HttpClient,
    private router:Router) { }
}
