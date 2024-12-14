import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "./burger-constructor-page.module.css";

import PageLayout from "../../components/page-layout/page-layout.tsx";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.tsx";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.tsx";

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
