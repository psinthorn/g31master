export class DataContext<T> {
  /*
  pgData?: PaginationData;
  references?: {[key: string]: any};
  actions?: Array<string>;
  links?: {[alias: string]: LinkData};
  metaActions?: MetaAction;
  searchable?: boolean;
  extra?: {[key: string]: any};
  */
  data: T;
  [prop: string]: any;
}
