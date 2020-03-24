import { CompareOperators } from './Column';

export interface FilterWrapper {
    argument?: string[];
    operator: CompareOperators | string;
    text?: string;
    name?: string;
}
