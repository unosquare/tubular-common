import {
    AggregateFunctions,
    ColumnDataType,
    type ColumnModel,
    ColumnSortDirection,
    CompareOperators,
    columnHasFilter,
    isDateColum,
} from './Models';
import type GridRequest from './Models/GridRequest';
import GridResponse from './Models/GridResponse';
import { areDatesEqual, dateIsBetween, isDateAfter, isDateBefore } from './dateUtils';
import { parsePayload } from './utils';

const partialfilteringCurry = (column: ColumnModel) => (data: unknown[], action: (f: string) => boolean) =>
    data.filter((row) =>
        typeof row[column.name] === 'undefined' || row[column.name] === null ? false : action(row[column.name]),
    );

const equalsDateFilter = (column: ColumnModel) => (row) => areDatesEqual(column, row[column.name], column.filterText);
const equalsStringFilter = (column: ColumnModel) => (x: string) => x.toLowerCase() === column.filterText.toLowerCase();
const equalsFilter = (column: ColumnModel) => (row) => row[column.name] === column.filterText;

const filterBetween = (column: ColumnModel) => (row) =>
    row[column.name] >= column.filterText && row[column.name] <= column.filterArgument[0];

const filterByEquals = (column: ColumnModel, isDate: boolean, subset: unknown[], partialfiltering) => {
    if (isDate) return subset.filter(equalsDateFilter(column));

    if (column.dataType === ColumnDataType.String) return partialfiltering(subset, equalsStringFilter(column));

    return subset.filter(equalsFilter(column));
};

const sortColumnsByOrder = (a: ColumnModel, b: ColumnModel) => {
    if (a.sortOrder > b.sortOrder) return 1;
    return b.sortOrder > a.sortOrder ? -1 : 0;
};

const distinctReducer = (column: ColumnModel) => (list: unknown[], r: unknown) => {
    if (list.indexOf(r[column.name]) === -1) list.push(r[column.name]);

    return list;
};

const filterAggregateColumns = (column: ColumnModel) =>
    column.aggregate && column.aggregate.toLowerCase() !== AggregateFunctions.None.toLowerCase();

const minReducer = (column: ColumnModel) => (min, r) => (r[column.name] < min ? r[column.name] : min);
const maxReducer = (column: ColumnModel) => (max, r) => (r[column.name] > max ? r[column.name] : max);
const sumReducer = (column: ColumnModel) => (sum, r) =>
    typeof r[column.name] === 'undefined' ? sum : sum + r[column.name];

const sortData = (sorts: { name: string; asc: boolean }[]) => (a, b) => {
    let result = 0;

    for (const current of sorts) {
        const reverse = current.asc ? 1 : -1;

        if (typeof a[current.name] === 'undefined' || typeof b[current.name] === 'undefined') {
            result = reverse * -1;
            break;
        }

        if (a[current.name] < b[current.name]) {
            result = reverse * -1;
            break;
        }

        if (a[current.name] > b[current.name]) {
            result = reverse * 1;
            break;
        }
    }

    return result;
};

export const getResponse = (request: GridRequest, dataSource: unknown[]): GridResponse => {
    const response = new GridResponse(request.counter);
    response.totalRecordCount = dataSource.length;

    let data = applyFreeTextSearch(request, dataSource);
    data = applyFiltering(request, data);
    data = applySorting(request, data);

    response.filteredRecordCount = data.length;

    if (request.take > -1) {
        response.totalPages = Math.ceil(response.filteredRecordCount / request.take);

        if (response.totalPages > 0) {
            response.currentPage = request.skip / request.take + 1;
        }
    }

    response.aggregationPayload = getAggregatePayload(request, data);

    const sliceSize = request.take === -1 ? data.length : request.skip + request.take;

    response.payload = data
        .slice(request.skip, sliceSize)
        .map((row: Record<string, unknown>) => parsePayload(row, request.columns));

    return response;
};

const applyFreeTextSearch = (request: GridRequest, subset: unknown[]): unknown[] => {
    if (request.searchText) {
        const searchableColumns = request.columns.filter((x: ColumnModel) => x.searchable);

        if (searchableColumns.length > 0) {
            const filter = request.searchText.toLowerCase();
            if (filter === '') {
                return subset;
            }

            return subset.filter((item) =>
                searchableColumns.some((x: ColumnModel) => {
                    if (typeof item[x.name] === 'undefined' || item[x.name] === null) {
                        return false;
                    }
                    return item[x.name].toLowerCase().indexOf(filter) > -1;
                }),
            );
        }
    }

    return subset;
};

