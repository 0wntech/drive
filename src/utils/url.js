export const getBreadcrumbsFromUrl = (url) => {
    const breadcrumbs = url.replace('https://', '').split('/');
    breadcrumbs.shift();
    const newBreadcrumbs = ['/'];
    breadcrumbs.forEach((breadcrumb) => {
        newBreadcrumbs.push('/' + breadcrumb);
    });
    return newBreadcrumbs;
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

// converts webId into url to fetch folders
export const getUrlFromWebId = (webId) => {
    return 'https://' + webId.split('/')[2] + '/';
};

// add a breadcrumb to url
export const addToUrl = (baseUrl, breadcrumb) => {
    return baseUrl + breadcrumb;
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

export const getCurrentDirectory = (urlTree, currentWorkingDirectory) => {
    // returns all files and folder within the currentWOrkingDirectory in the form {files:[...], folders:[...]}

    const folders = matchPathInUrlList(
        urlTree.folders,
        currentWorkingDirectory
    );
    const files = matchPathInUrlList(urlTree.files, currentWorkingDirectory);
    return {folders, files};
};
