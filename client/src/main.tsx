// StrictMode removed to prevent duplicate API calls in development
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

createRoot(document.getElementById("root")!).render(<App />);
