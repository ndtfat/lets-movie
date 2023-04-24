'use client';

/*

NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.

*/

import { usePathname } from 'next/navigation';
import Link from 'next/link';

function NavLink({ href, activeClassName, children, ...props }) {
    const pathname = usePathname();
    const active = ` ${activeClassName}`;
    const isActive = activeClassName ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += active;
    }

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}

export default NavLink;
