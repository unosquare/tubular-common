import { ColumnDataType, createColumn, getCsv } from '../src';

describe('getCsv', () => {
    it('should not return undefined if a column is not visible', () => {
        const columns = [
            createColumn('test', {
                label: 'test column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('broken', {
                label: 'broken column',
                visible: false,
                dataType: ColumnDataType.String,
            }),
        ];

        const data = [
            {
                test: 'test value!',
                broken: 'broken value!',
            },
            {
                test: 'test value 2!',
                broken: 'broken value 2!',
            },
        ] as any;

        const output = getCsv(data, columns);

        expect(output).toEqual('test column\ntest value!\ntest value 2!\n');
    });
});
