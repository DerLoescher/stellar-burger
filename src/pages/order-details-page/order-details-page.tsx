import styles from './order-details-page.module.css'

import PageLayout from "../../components/page-layout/page-layout.tsx";
import OrderDetails from "../../components/order-list/order-details/order-details.tsx";

const OrderDetailsPage = () => {
    return <PageLayout>
        <div className={styles.wrapper}>
            <OrderDetails/>
        </div>
    </PageLayout>
}

export default OrderDetailsPage