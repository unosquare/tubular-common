/**
 * @jest-environment jsdom
 */

import { ColumnDataType, createColumn, getCsv, getColumnAlign, getHtml, getPages } from '../src';
import { mockColumnModel } from './mock';

describe('getColumnAlign', () => {
    it('getColumnAlign should return center', () => expect(getColumnAlign(mockColumnModel)).toBe('center'));

    it('getColumnAlign should return right', () =>
        expect(getColumnAlign({ ...mockColumnModel, dataType: ColumnDataType.Numeric })).toBe('right'));

    it('getColumnAlign should return inherit', () =>
        expect(getColumnAlign({ ...mockColumnModel, dataType: ColumnDataType.String })).toBe('inherit'));
});

describe('getCsv', () => {
    it('should export dates properly', () => {
        const columns = [
            createColumn('first', {
                label: 'first column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('date', {
                label: 'date column',
                visible: true,
                dataType: ColumnDataType.Date,
            }),
            createColumn('datenullable', {
                label: 'date nullable column',
                visible: true,
                dataType: ColumnDataType.Date,
            }),
            createColumn('datetime', {
                label: 'datetime',
                visible: true,
                dataType: ColumnDataType.DateTime,
            }),
            createColumn('datetimeutc', {
                label: 'datetime utc',
                visible: true,
                dataType: ColumnDataType.DateTime,
            }),
        ];

        const data = [
            {
                first: '1',
                date: '2020-09-29T19:00:00.00',
                datenullable: null,
                datetime: '2020-09-29T19:00:58.31',
                datetimeutc: '2020-09-29T19:00:58.31',
            },
        ] as any;

        const output = getCsv(data, columns);

        expect(output).toContain('"1","2020-09-29","","2020-09-29T19:00:58","2020-09-29T19:00:58"');
    });

    it('should export dates properly with custom format', () => {
        const columns = [
            createColumn('first', {
                label: 'first column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('date', {
                label: 'date column',
                visible: true,
                dataType: ColumnDataType.Date,
                dateDisplayFormat: 'MM DD - YYYY',
            }),
            createColumn('datetime', {
                label: 'datetime',
                visible: true,
                dataType: ColumnDataType.DateTime,
                dateTimeDisplayFormat: 'MM DD - YYYY',
            }),
            createColumn('datetimeutc', {
                label: 'datetime utc',
                visible: true,
                dataType: ColumnDataType.DateTime,
                dateTimeDisplayFormat: 'MM DD - YYYY',
            }),
        ];

        const data = [
            {
                first: '1',
                date: '2020-09-29T19:00:00.00',
                datetime: '2020-09-29T19:00:58.31',
                datetimeutc: '2020-09-30T19:00:58.31',
            },
        ] as any;

        const output = getCsv(data, columns);
        expect(output).toContain('"1","09 29 - 2020","09 29 - 2020","09 30 - 2020"');
    });

    it('should export only exportable columns', () => {
        const columns = [
            createColumn('first', {
                label: 'first column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('second', {
                label: 'second "column"',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('hidden', {
                label: 'hidden column',
                visible: false,
                dataType: ColumnDataType.String,
            }),
            createColumn('actions', {
                label: 'non exportable',
                visible: true,
                exportable: false,
                dataType: ColumnDataType.String,
            }),
        ];

        const data = [
            {
                first: 'first value| 1!',
                second: 'second value 1!',
                hidden: 'hidden value 1!',
                actions: 'hidden value 1!',
            },
            {
                first: 'first value 2!',
                second: 'second value 2!',
                hidden: 'hidden value 2!',
                actions: 'hidden value 2!',
            },
            {
                first: 'first value 3!',
                second: 'second value 3!',
                hidden: 'hidden value 3!',
                actions: 'hidden value 3!',
            },
        ] as any;

        const output = getCsv(data, columns);

        expect(output).not.toContain('actions');
    });

    it('should a CSV and not return undefined if a column is not visible', () => {
        const columns = [
            createColumn('first', {
                label: 'first column',
                visible: true,
                dataType: ColumnDataType.Date,
            }),
            createColumn('second', {
                label: 'second column',
                visible: true,
                dataType: ColumnDataType.DateTime,
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

        expect(output).toContain('"first column","second column"');
    });

    it('should export valid computed columns', () => {
        const columns = [
            createColumn('first', {
                label: 'first column',
                visible: true,
                dataType: ColumnDataType.Numeric,
            }),
            createColumn('computed', {
                label: 'computed column',
                visible: true,
                dataType: ColumnDataType.String,
                isComputed: true,
                getComputedStringValue: (column, row, isHeader) => {
                    if (isHeader) {
                        return column.label;
                    }

                    return `${row.first} + ${row.second}`;
                },
            }),
            createColumn('second', {
                label: 'second column',
                visible: true,
                dataType: ColumnDataType.String,
            }),
            createColumn('computed2', {
                label: 'computed column2',
                visible: true,
                dataType: ColumnDataType.String,
                isComputed: true,
                getComputedStringValue: (column, row, isHeader) => {
                    if (isHeader) {
                        return column.label;
                    }

                    return `${row.first} + ${row.second} 2`;
                },
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
        expect(output).toContain('"first column","computed column","second column","computed column2"');
    });
});

describe('getHTML', () => {
    it('Should return an HTML with data values', () => {
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
            '<table class="table table-bordered table-striped"><thead><tr><th>first column</th><th>second column</th></tr></thead><tbody><tr><td>first value 1!</td><td>second value 1!</td></tr><tr><td>first value 2!</td><td>second value 2!</td></tr><tr><td>first value 3!</td><td>second value 3!</td></tr></tbody></table>',
        );
    });
    it('should export valid computed columns', () => {
        const columns = [
            createColumn('first', {
                label: 'first column',
                visible: true,
                dataType: ColumnDataType.Numeric,
            }),
            createColumn('computed', {
                label: 'computed column',
                visible: true,
                dataType: ColumnDataType.String,
                isComputed: true,
                getComputedStringValue: (column, row, isHeader) => {
                    if (isHeader) {
                        return column.label;
                    }

                    return `${row.first} + ${row.second}`;
                },
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
            createColumn('computed2', {
                label: 'computed column2',
                visible: true,
                dataType: ColumnDataType.String,
                isComputed: true,
                getComputedStringValue: (column, row, isHeader) => {
                    if (isHeader) {
                        return column.label;
                    }

                    return `${row.first} + ${row.second} 2`;
                },
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
        expect(output).toBe(
            '<table class="table table-bordered table-striped"><thead><tr><th>first column</th><th>computed column</th><th>second column</th><th>computed column2</th></tr></thead><tbody><tr><td>first value 1!</td><td>first value 1! + second value 1!</td><td>second value 1!</td><td>first value 1! + second value 1! 2</td></tr><tr><td>first value 2!</td><td>first value 2! + second value 2!</td><td>second value 2!</td><td>first value 2! + second value 2! 2</td></tr><tr><td>first value 3!</td><td>first value 3! + second value 3!</td><td>second value 3!</td><td>first value 3! + second value 3! 2</td></tr></tbody></table>',
        );
    });

    describe('getPages', () => {
        it('Should export pages properly between max limit by page.', () => {
            const currentPage = 1;
            const totalRows = 50;
            const rowsPerPage = 10;

            const output = getPages(currentPage, totalRows, rowsPerPage);

            expect(output).toEqual([0, 1, 2, 3, 4]);
        });
        it('Should export pages properly more than max limit by page.', () => {
            const currentPage = 1;
            const totalRows = 70;
            const rowsPerPage = 10;

            const output = getPages(currentPage, totalRows, rowsPerPage);

            expect(output).toEqual([0, 1, 2, 3, 4, 5]);
        });
        it('Should export pages properly not being in first current page.', () => {
            const currentPage = 6;
            const totalRows = 70;
            const rowsPerPage = 10;

            const output = getPages(currentPage, totalRows, rowsPerPage);

            expect(output).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });
});
