const { useEffect, useState } = require('react');

const useDebounce = (value, delay) => {
    const [debouceValue, setDebounceValue] = useState();

    useEffect(() => {
        const timeId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timeId);
        };
    }, [value, delay]);

    return debouceValue;
};

export default useDebounce;
