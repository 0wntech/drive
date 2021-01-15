import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import styles from './SearchInput.module.scss';

import X from '../../assets/svgIcons/X';
import { withRouter } from 'react-router-dom';

export const SearchInput = ({
    indicator,
    className,
    placeholder,
    history,
    resetError,
}) => {
    const [focused, setFocused] = useState(false);
    const [originalPath, setOriginalPath] = useState('');
    const [value, setValue] = useState('');
    useEffect(() => {
        if (!originalPath && history.location.pathname.startsWith('/search')) {
            const query = new URLSearchParams(history.location.search).get('q');
            setValue(query);
        }
    }, [history.location, originalPath]);
    return (
        <div
            className={classnames(styles.container, className, {
                [styles.focused]: focused,
            })}
            onClick={(e) => {
                resetError();
                if (e.target.nodeName === 'INPUT') {
                    setFocused(true);
                    history.push(`/search?q=${value}`);
                } else {
                    if (!window.location.pathname.startsWith('/search')) {
                        setOriginalPath(history.location.pathname);
                    }
                }
            }}
        >
            <div className={styles.indicator}>{indicator}</div>
            <input
                data-test-id="search-input"
                onBlur={() => {
                    setFocused(false);
                }}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    history.push(`/search?q=${e.target.value}`);
                }}
                className={styles.input}
                placeholder={placeholder}
                type="text"
            />
            <div
                className={classnames(styles.clearable, {
                    [styles.empty]: !value,
                })}
                onClick={() => {
                    if (window.location.pathname.startsWith('/search'))
                        if (originalPath) {
                            history.push(originalPath);
                        } else {
                            history.push('/home');
                        }
                    setFocused(focused);
                    setValue('');
                }}
            >
                <X width={24} height={24} viewBox="0 0 32 32" />
            </div>
        </div>
    );
};

export default withRouter(SearchInput);
