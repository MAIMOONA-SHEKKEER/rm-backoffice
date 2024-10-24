import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/customers");
      setCustomers(response.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCustomer = async (customerData) => {
    try {
      setLoading(true);
      await axiosInstance.post("/customers", customerData);
      fetchCustomers();
    } catch (err) {
      console.error("Error creating customer:", err);
      setError("Failed to create customer.");
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (customerId, customerData) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/customers/${customerId}`, customerData);
      fetchCustomers();
    } catch (err) {
      console.error("Error updating customer:", err);
      setError("Failed to update customer.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/customers/${customerId}`);
      fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError("Failed to delete customer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomers;
