export class CostItemTypeRef {
  id: string;
  code: string;
  name: string;

  static convert(obj: any): CostItemTypeRef {
    if(obj && !(obj instanceof CostItemTypeRef)) {
      Object.setPrototypeOf(obj, CostItemTypeRef.prototype);
    }

    return obj;
  }
}
