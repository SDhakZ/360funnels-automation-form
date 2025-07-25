import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Form from "./pages/form";

config.autoAddCss = false;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/form" replace />} />
      <Route
        path="/form"
        element={
          <>
            <Form />
          </>
        }
      />
    </Routes>
  );
}

export default App;
