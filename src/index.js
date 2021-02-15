import { Suspense } from "react";
import ReactDOM from "react-dom";
import "./i18n";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Suspense fallback={<div>Loading!!!!!</div>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
  document.getElementById("root")
);
