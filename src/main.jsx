import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import store from "@/redux/store";
import { Provider } from "react-redux";

import axios from "axios";
import "toastr/build/toastr.min.css"; // Import CSS for styling
import toastr from "toastr";

toastr.options = {
    positionClass: "toast-top-right",
    progressBar: true,
    closeButton: true
};

axios.interceptors.request.use((request) => {
    return request;
});

axios.interceptors.response.use((response) => {
    return response;
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
