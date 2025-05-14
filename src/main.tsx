import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";

import "./index.scss";

// 1. Add new page
// 3. Show navigation menu
// 4. Implement 404 app page
// 2. When navigating to the site root, show order history

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
