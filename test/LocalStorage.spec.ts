import { LocalStorage } from '../src';

describe('LocalStorage', () => {
    it('Creates instance', () => {
        const sut = new LocalStorage('some-name');
        expect(sut).toBeInstanceOf(LocalStorage);
    });

    describe('getter/setter', () => {
        let sut: LocalStorage = null;
        let spyOnSetItem: jest.SpyInstance;
        const instanceName = 'grid_test';
        beforeEach(() => {
            sut = new LocalStorage('');
            sut.setGridName(instanceName);
            spyOnSetItem = jest.spyOn(window.localStorage, 'setItem');
        });

        it('setTextSearch', () => {
            sut.setTextSearch('something');
            expect(spyOnSetItem).toHaveBeenCalledWith(`${instanceName}_textSearch`, 'something');
            expect(sut.getTextSearch()).toBe('something');
        });

        it('setPage', () => {
            sut.setPage(12);
            expect(spyOnSetItem).toHaveBeenCalledWith(`${instanceName}_page`, '12');
            expect(sut.getPage()).toBe(12);
        });

        it('setColumns', () => {
            sut.setColumns([]);
            expect(spyOnSetItem).toHaveBeenCalledWith(`${instanceName}_columns`, '[]');
            expect(sut.getColumns()).toHaveLength(0);
        });
    });
});
