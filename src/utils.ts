import { ColumnDataType, ColumnModel, parseDateColumnValue } from '.';

export const parsePayload = (row: Record<string, unknown>, columns: ColumnModel[]): Record<string, unknown> =>
    columns.reduce((obj: Record<string, unknown>, column: ColumnModel, key: number) => {
        obj[column.name] = row[key] || row[column.name];

        return obj;
    }, {});

export const getColumnAlign = (column: ColumnModel): 'inherit' | 'left' | 'center' | 'right' | 'justify' => {
    switch (column.dataType) {
        case ColumnDataType.Numeric:
            return 'right';
        case ColumnDataType.Boolean:
            return 'center';
        default:
            return 'inherit';
    }
};

const getCellValue = (column: ColumnModel, value: any, isHeader = false): string => {
    if (isHeader) {
        return (value || '').toString();
    }

    switch (column.dataType) {
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return parseDateColumnValue(column, value);
        case ColumnDataType.Boolean:
            return value === true ? 'Yes' : 'No';
        default:
            return (value || '').toString();
    }
};

const objToArray = (row: any): any[] => (row instanceof Object ? Object.keys(row).map((key: string) => row[key]) : row);

const processRow = (row: any, columns: ColumnModel[], isHeader: boolean): string => {
    const finalVal = objToArray(row).reduce((prev: string, value: [], i: number) => {
        const column = columns[i];
        if (!column.visible || !column.exportable || (column.isComputed && !column.getComputedStringValue)) {
            return prev;
        }

        let result = column.isComputed
            ? column.getComputedStringValue(column, row, isHeader)
            : getCellValue(columns[i], value, isHeader).replace(/"/g, '""');

        if (result.search(/("|,|\n)/g) >= 0) {
            result = `"${result}"`;
        }

        return `${prev}${result},`;
    }, '');

    return `${finalVal.replace(/(^,)|(,$)/g, '')}\n`;
};

export const getCsv = (gridResult: [], columns: ColumnModel[]): string =>
    gridResult.reduce(
        (prev: string, row: any) => prev + processRow(row, columns, false),
        processRow(
            columns.map((x: ColumnModel) => x.label),
            columns,
            true,
        ),
    );

export const getHtml = (gridResult: [], columns: ColumnModel[]): string =>
    `<table class="table table-bordered table-striped"><thead><tr>${columns
        .filter((c: ColumnModel) => c.visible)
        .reduce(
            (prev: string, el: ColumnModel) => `${prev}<th>${el.label || el.name}</th>`,
            '',
        )}</tr></thead><tbody>${gridResult.reduce(
        (prevRow: string, row: any) =>
            `${prevRow}<tr>${objToArray(row).reduce(
                (prev: string, cell: ColumnModel, index: number) =>
                    !columns[index].visible ? prev : `${prev}<td>${getCellValue(columns[index], cell)}</td>`,
                '',
            )}</tr>`,
        '',
    )}</tbody></table>`;
