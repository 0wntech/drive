import React from 'react';
import styles from './LandingPage.module.css';
import Slogan from '../../assets/svgIcons/Slogan';
import { ActionButton } from '../../functional_components/ActionButton/ActionButton';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId,
        };
    }

    render() {
        return (
            <div className={styles.grid}>
                <div className={styles.mainArea}>
                    <div className={styles.container}>
                        <Slogan width="100%" viewBox="0 0 971 219" />
                        <div className={styles.buttons}>
                            <ActionButton label="Register" color="green" />
                            <p>or</p>
                            <ActionButton label="Login" color="blue" />
                        </div>
                    </div>
                    {/* <a className={styles.homeButton} href="/home">
                        Get Home
                    </a> */}
                </div>
            </div>
        );
    }
}

export default LandingPage;
