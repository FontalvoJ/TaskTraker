import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service'; 

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.css']
})
export class ListTeachersComponent implements OnInit {

  teachers: any[] = []; // Propiedad para almacenar los profesores

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
   
    const institutionId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    console.log('Institution ID:', institutionId); 
    console.log('Role:', role);

    if (institutionId && role === 'institution') {
      this.teacherService.getTeachersByInstitutionId(institutionId).subscribe(
        (res) => {
          if (res.success) {
            this.teachers = res.data;
          } else {
            console.error('Failed to fetch teachers');
          }
        },
        (error) => {
          console.error('Error fetching teachers:', error);
        }
      );
    } else {
      console.error('User is not an institution or institutionId is missing.');
    }
  }

  editTeacher(teacher: any) {
    // Placeholder for edit functionality
    console.log('Edit teacher:', teacher);
  }

  deleteTeacher(teacher: any) {
    // Placeholder for delete functionality
    console.log('Delete teacher:', teacher);
  }
}
