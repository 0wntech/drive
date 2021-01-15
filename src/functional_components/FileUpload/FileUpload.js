import React from 'react';
import { connect } from 'react-redux';

export const FileUpload = ({
    folder,
    children,
    onChange,
    className,
    currentPath,
}) => {
    return (
        <label
            className={className}
            style={{ marginBottom: 0, display: 'flex' }}
            htmlFor={folder ? 'folderUpload' : 'fileUpload'}
        >
            {children}
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files) {
                        onChange(e, currentPath);
                    }
                }}
                {...(folder
                    ? {
                          webkitdirectory: 'true',
                          directory: 'true',
                          multiple: true,
                      }
                    : {})}
                style={{ display: 'none' }}
                id={folder ? 'folderUpload' : 'fileUpload'}
                accept="*/*"
            />
        </label>
    );
};

const mapStateToProps = (state) => {
    return {
        currentPath: state.app.currentPath,
    };
};

export default connect(mapStateToProps, {})(FileUpload);
