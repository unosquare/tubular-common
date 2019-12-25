import ColumnModel from './ColumnModel';

const currentTimezone = new Date().getTimezoneOffset();

export interface SearchOptions {
    operator: string;
    text?: string;
}

export default class GridRequest {
    protected static counter = 0;

    public columns: ColumnModel[];
    public counter: number;
    public search: SearchOptions;
    public skip: number;
    public take: number;
    public timezoneOffset: number;

    constructor(columns: ColumnModel[], itemsPerPage: number, page: number, searchText = '') {
        this.columns = columns;
        this.search = { operator: 'Auto', text: searchText };
        this.skip = itemsPerPage === -1 ? 0 : page * itemsPerPage;
        this.take = itemsPerPage;
        this.counter = GridRequest.counter++;
        this.timezoneOffset = currentTimezone;
    }
}
