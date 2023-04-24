import { useEffect, useRef } from 'react';
import Proptypes from 'proptypes';
import block from 'module-clsx';
import styles from '@/styles/button.module.scss';

const clsx = block(styles);

function Button({ children, size, border = false, bold = false, solid = false, className, ...props }) {
    const btnClassName = `${clsx('btn', { solid, border, bold })} ${className}`;
    const btnRef = useRef();

    useEffect(() => {
        const btnElement = btnRef.current;
        btnElement.style.fontSize = size && `${size}px`;
    }, [size, solid]);

    return (
        <button ref={btnRef} className={btnClassName} {...props}>
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
