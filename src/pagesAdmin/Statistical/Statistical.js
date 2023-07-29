import classNames from 'classnames/bind';
import styles from './Statistical.module.scss';

import TopUser from './TopUser';
import TotalUser from './TotalUser';
import TotalRevenue from './TotalRevenue';
import TopProduct from './TopProduct';
import TotalProduct from './TotalProduct';
import TotalOrder from './TotalOrder';
import AnalyticsRevenue from './AnalyticsRevenue';

import axios from 'axios';
import { apiUrl } from '~/contexts/constants';
import { useEffect, useState } from 'react';


const cx = classNames.bind(styles);

function Statistical() {

    const [dataStatistical, setDataStatistical] = useState({
        top10User: [],
        top10Product: [],
        totalUser: [],
        totalProduct: [],
        totalRevenue: [],
        totalOrder: [],
        analytics: [],
    });

    const getData = async () => {
        const top10User = await axios.get(`${apiUrl}/admin/statistical/top10User`);
        const top10Product = await axios.get(`${apiUrl}/admin/statistical/top10Product`);
        const totalUser = await axios.get(`${apiUrl}/admin/statistical/totalUser`);
        const totalProduct = await axios.get(`${apiUrl}/admin/statistical/totalProduct`);
        const totalRevenue = await axios.get(`${apiUrl}/admin/statistical/totalRevenue`);
        const totalOrder = await axios.get(`${apiUrl}/admin/statistical/totalOrder`);
        const analytics = await axios.get(`${apiUrl}/admin/statistical/analytics`);


        if(analytics.data.success && totalOrder.data.success && totalRevenue.data.success && totalProduct.data.success && totalUser.data.success && top10User.data.success && top10Product.data.success){
            setDataStatistical({
                ...dataStatistical,
                analytics: analytics.data.analytics,
                totalOrder: totalOrder.data.order,
                totalRevenue: totalRevenue.data.order,
                totalUser: totalUser.data.user,
                totalProduct: totalProduct.data.product,
                top10User: top10User.data.user,
                top10Product: top10Product.data.product,
            });
        }


    }

    useEffect(() => {
        getData();
    }, [])


    return <div className={cx('wrapper')}>
        <div className={cx('home')}>
            <div className={cx('box', 'box-1')}><TopUser data={dataStatistical.top10User} /></div>
            <div className={cx('box', 'box-2')}><TotalUser data={dataStatistical.totalUser} /></div>
            <div className={cx('box', 'box-3')}><TotalRevenue data={dataStatistical.totalRevenue} /></div>
            <div className={cx('box', 'box-4')}><TopProduct data={dataStatistical.top10Product} /></div>
            <div className={cx('box', 'box-5')}><TotalProduct data={dataStatistical.totalProduct} /></div>
            <div className={cx('box', 'box-6')}><TotalOrder data={dataStatistical.totalOrder} /></div>
            <div className={cx('box', 'box-7')}><AnalyticsRevenue data={dataStatistical.analytics} /></div>
        </div>
    </div>;
}

export default Statistical;