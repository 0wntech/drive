import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ItemList from './ItemList';

describe('ItemList', () => {
    const currentItem = {
        files: ['haha.jpg'],
        folders: ['hehe', 'hihi'],
    };

    describe('ItemList Snapshot', () => {
        it('matches the snapshot for items', () => {
            const result = new ShallowRenderer().render(
                <ItemList.WrappedComponent
                    items={currentItem.files}
                    selectedItems={[]}
                    currentPath="https://example.com/"
                />
            );
            expect(result).toMatchSnapshot();
        });
        it('matches the snapshot for folders', () => {
            const result = new ShallowRenderer().render(
                <ItemList.WrappedComponent
                    items={currentItem.folders}
                    selectedItems={[]}
                    currentPath="https://example.com/"
                />
            );
            expect(result).toMatchSnapshot();
        });
        it('matches the snapshot for selected folders', () => {
            const result = new ShallowRenderer().render(
                <ItemList.WrappedComponent
                    items={currentItem.folders}
                    selectedItems={currentItem.folders}
                    currentPath="https://example.com/"
                />
            );
            expect(result).toMatchSnapshot();
        });
    });
});
