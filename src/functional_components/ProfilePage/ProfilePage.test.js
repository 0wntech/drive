// import { shallow } from 'enzyme';
// import ProfilePage from './ProfilePage';
import { FETCH_USER_SUCCESS } from '../../actions/types';
import appReducer from '../../reducers/appReducer';

describe('ProfilePage', () => {
    const initialState = appReducer(undefined, {});

    const user = {
        webId: 'https://bejow.owntech.de/profile/card#me',
        name: 'Ben',
        picture:
            'https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L._SY355_.png',
        emails: ['ben.test@owntech.de'],
        job: 'Software Engineer',
        telephones: ['0177313131'],
    };

    it('receives user', () => {
        const result = appReducer(initialState, {
            type: FETCH_USER_SUCCESS,
            payload: user,
        });

        expect(result).toEqual({
            ...initialState,
            user: user,
        });
    });

    // it('displays profile picture', () => {
    //     const wrapper = shallow(<ProfilePage  />).dive();

    //     expect(
    //         wrapper.containsMatchingElement(
    //             <div style="background-image: url(https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L._SY355_.png)" />
    //         )
    //     ).toBe(true);
    // });
});
