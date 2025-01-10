type TNutritionKeys = 'calories' | 'proteins' | 'fat' | 'carbohydrates';

type TIngredient = {
    name: string
    _id: string
    type: string
    price: number
    image: string
    image_large?: string
    proteins?: number
    fat?: number
    carbohydrates?: number
    calories?: number
}

type TDraggableIngredient = TIngredient & { uniqueId: string }

type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type TOrder = {
    createdAt: string;
    ingredients: TIngredient[];
    name: string;
    number: number;
    owner: {
        createdAt: string;
        email: string;
        name: string;
        updatedAt: string;
    };
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
}

type TOrderResponse = {
    name: string;
    order: TOrder;
    success: boolean;
}

type TUser = {
    email: string;
    name: string;
}

type TUserForm = { name?: string, email?: string, password?: string }