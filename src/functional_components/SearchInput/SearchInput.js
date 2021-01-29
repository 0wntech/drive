import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import styles from './SearchInput.module.scss';

import X from '../../assets/svgIcons/X';
import size from '../../styles/constants.scss';
import useWindowDimensions from '../../hooks/useWindowDimension';

export const SearchInput = ({
    indicator,
    className,
    placeholder,
    history,
    resetError,
}) => {
    // eslint-disable-next-line no-unused-vars
    const { _, width } = useWindowDimensions();
    const isMobile = width < size.screen_l;
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(
        isMobile && !!new URLSearchParams(history.location.search).get('q')
    );
    const [originalPath, setOriginalPath] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!originalPath && history.location.pathname.startsWith('/search')) {
            const query = new URLSearchParams(history.location.search).get('q');
            setValue(query);
        }
    }, [history.location, originalPath]);

    useEffect(() => {
        if (!history.location.pathname.startsWith('/search')) {
            setFocused(false);
        }
    }, [history.location]);

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
            <div
                className={styles.indicator}
                onClick={() => {
                    if (isMobile) {
                        setFocused(true);
                        history.push(`/search?q=${value}`);
                    }
                }}
                onBlur={() => {
                    if (isMobile) {
                        setFocused(false);
                    }
                }}
            >
                {indicator}
            </div>
            <input
                data-test-id="search-input"
                ref={inputRef}
                onBlur={() => {
                    if (!isMobile) {
                        setFocused(false);
                    }
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
                    [styles.empty]: isMobile ? !focused : !value,
                })}
                onClick={() => {
                    if (isMobile) {
                        setFocused(false);
                    }
                    if (window.location.pathname.startsWith('/search'))
                        if (originalPath) {
                            history.push(originalPath);
                        } else {
                            history.push('/home');
                        }
                    setFocused(false);
                    setValue('');
                }}
            >
                <X width={24} height={24} viewBox="0 0 32 32" />
            </div>
        </div>
    );
};

export default withRouter(SearchInput);
