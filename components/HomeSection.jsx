import block from 'module-clsx';
import Proptypes from 'proptypes';
import styles from '@/styles/homeSection.module.scss';
import Card from './Card';
import Carousel from './Carousel';

const clsx = block(styles);

function HomeSection({ title, list }) {
    return (
        <section className={clsx('wrapper')}>
            <h1 className={clsx('title')}>{title}</h1>
            <div className={clsx('list')}>
                <Carousel>
                    {list.map((movie) => {
                        return (
                            <div key={movie.id} className={clsx('poster-card')}>
                                <Card
                                    poster={movie.poster_path}
                                    name={movie.title || movie.name}
                                    release={movie.release_date || movie.first_air_date}
                                />
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </section>
    );
}

HomeSection.prototype = {
    title: Proptypes.string.isRequired,
    list: Proptypes.array.isRequired,
};

export default HomeSection;
