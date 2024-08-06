class GridResponse {
    public aggregationPayload: Record<string, number> | undefined;

    public counter: number;

    public currentPage = 0;

    public filteredRecordCount: number;

    public payload: unknown[] | undefined;

    public totalPages = 1;

    public totalRecordCount: number;

    constructor(counter = 0) {
        this.counter = Number.isNaN(counter) ? 0 : counter;
        this.filteredRecordCount = 0;
        this.totalRecordCount = 0;
    }
}

export default GridResponse;
