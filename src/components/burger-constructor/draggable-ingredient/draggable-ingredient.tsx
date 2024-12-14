import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import styles from "../burger-constructor.module.css";
import {moveConstructorItem, removeIngredient} from "../../../services/burger-constructor/burger-constructor-slice.js";

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";

const DraggableIngredient: FC<TDraggableIngredient> = (props) => {
    const dispatch = useDispatch();
    const onDeleteElement = (id: string) => {
        dispatch(removeIngredient(id))
    }

    const [, drag] = useDrag({
        type: "draggable-item",
        item: {uniqueId: props.uniqueId},
    });

    const [, drop] = useDrop({
        accept: "draggable-item",
        drop(draggedItem: TDraggableIngredient) {
            if (draggedItem.uniqueId !== props.uniqueId) {
                dispatch(moveConstructorItem({fromUniqueId: draggedItem.uniqueId, toUniqueId: props.uniqueId}));
            }
        },
    });


    return (<div className={styles["constructor-item"]} ref={(node) => drag(drop(node))}>
        <DragIcon type="primary"/>

        <ConstructorElement
            text={props.name}
            price={props.price}
            thumbnail={props.image}
            handleClose={() => onDeleteElement(props._id)}
        />
    </div>)
}

export default DraggableIngredient;