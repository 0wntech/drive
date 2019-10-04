import React from 'react';

const FileUpload = ({ folder, children, onChange }) => {
    return (
        <label
            style={{ marginBottom: 0, display: 'flex' }}
            htmlFor={folder ? 'folderUpload' : 'fileUpload'}
        >
            {children}
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files) {
                        console.log(e);
                        onChange(e);
                    }
                }}
                webkitdirectory={folder ? 'true' : undefined}
                mozdirectory={folder ? 'true' : undefined}
                msdirectory={folder ? 'true' : undefined}
                odirectory={folder ? 'true' : undefined}
                directory={folder ? 'true' : undefined}
                multiple={folder ? true : false}
                style={{ display: 'none' }}
                id={folder ? 'folderUpload' : 'fileUpload'}
                accept="*/*"
            />
        </label>
    );
};

export default FileUpload;
