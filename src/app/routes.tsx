import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
import { HomePage } from "../pages/HomePage";
import { FeaturesPage } from "../pages/FeaturesPage";
import { ChangelogPage } from "../pages/ChangelogPage";
import { WatchDemoPage } from "../pages/WatchDemoPage";
import { GetStartedPage } from "../pages/GetStartedPage";
import { ThankYouPage } from "../pages/ThankYouPage";
import { TermsOfServicePage } from "../pages/TermsOfServicePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "features", Component: FeaturesPage },
      { path: "changelog", Component: ChangelogPage },
      { path: "watch-demo", Component: WatchDemoPage },
      { path: "get-started", Component: GetStartedPage },
      { path: "thank-you", Component: ThankYouPage },
      { path: "terms-of-service", Component: TermsOfServicePage },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);