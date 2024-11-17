import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "./burger-constructor-page.module.css";

import PageLayout from "../page-layout/page-layout";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";

const BurgerConstructorPage = () => {
    return (
        <PageLayout>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.wrapper}>
                    <BurgerIngredients/>

                    <BurgerConstructor/>
                </div>
            </DndProvider>
        </PageLayout>
    );
};


export default BurgerConstructorPage;
