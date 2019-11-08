import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

export const FileView = (props) => {
    const [file, setFile] = useState('');
    useEffect(() => {
        setFile(props.file);
    });
    return <div>{file}</div>;
};

const mapStateToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    {}
)(FileView);
