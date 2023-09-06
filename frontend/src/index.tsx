import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <div style={{width:'100vw', height:'100vh' ,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <App />
      </div>
    </BrowserRouter>
  </Provider>
);
