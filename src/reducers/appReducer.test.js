import { isContact } from './contactReducer';
import { contacts } from '../../test/fixtures/contacts';
describe('AppReducer', () => {
    describe('isContact() Selector', () => {
        test('Return true if webId is contact', () => {
            const state = {
                contacts,
            };
            const webId = 'https://bejow.solid.community/profile/card#me';
            expect(isContact(state.contacts, webId)).toBe(true);
        });
        test('Return false if webId is not a contact', () => {
            const state = {
                contacts,
            };
            const webId = 'https://notacontact.solid.community/profile/card#me';
            expect(isContact(state.contacts, webId)).toBe(false);
        });
    });
});
