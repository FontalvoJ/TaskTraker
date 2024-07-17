import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private URL = 'https://api-node-tasktraker.onrender.com/api';

  constructor( 
    private http: HttpClient,
    private router:Router) { }

    getAllInstitutions(): Observable<any> {
      return this.http.get(`${this.URL}/institutions`);
    }
}