import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";
import styles from "../burger-constructor.module.css";
import {
    moveConstructorItem,
    removeIngredient
} from "../../../../services/burger-constructor/burger-constructor-slice.js";

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const DraggableIngredient = (props) => {
    const dispatch = useDispatch();
    const onDeleteElement = (id) => {
        dispatch(removeIngredient(id))
    }

    const [, drag] = useDrag({
        type: "draggable-item",
        item: {uniqueId: props.uniqueId},
    });

    const [, drop] = useDrop({
        accept: "draggable-item",
        drop(draggedItem) {
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

DraggableIngredient.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
}

export default DraggableIngredient;