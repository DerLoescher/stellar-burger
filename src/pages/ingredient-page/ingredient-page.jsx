import PageLayout from "../../components/page-layout/page-layout.jsx";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details.jsx";

const IngredientPage = () => {
    return <PageLayout>
        <div className='pt-30'>
            <IngredientDetails/>
        </div>
    </PageLayout>
}

export default IngredientPage