export const getBreadcrumbsFromUrl = (url) => {
    // check if url is a valid url
    if (!isValidUrl(url)) {
        throw new Error(
            `getBreadcrumbsFromUrl received an invalid url: ${url}`
        );
    }
    const breadcrumbs = url.replace('https://', '').split('/');
    breadcrumbs.shift();
    const newBreadcrumbs = ['/'];
    breadcrumbs.forEach((breadcrumb) => {
        if (breadcrumb !== '') {
            newBreadcrumbs.push('/' + breadcrumb);
        }
    });
    return newBreadcrumbs;
};

export const convertFolderUrlToName = (folderUrl) => {
    return folderUrl.split('/').splice(-2)[0];
};

export const convertFileUrlToName = (fileUrl) => {
    return fileUrl.split('/').splice(-1)[0];
};

export const isValidUrl = (url) => {
    return url.match(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    )
        ? true
        : false;
};

export const getSafeLogin = (url) => {
    if (url.lastIndexOf('https://') === -1) {
        url = 'https://' + url;
    }
    url = url.endsWith('/') ? url + 'login' : url + '/login';
    return url;
};

// sorts files and folder
export const sortContainments = (urls) => {
    const folders = [];
    const files = [];
    urls.forEach((url) => {
        if (url.value[url.value.length - 1] === '/') {
            const urlFragments = url.value.split('/');
            const folderUrl = urlFragments[urlFragments.length - 2];
            folders.push(decodeURIComponent(folderUrl));
        } else {
            const urlFragments = url.value.split('/');
            const fileUrl = urlFragments[urlFragments.length - 1];
            files.push(decodeURIComponent(fileUrl));
        }
    });
    return [files, folders];
};

// converts https://ludwigschubert.solid.community/profile/card#me
// into ludwigschubert
export const getUsernameFromWebId = (webId) => {
    if (isValidUrl(webId)) {
        return webId.substring(webId.indexOf('://') + 3, webId.indexOf('.'));
    }
};

// converts webId into url to fetch folders
export const getRootFromWebId = (webId) => {
    return 'https://' + webId.split('/')[2] + '/';
};

// converts https://ludwigschubert.solid.community/
// into https://ludwigschubert.solid.community/profile/card#me
export const getWebIdFromRoot = (rootUrl) => {
    if (!isValidUrl(rootUrl)) {
        throw new Error(`getWebIdFromRoot received an invalid url: ${rootUrl}`);
    }

    if (rootUrl[rootUrl.length - 1] !== '/') {
        return rootUrl + '/profile/card#me';
    } else {
        return rootUrl + 'profile/card#me';
    }
};

// removes the last element of an url
export const removeFromUrl = (url) => {
    return url.split('/').slice(0, -1);
};

function escapeRegExp(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // $& means the whole matched string
}

export const matchPathInUrlList = (list, path) => {
    // a function to determine the files and folders in the current path
    const currentFolder = path.split('/').slice(-1)[0] + '/';
    const matches = [];
    const pattern = RegExp(escapeRegExp(currentFolder) + '\\w*(\\/|\\.\\w*)$');
    for (let i = 0; i < list.length; i++) {
        const match = list[i].match(pattern);
        if (match) {
            // item is in folder
            matches.push(list[i]);
        }
    }
    return matches;
};
