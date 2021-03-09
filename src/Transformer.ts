import {
    AggregateFunctions,
    ColumnSortDirection,
    CompareOperators,
    ColumnDataType,
    GridRequest,
    GridResponse,
    ColumnModel,
    columnHasFilter,
} from './Models';
import { parsePayload } from './utils';
import { areDatesEqual, dateIsBetween, isDateAfter, isDateBefore } from './dateUtils';

export class Transformer {
    public static getResponse(request: GridRequest, dataSource: any[]): GridResponse {
        const response = new GridResponse(request.counter);
        response.totalRecordCount = dataSource.length;

        let data = this.applyFreeTextSearch(request, dataSource);
        data = this.applyFiltering(request, data);
        data = this.applySorting(request, data);

        response.filteredRecordCount = data.length;

        if (request.take > -1) {
            response.totalPages = Math.ceil(response.filteredRecordCount / request.take);

            if (response.totalPages > 0) {
                response.currentPage = request.skip / request.take + 1;
            }
        }

        response.aggregationPayload = this.getAggregatePayload(request, data);

        const sliceSize = request.take === -1 ? data.length : request.skip + request.take;
        response.payload = data
            .slice(request.skip, sliceSize)
            .map((row: Record<string, unknown>) => parsePayload(row, request.columns));

        return response;
    }

    private static applyFreeTextSearch(request: GridRequest, subset: any[]): any[] {
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
                        } else {
                            return item[x.name].toLowerCase().indexOf(filter) > -1;
                        }
                    }),
                );
            }
        }

        return subset;
    }

    private static applyFiltering(request: GridRequest, subset: any[]): any[] {
        request.columns
            .filter((column: ColumnModel) => columnHasFilter(column))
            .forEach((column: ColumnModel) => {
                const isDate =
                    column.dataType === ColumnDataType.Date ||
                    column.dataType === ColumnDataType.DateTime ||
                    column.dataType === ColumnDataType.DateTimeUtc;

                const partialfiltering = (data: any[], action: (f: string) => boolean): any[] =>
                    data.filter((row: any) =>
                        typeof row[column.name] === 'undefined' || row[column.name] === null
                            ? false
                            : action(row[column.name]),
                    );

                switch (column.filterOperator) {
                    case CompareOperators.Equals:
                        if (isDate) {
                            subset = subset.filter((row) => areDatesEqual(column, row[column.name], column.filterText));
                        } else if (column.dataType === ColumnDataType.String) {
                            subset = partialfiltering(
                                subset,
                                (x: string) => x.toLowerCase() === column.filterText.toLowerCase(),
                            );
                        } else {
                            subset = subset.filter((row) => row[column.name] === column.filterText);
                        }
                        break;
                    case CompareOperators.NotEquals:
                        if (column.dataType === 'string') {
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
                            subset = subset.filter((row) =>
                                isDateAfter(column, row[column.name], column.filterText, true),
                            );
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
                            subset = subset.filter(
                                (row) =>
                                    row[column.name] >= column.filterText &&
                                    row[column.name] <= column.filterArgument[0],
                            );
                        }
                        break;
                    default:
                        throw new Error('Unsupported Compare Operator');
                }
            });

        return subset;
    }

    private static applySorting(request: GridRequest, subset: any[]): any[] {
        const sortedColumns = request.columns.filter((column: ColumnModel) => column.sortOrder > 0);

        let sorts: { name: string; asc: boolean }[] = [{ name: request.columns[0].name, asc: true }];

        if (sortedColumns.length > 0) {
            sortedColumns.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : b.sortOrder > a.sortOrder ? -1 : 0));

            sorts = sortedColumns.map((y: ColumnModel) => ({
                name: y.name,
                asc: y.sortDirection === ColumnSortDirection.Ascending,
            }));
        }

        subset.sort((a, b) => {
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
        });

        return subset;
    }

    private static getAggregatePayload(request: GridRequest, subset: any[]): any {
        const aggregateColumns = request.columns.filter(
            (column: ColumnModel) =>
                column.aggregate && column.aggregate.toLowerCase() !== AggregateFunctions.None.toLowerCase(),
        );

        return aggregateColumns.reduce((prev: any, column: ColumnModel) => {
            switch (column.aggregate.toLowerCase()) {
                case AggregateFunctions.Sum.toLowerCase():
                    prev[column.name] =
                        subset.length === 0
                            ? 0
                            : subset.reduce(
                                  (sum, r) => (typeof r[column.name] === 'undefined' ? sum : sum + r[column.name]),
                                  0,
                              );
                    break;
                case AggregateFunctions.Average.toLowerCase():
                    prev[column.name] =
                        subset.length === 0
                            ? 0
                            : subset.reduce(
                                  (sum, r) => (typeof r[column.name] === 'undefined' ? sum : sum + r[column.name]),
                                  0,
                              ) / subset.length;
                    break;
                case AggregateFunctions.Max.toLowerCase():
                    prev[column.name] =
                        subset.length === 0
                            ? 0
                            : subset.reduce(
                                  (max, r) => (r[column.name] > max ? r[column.name] : max),
                                  subset[0][column.name],
                              );
                    break;
                case AggregateFunctions.Min.toLowerCase():
                    prev[column.name] =
                        subset.length === 0
                            ? 0
                            : subset.reduce(
                                  (min, r) => (r[column.name] < min ? r[column.name] : min),
                                  subset[0][column.name],
                              );
                    break;
                case AggregateFunctions.Count.toLowerCase():
                    prev[column.name] = subset.length;
                    break;
                case AggregateFunctions.DistinctCount.toLowerCase():
                    prev[column.name] =
                        subset.length === 0
                            ? 0
                            : (subset.reduce((list: any[], r: any) => {
                                  if (list.indexOf(r[column.name]) === -1) {
                                      list.push(r[column.name]);
                                  }
                                  return list;
                              }, []) as []).length;
                    break;
                default:
                    throw new Error('Unsupported aggregate function');
            }

            return prev;
        }, {});
    }
}
