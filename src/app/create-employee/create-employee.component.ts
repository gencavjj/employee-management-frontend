import { EmployeeService } from '../employee-service/employee.service';
import { Employee } from '../employee-model/employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: false,
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeService,
    private router: Router) {}

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    // The "Note" input binds a single string to employee.notes, but the backend's
    // EmployeeDTO declares notes as List<String>. Normalize to an array before POST
    // so Jackson can deserialize it.
    const rawNotes = this.employee.notes as unknown as string | string[];
    const payload: Employee = {
      ...this.employee,
      notes: Array.isArray(rawNotes) ? rawNotes : (rawNotes ? [rawNotes] : [])
    };

    this.employeeService.createEmployee(payload)
      .subscribe({
        next: (data) => this.employee = data as Employee,
        error: (error) => console.log(error)
      });
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}