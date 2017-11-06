import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PaginationData } from './model';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.less' ]
})
export class PaginationComponent {
  @Input('pgData') private _pgData: PaginationData;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._pgData = null;
  }

  getQueryParams(page: number): any {
    let queryParams: Params = {};
    page = this.getValidPage(page);
    Object.assign(queryParams, this._route.snapshot.queryParams);
    if(page <= 1) delete queryParams['page'];
    else queryParams['page'] = page;

    return queryParams;
  }

  getCurrentPage(): number {
    let currentPage: number = +this._route.snapshot.queryParams['page'];
    if(!(currentPage >= 1)) currentPage = 1;

    return currentPage;
  }

  getMaxPage(): number {
    let maxPage = 1;
    if(this._pgData.itemPerPage && this._pgData.total){
      maxPage = Math.ceil(this._pgData.total / this._pgData.itemPerPage);
    } else if(this._pgData.hasNext){
      maxPage = this.offset(1);
    }

    return maxPage;
  }

  getValidPage(page: number): number {
    let maxPage: number = this.getMaxPage();
    if(page < 1) page = 1;
    if(page > maxPage) page = maxPage;

    return page;
  }

  getPreviousQueryParams() {
    return this.getQueryParams(this.offset(-1));
  }

  getNextQueryParams() {
    return this.getQueryParams(this.offset(+1));
  }

  pageDisplay(): string {
    let display = `${ this.getCurrentPage() }`;
    if(this._pgData.itemPerPage && this._pgData.total){
      display = `${ display }/${ Math.ceil(this._pgData.total / this._pgData.itemPerPage) }`
    }

    return display;
  }

  offset(offset: number): number {
    let currentPage: number = this.getCurrentPage();
    currentPage += offset;

    return currentPage;
  }

  pageAllowed(page: number): boolean {
    return page === this.getValidPage(page);
  }

  previous(replace?: boolean): void {
    this.goto(this.offset(-1), replace);
  }

  next(replace?: boolean): void {
    this.goto(this.offset(+1), replace);
  }

  goto(page: number, replace?: boolean): void {
    this._router.navigate([], {
      queryParams: this.getQueryParams(page),
      replaceUrl: !!replace
    });
  }
}
