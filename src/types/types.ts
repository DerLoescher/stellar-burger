type TIngredient = {
    name: string
    _id: string
    type: string
    price: number
    image: string
    proteins?: number
    fat?: number
    carbohydrates?: number
    calories?: number
}

type TDraggableIngredient = TIngredient & { uniqueId: string }