const applyFiltering = (request: GridRequest, subset: unknown[]): unknown[] => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    request.columns
        .filter((column: ColumnModel) => columnHasFilter(column))
        .forEach((column: ColumnModel) => {
            const isDate = isDateColum(column);
            const partialfiltering = partialfilteringCurry(column);

            switch (column.filterOperator) {
                case CompareOperators.Equals:
                    subset = filterByEquals(column, isDate, subset, partialfiltering);
                    break;
                case CompareOperators.NotEquals:
                    if (column.dataType === ColumnDataType.String) {
                        subset = partialfiltering(
                            subset,
                            (x: string) => x.toLowerCase() !== column.filterText.toLowerCase(),
                        );
                    } else {
                        subset = subset.filter((row) => row[column.name] !== column.filterText);
                    }
                    break;
                case CompareOperators.Contains:
                    subset = partialfiltering(
                        subset,
                        (x) => x.toLowerCase().indexOf(column.filterText.toLowerCase()) >= 0,
                    );
                    subset = partialfiltering(
                        subset,
                        (x: string) => x.toLowerCase().indexOf(column.filterText.toLowerCase()) >= 0,
                    );
                    break;
                case CompareOperators.NotContains:
                    subset = partialfiltering(
                        subset,
                        (x: string) => x.toLowerCase().indexOf(column.filterText.toLowerCase()) < 0,
                    );
                    break;
                case CompareOperators.StartsWith:
                    subset = partialfiltering(subset, (x: string) =>
                        x.toLowerCase().startsWith(column.filterText.toLowerCase()),
                    );
                    break;
                case CompareOperators.NotStartsWith:
                    subset = partialfiltering(
                        subset,
                        (x: string) => !x.toLowerCase().startsWith(column.filterText.toLowerCase()),
                    );
                    break;
                case CompareOperators.EndsWith:
                    subset = partialfiltering(subset, (x: string) =>
                        x.toLowerCase().endsWith(column.filterText.toLowerCase()),
                    );
                    break;
                case CompareOperators.NotEndsWith:
                    subset = partialfiltering(
                        subset,
                        (x: string) => !x.toLowerCase().endsWith(column.filterText.toLowerCase()),
                    );
                    break;
                case CompareOperators.Gt:
                    if (isDate) {
                        subset = subset.filter((row) => isDateAfter(column, row[column.name], column.filterText));
                    } else {
                        subset = subset.filter((row) => row[column.name] > column.filterText);
                    }
                    break;
                case CompareOperators.Gte:
                    if (isDate) {
                        subset = subset.filter((row) => isDateAfter(column, row[column.name], column.filterText, true));
                    } else {
                        subset = subset.filter((row) => row[column.name] >= column.filterText);
                    }
                    break;
                case CompareOperators.Lt:
                    if (isDate) {
                        subset = subset.filter((row) => isDateBefore(column, row[column.name], column.filterText));
                    } else {
                        subset = subset.filter((row) => row[column.name] < column.filterText);
                    }
                    break;
                case CompareOperators.Lte:
                    if (isDate) {
                        subset = subset.filter((row) =>
                            isDateBefore(column, row[column.name], column.filterText, true),
                        );
                    } else {
                        subset = subset.filter((row) => row[column.name] <= column.filterText);
                    }
                    break;
                case CompareOperators.Between:
                    if (isDate) {
                        subset = subset.filter((row) =>
                            dateIsBetween(
                                column,
                                column.filterText,
                                column.filterArgument[0].toString(),
                                row[column.name],
                            ),
                        );
                    } else {
                        subset = subset.filter(filterBetween(column));
                    }
                    break;
                default:
                    throw new Error('Unsupported Compare Operator');
            }
        });

    return subset;
};

const applySorting = (request: GridRequest, subset: unknown[]): unknown[] => {
    const sortedColumns = request.columns.filter((column: ColumnModel) => column.sortOrder > 0);

    let sorts: { name: string; asc: boolean }[] = [{ name: request.columns[0].name, asc: true }];

    if (sortedColumns.length > 0) {
        sortedColumns.sort(sortColumnsByOrder);

        sorts = sortedColumns.map((y: ColumnModel) => ({
            name: y.name,
            asc: y.sortDirection === ColumnSortDirection.Ascending,
        }));
    }

    subset.sort(sortData(sorts));

    return subset;
};

const getAggregatePayload = (request: GridRequest, subset: unknown[]): Record<string, number> => {
    const aggregateColumns = request.columns.filter(filterAggregateColumns);

    return aggregateColumns.reduce((prev, column) => {
        switch (column.aggregate.toLowerCase()) {
            case AggregateFunctions.Sum.toLowerCase():
                prev[column.name] = subset.length === 0 ? 0 : subset.reduce(sumReducer(column), 0);
                break;
            case AggregateFunctions.Average.toLowerCase():
                prev[column.name] =
                    subset.length === 0 ? 0 : Number(subset.reduce(sumReducer(column), 0)) / subset.length;
                break;
            case AggregateFunctions.Max.toLowerCase():
                prev[column.name] = subset.length === 0 ? 0 : subset.reduce(maxReducer(column), subset[0][column.name]);
                break;
            case AggregateFunctions.Min.toLowerCase():
                prev[column.name] = subset.length === 0 ? 0 : subset.reduce(minReducer(column), subset[0][column.name]);
                break;
            case AggregateFunctions.Count.toLowerCase():
                prev[column.name] = subset.length;
                break;
            case AggregateFunctions.DistinctCount.toLowerCase():
                prev[column.name] = subset.length === 0 ? 0 : (subset.reduce(distinctReducer(column), []) as []).length;
                break;
            default:
                throw new Error('Unsupported aggregate function');
        }

        return prev;
    }, {});
};
