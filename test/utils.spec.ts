import { ColumnDataType, createColumn, getCsv } from '../src';
//started
describe('getCsv', () => {
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
});
