import { getOperators, ColumnDataType, sortColumnArray, NumericOperators, StringOperators, BooleanOperators } from '../src/Models';
import { mockColumnModel} from './mock';

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

});