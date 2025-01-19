import {useEffect} from "react";
import {getFeed} from "../../services/feed/feed-slice.ts";
import styles from "./feed-page.module.css";
import {wsConnect, wsDisconnect} from "../../services/feed/feed-actions.ts";
import {useDispatch, useSelector} from "../../services/store.ts";

import PageLayout from "../../components/page-layout/page-layout.tsx";
import OrderList from "../../components/order-list/order-list.tsx";
import FeedDetails from "../../components/feed/details/feed-details.tsx";

const FeedPage = () => {
    const dispatch = useDispatch();
    const connect = () => dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));
    const disconnect = () => dispatch(wsDisconnect());

    useEffect(() => {
        connect()

        return () => {
            disconnect();
        }
    }, []);

    const orders = useSelector(getFeed)
    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <p className="text text_type_main-large mb-5 mt-10">Лента заказов</p>

                <div className={styles.content}>
                    <OrderList items={orders}/>

                    <FeedDetails/>
                </div>
            </div>
        </PageLayout>
    );
};


export default FeedPage;
