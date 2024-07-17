import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service'; 

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.css']
})
export class ListTeachersComponent implements OnInit {

  teachers: any[] = [];
  paginatedTeachers: any[] = []; 
  filteredTeachers: any[] = [];
  currentPage: number = 1; 
  itemsPerPage: number = 5;  
  searchTerm: string = '';

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
            this.filteredTeachers = [...this.teachers];
            this.updatePaginatedTeachers(); 
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

  updatePaginatedTeachers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTeachers = this.filteredTeachers.slice(startIndex, endIndex);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTeachers();
    }
  }

  goToNextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredTeachers.length) {
      this.currentPage++;
      this.updatePaginatedTeachers();
    }
  }

  applySearch() {
    this.filteredTeachers = this.teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reiniciar la página actual al realizar una búsqueda
    this.updatePaginatedTeachers();
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
