import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Navigation.module.css';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import FileIcon from '../../assets/icons/File.png';
import FolderIcon from '../../assets/icons/Folder.png';
import fileUtils from '../../utils/fileUtils';
import { setCurrentPath } from '../../actions/UserActions';

const Navigation = ({
    picture,
    webId,
    onLogin,
    onLogout,
    toggleSidebar,
    currentItems,
    currentPath,
    setCurrentPath,
}) => {
    const items = currentItems
        ? fileUtils.convertFilesAndFoldersToObject(
              currentItems.files,
              currentItems.folders
          )
        : null;

    const formatOptionLabel = ({ value, label, name, type }) => (
        <div
            className={styles.optionContainer}
            onClick={
                type === 'folder'
                    ? () => {
                          setCurrentPath(`${currentPath}/${name}/`);
                      }
                    : () => {
                          console.log('Implement Redux File onClickbehavior');
                      }
            }
        >
            <img
                className={styles.optionIcon}
                src={type === 'file' ? FileIcon : FolderIcon}
            />
            <span>{name}</span>
        </div>
    );

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
                        <Col
                            xs={{ span: 3, offset: 1 }}
                            sm={{ span: 3, offset: 1 }}
                            md={{ span: 3, offset: 1 }}
                            lg={{ span: 3, offset: 1 }}
                        >
                            {currentItems ? (
                                <div className={styles.verticalCenter}>
                                    <SearchDropdown
                                        formatOptionLabel={formatOptionLabel}
                                        items={items.map((item) => ({
                                            ...item,
                                            value: item.name,
                                            label: item.label,
                                        }))}
                                    />
                                </div>
                            ) : null}
                        </Col>
                        <Col xs="2" sm="2" md="2" lg="2">
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
            </Navbar>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        currentItems: state.app.currentItems,
        currentPath: state.app.currentPath,
    };
};
export default connect(
    mapStateToProps,
    { setCurrentPath }
)(Navigation);
