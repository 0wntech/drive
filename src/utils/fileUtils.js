import * as rdf from 'rdflib';
import auth from 'solid-auth-client';
import url from 'url';
import mime from 'mime';
const ns = require('solid-namespace')(rdf);

export const allowFileName = (fileName, currentFolder, fileSuffix) => {
    if (fileName === '') {
        return false;
    }

    const re = new RegExp('^[a-zA-Z0-9]*$');

    if (currentFolder && fileSuffix) {
        if (namingConflict(`${fileName}.${fileSuffix}`, currentFolder))
            return false;
    }
    return !!re.exec(fileName) || mime.getType(fileName);
};

export const isImageType = (fileType) => {
    return fileType ? fileType.indexOf('image') !== -1 : false;
};

const addForDelete = (item, selectedItems) => {
    const newSelection = [...selectedItems];
    if (item && url.parse(item).path !== '/' && !selectedItems.includes(item)) {
        newSelection.push(item);
        return newSelection;
    }
    if (selectedItems.length !== 0 || newSelection.length !== 0) {
        return newSelection;
    }
    return false;
};

export const namingConflict = (name, currentFolder) => {
    if (currentFolder) {
        if (currentFolder.files.find((file) => file.name === name)) {
            return true;
        } else if (currentFolder.folders.find((folder) => folder === name)) {
            return true;
        }
        return false;
    }
};

export const getSuffixAndPlaceholder = (placeholder) => {
    let fileSuffix;
    placeholder = placeholder.split('/');
    if (placeholder[placeholder.length - 1] === '') {
        placeholder = placeholder[placeholder.length - 2];
    } else {
        const fileNameFragments = placeholder[placeholder.length - 1].split(
            '.'
        );
        placeholder = fileNameFragments[0];
        fileSuffix = fileNameFragments[1];
    }
    return { fileSuffix: fileSuffix, placeholder: placeholder };
};

