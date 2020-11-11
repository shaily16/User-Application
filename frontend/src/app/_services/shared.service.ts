import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private studentFirstNameSource = new BehaviorSubject('');
  private studentLastNameSource = new BehaviorSubject('');
  private studentEmailSource = new BehaviorSubject('');
  private NumberSource = new BehaviorSubject('');
  private marksSource = new BehaviorSubject('');
  
  studentFirstName = this.studentFirstNameSource.asObservable();
  studentLastName = this.studentLastNameSource.asObservable();
  studentEmail = this.studentEmailSource.asObservable();
  number = this.NumberSource.asObservable();
  marks = this.marksSource.asObservable();
  
  constructor() { }

  setstudentFirstName(firstName: any) {
    this.studentFirstNameSource.next(firstName);
  }

  setstudentLastName(lastName: any) {
    this.studentLastNameSource.next(lastName);
  }

 


  setstudentEmail(studentEmail: any) {
    this.studentEmailSource.next(studentEmail);
  }

  setNumber(number: any) {
    this.NumberSource.next(number);
  }

 
}
