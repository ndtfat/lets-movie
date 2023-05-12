import styles from '@/styles/filterOption.module.scss';
import block from 'module-clsx';
const clsx = block(styles);

import Proptypes from 'proptypes';
import { useEffect, useRef } from 'react';

function FilterOption({
    filter = 'filter',
    icon,
    list = [],
    radio = false,
    onFilter = () => {},
    onFilterReleaseFrom = () => {},
    onFilterReleaseTo = () => {},
    checkedList = [],
    release_from = '',
    release_to = '',
}) {
    const listRef = useRef();

    useEffect(() => {
        if (listRef.current) {
            listRef.current.style.width = `${Math.ceil(list.length / 7) * (140 + 20)}px`;

            if (list.length < 7) {
                listRef.current.style.height = `${(28 + 10) * list.length + 10}px`;
            }
        }
    }, [list]);

    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('title')}>
                <span className={clsx('icon')}>{icon}</span>
                <h2 className={clsx('name')}>{filter}</h2>
            </div>
            {filter === 'Release' ? (
                <div className={clsx('release-input')}>
                    <div>
                        <label htmlFor="from">From</label>
                        <input
                            id="from"
                            type="date"
                            value={release_from}
                            onInput={(e) => onFilterReleaseFrom(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="to">To</label>
                        <input
                            id="to"
                            type="date"
                            value={release_to}
                            onInput={(e) => onFilterReleaseTo(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <ul className={clsx('list')} ref={listRef}>
                    {list.map((item) => (
                        <li key={item.name || item.type}>
                            <input
                                id={item.name || item.type}
                                checked={checkedList.includes(item.id)}
                                className={clsx('checkbox')}
                                type={radio ? 'radio' : 'checkbox'}
                                onChange={() => onFilter(item.id)}
                            />
                            <label htmlFor={item.name || item.type} className={clsx('option')}>
                                {item.name || item.type}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

FilterOption.proptypes = {
    filter: Proptypes.string.isRequired,
    icon: Proptypes.node.isRequired,
    list: Proptypes.array,
    onFilter: Proptypes.func,
    onFilterReleaseFrom: Proptypes.func,
    onFilterReleaseTo: Proptypes.func,
    checkedList: Proptypes.array,
};

export default FilterOption;
