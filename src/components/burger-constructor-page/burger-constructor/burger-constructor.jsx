import {useDispatch, useSelector} from 'react-redux';
import {useDrop} from "react-dnd";
import styles from "./burger-constructor.module.css";
import {addIngredient} from "../../../services/burger-constructor/burger-constructor-slice.js";

import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorFooter from "./constructor-footer/constructor-footer.jsx";
import DraggableIngredient from "./draggable-ingredient/draggable-ingredient.jsx";

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const allIngredients = useSelector((state) => state.ingredients.allIngredients);
    const constructorIngredients = useSelector((state) => state.burgerConstructor.burgerIngredients);
    const currentBun = useSelector(state => state.burgerConstructor.currentBun)

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop({id}) {
            const ingredient = allIngredients.find((ingredient) => ingredient._id === id);
            dispatch(addIngredient(ingredient))
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
                    {constructorIngredients.map((element, index) => (
                        <DraggableIngredient key={element._id + index} {...element} index={index}/>
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
