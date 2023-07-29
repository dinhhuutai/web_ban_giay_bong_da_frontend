import classNames from 'classnames/bind';
import styles from './TotalRevenue.module.scss';

import { AiFillSignal } from "react-icons/ai";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";


const cx = classNames.bind(styles);

function TotalRevenue({data}) {
    return <div className={cx('wrapper')}>
        <div className={cx('wrapper-title')}>
            <div className={cx('icon-title')}><AiFillSignal /></div>
            Total Revenue
        </div>

        <div className={cx('wrapper-main')}>
            <div className={cx('wrapper-total')}>
                <div className={cx('total')}>{data.totalOrder && (data.totalOrder / 1000).toLocaleString()}k</div>
                <div className={cx('label')}>View all</div>
            </div>
            <div className={cx('wrapper-chart')}>
                <div className={cx('chart')}>
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={data.data}>
                            <Tooltip 
                                contentStyle={{background: "transparent", border: "none", fontSize: "1.2rem"}}
                                labelStyle={{display: "none"}}
                                position={{x: 40, y: -40}}
                            />
                            <Line dot={false} type="monotone" dataKey="sl" stroke="#8884d8" strokeWidth={1.5} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={cx('wrapper-text')}>
                    <div className={cx('percent', data.percent < 0 ? 'red' : '')}>{data.percent > 0 ? data.percent : 0 - data.percent}%</div>
                    <div className={cx('text')}>this month</div>
                </div>
            </div>
        </div>
    </div>;
}

export default TotalRevenue;