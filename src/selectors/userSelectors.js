import url from 'url';

export const idp = (state) => {
    const webId = state.user.webId;
    const webIdUrl = url.parse(webId);
    const webIdHostFragments = webIdUrl.host.split('.');
    webIdHostFragments.shift();
    const idpUrl =
        webIdUrl.protocol + '//' + webIdHostFragments.join('.') + '/';
    return idpUrl;
};
