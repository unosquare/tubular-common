import { ColumnDataType, ColumnModel, parseDateColumnValue } from './Models';

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

const getRealCellValue = (column: ColumnModel, value: unknown, isHeader = false): string => {
    if (isHeader) return String(value);

    switch (column.dataType) {
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return value ? parseDateColumnValue(column, String(value)) : '';
        case ColumnDataType.Boolean:
            return value === true ? 'Yes' : 'No';
        default:
            return String(value ?? '');
    }
};

const getCellValue = (column: ColumnModel, row: unknown, isHeader) =>
    column.isComputed
        ? column.getComputedStringValue(column, row, isHeader)
        : getRealCellValue(column, row[column.name], isHeader);

const processRow = (row: unknown, columns: ColumnModel[], isHeader: boolean): string => {
    const finalVal = columns.reduce<string>((prev: string, currentColumn: ColumnModel) => {
        const result = `"${getCellValue(currentColumn, row, isHeader).replace(/"/g, '""')}"`;

        return `${prev}${result},`;
    }, '');

    return `${finalVal.replace(/(^,)|(,$)/g, '')}\n`;
};

const visibleColumns = (c: ColumnModel) => (c.visible && c.exportable) || (c.isComputed && !c.getComputedStringValue);

export const getCsv = (gridResult: unknown[], columns: ColumnModel[]): string => {
    const exportableColumns = columns.filter(visibleColumns);
    const headers = processRow(
        exportableColumns.map((x) => ({ [x.name]: x.label })).reduce((prev, current) => ({ ...prev, ...current }), {}),
        exportableColumns,
        true,
    );

    return gridResult.reduce(
        (prev, row) => String(prev) + processRow(row, exportableColumns, false),
        headers,
    ) as string;
};

export const getHtml = (gridResult: unknown[], columns: ColumnModel[]): string => {
    const exportableColumns = columns.filter(visibleColumns);
    const headers = exportableColumns.reduce((prev, el) => `${prev}<th>${el.label || el.name}</th>`, '');

    return `<table class="table table-bordered table-striped"><thead><tr>${headers}</tr></thead><tbody>${
        gridResult.reduce(
            (prevRow, row) =>
                `${prevRow}<tr>${exportableColumns.reduce(
                    (prev, currentColumn) => `${prev}<td>${getCellValue(currentColumn, row, false)}</td>`,
                    '',
                )}</tr>`,
            '',
        ) as string
    }</tbody></table>`;
};

export const getPages = (currentPage: number, totalRows: number, rowsPerPage: number): number[] => {
    const pages: number[] = [];

    // Default page limits
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    let startPage = 1;
    let endPage = totalPages;
    const maxSize = 6;
    const isMaxSized = maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
        endPage = startPage + maxSize - 1;

        // Adjust if limit is exceeded
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - maxSize + 1;
        }
    }

    // Add page number links
    for (let num = startPage; num <= endPage; num++) {
        pages.push(num - 1);
    }

    return pages;
};
