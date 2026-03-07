import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {UserProvider} from "./context/userinfo.jsx";
import { RecommendedProfileProvider } from './context/userprofileRecomm.jsx'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecommendedProfileProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </RecommendedProfileProvider>
  </StrictMode>,
);
