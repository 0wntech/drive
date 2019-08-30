import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Navigation.module.css';
import Container from 'react-bootstrap/Container';
import defaultIcon from '../../assets/icons/defaultUserPic.png';

const Navigation = ({ picture, webId, onLogin, onLogout, toggleSidebar }) => {
    return (
        <Container>
            <Navbar className={styles.navbar} expand="lg">
                <div style={{ width: '100%' }}>
                    <Row>
                        <Col xs="6" sm="6" md="6" lg="6">
                            <Navbar.Brand href="/home" className={styles.brand}>
                                <img src="https://owntech.de/favicon.ico" />
                                <p>OWNDRIVE</p>
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
                                    <NavDropdown
                                        id="dropdown"
                                        alignRight
                                        className={[
                                            styles.dropdown,
                                            'float-right',
                                        ]}
                                    >
                                        <NavDropdown.Item href="home">
                                            Home
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="notifications">
                                            Notifications
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={onLogout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            ) : (
                                <div className={styles.loginButton}>
                                    <Link to="/login">Login</Link>
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </Navbar>
        </Container>
    );
};

export default Navigation;
