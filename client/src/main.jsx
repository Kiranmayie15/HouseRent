import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;