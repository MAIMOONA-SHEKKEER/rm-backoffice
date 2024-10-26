import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import DashboardLayout from "./components/DashboardLayout"; // New Layout Component
import CVQList from "./components/CVQList";
import PMVQList from "./components/PMVQList";
import CustomersList from "./components/CustomersList";
import PropertyManagersList from "./components/PropertyManagers";
import QueriesList from "./components/Queries";
import PropertyManagerDetails from "./components/PropertyManagerDetail";
import CVQListDetail from "./components/CVQListDetail";
import PMVQListDetail from "./components/PMVQListDetail";
import QueriesListDetail from "./components/QueriesListDetail";
import CustomersListDetail from "./components/CustomersListDetail";
import ExtraComponent from "./components/ExtraComponent";
import RegistrationForm from "./components/RegisterForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="extra" element={<ExtraComponent />} />
       < Route path="/register" element={<RegistrationForm/>} />
        
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Navigate to="customers" replace />} />
          <Route path="customer-verification" element={<CVQList />} />
          <Route path="pm-verification" element={<PMVQList />} />
          <Route path="customers" element={<CustomersList />} />
          <Route path="property-managers" element={<PropertyManagersList />} />
          <Route path="queries" element={<QueriesList />} />

          <Route path="property-managers/:id" element={<PropertyManagerDetails />} />
          <Route path="customer-verification/:id" element={<CVQListDetail />} />
          <Route path="pm-verification/:id" element={<PMVQListDetail />} />
          <Route path="queries/:id" element={<QueriesListDetail />} />
          <Route path="customers/:id" element={<CustomersListDetail />} />
        </Route>

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
