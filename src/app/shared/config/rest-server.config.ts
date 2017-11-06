export class RestIndividualServerConfig{
  host: string;
  port?: number;
  path: string;
}

export class RestServerConfig{
  default: RestIndividualServerConfig;
  specifics?: {[prop: string]: RestIndividualServerConfig};
}
