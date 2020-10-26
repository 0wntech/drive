export const card = {
    headers: { 'content-type': 'text/turtle' },
    body: `@prefix : <#>.
    @prefix solid: <http://www.w3.org/ns/solid/terms#>.
    @prefix pro: <./>.
    @prefix n0: <http://xmlns.com/foaf/0.1/>.
    @prefix n: <http://www.w3.org/2006/vcard/ns#>.
    @prefix schem: <http://schema.org/>.
    @prefix n1: <http://www.w3.org/ns/auth/acl#>.
    @prefix ldp: <http://www.w3.org/ns/ldp#>.
    @prefix inbox: </inbox/>.
    @prefix sp: <http://www.w3.org/ns/pim/space#>.
    @prefix bej: </>.
    @prefix c: <https://ludwigschubert.solid.community/profile/card#>.
    
    pro:card a n0:PersonalProfileDocument; n0:maker :me; n0:primaryTopic :me.
    
    :id1570875655558 n:value <mailto:ben.wetzel@code.berlin>, <mailto:next>.
    
    :id1570875733830 n:value <tel:why>.
    
    :me
        a schem:Person, n0:Person;
        n:hasEmail :id1570875655558;
        n:hasPhoto <meme_ben_gang.jpg>;
        n:hasTelephone :id1570875733830;
        n:note "ASD";
        n:role "tets";
        n1:trustedApp
        [ n1:mode n1:Append, n1:Read, n1:Write; n1:origin <http://localhost:3000> ];
        ldp:inbox inbox:;
        sp:preferencesFile </settings/prefs.ttl>;
        sp:storage bej:;
        solid:account bej:;
        solid:privateTypeIndex </settings/privateTypeIndex.ttl>;
        solid:publicTypeIndex </settings/publicTypeIndex.ttl>;
        n0:knows c:me;
        n0:name "Ben Wetzel".
    `,
    data: {
        webId: 'https://bejow.owntech.de/profile/card#me',
        name: 'Ben Wetzel',
        picture: 'https://bejow.owntech.de/profile/meme_ben_gang.jpg',
        emails: ['ben.wetzel@code.berlin'],
        job: 'tets',
        bio: 'ASD',
        telephones: ['0176322291'],
    },
    contacts: ["https://ludwigschubert.solid.community/profile/card#me"]
};
