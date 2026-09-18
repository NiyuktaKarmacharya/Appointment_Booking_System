import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Services from "./pages/services";
import { Appointments } from "./pages/appointments";
import { Toaster } from "sonner";
import { Home } from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
