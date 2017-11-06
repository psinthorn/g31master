export function capitalize(text: string) {
  if(!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function isObjectEqual(obj1: any, obj2: any) {
  if(obj1 === obj2) return true;

  if(!obj1 || !obj2 ) return false;

  if((typeof obj1 === 'object') && (typeof obj2 === 'object')){
    if(obj1.constructor === obj2.constructor) {
      if(obj1['id'] || obj2['id']) return obj1['id'] == obj2['id'];

      const obj1Keys = Object.keys(obj1);
      if(obj1Keys.length !== Object.keys(obj2).length) return false;

      for(let key of obj1Keys) {
        if(!isObjectEqual(obj1[key], obj2[key])) return false;
      }

      return true;
    } else return false;
  }

  return false;
}

export function booleanAttribute(value) {
  return (value === '') || !!value;
}
