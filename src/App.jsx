import { useEffect, useState } from "react";
import "./App.css";
import { INGREDIENTS_LIST_API } from "./utils/dictionary";

import BurgerConstructorPage from "./components/burger-constructor-page/burger-constructor-page";
import AppHeader from "./components/header/header";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = async () => {
    try {
      const response = await fetch(INGREDIENTS_LIST_API);
      if (!response.ok) {
        return Promise.reject(`Ошибка ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <AppHeader />

      <BurgerConstructorPage data={data} />
    </>
  );
}

export default App;
