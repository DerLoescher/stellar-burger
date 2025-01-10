import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "../../services/store.ts";
import styles from "./burger-ingredients.module.css";
import {loadIngredients} from "../../services/ingredients/ingredients-actions.ts";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem from "./ingredient-item/ingredient-item.tsx";


const ingredientTypes = [
    {name: "Булки", slug: "bun"},
    {name: "Начинки", slug: "main"},
    {name: "Соусы", slug: "sauce"},
];

type IngredientRefs = {
    [key: string]: HTMLDivElement
};


const BurgerIngredients = () => {
        const dispatch = useDispatch();
        const allIngredients = useSelector(store => store.ingredients.allIngredients);

        const [currentTab, setCurrentTab] = useState(ingredientTypes[0].slug);

        useEffect(() => {
            dispatch(loadIngredients());
        }, []);


        const ingredientRefs = useRef<IngredientRefs>({});

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
                            <div className="mb-10" key={type.slug}
                                 ref={el => {
                                     if (el) ingredientRefs.current[type.slug] = el
                                 }}>
                                <p className="text text_type_main-medium mb-6">{type.name}</p>

                                <ul className={styles["section-list"]}>
                                    {allIngredients
                                        .filter((item: TIngredient) => item.type === type.slug)
                                        .map((item: TIngredient) => {
                                            return (
                                                <BurgerIngredientItem
                                                    key={item._id}
                                                    {...item}
                                                />
                                            );
                                        })}
                                </ul>
                            </div>
                        )
                    )
                    }
                </div>
            </div>
        )
            ;
    }
;


export default BurgerIngredients;
