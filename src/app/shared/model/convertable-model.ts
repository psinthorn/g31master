export type ConvertableModelType<T> = {
  convert(obj: any): T;
  new (...args): T;
};
