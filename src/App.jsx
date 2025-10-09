import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import MultiStepForm from "./pages/form/multiStepForm";
import Onboarding from "./pages/onboarding";
import ThankYouPage from "./pages/form/ThankYouPage";
import NotFoundPage from "./pages/NotFoundPage";
import LinkExpiredPage from "./pages/LinkExpiredPage";

config.autoAddCss = false;
function App() {
  return (
    <Routes>
      <Route path="/:token" element={<Onboarding />} />
      <Route path="/:token/multistep-form" element={<MultiStepForm />} />
      <Route path="/:token/thank-you" element={<ThankYouPage />} />
      <Route path="/link-expired" element={<LinkExpiredPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
