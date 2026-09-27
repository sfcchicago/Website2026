import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NewHere from "./pages/NewHere";
import Pastor from "./pages/Pastor";
import Leadership from "./pages/LeadershipPage";
import SundaySchool from "./pages/SundaySchoolPage";
import Beliefs from "./pages/BeliefsPage";
import Contact from "./pages/ContactPage";
import Manager from "./pages/Manager";
import { SiteProvider } from "./context/SiteContext";

const SanityStudioPage = lazy(() => import("./pages/SanityStudioPage"));

function StudioLoading() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f172a",
      color: "#f8fafc",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: 8 }}>Opening Sanity Studio...</h2>
        <p style={{ color: "#94a3b8", fontSize: 14 }}>Connecting to project t0ywq15l</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="new-here" element={<NewHere />} />
            <Route path="pastor" element={<Pastor />} />
            <Route path="leadership" element={<Leadership />} />
            <Route path="sunday-school" element={<SundaySchool />} />
            <Route path="beliefs" element={<Beliefs />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route
            path="admin/*"
            element={
              <Suspense fallback={<StudioLoading />}>
                <SanityStudioPage />
              </Suspense>
            }
          />
          <Route
            path="studio/*"
            element={
              <Suspense fallback={<StudioLoading />}>
                <SanityStudioPage />
              </Suspense>
            }
          />
          <Route path="manager" element={<Manager />} />
          <Route path="edit" element={<Manager />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}
