import ColumnModel from '../Models/ColumnModel';

export interface DataGridStorage {
    setTextSearch: (textSearch: string) => void;
    setPage: (page: number) => void;
    setColumns: (columns: ColumnModel[]) => void;
    getTextSearch: () => string;
    getPage: () => number;
    getColumns: () => ColumnModel[];
}
