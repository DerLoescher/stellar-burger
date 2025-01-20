import {useEffect} from "react";
import {useDispatch, useSelector} from "../../../services/store.ts";
import {wsConnect, wsDisconnect} from "../../../services/feed/feed-actions.ts";
import {getFeed} from "../../../services/feed/feed-slice.ts";
import styles from "./profile-orders.module.css";

import OrderList from "../../order-list/order-list.tsx";

const ProfileOrders = () => {
    const dispatch = useDispatch();
    const connect = () => dispatch(wsConnect(`wss://norma.nomoreparties.space/orders?token=${localStorage.getItem("accessToken")?.split(' ')[1]}`));
    const disconnect = () => dispatch(wsDisconnect());

    const orders = useSelector(getFeed)

    useEffect(() => {
        connect()

        return () => {
            disconnect();
        }
    }, []);


    return (
        <div className={`${styles.wrapper} mt-10`}>
            <OrderList items={orders} size='big'/>
        </div>
    );
};


export default ProfileOrders;
