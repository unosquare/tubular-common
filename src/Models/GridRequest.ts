import { ColumnModel } from './ColumnModel';

const currentTimezone = new Date().getTimezoneOffset();

class GridRequest {
    protected static counter = 0;

    public columns: ColumnModel[];

    public counter: number;

    public searchText: string;

    public skip: number;

    public take: number;

    public timezoneOffset: number;

    constructor(columns: ColumnModel[], itemsPerPage: number, page: number, searchText = '') {
        this.columns = columns.filter((c) => !c.isComputed);
        this.searchText = searchText;
        this.skip = itemsPerPage === -1 ? 0 : page * itemsPerPage;
        this.take = itemsPerPage;
        this.counter = GridRequest.counter++;
        this.timezoneOffset = currentTimezone;
    }
}

export default GridRequest;
