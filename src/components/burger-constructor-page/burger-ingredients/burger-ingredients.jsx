import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./burger-ingredients.module.css";
import {loadIngredients} from "../../../services/ingredients/ingredients-actions.js";
import {
    clearCurrentIngredient,
    setCurrentIngredient
} from "../../../services/ingredient-details/ingredient-details-slice.js";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem from "./ingredient-item/ingredient-item";
import IngredientDetails from "./ingredient-details/ingredient-details";
import Modal from "../../base/modal/modal";


const ingredientTypes = [
    {name: "Булки", slug: "bun"},
    {name: "Начинки", slug: "main"},
    {name: "Соусы", slug: "sauce"},
];

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const allIngredients = useSelector(store => store.ingredients.allIngredients);
    const currentIngredient = useSelector(state => state.ingredientDetails.currentIngredient)

    const [currentTab, setCurrentTab] = useState(ingredientTypes[0].slug);

    useEffect(() => {
        dispatch(loadIngredients());
    }, []);

    const openIngredientModal = (ingredient) => {
        dispatch(setCurrentIngredient(ingredient))
    };
    const closeIngredientModal = () => {
        dispatch(clearCurrentIngredient())
    };


    const ingredientRefs = useRef({});

    const handleScroll = () => {
        const topOffsets = Object.keys(ingredientRefs.current).map(slug => {
            if (ingredientRefs.current[slug]) {
                return ingredientRefs.current[slug].getBoundingClientRect().top;
            }
            return Infinity;
        });

        const closestIndex = topOffsets.findIndex((top) => top === Math.min(...topOffsets.map(Math.abs)));
        if (closestIndex >= 0) setCurrentTab(ingredientTypes[closestIndex].slug);
    };


    return (
        <div className={`${styles.wrapper} pt-10 pb-10`}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>

            <div className={`${styles.tabs} mb-10`}>
                {ingredientTypes.map((type) => (
                    <Tab
                        key={type.slug}
                        value={type.slug}
                        active={currentTab === type.slug}
                        onClick={setCurrentTab}>
                        {type.name}
                    </Tab>
                ))}
            </div>

            <div className={styles.scrollable} onScroll={handleScroll}>
                {ingredientTypes.map((type) => (
                    <div className="mb-10" key={type.slug} ref={el => ingredientRefs.current[type.slug] = el}>
                        <p className="text text_type_main-medium mb-6">{type.name}</p>

                        <ul className={styles["section-list"]}>
                            {allIngredients
                                .filter((item) => item.type === type.slug)
                                .map((item) => {
                                    return (
                                        <BurgerIngredientItem
                                            key={item._id}
                                            {...item}
                                            onClick={() => openIngredientModal(item)}
                                        />
                                    );
                                })}
                        </ul>
                    </div>
                ))}
            </div>

            {currentIngredient && (
                <Modal title={"Детали ингредиента"} onClose={closeIngredientModal}>
                    <IngredientDetails ingredient={currentIngredient}/>
                </Modal>
            )}
        </div>
    );
};


export default BurgerIngredients;
