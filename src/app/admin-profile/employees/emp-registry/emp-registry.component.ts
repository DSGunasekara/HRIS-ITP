import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'service/employees.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-emp-registry',
  templateUrl: './emp-registry.component.html',
  styleUrls: ['./emp-registry.component.css']
})
export class EmpRegistryComponent implements OnInit, OnDestroy {
  employees: Employees[] = [];
  private subscription: Subscription;
  designation: string;
  isLoading = false;

  constructor(private router: Router, private employeeService: EmployeeService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.isLoading=true;
    this.route.params.subscribe((params: Params) => {
      this.designation = params['designation'];
      this.employees = this.employeeService.getEmployeeByDesignation(this.designation);
      this.subscription = this.employeeService.employeesChanged.subscribe(
        (employees: Employees[]) => {
          this.employees = employees;
          this.isLoading = false;
        }
      );
    });
  }

  onDelete(id: string){
    this.employeeService.deleteEmployee(id);
    window.location.reload();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
