import { PaginationData } from './pagination-data';
import { LinkData } from './link-data';

export class MetaAction {[action: string]: {[prop: string]: any}};

export const DEFAULT_META_ACTION: MetaAction = {
  '*': { icon: 'input' },
  add: { icon: 'add', color: 'primary', label: 'Add' },
  edit: { icon: 'edit', color: 'primary', label: 'Edit' },
  delete: { icon: 'delete_forever', color: 'warn', label: 'Delete' },
  print: { icon: 'print', color: 'primay', label: 'Print' },
  replace: { icon: 'edit', color: 'warn', label: 'Replace' },
  cancel: { icon: 'delete_forever', color: 'warn', label: 'Cancel' },

  save: { icon: 'save', color: 'primary', label: 'Save' }
};

export abstract class MetaDataBase<T> {
  pgData?: PaginationData;
  references?: {[key: string]: any};
  actions?: Array<string>;
  links?: {[alias: string]: LinkData};
  metaActions?: MetaAction;
  searchable?: boolean;
  extra?: {[key: string]: any};
  data: T;
}

export function extractMetaAction(
  action: string, metaData: MetaDataBase<any>
): {[prop: string]: any} {
  let meta = Object.assign({}, DEFAULT_META_ACTION['*']);
  if(typeof DEFAULT_META_ACTION[action] !== 'undefined'){
    Object.assign(meta, DEFAULT_META_ACTION[action]);
  }
  if(metaData && metaData.metaActions
    && (typeof metaData.metaActions[action] !== 'undefined')){
    Object.assign(meta, metaData.metaActions[action]);
  }

  return meta;
}
