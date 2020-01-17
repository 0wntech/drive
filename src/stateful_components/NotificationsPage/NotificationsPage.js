import React from 'react';
import rdf from 'rdflib';
import styles from './NotificationsPage.module.css';
import { Notification } from '../../functional_components/Notification';
import { connect } from 'react-redux';
import { fetchNotifications } from '../../actions/appActions';
import fileUtils from '../../utils/fileUtils';
const ns = require('solid-namespace')(rdf);

class NotificationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId, // anti pattern, da props.notification immer den global state beinhaltet und somit lokaler state hinfällig ist
            notifications: props.notifications, // anti pattern, da props.notification immer den global state beinhaltet und somit lokaler state hinfällig ist
        };
    }

    componentDidMount() {
        console.log(ns.ldp('contains'));
        const { notifications, webId } = this.props;
        if (notifications) {
            console.log(notifications);
        } else if (webId) {
            fileUtils.getNotificationFiles(webId).then((notifications) => {
                console.log(notifications);
            });
            fetchNotifications(webId);
        }
    }

    getNotificationContent(notification) {
        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);
        const preq = new rdf.Namespace(
            'https://a-solid-web.github.io/permission-ontology/permissionrequests.rdf#'
        );

        return fetcher.load(notification).then(() => {
            const sender = store.any(
                rdf.sym(notification),
                preq('requestFrom')
            );

            if (!sender) {
                return;
            }

            const requestType = store.any(
                rdf.sym(notification),
                preq('requestDataType')
            );
            const requestTypeValue = requestType.value.split('#')[1];

            const requestedRessource = store.any(
                rdf.sym(notification),
                preq('requests')
            );
            const requestedRessourceValue = requestedRessource.value;

            const created = store.any(rdf.sym(notification), preq('wasSentOn'));
            const createdValue = created ? created.value : '';

            const expires = store.any(rdf.sym(notification), preq('expires'));
            const expiresValue = expires ? expires.value : '';

            const requestStatus = store.any(
                rdf.sym(notification),
                preq('hasStatus')
            );
            const requestStatusValue = requestStatus ? requestStatus.value : '';

            const privacyRisk = store.any(
                rdf.sym(notification),
                preq('privacyRisklevel')
            );
            const privacyRiskValue = privacyRisk
                ? 'There is a ' + privacyRisk.value + ' privacy Risk'
                : '';

            const financialRisk = store.any(
                rdf.sym(notification),
                preq('financialRisklevel')
            );
            const financialRiskValue = financialRisk
                ? 'There is a ' + financialRisk.value + 'financial Risk'
                : '';

            const legalRisk = store.any(
                rdf.sym(notification),
                preq('legalRisklevel')
            );
            const legalRiskValue = legalRisk
                ? 'There is a ' + legalRisk.value + 'legal Risk'
                : '';

            const requestIntent = store.any(
                rdf.sym(notification),
                preq('hasIntent')
            );
            const requestIntentValue = requestIntent
                ? requestIntent.value.split('#')[1]
                : '';

            if (!requestIntentValue) {
                return;
            }

            return {
                sender: sender.value,
                type: requestTypeValue,
                intent: requestIntentValue,
                ressource: requestedRessourceValue,
                created: createdValue,
                expires: expiresValue,
                status: requestStatusValue,
                risks: [privacyRiskValue, financialRiskValue, legalRiskValue],
            };
        });
    }

    // componentDidMount() {
    //     const { fetchNotifications, webId } = this.props;
    //     if (webId && fetchNotifications) {
    //         console.log(webId, fetchNotifications);
    //         fetchNotifications(webId).then((results) => {
    //             results.map((notification) => {
    //                 this.getNotificationContent(notification).then(
    //                     (content) => {
    //                         console.log(content);
    //                     }
    //                 );
    //             });
    //         });
    //     }
    // }

    render() {
        const { notifications } = this.props;
        if (notifications) {
            console.log(notifications);
        }
        return (
            <div className={styles.container}>
                <h3>Notifications</h3>
                <Notification
                    picture="https://ludwigschubert.solid.community/profile/aa.jpeg"
                    actor="ludwigschubert"
                    description="Wants to send you a picture"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        webId: state.user.webId,
        loadNotifications: state.app.loadNotifications,
        notifications: state.app.notifications,
    };
};

export default connect(mapStateToProps, { fetchNotifications })(
    NotificationsPage
);
