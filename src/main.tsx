import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {configureStore} from "./services/store.js";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

const store = configureStore();
const root: HTMLElement | null = document.getElementById('root');

if (root) {
    createRoot(root).render(
        <StrictMode>
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        </StrictMode>
    )
} else {
    console.error("Потерян корневой элемент");
}

