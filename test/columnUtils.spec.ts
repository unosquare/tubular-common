import { getOperators, ColumnDataType, sortColumnArray } from '../src/Models';
import { mockStringOperators, mockBooleanOperators, mockColumnModel, mockNumericOperators } from './mock';

describe('getOperators', ()=>{
    it('Should return StringOperators', () => {
        expect(getOperators({...mockColumnModel, dataType: ColumnDataType.String })).toEqual(mockStringOperators);
    });

    it('Should return NumericOperators', () => {
        expect(getOperators({...mockColumnModel, dataType: ColumnDataType.Numeric })).toEqual(mockNumericOperators);
    });

    it('Should return BooleanOperators', () => {
        expect(getOperators({...mockColumnModel, dataType: ColumnDataType.Boolean })).toEqual(mockBooleanOperators);
    });

    it('Should return an empty array', () => {
        expect(getOperators({...mockColumnModel, dataType: null })).toEqual([]);
    });
});

describe('sortColumnArray', () => {
    
});