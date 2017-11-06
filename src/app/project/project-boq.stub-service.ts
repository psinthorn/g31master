import { Injectable } from '@angular/core';
import {
  Http,
  Response, Headers, RequestOptions, RequestOptionsArgs,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { DataService } from '@i3e/data-service';
import { DataContext } from '@i3e/model';
import { DataLoader } from '@i3e/data-loader';

import { csProjectItemLoader } from './provider';

import {
  ServerResolverService,
  ConvertableModelType,
} from '@consol/shared';

import { Project, ProjectBoq } from './model';

import { ProjectBoqService } from './project-boq.service';

// Stub Data
import { DataStubNewService } from '@consol/shared/data-stub.new-service';

@Injectable()
export class ProjectBoqStubService extends DataStubNewService<ProjectBoq>
implements ProjectBoqService {
  protected static get serviceName() { return 'project_boq'; }
  protected static get modelType() { return ProjectBoq as ConvertableModelType<ProjectBoq>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
    private projectLoader: DataLoader<Project>,
  ) {
    super(http, sr);
  }

  get(id: number): Observable<ProjectBoq> {
    if(!id) {
      // TODO: must call this.projectLoader.data$ first
      return super.get(id).switchMap((projectBoq) => {
        return this.projectLoader.data$.map((project) => {
          projectBoq.project = project;

          return projectBoq;
        });
      });
    }

    return super.get(id);
  }

  getAll(itemQuery?: {[prop: string]: any}): Observable<ProjectBoq[]> {
    // TODO: must call this.projectLoader.data$ first
    return super.getAll(itemQuery).switchMap((projectBoqs) => {
      return this.projectLoader.data$.map((project) => {
        if(!project) return [];
        const result = projectBoqs.filter((data) => data.project.id == project.id);

        return result;
      });
    });
  }

  save(id: number, data: ProjectBoq): Observable<any> {
    return this.projectLoader.data$.switchMap((project) => {
      data.project = project;

      return super.save(id, data);
    });
  }
}
