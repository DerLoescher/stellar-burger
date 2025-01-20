import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from "./services/store.ts";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

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

