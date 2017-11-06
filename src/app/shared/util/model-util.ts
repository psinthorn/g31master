export type ModelValueProperty = [any] | [any, any];

export function modelBuilder(target: any, properties: {[key: string]: ModelValueProperty}) {
  Object.keys(properties).forEach((key) => {
    let property = properties[key];
    if(property.length == 1) {
      target[key] = property[0]
    } else {
      if(typeof property[0] !== 'undefined') {
        this[key] = property[0];
      } else {
        this[key] = property[1];
      }
    }
  });
}
