import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { StudentService } from '../_services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  addStudentForm: FormGroup;
  subjectDetails: FormArray;
  submitted = false;
  data: any;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addStudentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', [Validators.required]]
    });
  }

  get f() { return this.addStudentForm.controls; }

 

  

  onSubmit() {
    this.submitted = false;
    if (this.addStudentForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.data = this.addStudentForm.value;
      console.log(this.data);
      this.studentService.saveStudent(this.data)
        .subscribe(response => {
          console.log(response);
          alert(response.message);
          if (response.status === 'success' && response.code === 200) {
            this.router.navigate(['student-list']);
          }
        });
    }
  }

}
