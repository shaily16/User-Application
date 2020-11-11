import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../_services/student.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  studentId: any;
  subjectId: any;
  firstName: any;
  lastName: any;
  studentClass: any;
  subject: any;
  marks: any;
  editStudentForm: FormGroup;
  submitted = false;
  data: any;
  email: any;
  number: any;
  id:any;
  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    public _router: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.id = this._router.snapshot.paramMap.get("id");

    this.editStudentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', [Validators.required]],
    
    });

  
    this.sharedService.studentFirstName.subscribe(firstName => this.firstName = firstName);
    this.sharedService.studentLastName.subscribe(lastName => this.lastName = lastName);
    this.sharedService.studentEmail.subscribe(email => this.email = email);
    this.sharedService.number.subscribe(number => this.number = number);
   

    this.editStudentForm.patchValue({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      number: this.number
    });
  }

  get f() { return this.editStudentForm.controls; }

  onSubmit() {
    this.submitted = false;
    if (this.editStudentForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.data = this.editStudentForm.value;
      this.data['student_id'] = this.id
      console.log(this.data);
      this.studentService.updateStudent(this.data)
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
