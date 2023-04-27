import { useRef, useEffect } from 'react';
import Proptypes from 'proptypes';
import Image from 'next/image';
import logoImg from '@/public/logo.png';

function Logo({ width = 290, height = 196, fit = 'fill', ...props }) {
    const logoRef = useRef();

    useEffect(() => {
        const { current: logo } = logoRef;

        logo.style.width = width + 'px';
        logo.style.height = height + 'px';
        logo.style.objectFit = fit;
    }, [width, height, fit]);

    return <Image {...props} ref={logoRef} priority src={logoImg} alt="logo"></Image>;
}

Logo.prototype = {
    width: Proptypes.number,
    height: Proptypes.number,
    fit: Proptypes.string,
};

export default Logo;
