class GridResponse {
    public aggregationPayload: Record<string, number>;

    public counter: number;

    public currentPage = 0;

    public filteredRecordCount: number;

    public payload: any;

    public totalPages = 1;

    public totalRecordCount: number;

    constructor(counter = 0) {
        this.counter = Number.isNaN(counter) ? 0 : counter;
    }
}

export default GridResponse;
