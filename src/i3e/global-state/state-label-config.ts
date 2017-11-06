export abstract class StateLabelConfig {
  readonly for: {readonly [name: string]: (data: any) => string};
}
