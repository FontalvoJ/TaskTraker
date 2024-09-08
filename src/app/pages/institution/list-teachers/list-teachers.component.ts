import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userRole: string = '';
  showModal: boolean = false;
  teacherToDelete: string = '';
  

  constructor(private teacherService: TeacherService, private router: Router) { }

  ngOnInit() {
    this.loadTeachers();
    this.userRole = localStorage.getItem('role') || '';
  }

  loadTeachers() {
    const institutionId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (institutionId && (role === 'institution' || role === 'admin')) {
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
    this.currentPage = 1;
    this.updatePaginatedTeachers();
  }

  confirmDeleteTeacher(teacherId: string) {
    this.teacherToDelete = teacherId;
    this.showModal = true;
  }

  deleteTeacher() {
    if (this.teacherToDelete) {
      this.teacherService.deleteTeacherById(this.teacherToDelete).subscribe(
        (response) => {
          console.log('Teacher deleted successfully', response);
          this.loadTeachers();
          this.showModal = false;
        },
        (error) => {
          console.error('Error deleting teacher', error);
          if (error.status === 403) {
            alert('You do not have permission to delete this teacher.');
          } else if (error.status === 404) {
            alert('Teacher not found for deletion.');
          } else {
            alert('Error deleting teacher. Please try again later.');
          }
          this.showModal = false;
        }
      );
    }
  }

  cancelDelete() {
    this.showModal = false;
  }
}
