import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    status: string;
   
  populateForm(employee) {
    this.employeeForm.setValue(employee);
    }
  employeeForm = new FormGroup({
    $key: new FormControl(null),
    lastName: new FormControl('', Validators.required),
    fname: new FormControl('', Validators.required),
    age: new FormControl(null, [Validators.required, Validators.min(16)]),
    salary: new FormControl(null, Validators.required),
  });
  
  constructor(private http: HttpClient) { }
   

  initializeFormGroup() {
    this.employeeForm.setValue({
      $key: null,
      lastName:'',
      fname: '',
      age: null, 
      salary: null
    });
    }

  getEmployeeList(creteria:string): Observable<Employee[]> {
    return new Observable(observer => {
      this.http.get<Employee[]>('http://localhost:8080/employees?param=' + creteria)
        .subscribe(data => {
          if (data) {
            observer.next(data)
        
          }
          else {
            observer.error(" la liste des salariés est momentanement indisponible !! ")
          }
          observer.complete;
        });
    });
  }

  saveEmployee(employee: Employee): Observable<Employee>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(employee);
   
    return this.http.post<Employee>('http://localhost:8080/employees', body, httpOptions);
  }

  updateEmployee(employee: Employee): Observable<Employee> { 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(employee);
    return new Observable(observer => {
      this.http.put<Employee>('http://localhost:8080/employees/' + employee.id, body, httpOptions)
        .subscribe(data => {
        if (data) {
          observer.next(data)
        }
        else {
          observer.error(" employee non créer !! ")
        }
        observer.complete;
      }); });
  }

  deleteEmployee(key: number) {
    return this.http.delete<Employee>('http://localhost:8080/employees/' + key);
  }
}
