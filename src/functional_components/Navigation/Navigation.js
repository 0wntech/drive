import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Navigation.module.css';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import Select from 'react-select';

const DROPDOWN_OPTIONS = [
    { value: () => console.log('test'), label: 'LogTest' },
    { value: 'anderer', label: 'LogTest2' },
];

const Navigation = ({
    picture,
    webId,
    onLogin,
    onLogout,
    toggleSidebar,
    username,
}) => {
    return (
        <div className={styles.container}>
            <div style={{ width: '100%' }}>
                <Row>
                    <Col xs="6" sm="6" md="6" lg="6">
                        <Navbar.Brand href="/home" className={styles.brand}>
                            <img src="https://owntech.de/favicon.ico" />
                        </Navbar.Brand>
                        {/* <NavLink to="/home">HOME</NavLink> */}
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="6">
                        {webId ? (
                            <div className={styles.menuWrapper}>
                                {picture ? (
                                    <div
                                        onClick={toggleSidebar}
                                        className={styles.profileIcon}
                                        style={{
                                            backgroundImage:
                                                'url(' + picture + ')',
                                        }}
                                    />
                                ) : (
                                    <img
                                        onClick={toggleSidebar}
                                        className={styles.profileIcon}
                                        src={defaultIcon}
                                    />
                                )}
                                <div className={styles.username}>
                                    {username}
                                </div>
                                <Select options={DROPDOWN_OPTIONS} />
                            </div>
                        ) : (
                            <div className={styles.loginButton}>
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onLogin();
                                    }}
                                >
                                    Login
                                </a>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Navigation;
