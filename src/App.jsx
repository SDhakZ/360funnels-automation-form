import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import MultiStepForm from "./pages/form/multiStepForm";
import Onboarding from "./pages/onboarding";
import ThankYouPage from "./pages/form/ThankYouPage";

config.autoAddCss = false;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/multistep-form" element={<MultiStepForm />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  );
}

export default App;
