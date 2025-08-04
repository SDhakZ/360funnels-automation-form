import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import MultiStepForm from "./pages/form/multiStepForm";
import Onboarding from "./pages/onboarding";

config.autoAddCss = false;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/form" element={<MultiStepForm />} />
    </Routes>
  );
}

export default App;
