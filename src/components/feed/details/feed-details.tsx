import {useMemo} from "react";
import {useSelector} from "../../../services/store.ts";
import {getFeed} from "../../../services/feed/feed-slice.ts";
import styles from './feed-details.module.css'


const FeedDetails = () => {
    const orders = useSelector(getFeed);

    const doneOrders = useMemo<TFeedItem[]>(() => {
        return orders.filter((order) => order.status === 'done').slice(0, 10)
    }, [orders]);

    const pendingOrders = useMemo<TFeedItem[]>(() => {
        return orders.filter((order) => order.status === 'pending').slice(0, 10)
    }, [orders]);

    const total = useSelector(state => state.feed.total);
    const totalToday = useSelector(state => state.feed.totalToday);

    return (
        <div className={styles.wrapper}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>

                    <ul>
                        {doneOrders.map((order) => {
                            return <li key={order._id} className='mb-2'>
                                <p className="text text_type_digits-default text_color_success">{order.number}</p>
                            </li>
                        })}
                    </ul>
                </div>

                <div className={styles.column}>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>

                    <ul>
                        {pendingOrders.map((order) => {
                            return <li key={order._id} className='mb-2'>
                                <p className="text text_type_digits-default">{order.number}</p>
                            </li>
                        })}
                    </ul>
                </div>
            </div>

            <div className={styles.total}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>

                <p className="text text_type_digits-large">{total}</p>
            </div>

            <div className={styles.total}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>

                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </div>
    );
};


export default FeedDetails;
