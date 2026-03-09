import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {UserProvider} from "./context/userinfo.jsx";
import { RecommendedProfileProvider } from './context/userprofileRecomm.jsx'
import { CallRequestProvider} from './context/callanddate.jsx'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CallRequestProvider>
    <RecommendedProfileProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </RecommendedProfileProvider>
    </CallRequestProvider>
  </StrictMode>,
);
