import { ColumnDataType, createColumn, getCsv, formatDate, getColumnAlign, parsePayload, getHtml } from '../src';
import { mockColumnModel } from './mock';

//started
describe('getCsv', () => {
    
    it('parsePayload should return an empty string', ()=>
    {
        expect(parsePayload(mockColumnModel, [mockColumnModel])).toBeTruthy();
    });

    it('formatDate should return', ()=>
    {
        expect(formatDate('')).toBe('');
    });

    it('formatDate should return m/d/yyy', ()=>
    {
        expect(formatDate('2010-01-01T06:00:00.000Z')).toBe('1/1/2010');
    });

    it('getColumnAlign should return center', ()=> {
        expect(getColumnAlign(mockColumnModel)).toBe('center');
    });

    it('getColumnAlign should return right', ()=> {
        expect(getColumnAlign({...mockColumnModel, dataType: ColumnDataType.Numeric})).toBe('right');
    });

    it('getColumnAlign should return inherit', ()=> {
        expect(getColumnAlign({...mockColumnModel, dataType: ColumnDataType.String})).toBe('inherit');
    });

    it('should not return undefined if a column is not visible', () => {
        const columns = [
            createColumn('first', {
                label: 'first column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('second', {
                label: 'second column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('hidden', {
                label: 'hidden column',
                visible: false,
                dataType: ColumnDataType.String,
            }),
        ];

        const data = [
            {
                first: 'first value 1!',
                second: 'second value 1!',
                hidden: 'hidden value 1!',
            },
            {
                first: 'first value 2!',
                second: 'second value 2!',
                hidden: 'hidden value 2!',
            },
            {
                first: 'first value 3!',
                second: 'second value 3!',
                hidden: 'hidden value 3!',
            },
        ] as any;

        const output = getCsv(data, columns);

        expect(output).toEqual(
            'first column,second column\nfirst value 1!,second value 1!\nfirst value 2!,second value 2!\nfirst value 3!,second value 3!\n',
        );
    });

    it('getHtml', () => {
        const columns = [
            createColumn('first', {
                label: 'first column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('second', {
                label: 'second column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('hidden', {
                label: 'hidden column',
                visible: false,
                dataType: ColumnDataType.String,
            }),
        ];

        const data = [
            {
                first: 'first value 1!',
                second: 'second value 1!',
                hidden: 'hidden value 1!',
            },
            {
                first: 'first value 2!',
                second: 'second value 2!',
                hidden: 'hidden value 2!',
            },
            {
                first: 'first value 3!',
                second: 'second value 3!',
                hidden: 'hidden value 3!',
            },
        ] as any;

        const output = getHtml(data, columns);

        expect(output).toEqual(
            '<table class=\"table table-bordered table-striped\"><thead><tr><th>first column</th><th>second column</th></tr></thead><tbody><tr><td>first value 1!</td><td>second value 1!</td></tr><tr><td>first value 2!</td><td>second value 2!</td></tr><tr><td>first value 3!</td><td>second value 3!</td></tr></tbody></table>',
        );
    });
});
