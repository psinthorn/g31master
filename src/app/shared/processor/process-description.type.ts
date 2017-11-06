export type ProcessDescription = {
  name?: string,
  icon?: string,
  label?: string,
  color?: string,
  action?: Function,
}

export const defaultProcessDescription: ProcessDescription = {icon: 'input'};
