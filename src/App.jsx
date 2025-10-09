import React from "react";
import { Routes, Route } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import MultiStepForm from "./pages/form/multiStepForm";
import Onboarding from "./pages/onboarding";
import ThankYouPage from "./pages/form/ThankYouPage";
import NotFoundPage from "./pages/NotFoundPage";
import LinkExpiredPage from "./pages/LinkExpiredPage";
import ProtectedFormRoute from "./utils/ProtectedFromRoutes";

config.autoAddCss = false;
function App() {
  return (
    <Routes>
      {/* Protected form route group */}
      <Route path="/:token" element={<ProtectedFormRoute />}>
        <Route index element={<Onboarding />} />
        <Route path="multistep-form" element={<MultiStepForm />} />
        <Route path="thank-you" element={<ThankYouPage />} />
      </Route>

      {/* Expired or invalid links */}
      <Route path="/link-expired" element={<LinkExpiredPage />} />
      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
