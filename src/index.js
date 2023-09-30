import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./components/Redux/store.js";
const root = ReactDOM.createRoot(document.querySelector(".root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
