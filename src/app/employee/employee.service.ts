import { DataService } from '@i3e/data-service';

import { Employee } from './model';

export abstract class EmployeeService
extends DataService<Employee, Employee, Employee[], any, any> { }
