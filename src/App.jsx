import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminHome from "./pages/Home";
import BaseLayout from "./components/BaseLayout";
import AdminLogin from "./pages/Login";
import VendorsPage from "./pages/Vendors";
import ClientsPage from "./pages/Clients";
import AdminApplicationsPage from "./pages/application";
import AddVendor from "./pages/Addvendor";
import Users from "./pages/Users";
import Firearms from "./pages/Firearms";
import AddFirearm from "./pages/AddFirearm";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="/firearms" element={<Firearms />} />
        <Route path="/firearms/add" element={<AddFirearm />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/vendors/add" element={<AddVendor />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/applications" element={<AdminApplicationsPage />} />
        <Route path="/manage-users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
