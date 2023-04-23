import { useEffect, useRef } from 'react';
import Proptypes from 'proptypes';
import block from 'module-clsx';
import styles from '@/styles/button.module.scss';

const clsx = block(styles);

function Button({ children, size, border, bold, solid = false, ...props }) {
    const className = clsx('btn', { solid, border, bold });
    const btnRef = useRef();

    useEffect(() => {
        const btnElement = btnRef.current;
        console.log(btnElement.style);
        btnElement.style.fontSize = size && `${size}px`;
    }, [size, solid]);

    return (
        <button ref={btnRef} className={className} {...props}>
            {children}
        </button>
    );
}

Button.proptypes = {
    children: Proptypes.any.isRequired,
    size: Proptypes.number,
    border: Proptypes.bool,
    bold: Proptypes.bool,
    solid: Proptypes.bool,
};

export default Button;
