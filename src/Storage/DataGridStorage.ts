import { ColumnModel } from '../Models';

interface DataGridStorage {
    setTextSearch: (textSearch: string) => void;
    setPage: (page: number) => void;
    setColumns: (columns: ColumnModel[]) => void;
    getTextSearch: () => string;
    getPage: () => number;
    getColumns: () => ColumnModel[];
}

export default DataGridStorage;
