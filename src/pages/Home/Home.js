import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import slide from '~/assets/imgs/slide.png';
import CollectionNew from './CollectionNew';
import Interested from './Interested';
import FindBrand from './FindBrand';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Home() {
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return <div className={cx('wrapper')}>
        <img className={cx('img-slide')} alt='slide' src={slide} />
        <CollectionNew />
        <Interested />
        <FindBrand />
    </div>;
}

export default Home;