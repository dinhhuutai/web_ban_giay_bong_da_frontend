import classNames from 'classnames/bind';
import styles from './AnalyticsRevenue.module.scss';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const cx = classNames.bind(styles);

function AnalyticsRevenue({data}) {

    return <div className={cx('wrapper')}>
        <div className={cx('title')}>Revenue Analytics</div>
        <div className={cx('analytics')}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" fontSize="1.2rem" />
                    <YAxis fontSize="1.2rem" />
                    <Tooltip
                        contentStyle={{background: "transparent", border: "none", fontSize: "1.2rem"}}
                        position={{x: 300, y: -50}}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>;
}

export default AnalyticsRevenue;