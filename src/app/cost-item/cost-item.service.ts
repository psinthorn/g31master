import { DataService } from '@i3e/data-service';

import { CostItem } from './model';

export abstract class CostItemService
extends DataService<CostItem, CostItem, CostItem[], any, any> { }
