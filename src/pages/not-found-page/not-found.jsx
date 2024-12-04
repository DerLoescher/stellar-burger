import {Link} from 'react-router-dom';

import styles from './not-found.module.css';
import PageLayout from "../../components/page-layout/page-layout.jsx";

export function NotFound404() {
    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <h1 className="text text_type_main-medium mb-1">Ошибка 404</h1>

                <p className="text text_type_main-default mb-1">Страница не существует</p>

                <p className="text text_type_main-small mb-6">проверьте ссылку или перейдите по <Link to='/'>ссылке</Link></p>
            </div>
        </PageLayout>
    );
}