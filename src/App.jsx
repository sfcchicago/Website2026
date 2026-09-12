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
import { SiteProvider } from "./context/SiteContext";

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
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}
