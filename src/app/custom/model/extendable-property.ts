export abstract class ExtendableProperty {
  dtype: string;

  static isValid(obj: any): obj is ExtendableProperty {
    return typeof obj.dtype !== 'undefined';
  }
}
