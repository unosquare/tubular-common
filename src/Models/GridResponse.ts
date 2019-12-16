export default class GridResponse {
    public AggregationPayload: object;
    public Counter: number;
    public CurrentPage = 0;
    public FilteredRecordCount: number;
    public Payload: any[];
    public TotalPages = 1;
    public TotalRecordCount: number;

    constructor(counter = 0) {
        this.Counter = isNaN(counter) ? 0 : counter;
    }
}
