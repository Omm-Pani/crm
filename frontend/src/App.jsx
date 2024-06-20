import { DashBoard } from "./pages/DashBoard";
import SetPassword from "./pages/SetPassword";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CalenderApp from "./pages/CalenderApp";
import Integrations from "./pages/Integrations";
import Campaigns from "./pages/Campaigns";
import Customer360 from "./pages/Customer360";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/post-center" element={<CalenderApp />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/customer360" element={<Customer360 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
