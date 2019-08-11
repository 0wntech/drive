import React from 'react';
import { connect } from 'react-redux';
import styles from './LoginScreen.module.css';
import RegisterForm from '../../functional_components/RegisterForm/RegisterForm';
import LoginForm from '../../functional_components/LoginForm/LoginForm';
import { fetchIdps } from '../../actions/UserActions';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAccount: {},
        };
    }

    componentDidMount() {
        const { register, loadIdps, idps, fetchIdps } = this.props;
        if (!register && !loadIdps && !idps) {
            fetchIdps();
        }
    }

    render() {
        const { register, idps } = this.props;
        return (
            <div className={styles.container}>
                <h1>{register ? '🚀' : '👋'}</h1>
                {register ? <RegisterForm /> : <LoginForm idps={idps} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        idps: state.app.idps,
        loadIdps: state.app.loadIdps,
    };
};

export default connect(
    mapStateToProps,
    { fetchIdps }
)(LoginScreen);
