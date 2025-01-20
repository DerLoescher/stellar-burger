import {Link, useLocation} from "react-router-dom";
import {FC} from "react";
import styles from './order-list.module.css'

import OrderListItem from "./order-list-item/order-list-item.tsx";

interface IOrderList {
    items: TFeedItem[]
    size?: 'medium' | 'big',
}

const OrderList: FC<IOrderList> = ({items, size = 'medium'}) => {
    const location = useLocation()

    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                {items.map(item => (<li key={item._id}>
                    <Link
                        key={item._id}
                        to={`${item.number}`}
                        state={{background: location}}
                    >
                        <OrderListItem size={size} {...item} />
                    </Link>
                </li>))}
            </ul>
        </div>
    );
};


export default OrderList;
