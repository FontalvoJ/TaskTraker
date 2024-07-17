import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private URL = 'https://api-node-tasktraker.onrender.com/api';

  constructor( 
    private http: HttpClient,
    private router:Router) { }

    getTeachersByInstitutionId(id_institution: string): Observable<any> {
      return this.http.get<any>(`${this.URL}/teachers/institution/${id_institution}`);
    }
}
