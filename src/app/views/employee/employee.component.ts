import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { MatDialogRef } from '@angular/material'
import { log } from 'util';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  constructor(public service: EmployeeService, public dialogRef: MatDialogRef<EmployeeComponent>) { }

  ngOnInit(): void {
  
  }
  addEmployee() {
    if (this.service.employeeForm.valid) {
      this.getValues();
      this.upadateOrCreateEmployee();
      this.service.employeeForm.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }

    
  }
    upadateOrCreateEmployee() {
      if (this.employee.id == null) {
       
        this.service.saveEmployee(this.employee).subscribe(res => {
          if (res) {
            this.employee = res;
          }
          else {
            this.employee = new Employee();
          }
        });
      } else {
        this.service.updateEmployee(this.employee).subscribe(res => {
          if (res) {
            this.employee = res;
          }
          else {
            this.employee = new Employee();
          }
        });
      }
    }
    
  onClear() {

    this.service.employeeForm.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
  onClose() {
    this.service.employeeForm.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
  getValues() {

    this.employee = new Employee(this.service.employeeForm.value['$key'], this.service.employeeForm.value['fname'],
      this.service.employeeForm.value['lastName'].toUpperCase(), this.service.employeeForm.value['age'], this.service.employeeForm.value['salary']);
  }

}
