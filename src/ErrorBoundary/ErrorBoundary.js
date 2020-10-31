import React from 'react';
import styles from './ErrorBoundary.module.css';
import { Layout } from '../functional_components/Layout/Layout';
import mediumEmoji from '../assets/icons/medium_emoji.png';
import ActionButton from '../functional_components/ActionButton/ActionButton';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: '' };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.info(error, errorInfo);
        this.setState({ error: error.message });
        Sentry.withScope((scope) => {
            scope.setTag('environment', process.env.NODE_ENV);
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <Layout className={styles.container} label="Error">
                    <img className={styles.image} src={mediumEmoji} />
                    <p className={styles.infoText}>There was an error.</p>
                    <p className={styles.errorText}>
                        {this.state.error.toString()}
                    </p>
                    <ActionButton
                        onClick={() => window.location.reload()}
                        label="Reload Page"
                        color="blue"
                        size="sm"
                    />
                    <ActionButton
                        label="Report Feedback"
                        className={styles.feedbackButton}
                        color="white"
                        size="sm"
                        onClick={() =>
                            Sentry.showReportDialog({
                                eventId: this.state.eventId,
                            })
                        }
                    >
                        Report feedback
                    </ActionButton>
                </Layout>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
