import PageLayout from "../../components/page-layout/page-layout.tsx";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details.tsx";

const IngredientPage = () => {
    return <PageLayout>
        <div className='pt-30'>
            <IngredientDetails/>
        </div>
    </PageLayout>
}

export default IngredientPage