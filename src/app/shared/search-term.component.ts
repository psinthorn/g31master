import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'search-term',
  templateUrl: './search-term.component.html',
  styleUrls: [ './search-term.component.less' ]
})
export class SearchTermComponent
  implements OnInit {
  public form: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      term: ['']
    });

    this._route.queryParams
      .subscribe((params) => {
        this.form.controls['term'].setValue(params['term'] || null);
      })
    ;
  }

  doSearch() {
    try{
      console.debug('search term:', this.form.value.term);
      let term: string = this.form.value.term;
      let queryParams: Params = {};
      Object.assign(queryParams, this._route.snapshot.queryParams);
      queryParams['term'] = (term)? term : null;
      if(typeof queryParams['page'] !== 'undefined') delete queryParams['page'];

      this._router.navigate([], {
        queryParams: queryParams,
        replaceUrl: true
      });
    } catch(excp){
console.debug('error on search from term:', excp);
    }
  }

  clearSearch() {
    try{
      this.form.controls['term'].setValue(null);
      this.doSearch();
    } catch(excp){
console.debug('error on clear term:', excp);
    }
  }
}
