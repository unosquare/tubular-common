import type { ColumnModel } from '../Models';
import type DataGridStorage from './DataGridStorage';

class NullStorage implements DataGridStorage {
    public setTextSearch(_textSearch: string): void {
        // do nothing
    }

    public setPage(_page: number): void {
        // do nothing
    }

    public setColumns(_columns: ColumnModel[]): void {
        // do nothing
    }

    public getTextSearch(): string {
        return null;
    }

    public getPage(): number {
        return null;
    }

    public getColumns(): ColumnModel[] {
        return null;
    }
}

export default NullStorage;
