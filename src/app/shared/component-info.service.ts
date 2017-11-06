import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// RxJS operators
import 'rxjs/add/operator/debounceTime';

export class ComponentInfo {
  label?: string;
  loading?: boolean;
  error?: any;
  enableSearchTerm: boolean;
  [prop: string]: any
};

export class ComponentInfoService {
  private _componentInfo: ComponentInfo;
  private componentInfoSubject: Subject<any>;
  private componentInfoTemp: object;

  constructor() {
    this._componentInfo = {
      loading: false,
      enableSearchTerm: false
    };

    this.componentInfoTemp = {};

    this.componentInfoSubject = new Subject();
    this.componentInfoSubject
      .asObservable()
      .debounceTime(10)
      .subscribe((values) => {
        Object.assign(this._componentInfo, values);
        this.componentInfoTemp = {};
      })
    ;
  }

  setValue(key: string|object, value?: any) {
    let values: object = {};
    if(typeof key === 'string'){
      values[key] = value;
    } else{
      values = key;
    }

    Object.assign(this.componentInfoTemp, values);
    this.componentInfoSubject.next(this.componentInfoTemp);
  }

  get componentInfo() { return this._componentInfo; }
}
