import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodosProvider } from "./context/TodosContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <TodosProvider>
    <App />
  </TodosProvider>
); // removed the react strictmode for the app to work (people say its a react 18 issue)
