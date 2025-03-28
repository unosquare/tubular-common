import type { ColumnModel } from '../Models';
import type DataGridStorage from './DataGridStorage';

class LocalStorage implements DataGridStorage {
    public constructor(private name?: string) {
        if (!window || !window.localStorage) {
            throw new Error('The localStorage is not present.');
        }
    }

    public setGridName(name: string): void {
        this.name = name;
    }

    public setTextSearch(textSearch: string): void {
        window.localStorage.setItem(`${this.name}_textSearch`, textSearch);
    }

    public setPage(page: number): void {
        window.localStorage.setItem(`${this.name}_page`, page.toString());
    }

    public setColumns(columns: ColumnModel[]): void {
        window.localStorage.setItem(`${this.name}_columns`, JSON.stringify(columns));
    }

    public getTextSearch(): string {
        return window.localStorage.getItem(`${this.name}_textSearch`);
    }

    public getPage(): number {
        return Number.parseInt(window.localStorage.getItem(`${this.name}_page`), 10);
    }

    public getColumns(): ColumnModel[] {
        return JSON.parse(window.localStorage.getItem(`${this.name}_columns`));
    }
}

export default LocalStorage;
