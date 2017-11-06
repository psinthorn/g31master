export abstract class DataList {
  abstract itemProcess(params: any[], extra?: {[key: string]: any});

  static isValid(obj: any): obj is DataList {
    return obj && (typeof obj.itemProcess === 'function');
  }
}
