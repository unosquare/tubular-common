export default class GridResponse {
    public aggregationPayload: object;
    public counter: number;
    public currentPage = 0;
    public filteredRecordCount: number;
    public payload: any[];
    public totalPages = 1;
    public totalRecordCount: number;

    constructor(counter = 0) {
        this.counter = isNaN(counter) ? 0 : counter;
    }
}