export const uploadFile = (file, currPath) => {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    const reader = new FileReader();
    return new Promise(function (resolve, reject) {
        reader.onload = function () {
            const data = this.result;
            const filePath = file.webkitRelativePath
                ? encodeURIComponent(file.webkitRelativePath)
                : `${file.name}`;
            const contentType = mime.getType(file.name);
            const fileUrl = currPath + filePath;
            return fetcher
                .webOperation('PUT', fileUrl, {
                    data: data,
                    contentType: contentType,
                })
                .then((response) => {
                    if (response.status === 201) {
                        resolve();
                    } else {
                        reject(response.error);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        };
        reader.readAsArrayBuffer(file);
    });
};

export const getFileOrFolderName = (url) => {
    const itemFragments = url.split('/');
    return itemFragments[itemFragments.length - 1] === ''
        ? itemFragments[itemFragments.length - 2]
        : itemFragments[itemFragments.length - 1];
};

export const convertResourceListToSearchOptions = ({ items }) => {
    const fileObjects = [];
    const folderObjects = [];
    if (items) {
        items.forEach((item) => {
            if (item.types.includes(ns.ldp('Container').value)) {
                folderObjects.push({
                    host: url.parse(item.url).host,
                    name: decodeURIComponent(getFileOrFolderName(item.url)),
                    type: 'folder',
                    path: item.url.endsWith('/') ? item.url : item.url + '/',
                });
            } else {
                fileObjects.push({
                    host: url.parse(item.url).host,
                    name: decodeURIComponent(getFileOrFolderName(item.url)),
                    type: 'file',
                    fileType: getFileType(getFileOrFolderName(item.url)),
                    path: item.url,
                });
            }
        });
        return [...fileObjects, ...folderObjects];
    }
};

// input "fav.ico" returns "ico"
function getFileType(file) {
    const splittedFile = file.name ? file.name.split('.') : file.split('.');
    // no dot || nothing after dot
    if (
        splittedFile.length === 1 ||
        splittedFile[splittedFile.length - 1] === ''
    ) {
        return null;
    }
    return splittedFile[splittedFile.length - 1];
}

export const getFolderUrl = (folder) => {
    const folderFile = folder.split('/');
    folderFile.pop();
    const folderUrl = folderFile.join('/');
    return folderUrl;
};

export const deleteItems = (items) => {
    items.map((item) => {
        return deleteRecursively(item);
    });
    return Promise.all(items);
};

export const deleteRecursively = (url) => {
    return new Promise(function (resolve) {
        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);
        fetcher.load(url).then(function () {
            const promises = store
                .each(rdf.sym(url), ns.ldp('contains'))
                .map((file) => {
                    if (
                        store.holds(
                            file,
                            ns.rdf('type'),
                            ns.ldp('BasicContainer')
                        )
                    ) {
                        return deleteRecursively(file.uri);
                    } else {
                        return fetcher.webOperation('DELETE', file.uri);
                    }
                });
            Promise.all(promises).then(() => {
                fetcher.webOperation('DELETE', url).then(() => {
                    resolve();
                });
            });
        });
    });
};

export const getFolderFiles = (path) => {
    return getFolderContents(path).then((results) => {
        const folderFiles = { folders: [], files: [] };
        results.forEach((result) => {
            const resultFragments = result.split('/');
            if (resultFragments[resultFragments.length - 1] === '') {
                folderFiles['folders'].push(result);
            } else {
                folderFiles['files'].push(result);
            }
        });
        return folderFiles;
    });
};

export const syntaxCheckRdf = (input, contentType, url) => {
    contentType = contentType ? contentType : 'text/turtle';
    const rdfContentTypes = ['application/ld+json', 'text/turtle'];
    if (contentType && rdfContentTypes.indexOf(contentType) !== -1) {
        rdf.parse(input, rdf.graph(), url, contentType);
        return true;
    } else {
        return true;
    }
};

export const getFolderContents = (folderUrl) => {
    const store = rdf.graph();

    return auth
        .fetch(folderUrl, {
            headers: { Accept: 'text/turtle' },
        })
        .then((res) => {
            return res.text().then((body) => {
                rdf.parse(body, store, folderUrl, 'text/turtle');
                const containments = store
                    .each(rdf.sym(folderUrl), ns.ldp('contains'), undefined)
                    .map((containment) => {
                        return containment.value;
                    });
                return containments;
            });
        });
};

export const getNotificationFiles = (webId) => {
    const inboxAddress = webId.replace('profile/card#me', 'inbox');

    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);
    const as = new rdf.Namespace('https://www.w3.org/ns/activitystreams#');

    return fetcher.load(inboxAddress).then(() => {
        const containments = store
            .each(rdf.sym(inboxAddress), ns.ldp('contains'))
            .map((notification) => {
                const notificationAddress =
                    inboxAddress +
                    '/' +
                    notification.value.split('/')[3].replace('inbox', '');
                return fetcher
                    .load(notificationAddress)
                    .then((response) => {
                        const notification =
                            store.statementsMatching(
                                rdf.sym(notificationAddress),
                                ns.rdf('type'),
                                ns.solid('Notification')
                            )[0].subject.value ||
                            store.statementsMatching(
                                rdf.sym(notificationAddress),
                                ns.rdf('type'),
                                as('Announce')
                            )[0].subject.value;
                        return notification;
                    })
                    .catch((err) => {
                        return undefined;
                    });
            });
        return Promise.all(containments).then((results) => {
            const cleanResults = [];
            results.forEach((result) => {
                if (result) {
                    cleanResults.push(result);
                }
            });
            return cleanResults;
        });
    });
};

export const makeNotification = (notification, notificationAddress) => {
    const { actor, object, target } = notification;
    const store = rdf.graph();
    const as = new rdf.Namespace('https://www.w3.org/ns/activitystreams#');

    store.add(rdf.sym(notificationAddress), ns.rdf('type'), as('Announce'));
    store.add(
        rdf.sym(notificationAddress),
        ns.rdf('type'),
        ns.solid('Notification')
    );
    store.add(rdf.sym(notificationAddress), as('actor'), rdf.sym(actor));
    store.add(rdf.sym(notificationAddress), as('object'), rdf.sym(object));
    store.add(rdf.sym(notificationAddress), as('target'), rdf.sym(target));

    return rdf.serialize(undefined, store, notificationAddress);
};

export const sendNotification = (notifParams) => {
    const inboxAddress = notifParams.target.replace('profile/card#me', 'inbox');
    const notificationAddress = inboxAddress + `/Notif${Date.now()}`;
    const notification = makeNotification(notifParams, notificationAddress);
    const request = {
        method: 'PUT',
        headers: {
            'content-type': 'text/turtle',
            "slug": notificationAddress.replace(inboxAddress + '/', ''),
        },
        body: notification,
    };
    return auth.fetch(inboxAddress, request);
};

export default {
    getFolderUrl: getFolderUrl,
    getFolderContents: getFolderContents,
    uploadFile: uploadFile,
    deleteItems: deleteItems,
    getFolderFiles: getFolderFiles,
    getFileOrFolderName: getFileOrFolderName,
    deleteRecursively: deleteRecursively,
    getNotificationFiles: getNotificationFiles,
    sendNotification: sendNotification,
    getFileType: getFileType,
    convertResourceListToSearchOptions: convertResourceListToSearchOptions,
    namingConflict: namingConflict,
    getSuffixAndPlaceholder: getSuffixAndPlaceholder,
    addForDelete: addForDelete,
    allowFileName: allowFileName,
    isImageType: isImageType,
    syntaxCheckRdf: syntaxCheckRdf,
};
