/**
 * @jest-environment jsdom
 */

import { NullStorage } from '../src';

describe('NullStorage', () => {
    it('Creates instance', () => {
        const sut = new NullStorage();
        expect(sut).toBeInstanceOf(NullStorage);
    });

    describe('getter/setter', () => {
        let sut: NullStorage = null;
        let spyOnSetItem: jest.SpyInstance;
        beforeEach(() => {
            sut = new NullStorage();
            spyOnSetItem = jest.spyOn(window.localStorage, 'setItem');
        });

        it('setTextSearch', () => {
            sut.setTextSearch('something');
            expect(spyOnSetItem).not.toHaveBeenCalled();
            expect(sut.getTextSearch()).toBe(null);
        });

        it('setPage', () => {
            sut.setPage(12);
            expect(spyOnSetItem).not.toHaveBeenCalled();
            expect(sut.getPage()).toBe(null);
        });

        it('setColumns', () => {
            sut.setColumns([]);
            expect(spyOnSetItem).not.toHaveBeenCalled();
            expect(sut.getColumns()).toBe(null);
        });
    });
});
