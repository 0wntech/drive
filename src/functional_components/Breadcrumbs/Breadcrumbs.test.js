import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { shallow } from 'enzyme';
import BreadcrumbItem from '../BreadcrumbItem';
import TestRenderer from 'react-test-renderer';

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
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('renders the correct amount of Breadcrumbs', () => {
        const wrapper = shallow(
            <Breadcrumbs breadcrumbs={breadcrumbs} webId={webId} />
        );
        expect(wrapper.find(BreadcrumbItem)).toHaveLength(3);
    });

    it('renders without breadcrumbs', () => {
        const wrapper = shallow(<Breadcrumbs webId={webId} />);
        expect(wrapper.find(BreadcrumbItem)).toHaveLength(0);
    });
});
