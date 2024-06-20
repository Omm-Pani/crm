import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";
const store = configureStore({ reducer: rootReducer }, composeWithDevTools());
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
