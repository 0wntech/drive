import TestRenderer from 'react-test-renderer';
import AppCard from './AppCard';
import React from 'react';

describe('AppCard', () => {
    it('should render correct', () => {
        const wrapper = TestRenderer.create(
            <AppCard
                iconSrc="http://www.digitalwiki.de/wp-content/uploads/2017/02/That-would-be-great-meme.jpg"
                url="http://localhost:3001"
                title="owndrive"
                onClick={jest.fn()}
            />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
