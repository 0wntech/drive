import React from 'react';
// import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

export const FileView = ({ currentItem }) => {
    // const [file, setFile] = useState('');
    // useEffect(() => {
    //     setFile();
    // });
    return <div>{currentItem ? currentItem.body : 'empty file'}</div>;
};

const mapStateToProps = (state) => {
    return { currentItem: state.app.currentItem };
};

export default connect(
    mapStateToProps,
    {}
)(FileView);
