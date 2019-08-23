import rdf from 'rdflib';
import auth from 'solid-auth-client';
const ns = require('solid-namespace')(rdf);

function getContentType(file) {
    const mimeTypes = {
        py: 'application/x-python-code',
        jpeg: 'image',
        png: 'image',
        ico: 'image',
        mp3: 'audio',
        html: 'text/html',
        xml: 'text/xml',
        ttl: 'text/turtle',
        css: 'text/css',
        txt: 'text/plain',
    };

    if (file.split('.').length > 1) {
        const fileFragments = file.split('.');
        const fileSuffix = fileFragments[fileFragments.length - 1];
        return fileSuffix in mimeTypes ? mimeTypes[fileSuffix] : 'unknown';
    } else {
        return 'folder';
    }
}

function uploadFolderOrFile(file, url) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    const fileType = file.type ? file.type : 'text/plain';

    return new Promise(function(resolve) {
        const reader = new FileReader();
        reader.onload = function() {
            const data = this.result;

            fetcher
                .webOperation('PUT', url, {
                    data: data,
                    contentType: fileType,
                })
                .then((response) => {
                    if (response.status === 201) {
                        console.log('Successfully uploaded!');
                        resolve('Success');
                    }
                });
        };
        reader.readAsArrayBuffer(file);
    });
}

function uploadFile(filePath, currPath) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    const reader = new FileReader();
    reader.onload = function() {
        const data = this.result;
        const filename = encodeURIComponent(filePath.name);
        const contentType = getContentType(filePath.name);

        const fileUrl = currPath + filename;
        return fetcher
            .webOperation('PUT', fileUrl, {
                data: data,
                contentType: contentType,
            })
            .then((response) => {
                if (response.status === 201) {
                    console.log('Successfully uploaded!');
                }
            });
    };
    return new Promise(function(resolve, reject) {
        reader.readAsArrayBuffer(filePath);
    });
}

// input files = ["example.ico", "anotherItem.png"] folders = ["folder", "folder1"]
// returns [ {name: "example.ico", type: "file", fileType:"ico"}, { name: "folder", type: "folder"} ]
function convertFilesAndFoldersToObject(files, folders) {
    const fileObjects = files.map((fileName) => {
        return {
            name: fileName,
            type: 'file',
            fileType: getFileType(fileName),
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

// input "fav.ico" returns "ico"
function getFileType(file) {
    const splittedFile = file.split('.');
    // no dot || nothing after dot
    if (
        splittedFile.length === 1 ||
        splittedFile[splittedFile.length - 1] == ''
    ) {
        return null;
    }
    return splittedFile[splittedFile.length - 1];
}

function isFolder(url) {
    if (url[url.length - 1] === '/') {
        return true;
    } else {
        return false;
    }
}

function getFolderUrl(folder) {
    const folderFile = folder.split('/');
    folderFile.pop();
    const folderUrl = folderFile.join('/');
    return folderUrl;
}

function deleteItems(items) {
    const deletions = [];
    if (Array.isArray(items)) {
        items.forEach((item) => {
            if (!isFolder(item)) {
                deletions.push(auth.fetch(item, { method: 'DELETE' }));
            } else {
                return getFolderTree(item).then((results) => {
                    console.log(results);
                    return Promise.all(
                        results.map((result, index) => {
                            if (index !== results.length) {
                                return auth.fetch(result, { method: 'DELETE' });
                            }
                        })
                    ).then(() => {
                        console.log(
                            'Delete root folder',
                            results[results.length - 1]
                        );
                        return auth
                            .fetch(results[results.length - 1], {
                                method: 'DELETE',
                            })
                            .then(() => {
                                window.location.href = window.location.href;
                            });
                    });
                });
            }
        });
    } else {
        deletions.push(auth.fetch(items, { method: 'DELETE' }));
    }

    return Promise.all(deletions);
}

function hasArray(fileList) {
    for (let i = 0; i < fileList.length; i++) {
        if (Array.isArray(fileList[i])) {
            return true;
        }
    }
    return false;
}

function getFolderTree(folderUrl) {
    return getFolderContents(folderUrl)
        .then((folder) => {
            const fileList = [];
            for (let i = 0; i < folder.length; i++) {
                if (isFolder(folder[i])) {
                    fileList.push(Promise.resolve(getFolderTree(folder[i])));
                } else {
                    fileList.push(
                        new Promise(function(resolve) {
                            resolve(folder[i]);
                        })
                    );
                }
            }

            fileList.push(
                new Promise(function(resolve) {
                    resolve(folderUrl);
                })
            );
            return Promise.all(fileList);
        })
        .then(function(results) {
            while (hasArray(results)) {
                const nextResult = results.shift();
                if (Array.isArray(nextResult)) {
                    nextResult.forEach((result) => {
                        results.push(result);
                    });
                } else {
                    results.push(nextResult);
                }
            }
            return results.sort(sortByDepth).reverse();
        });
}

function deleteRecursively(url) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);
    return new Promise(function(resolve, reject) {
        fetcher.load(url).then(function(response) {
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
            promises.push(fetcher.webOperation('DELETE', url));
            Promise.all(promises).then((res) => {
                resolve();
            });
        });
    });
}

function sortByDepth(fileA, fileB) {
    const depthA = fileA.split('/').length;
    const depthB = fileB.split('/').length;

    return depthA - depthB;
}

function getFolderFiles(path) {
    return getFolderContents(path).then((results) => {
        const folderFiles = { folders: [], files: [] };
        results.forEach((result) => {
            const resultFragments = result.split('/');
            if (resultFragments[resultFragments.length - 1] == '') {
                folderFiles['folders'].push(result);
            } else {
                folderFiles['files'].push(result);
            }
        });
        return folderFiles;
    });
}

function getFolderContents(folderUrl) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    return fetcher
        .load(folderUrl)
        .then(function() {
            console.log(
                store.each(rdf.sym(folderUrl), ns.ldp('contains'), undefined)
            );
            const containments = store
                .each(rdf.sym(folderUrl), ns.ldp('contains'), undefined)
                .map((containment) => {
                    return containment.value;
                });
            return containments;
        })
        .catch((err) => {
            return [];
        });
}

function getNotificationFiles(webId) {
    const inboxAddress = webId.replace('profile/card#me', 'inbox');

    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);
    const as = new rdf.Namespace('https://www.w3.org/ns/activitystreams#');
    fetcher
        .load('https://ludwigschubert.owntech.de/inbox/Notif1564398405376.ttl')
        .then((response) => {
            console.log(response.responseText);
        });

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
                        console.log(response);
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
            slug: notificationAddress.replace(inboxAddress + '/', ''),
        },
        body: notification,
    };
    console.log(request);
    return auth.fetch(inboxAddress, request);
}

function changeAccess(item) {
    console.log(item);
}

function getInfo(item) {
    console.log(item);
}

function renameFile(item) {
    console.log(item);
}

export default {
    getFolderUrl: getFolderUrl,
    uploadFile: uploadFile,
    getContentType: getContentType,
    getFolderContents: getFolderContents,
    getFolderTree: getFolderTree,
    uploadFolderOrFile: uploadFolderOrFile,
    deleteItems: deleteItems,
    changeAccess: changeAccess,
    getInfo: getInfo,
    renameFile: renameFile,
    hasArray: hasArray,
    getFolderFiles: getFolderFiles,
    deleteRecursively: deleteRecursively,
    getNotificationFiles: getNotificationFiles,
    sendNotification: sendNotification,
    getFileType: getFileType,
    convertFilesAndFoldersToObject: convertFilesAndFoldersToObject,
};
