import {useDrop} from "react-dnd";
import styles from "./burger-constructor.module.css";
import {useDispatch, useSelector} from "../../services/store.ts";
import {addIngredient} from "../../services/burger-constructor/burger-constructor-slice.ts";

import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorFooter from "./constructor-footer/constructor-footer.tsx";
import DraggableIngredient from "./draggable-ingredient/draggable-ingredient.tsx";

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const allIngredients: TIngredient[] = useSelector((state) => state.ingredients.allIngredients);
    const constructorIngredients = useSelector((state) => state.burgerConstructor.burgerIngredients);
    const currentBun = useSelector(state => state.burgerConstructor.currentBun)

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop({id}: { id: string }): void {
            const ingredient = allIngredients.find((ingredient: TIngredient) => ingredient._id === id);

            if (ingredient) {
                dispatch(addIngredient(ingredient))
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    return (
        <div className={`${styles["constructor-block"]} ${isHover ? styles['drop-target'] : ''}`} ref={dropTarget}>

            {currentBun &&
                <div className='mb-4'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${currentBun.name} (верх)`}
                        price={currentBun.price}
                        thumbnail={currentBun.image}
                    />
                </div>}

            {constructorIngredients.length > 0 && (
                <div className={styles["constructor-list"]}>
                    {constructorIngredients.map((element: TDraggableIngredient) => (
                        <DraggableIngredient key={element.uniqueId} {...element} uniqueId={element.uniqueId}/>
                    ))}
                </div>
            )}

            {currentBun &&
                <div className='mt-4'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${currentBun.name} (низ)`}
                        price={currentBun.price}
                        thumbnail={currentBun.image}
                    />
                </div>
            }


            <BurgerConstructorFooter/>
        </div>
    );
};


export default BurgerConstructor;
