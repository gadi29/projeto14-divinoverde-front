import { createRoot } from "react-dom/client";
import "../src/assets/reset.css";
import "../src/assets/styles.css";
import App from "./components/App.js";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
