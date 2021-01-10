import { Component, OnInit, ViewChild } from '@angular/core';
import {  } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../../models/employee';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material'
import * as _ from 'lodash';
import { EmployeeComponent } from '../employee/employee.component';
@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrls: ['./display-employees.component.css']
})
export class DisplayEmployeesComponent implements OnInit {
  dataSource: MatTableDataSource<Employee>;
  array: Employee[];
  searchkey: string;
  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }
  displayedColumns: string[] = ['$key', 'fname', 'lastName', 'age', 'salary', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.employeeService.getEmployeeList('').subscribe(element=> {
       this.array = element.map(item => {
        return {
          $key: item.id,
          fname: item.fname,
          lastName: item.lastName, age: item.age,
          salary: item.salary
        };
      });
      this.dataSource = new MatTableDataSource(this.array);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
    
  }
  onEdit(row) {
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh('');
    });
    
  }
  onSearchClear() {

    this.searchkey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchkey.trim().toLowerCase();
  }
  onCreate() {
    this.employeeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh('');
    });
    
  }
  refresh( val:string) {
    this.dataSource = new MatTableDataSource();
    this.employeeService.getEmployeeList(val).subscribe(element => {
     
      this.array = element.map(item => {
        return {
          $key: item.id,
          fname: item.fname,
          lastName: item.lastName, age: item.age,
          salary: item.salary
        };
      });
      this.dataSource = new MatTableDataSource(this.array);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
      }

  onDelete($key:number) {
    this.employeeService.deleteEmployee($key).subscribe(res => {
      if (res == true) {
        this.refresh('');
      }
    });
   
  }

  onSelect(val) {
 
    this.refresh(val);
  
  }
    
}
