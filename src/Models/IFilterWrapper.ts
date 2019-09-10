import { CompareOperators } from './Column';

export interface IFilterWrapper {
    Argument: string[];
    HasFilter: boolean;
    Operator: CompareOperators;
    Text: string;
}
