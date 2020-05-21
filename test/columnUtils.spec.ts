import { getOperators, ColumnDataType, columnHasFilter, NumericOperators, StringOperators, BooleanOperators, CompareOperators, sortColumnArray } from '../src/Models';
import { simpleRequestWithFilters1, mockColumnModel} from './mock';

describe('getOperators', ()=>{
    it('Should return StringOperators', () => {
        expect(getOperators({...mockColumnModel, dataType: ColumnDataType.String })).toEqual(StringOperators);
    });

    it('Should return NumericOperators', () => {
        expect(getOperators({...mockColumnModel, dataType: ColumnDataType.Numeric })).toEqual(NumericOperators);
    });

    it('Should return BooleanOperators', () => {
        expect(getOperators({...mockColumnModel, dataType: ColumnDataType.Boolean })).toEqual(BooleanOperators);
    });

    it('Should return an empty array', () => {
        expect(getOperators({...mockColumnModel, dataType: null })).toEqual([]);
    });
});

describe('sortColumnArray', () => {
    it('Should returnundefined', () => {
        expect(sortColumnArray('OrderID', [], false)).toBeUndefined();
    });

    it('Should return columns ordered', () => {
        expect(sortColumnArray('OrderID', simpleRequestWithFilters1.columns, false)).not.toBeNull();
    });
});

describe('columnHasFilter', () => {
    it('Should return True if column has a filter', () => {
        expect(columnHasFilter({...mockColumnModel, filterOperator: CompareOperators.Equals })).toBeTruthy();
    });
});