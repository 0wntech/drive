import { useRef, useState, useEffect } from 'react';

export default () => {
    const [height, setHeight] = useState(0);
    const ref = useRef(null);
    useEffect(() => setHeight(ref.current.clientHeight));
    return [ref, height];
};
