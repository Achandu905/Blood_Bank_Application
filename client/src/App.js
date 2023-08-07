import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Donar from "./pages/Dashboard/Donars";
import Hospital from "./pages/Dashboard/Hospital";
import OrganisationPages from "./pages/Dashboard/OrganisationPages";
import Donations from "./pages/Dashboard/Donations";
import Consumer from "./pages/Dashboard/Consumer";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrganisationList from "./pages/Admin/OrganisationList";
import AdminHome from "./pages/Admin/AdminHome";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <Donar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospital />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoute>
              <OrganisationPages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrganisationList />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>{" "}
    </>
  );
}

export default App;
