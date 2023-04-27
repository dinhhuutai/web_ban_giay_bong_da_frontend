import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    
    const [scrollTop, setScrollTop] = useState(0);


    useEffect(() => {
      const handleScroll = event => {
        setScrollTop(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });

    return (
        <div className={cx('wrapper')}>
            <Header scrollTop={scrollTop} />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;