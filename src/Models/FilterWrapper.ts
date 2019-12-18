import { CompareOperators } from './Column';

export interface FilterWrapper {
    argument: string[];
    hasFilter: boolean;
    operator: CompareOperators | string;
    text?: string;
    name?: string;
}
