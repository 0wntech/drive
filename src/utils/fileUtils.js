import * as rdf from 'rdflib';
import auth from 'solid-auth-client';
import url from 'url';
import mime from 'mime';
const ns = require('solid-namespace')(rdf);

function allowFileName(fileName, currentFolder, fileSuffix) {
    if (fileName == '') {
        return false;
    }

    const re = new RegExp('^[a-zA-Z0-9]*$');

    if (currentFolder && fileSuffix) {
        if (namingConflict(`${fileName}.${fileSuffix}`, currentFolder))
            return false;
    }
    return !!re.exec(fileName) || mime.getType(fileName);
}

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

function namingConflict(name, currentFolder) {
    if (currentFolder) {
        if (currentFolder.files.indexOf(name) !== -1) {
            return true;
        } else if (currentFolder.folders.indexOf(name) !== -1) {
            return true;
        }
        return false;
    }
}

function getSuffixAndPlaceholder(placeholder) {
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
}

function uploadFile(file, currPath) {
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
                });
        };
        reader.readAsArrayBuffer(file);
    });
}

function getFileOrFolderName(url) {
    const itemFragments = url.split('/');
    return itemFragments[itemFragments.length - 1] === ''
        ? itemFragments[itemFragments.length - 2]
        : itemFragments[itemFragments.length - 1];
}

// input files = ["example.ico", "anotherItem.png"] folders = ["folder", "folder1"]
// returns [ {name: "example.ico", type: "file", fileType:"ico"}, { name: "folder", type: "folder"} ]
function convertFilesAndFoldersToArray({ files, folders, items }) {
    if (items) {
        const fileObjects = [];
        const folderObjects = [];
        items.forEach((item) => {
            if (item.endsWith('/')) {
                folderObjects.push({
                    name: getFileOrFolderName(item),
                    type: 'folder',
                    path: item,
                });
            } else {
                fileObjects.push({
                    name: getFileOrFolderName(item),
                    type: 'file',
                    fileType: getFileType(getFileOrFolderName(item)),
                    path: item,
                });
            }
        });
        return [...fileObjects, ...folderObjects];
    } else {
        const fileObjects = files.map((file) => {
            return {
                name: file.name ? file.name : file,
                type: 'file',
                fileType: getFileType(file),
            };
        });

        const folderObjects = folders.map((folderName) => {
            return {
                name: folderName,
                type: 'folder',
            };
        });
        return [...fileObjects, ...folderObjects];
    }
}

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

function getFolderUrl(folder) {
    const folderFile = folder.split('/');
    folderFile.pop();
    const folderUrl = folderFile.join('/');
    return folderUrl;
}

function deleteItems(items) {
    items.map((item) => {
        return deleteRecursively(item);
    });
    return Promise.all(items);
}

function deleteRecursively(url) {
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
}

function getFolderFiles(path) {
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
}

function syntaxCheckRdf(input, contentType, url) {
    contentType = contentType ? contentType : 'text/turtle';
    const rdfContentTypes = ['application/ld+json', 'text/turtle'];
    if (contentType && rdfContentTypes.indexOf(contentType) !== -1) {
        rdf.parse(input, rdf.graph(), url, contentType);
        return true;
    } else {
        return true;
    }
}

function getFolderContents(folderUrl) {
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
}

function getNotificationFiles(webId) {
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
}

function makeNotification(notification, notificationAddress) {
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
}

function sendNotification(notifParams) {
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
}

export default {
    getFolderUrl: getFolderUrl,
    getFolderContents: getFolderContents,
    uploadFile: uploadFile,
    deleteItems: deleteItems,
    getFolderFiles: getFolderFiles,
    deleteRecursively: deleteRecursively,
    getNotificationFiles: getNotificationFiles,
    sendNotification: sendNotification,
    getFileType: getFileType,
    convertFilesAndFoldersToArray: convertFilesAndFoldersToArray,
    namingConflict: namingConflict,
    getSuffixAndPlaceholder: getSuffixAndPlaceholder,
    addForDelete: addForDelete,
    allowFileName: allowFileName,
    isImageType: isImageType,
    syntaxCheckRdf: syntaxCheckRdf,
};
