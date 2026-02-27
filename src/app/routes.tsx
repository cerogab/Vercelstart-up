import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
import { HomePage } from "../pages/HomePage";
import { FeaturesPage } from "../pages/FeaturesPage";
import { PricingPage } from "../pages/PricingPage";
import { ChangelogPage } from "../pages/ChangelogPage";
import { WatchDemoPage } from "../pages/WatchDemoPage";
import { GetStartedPage } from "../pages/GetStartedPage";
import { TermsOfServicePage } from "../pages/TermsOfServicePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "features", Component: FeaturesPage },
      { path: "pricing", Component: PricingPage },
      { path: "changelog", Component: ChangelogPage },
      { path: "watch-demo", Component: WatchDemoPage },
      { path: "get-started", Component: GetStartedPage },
      { path: "terms-of-service", Component: TermsOfServicePage },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);