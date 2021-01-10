import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import {
  MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatDialogModule, MatSelectModule,
  MatInputModule, MatGridListModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { DisplayEmployeesComponent } from './views/display-employees/display-employees.component';

import {  HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './views/employee/employee.component'
import { EmployeeService } from './services/employee.service';
@NgModule({
  declarations: [
    AppComponent,
    DisplayEmployeesComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, MatIconModule, ReactiveFormsModule, FormsModule, MatGridListModule, MatToolbarModule,
    AppRoutingModule, BrowserAnimationsModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatDialogModule, MatSelectModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent]                                       
})
export class AppModule { }
