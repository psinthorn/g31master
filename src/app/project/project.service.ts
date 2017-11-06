import { DataService } from '@i3e/data-service';

import { Project } from './model';

export abstract class ProjectService
extends DataService<Project, Project, Project[], any, any> { }
