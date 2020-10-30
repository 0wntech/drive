import { useParams } from 'react-router-dom';
import urlUtils from 'url';

export const getBreadcrumbsFromUrl = (url) => {
    // check if url is a valid url
    if (!isValidUrl(url)) {
        throw new Error(
            `getBreadcrumbsFromUrl received an invalid url: ${url}`
        );
    }
    url = decodeURIComponent(url);
    url = urlUtils.parse(url);
    const breadcrumbs = url.pathname.split('/');
    const newBreadcrumbs = ['/'];
    breadcrumbs.forEach((breadcrumb) => {
        if (breadcrumb !== '') {
            newBreadcrumbs.push('/' + breadcrumb);
        }
    });
    return newBreadcrumbs;
};

export const useParamsFromUrl = () => {
    const paramObj = useParams();
    Object.keys(paramObj).forEach((key) => {
        paramObj[key] = decodeURIComponent(paramObj[key]);
    });
    return paramObj;
};

export const getProfileRoute = (profile) => {
    return `/profile/${urlUtils.parse(profile.webId).host}`;
};

export const getContactFolderRoute = (host, path) => {
    return `/contact/${host}/${encodeURIComponent(
        urlUtils.parse(path.endsWith('/') ? path : path + '/').pathname
    )}`;
};

export const getContactFileRoute = (host, path) => {
    return `/contact/${host}/file/${encodeURIComponent(
        urlUtils.parse(path).pathname
    )}`;
};

export const getFileRoute = (host, path) => {
    return `/file/${host}/${encodeURIComponent(urlUtils.parse(path).pathname)}`;
};

export const getHomeRoute = (path) => {
    return `/home/${encodeURIComponent(urlUtils.parse(path).pathname)}`;
};

export const getPreviousPath = (url) => {
    if (!url) return undefined;
    const urlObject = urlUtils.parse(url);
    const { pathname } = urlObject;
    return pathname[pathname.length - 1] === '/'
        ? urlUtils.format({
              ...urlObject,
              pathname: pathname.replace(
                  pathname.split('/')[pathname.split('/').length - 2] + '/',
                  ''
              ),
          })
        : urlUtils.format({
              ...urlObject,
              pathname: pathname.replace(
                  pathname.split('/')[pathname.split('/').length - 1],
                  ''
              ),
          });
};

export const convertFolderUrlToName = (folderUrl) => {
    return folderUrl.split('/').splice(-2)[0];
};

export const convertFileUrlToName = (fileUrl) => {
    return fileUrl.split('/').splice(-1)[0];
};

export const isValidUrl = (url) => {
    return url.match(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&%'\(\)\*\+,;=.]+$/
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
            folders.push(folderUrl);
        } else {
            const urlFragments = url.value.split('/');
            const fileUrl = urlFragments[urlFragments.length - 1];
            files.push(fileUrl);
        }
    });
    return [files, folders];
};

// converts https://ludwigschubert.solid.community/profile/card#me
// into ludwigschubert
export const getUsernameFromWebId = (webId) => {
    if (webId && isValidUrl(webId)) {
        return webId.substring(webId.indexOf('://') + 3, webId.indexOf('.'));
    }
};

export const getIdpFromWebId = (webId) => {
    if (webId && isValidUrl(webId)) {
        return webId
            .replace('https://', '')
            .substr(0, webId.replace('https://', '').indexOf('/'))
            .replace(getUsernameFromWebId(webId) + '.', '');
    }
};

// converts webId into url to fetch folders
export const getRootFromWebId = (webId) => {
    return 'https://' + webId.split('/')[2] + '/';
};

// converts a url into the url of the last folder or root folder
export const getParentFolderUrl = (url) => {
    if (isValidUrl(url)) {
        const slashCount = url.split('/').length;
        if (slashCount >= 4) {
            return url.substring(0, url.lastIndexOf('/') + 1);
        } else if (slashCount === 3) {
            return url + '/';
        }
    }
    throw new Error('Received invalid url: ' + url);
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
