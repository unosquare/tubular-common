import format from 'date-fns/format';
import getYear from 'date-fns/getYear';
import parseISO from 'date-fns/parseISO';
import { ColumnDataType, ColumnModel } from '.';

export const formatDate = (value: any, formatString: string = 'M/d/yyyy'): string => {
    if (!value) {
        return '';
    }

    const parsedValue = parseISO(value);
    return getYear(parsedValue) > 0 ? format(parsedValue, formatString) : '';
};

export const getColumnAlign = (column: ColumnModel): 'inherit' | 'left' | 'center' | 'right' | 'justify' => {
    switch (column.DataType) {
        case ColumnDataType.NUMERIC:
            return 'right';
        case ColumnDataType.BOOLEAN:
            return 'center';
        default:
            return 'inherit';
    }
};

const getCellValue = (cellDataType: string, cell: any): string => {
    switch (cellDataType) {
        case ColumnDataType.DATE:
            return formatDate(cell, 'M/d/yyyy');
        case ColumnDataType.DATE_TIME:
        case ColumnDataType.DATE_TIME_UTC:
            return formatDate(cell, 'M/d/yyyy h:mm a');
        case ColumnDataType.BOOLEAN:
            return (cell === true ? 'Yes' : 'No');
        default:
            return (cell || '').toString();
    }
};

const objToArray = (row: any) => row instanceof Object
    ? Object.keys(row).map((key: any) => row[key])
    : row;

const processRow = (row: any, columns: any[], ignoreType: boolean): string => {
    const finalVal = objToArray(row)
        .reduce((prev: any, value: any, i: any) => {
            if (!columns[i].Visible) { return; }

            let result = getCellValue(ignoreType ? ColumnDataType.STRING : columns[i].DataType, value)
                .replace(/"/g, '""');

            if (result.search(/("|,|\n)/g) >= 0) {
                result = `"${result}"`;
            }

            return `${prev !== undefined ? prev : ''}${i > 0 && prev !== undefined ? ',' : ''}${result}`;
        }, '');

    return `${finalVal}\n`;
};

export const getCsv = (gridResult: any, columns: any) => gridResult.reduce(
    (prev: string, row: any) => prev + processRow(row, columns, false),
    processRow(columns.map((x: any) => x.Label), columns, true));

export const getHtml = (gridResult: any, columns: any) => `<table class="table table-bordered table-striped"><thead><tr>${
    columns
        .filter((c: any) => c.Visible)
        .reduce((prev: any, el: any) => `${prev}<th>${el.Label || el.Name}</th>`, '')
    }</tr></thead><tbody>${
    gridResult.reduce((prevRow: string, row: any) =>
        `${prevRow}<tr>${objToArray(row).reduce((prev: string, cell: any, index: number) =>
            !columns[index].Visible ? prev : `${prev}<td>${getCellValue(columns[index].DataType, cell)}</td>`,
            '')}</tr>`
        , '')}</tbody></table>`;
