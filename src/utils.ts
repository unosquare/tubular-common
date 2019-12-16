import format from 'date-fns/format';
import getYear from 'date-fns/getYear';
import parseISO from 'date-fns/parseISO';
import { ColumnDataType, ColumnModel } from '.';

export const parsePayload = (row: {}, columns: ColumnModel[]): {} => {
    return columns.reduce((obj: {}, column: ColumnModel, key: number) => {
        obj[column.name] = row[key] || row[column.name];

        return obj;
    }, {});
};

export const formatDate = (value: any, formatString = 'M/d/yyyy'): string => {
    if (!value) {
        return '';
    }

    const parsedValue = parseISO(value);
    return getYear(parsedValue) > 0 ? format(parsedValue, formatString) : '';
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

const objToArray = (row: any) => (row instanceof Object ? Object.keys(row).map((key: string) => row[key]) : row);

const processRow = (row: {}, columns: any[], ignoreType: boolean): string => {
    const finalVal = objToArray(row).reduce((prev: any, value: any, i: any) => {
        if (!columns[i].Visible) {
            return;
        }

        let result = getCellValue(ignoreType ? ColumnDataType.String : columns[i].DataType, value).replace(/"/g, '""');

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
                (prev: string, cell: any, index: number) =>
                    !columns[index].visible ? prev : `${prev}<td>${getCellValue(columns[index].dataType, cell)}</td>`,
                '',
            )}</tr>`,
        '',
    )}</tbody></table>`;
