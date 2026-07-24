import { Routes, Route } from "react-router-dom";
import InvoiceHistory from "./pages/InvoiceHistory";
import ViewInvoice from "./pages/ViewInvoice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <InvoiceHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/view/:id"
        element={
          <ProtectedRoute>
            <ViewInvoice />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />


    </Routes>
    
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  </>
    
  );
}

export default App;