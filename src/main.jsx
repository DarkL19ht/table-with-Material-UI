import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";

import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.request.use((request) => {
    console.log("this is inteceptors" + request);
    // request.headers.channelName = "Light's web dev"
    return request;
});

axios.interceptors.response.use((response) => {
    console.log("this is intec" + response);
    return response;
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
