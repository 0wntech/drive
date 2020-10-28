import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { shallow } from 'enzyme';
import BreadcrumbItem from '../BreadcrumbItem';
import TestRenderer from 'react-test-renderer';
import { getRootFromWebId } from '../../utils/url';

describe('Breadcrumbs', () => {
    const breadcrumbs = ['/', 'test', 'path'];
    const mockFunction = jest.fn();
    const webId = 'https://bejow.solid.community/profile/card#me';

    it('should render correctly', () => {
        const tree = TestRenderer.create(
            <Breadcrumbs
                webId={webId}
                breadcrumbs={breadcrumbs}
                onClick={mockFunction}
                currentPath={getRootFromWebId(webId) + 'test/path'}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('renders the correct amount of Breadcrumbs', () => {
        const wrapper = shallow(
            <Breadcrumbs
                breadcrumbs={breadcrumbs}
                webId={webId}
                currentPath={getRootFromWebId(webId) + 'test/path'}
            />
        );
        expect(wrapper.find(BreadcrumbItem)).toHaveLength(3);
    });
});
