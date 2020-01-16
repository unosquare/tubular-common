import { parseISO } from 'uno-js';
import { ColumnDataType, ColumnModel } from '.';

export const parsePayload = (row: {}, columns: ColumnModel[]): {} => {
    return columns.reduce((obj: {}, column: ColumnModel, key: number) => {
        obj[column.name] = row[key] || row[column.name];

        return obj;
    }, {});
};

export const formatDate = (value: string, formatString = 'M/d/yyyy'): string => {
    if (!value) {
        return '';
    }

    const parsedValue: Date = parseISO(value);

    // TODO: Pending format
    return isNaN(parsedValue.getTime()) ? '' : parsedValue.toLocaleDateString();
};

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

const getCellValue = (cellDataType: string, cell: any): string => {
    switch (cellDataType) {
        case ColumnDataType.Date:
            return formatDate(cell, 'M/d/yyyy');
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return formatDate(cell, 'M/d/yyyy h:mm a');
        case ColumnDataType.Boolean:
            return cell === true ? 'Yes' : 'No';
        default:
            return (cell || '').toString();
    }
};

const objToArray = (row: {} | []): any[] =>
    row instanceof Object ? Object.keys(row).map((key: string) => row[key]) : row;

const processRow = (row: {}, columns: ColumnModel[], ignoreType: boolean): string => {
    const finalVal = objToArray(row).reduce((prev: string, value: [], i: number) => {
        if (!columns[i].visible) {
            return;
        }

        let result = getCellValue(ignoreType ? ColumnDataType.String : columns[i].dataType, value).replace(/"/g, '""');

        if (result.search(/("|,|\n)/g) >= 0) {
            result = `"${result}"`;
        }

        return `${prev !== undefined ? prev : ''}${i > 0 && prev !== undefined ? ',' : ''}${result}`;
    }, '');

    return `${finalVal}\n`;
};

export const getCsv = (gridResult: [], columns: ColumnModel[]): string =>
    gridResult.reduce(
        (prev: string, row: {}) => prev + processRow(row, columns, false),
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
        (prevRow: string, row: {}) =>
            `${prevRow}<tr>${objToArray(row).reduce(
                (prev: string, cell: {}, index: number) =>
                    !columns[index].visible ? prev : `${prev}<td>${getCellValue(columns[index].dataType, cell)}</td>`,
                '',
            )}</tr>`,
        '',
    )}</tbody></table>`;
