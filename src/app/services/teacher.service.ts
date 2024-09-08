import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private URL = 'https://api-node-tasktraker.onrender.com/api';

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getTeachersByInstitutionId(id_institution: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/teachers/institution/${id_institution}`);
  }

  deleteTeacherById(teacherId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token || ''
    });

    return this.http.delete<any>(`${this.URL}/teachers/${teacherId}`, { headers });
  }

  updateTeacherById(teacherId: string, updateData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token || ''
    });

    return this.http.put<any>(`${this.URL}/teachers/${teacherId}`, updateData, { headers });
  }
}
