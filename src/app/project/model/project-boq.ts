import { ExtendableProperty } from '@consol/custom';

import { Project } from './project';

export class ProjectBoqBudgetType {
  id: string;
  code: string;
  name: string;

  static convert(obj: any): ProjectBoqBudgetType {
    if(obj && !(obj instanceof ProjectBoqBudgetType)) {
      Object.setPrototypeOf(obj, ProjectBoqBudgetType.prototype);
    }

    return obj;
  }
}

export class ProjectBoqDataBudget {
  id: string;
  boqData: ProjectBoqData;             // passive linked
  boqBudgetType: ProjectBoqBudgetType; // passive linked
  budget: number;

  static convert(obj: any): ProjectBoqDataBudget {
    if(obj && !(obj instanceof ProjectBoqDataBudget)) {
      Object.setPrototypeOf(obj, ProjectBoqDataBudget.prototype);
      ProjectBoqData.convert(obj.boqData);
      ProjectBoqBudgetType.convert(obj.boqBudgetType);
    }

    return obj;
  }
}

export class ProjectBoqData implements ExtendableProperty {
  id: string;
  dtype: string;
  name: string;
  parent: ProjectBoqData;                         // passive linked
  children: ProjectBoqData[];
  budgets: {[key: string]: ProjectBoqDataBudget};

  static convert(obj: any): ProjectBoqData {
    if(obj && !(obj instanceof ProjectBoqData)) {
      Object.setPrototypeOf(obj, ProjectBoqData.prototype);
      ProjectBoqData.convert(obj.parent);
      (obj.children || []).forEach((data) => ProjectBoqData.convert(data));
      Object.keys(obj.budgets || {}).forEach((key) => ProjectBoqDataBudget.convert(obj.budgets[key]));
    }

    return obj;
  }
}

export class ProjectBoq extends ProjectBoqData {
  project: Project;                    // passive linked
  budgetTypes: ProjectBoqBudgetType[];

  static convert(obj: any): ProjectBoq {
    if(obj && !(obj instanceof ProjectBoq)){
      Object.setPrototypeOf(ProjectBoqData.convert(obj), ProjectBoq.prototype);
      Project.convert(obj.project);
      (obj.budgetTypes || []).forEach((data) => ProjectBoqBudgetType.convert(data));
    }

    return obj;
  }
}
