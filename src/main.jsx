import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {configureStore} from "./services/store.js";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

const store = configureStore();


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </StrictMode>
)
